import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types/jwtPayload.type';
import { JwtPayloadWithRt } from '../types/jwtPayloadWithRt.type';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('RT_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(@Request() req, payload: JwtPayload): JwtPayloadWithRt {
    const authorization: string | string[] = req.headers.authorization || req.headers.Authorization;
    const refreshToken: string | null = authorization && typeof authorization === 'string' ? authorization.substring(7) : null;

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    return {
      ...payload,
      refreshToken,
    };
  }
}