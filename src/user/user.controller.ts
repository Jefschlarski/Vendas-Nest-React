import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './models/user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Post()
    async create (@Body() user: UserDto)
    {
        return this.userService.create(user);
    }

    @Get()
    async getAll(): Promise<User[]> {
        return this.userService.getAll();
    }
}
