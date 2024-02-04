import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dto/return.user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    /**
     * Create a new user.
     *
     * @param {type} user - user data transfer object
     * @return {Promise<ReturnUserDto>} a promise that resolves to a ReturnUserDto
     */
    @UsePipes(ValidationPipe)
    @Post()
    async create (@Body() user: UserDto): Promise<ReturnUserDto>
    {
        return this.userService.create(user);
    }

    /**
     * Retrieves all users and returns them as ReturnUserDto array.
     *
     * @return {Promise<ReturnUserDto[]>} Array of ReturnUserDto
     */
    @Get()
    async getAll(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAll()).map((user) => new ReturnUserDto(user));
    }

    /**
     * Asynchronously gets user relations by user ID.
     *
     * @param {number} userId - the ID of the user
     * @return {Promise<ReturnUserDto>} a promise that resolves to a ReturnUserDto
     */
    @Get('/:userId')
    async getUserRelations(@Param('userId') userId: number): Promise<ReturnUserDto>{
        return new ReturnUserDto(await this.userService.getUserRelations(userId));
    }
}
    