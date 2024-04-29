import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "mySecretPassword",
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthService, JwtStrategy, PrismaService, LocalStrategy, LocalAuthGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

