import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CronModule } from './cron/cron.module';
import { EmailModule } from './email/email.module';
import { UploadModule } from './uploads/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mydatabase'), // MongoDB connection string
    UserModule,
    CronModule,
    EmailModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', // URL path to access static files
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
