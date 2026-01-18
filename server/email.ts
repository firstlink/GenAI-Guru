import nodemailer from 'nodemailer';
import type { Contact } from '@shared/schema';

// Email configuration from environment variables
const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'firstlinkconsultingllc@gmail.com';

// Create reusable transporter object using SMTP transport
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    // Only create transporter if email credentials are provided
    if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass || EMAIL_CONFIG.auth.pass === 'your-app-password-here') {
      console.warn('⚠️  Email credentials not configured. Emails will not be sent.');
      return null;
    }

    transporter = nodemailer.createTransport(EMAIL_CONFIG);
  }
  return transporter;
}

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  const transport = getTransporter();

  if (!transport) {
    console.warn('Email not sent - transporter not configured');
    return false;
  }

  try {
    // Email to business owner
    const ownerEmailOptions = {
      from: `"GenAI Guru Contact Form" <${EMAIL_CONFIG.auth.user}>`,
      to: CONTACT_EMAIL,
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <div style="padding: 15px; background-color: #f5f5f5; border-left: 4px solid #4F46E5; border-radius: 4px;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This email was sent from the GenAI Guru contact form.</p>
            <p>To reply to this inquiry, please respond directly to: ${data.email}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This email was sent from the GenAI Guru contact form.
To reply to this inquiry, please respond directly to: ${data.email}
      `,
      replyTo: data.email, // Allow direct reply to the customer
    };

    // Send email to business owner
    await transport.sendMail(ownerEmailOptions);

    // Optional: Send confirmation email to customer
    const customerEmailOptions = {
      from: `"GenAI Guru" <${EMAIL_CONFIG.auth.user}>`,
      to: data.email,
      subject: 'Thank you for contacting GenAI Guru!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            Thank You for Reaching Out!
          </h2>
          
          <p style="color: #555; line-height: 1.6;">
            Hi ${data.name},
          </p>
          
          <p style="color: #555; line-height: 1.6;">
            Thank you for contacting us! We've received your message and will get back to you as soon as possible.
          </p>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #4F46E5; border-radius: 4px;">
            <p style="margin: 5px 0;"><strong>Your message:</strong></p>
            <p style="margin: 10px 0; color: #666;">${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            Best regards,<br>
            <strong>The GenAI Guru Team</strong>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>If you have any additional questions, feel free to reply to this email.</p>
          </div>
        </div>
      `,
      text: `
Hi ${data.name},

Thank you for contacting us! We've received your message and will get back to you as soon as possible.

Your message:
${data.message}

Best regards,
The GenAI Guru Team

---
If you have any additional questions, feel free to reply to this email.
      `,
    };

    // Send confirmation email to customer
    await transport.sendMail(customerEmailOptions);

    console.log(`✅ Contact form email sent successfully to ${CONTACT_EMAIL} and confirmation sent to ${data.email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending contact form email:', error);
    return false;
  }
}
export async function sendPasswordResetEmail(email: string, resetLink: string): Promise<boolean> {
  const transport = getTransporter();

  if (!transport) {
    console.warn('Email not sent - transporter not configured');
    return false;
  }

  try {
    const mailOptions = {
      from: `"GenAI Guru Security" <${EMAIL_CONFIG.auth.user}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">
            Password Reset Request
          </h2>
          
          <p style="color: #555; line-height: 1.6;">
            A password reset was requested for your GenAI Guru admin account.
          </p>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${resetLink}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            Or copy and paste this link into your browser:
            <br>
            <a href="${resetLink}" style="color: #4F46E5;">${resetLink}</a>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>If you didn't request this, you can safely ignore this email.</p>
            <p>This link will expire in 1 hour.</p>
          </div>
        </div>
      `,
    };

    await transport.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    return false;
  }
}
// Verify email configuration on startup
export async function verifyEmailConfig(): Promise<boolean> {
  const transport = getTransporter();

  if (!transport) {
    return false;
  }

  try {
    await transport.verify();
    console.log('✅ Email service is ready');
    return true;
  } catch (error) {
    console.error('❌ Email service configuration error:', error);
    return false;
  }
}
