import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ReturnLoginDto } from './dto/returnLogin.dto';

@Controller('auth')
export class AuthController {
    
    constructor(
        private readonly authService: AuthService
    ){}
    
    /**
     * Perform a login using the provided login data.
     *
     * @param {LoginDto} loginDto - the login data
     * @return {Promise<ReturnLoginDto>} the login result
     */
    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDto): Promise<ReturnLoginDto>{
        return await this.authService.login(loginDto);
    }
}
