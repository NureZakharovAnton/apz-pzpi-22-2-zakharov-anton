import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { JobAttemptsModule } from './modules/job-attempts/job-attempts.module';
import { ProposalsModule } from './modules/proposals/proposals.module';
import { AuthGuard } from './modules/auth/auth.guard';
import { RolesGuard } from './modules/users/users.guards';
import { MailModule } from './modules/mail/mail.module';
import { BackupsModule } from './modules/backups/backups.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    JobsModule,
    PaymentsModule,
    ReviewsModule,
    JobAttemptsModule,
    ProposalsModule,
    MailModule,
    BackupsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
