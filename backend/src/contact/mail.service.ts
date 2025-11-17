import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      secure: this.configService.get('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASSWORD'),
      },
    });
  }

  async sendContactNotification(submission: any) {
    const adminEmail = this.configService.get('ADMIN_EMAIL');

    if (!adminEmail) {
      this.logger.warn('Admin email not configured, skipping notification');
      return;
    }

    try {
      await this.transporter.sendMail({
        from: this.configService.get('SMTP_USER'),
        to: adminEmail,
        subject: `New Contact Form Submission from ${submission.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${submission.name}</p>
          <p><strong>Email:</strong> ${submission.email}</p>
          ${submission.phone ? `<p><strong>Phone:</strong> ${submission.phone}</p>` : ''}
          ${submission.subject ? `<p><strong>Subject:</strong> ${submission.subject}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${submission.message}</p>
          <hr>
          <p><small>Submitted at: ${new Date(submission.createdAt).toLocaleString()}</small></p>
        `,
      });

      this.logger.log(`Contact notification email sent to ${adminEmail}`);
    } catch (error) {
      this.logger.error('Failed to send contact notification email', error);
      throw error;
    }
  }
}
