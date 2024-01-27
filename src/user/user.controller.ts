import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dto/returnUser.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @UsePipes(ValidationPipe)
    @Post()
    async create (@Body() user: UserDto)
    {
        return this.userService.create(user);
    }

    @Get()
    async getAll(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAll()).map((user) => new ReturnUserDto(user));
    }
}
