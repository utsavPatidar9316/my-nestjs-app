import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Controller('email')
export class AppController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
    @Body('html') html: string,
  ) {
    return this.emailService.sendMail(to, subject, text, html);
  }
}
