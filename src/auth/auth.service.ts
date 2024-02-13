import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { ReturnUserDto } from '../user/dto/return.user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from './dto/loginPayload.dto';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { validatePassword } from '../utils/autenticate';

@Injectable()
export class AuthService {
    
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ){}
    
    /**
     * Asynchronously logs in a user.
     *
     * @param {LoginDto} loginDto - the login data transfer object
     * @return {Promise<ReturnLoginDto>} returns a promise with the returned login data transfer object
     */
    async login(loginDto: LoginDto): Promise<ReturnLoginDto>{

        const user: User | undefined = await this.userService.findByEmail(loginDto.email).catch(()=> undefined);

        const isMatch = await validatePassword(loginDto.password, user.password || '');

        if(!user || !isMatch){
            throw new NotFoundException('Email or password invalid');
        }

        return {accessToken: this.jwtService.sign({...new LoginPayloadDto(user)}), user: new ReturnUserDto(user)}
    }
}
