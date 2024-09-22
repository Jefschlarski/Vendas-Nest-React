
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { validatePassword } from './utils/validate-password';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { LoginPayload } from './dto/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<ReturnLoginDto> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Wrong credentials');
    }
    const isMatch = await validatePassword(pass, user.password || '');
    if (!isMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }
    return {accessToken: this.jwtService.sign({...new LoginPayload(user)})}
  }
}
