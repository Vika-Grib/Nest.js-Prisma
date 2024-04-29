import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
        where: { email },
      });
  
      if (user && await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      }
  
      throw new UnauthorizedException('Invalid credentials');
    }


  async login(user: any) {
    const payload = { email: user.email, sub: user.userId, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: { email: string; password: string; role: string }): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
  
    try {
      const user = await this.prisma.user.create({
        data: {
          email: userDto.email,
          password: hashedPassword,
          role: userDto.role,
        },
      });
  
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new UnauthorizedException('Registration failed');
    }
  }
}

