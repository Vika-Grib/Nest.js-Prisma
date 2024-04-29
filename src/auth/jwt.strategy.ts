import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "mySecretPassword", // пока без ENV переменных
    });
  }
// метод возвращает пользователя, основываясь на данных, закодированных в JWT
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}

