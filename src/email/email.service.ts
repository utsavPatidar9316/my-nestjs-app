import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure the transporter with your SMTP settings
    this.transporter = nodemailer.createTransport({
      service: 'hostinger',
      host: 'smtp.hostinger.com', // SMTP host for Gmail
      port: 465, // Port for secure SMTP (587 for STARTTLS, 465 for SSL)
      secure: true, // Use TLS
      auth: {
        user: 'utsav.patel@netpairinfotech.com', // Your email
        pass: 'Netutsav@123', // Your email password or app-specific password
      },
    });
  }

  // Method to send email
  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: 'utsav.patel@netpairinfotech.com', // Sender address
      to, // Recipient address
      subject, // Subject of the email
      text, // Plain text body
      html, // HTML body (optional)
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email: ', error);
      throw error;
    }
  }
}
