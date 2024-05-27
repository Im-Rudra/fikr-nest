import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt-auth.guard';
import { JwtGuardStrategy } from './strategies/jwt-auth.strategy';
import { GoogleStrategy } from './strategies/google-oauth.strategy';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { configDotenv } from 'dotenv';
import { PrismaService } from '@/prisma/prisma.service';

configDotenv();

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: 10000,
        },
        global: true,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    PrismaService,
    AuthService,
    JwtGuardStrategy,
    JwtGuard,
    GoogleStrategy,
    GoogleOauthGuard,
  ],
})
export class AuthModule {}
