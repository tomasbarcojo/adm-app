import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { CreateUserInput } from '../user/dto/create-user-input.dto';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from './types/jwtPayload.type';
import { Tokens } from './types/tokens.type';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, private config: ConfigService) {}

  async signupLocal(dto: CreateUserInput): Promise<Tokens> {
    try {
      const hashedPassword = await argon.hash(dto.password);

      const user = await this.userService.create({ ...dto, password: hashedPassword });

      const tokens = await this.getTokens(user.id, user.email, user.username);
      await this.updateRtHash(user.id, tokens.refresh_token);

      return { ...user, ...tokens };
    } catch (error) {
      return error;
    }
  }

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.userService.getOne({ username: dto.username });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.username);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.userService.updateRefreshToken({ id: userId }, { refreshToken: null });
    return true;
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.userService.getOne({ id: userId });
    if (!user || !user.refreshToken) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.refreshToken, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.username);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.userService.update({ id: userId }, { refreshToken: hash });
  }

  async getTokens(userId: number, email: string, username: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
      email: email,
      username: username,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '1m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '1d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
