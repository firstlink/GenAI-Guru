import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
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

  app.get("/api/contacts", async (_req, res) => {
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
