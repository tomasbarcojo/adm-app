import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../user/dto/create-user-input.dto';
import { UserService } from '../user/user.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getOne({ username });
    if (user && await argon.verify(user.password, password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async signupLocal(dto: CreateUserInput): Promise<any> {
    const hashedPassword = await argon.hash(dto.password);

    const user = await this.userService.create({ ...dto, password: hashedPassword });

    return user;
  }
}
