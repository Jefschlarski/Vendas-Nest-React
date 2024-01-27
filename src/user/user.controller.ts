import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {

    @Post()
    async create (@Body() user: UserDto)
    {
        return user;
    }

}
