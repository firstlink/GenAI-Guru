import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { sendContactEmail, verifyEmailConfig, sendPasswordResetEmail } from "./email";
import passport from "passport";
import { randomBytes } from "crypto";
import { hashPassword } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Verify email configuration on startup
  await verifyEmailConfig();

  // Admin Authentication Routes
  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.json({ user: { id: user.id, username: user.username } });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/user", (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  app.post("/api/forgot-password", async (req, res) => {
    const { email } = req.body;

    // Only allow reset for the configured admin email
    if (email !== "firstlinkconsultingllc@gmail.com") {
      return res.status(400).json({ message: "Invalid email for admin recovery" });
    }

    const user = await storage.getUserByUsername(email);
    if (!user) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    const token = randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); // 1 hour

    await storage.updateUser(user.id, {
      resetToken: token,
      resetTokenExpiry: expiry,
    });

    // In production/Render, this should use the actual domain
    const host = req.get("host"); // e.g. "localhost:5000" or "myapp.onrender.com"
    const protocol = req.protocol;
    const resetLink = `${protocol}://${host}/admin/reset-password?token=${token}`;

    await sendPasswordResetEmail(email, resetLink);

    res.json({ message: "Password reset instructions sent" });
  });

  app.post("/api/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;

    // Identify user by token (this is inefficient in real scale but fine for single admin)
    // We strictly search for the known username to be safe
    const user = await storage.getUserByUsername("firstlinkconsultingllc@gmail.com");

    if (!user || user.resetToken !== token || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await hashPassword(newPassword);

    await storage.updateUser(user.id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    res.json({ message: "Password updated successfully" });
  });

  // Seed Admin User (Idempotent)
  (async () => {
    const adminEmail = "firstlinkconsultingllc@gmail.com";
    if (!(await storage.getUserByUsername(adminEmail))) {
      const initialPassword = process.env.ADMIN_PASSWORD || "admin123";
      const hashedPassword = await hashPassword(initialPassword);
      await storage.createUser({
        username: adminEmail,
        password: hashedPassword,
      });
      console.log("Admin user seeded");
    }
  })();

  // Middleware to protect admin routes
  const requireAuth = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Lead signup endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json({
        success: true,
        message: "Thank you for your interest! We'll be in touch soon.",
        lead: { id: lead.id, email: lead.email }
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: fromZodError(error).message
        });
      }

      if (error.code === "23505") {
        return res.status(409).json({
          success: false,
          message: "This email is already registered on our waitlist."
        });
      }

      console.error("Error creating lead:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred. Please try again later."
      });
    }
  });

  // Contact form endpoint
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);

      // Send email notification (non-blocking, don't fail if email fails)
      sendContactEmail({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
      }).catch(emailError => {
        console.error("Failed to send contact email, but form was saved:", emailError);
      });

      res.status(201).json({
        success: true,
        message: "Thank you for reaching out! We'll respond to your inquiry shortly.",
        contact: { id: contact.id }
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: fromZodError(error).message
        });
      }

      console.error("Error creating contact:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred. Please try again later."
      });
    }
  });

  // Admin endpoints to view leads and contacts
  app.get("/api/leads", async (_req, res) => {
    try {
      const allLeads = await storage.getLeads();
      res.json({ leads: allLeads });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  // Admin endpoints to view leads and contacts
  app.get("/api/leads", requireAuth, async (_req, res) => {
    try {
      const allLeads = await storage.getLeads();
      res.json({ leads: allLeads });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.get("/api/contacts", requireAuth, async (_req, res) => {
    try {
      const allContacts = await storage.getContacts();
      res.json({ contacts: allContacts });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  return httpServer;
}
