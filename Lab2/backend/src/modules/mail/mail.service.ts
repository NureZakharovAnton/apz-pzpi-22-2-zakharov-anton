import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  private async sendMail(options: {
    to: string;
    subject: string;
    template: string;
    context: any;
  }) {
    try {
      this.mailerService.sendMail({
        to: options.to,
        subject: options.subject,
        template: options.template,
        context: {
          ...options.context,
          appName: 'App',
          supportEmail: this.configService.get('MAIL_PROVIDER_EMAIL'),
          currentYear: new Date().getFullYear(),
        },
      });
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  async sendWelcomeEmail(user: { email: string; name: string }) {
    return await this.sendMail({
      to: user.email,
      subject: 'Welcome to Our Platform!',
      template: 'welcome',
      context: {
        name: user.name,
      },
    });
  }

  async sendAccountDeletionEmail(user: { email: string; name: string }) {
    return await this.sendMail({
      to: user.email,
      subject: 'Account Deletion Confirmation',
      template: 'account-deletion',
      context: {
        name: user.name,
        appName: 'App',
        currentYear: new Date().getFullYear(),
        supportEmail: this.configService.get('MAIL_PROVIDER_EMAIL'),
      },
    });
  }

  async sendInvoiceEmail(options: {
    email: string;
    name: string;
    invoiceNumber: string;
    amount: number;
  }) {
    return await this.sendMail({
      to: options.email,
      subject: `Invoice #${options.invoiceNumber}`,
      template: 'invoice',
      context: {
        name: options.name,
        invoiceNumber: options.invoiceNumber,
        amount: options.amount,
      },
    });
  }
}
