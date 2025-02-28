import nodemailer from 'nodemailer';
import { logger } from './logger';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Validate email configuration
function validateEmailConfig() {
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'SMTP_FROM'];
  const missing = requiredVars.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required email configuration: ${missing.join(', ')}`);
  }
}

// Create transporter with validation
function createTransporter() {
  validateEmailConfig();
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

let transporter: nodemailer.Transporter;

// Initialize transporter lazily
function getTransporter() {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  if (!to) {
    logger.error('Email "to" field is required but was undefined');
    return false;
  }

  try {
    const mailer = getTransporter();
    await mailer.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    logger.error('Failed to send email', { error, to, subject });
    return false;
  }
}
