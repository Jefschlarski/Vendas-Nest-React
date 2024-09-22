import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ReturnUserDto } from './dto/return.user.dto';
import { UpdatePasswordDto } from './dto/update.password';
import { User } from './entities/user.entity';
import { UserId } from '../decorators/user-id.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('user')
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
    @ApiOperation({summary: 'Create a new user'})
    async create (@Body() user: UserDto): Promise<ReturnUserDto>
    {
        return this.userService.create(user);
    }

    /**
     * Retrieves a user by their a token ID.
     *
     * @return {Promise<ReturnUserDto[]>} Array of ReturnUserDto
     */
    @Get()
    @UsePipes(ValidationPipe)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Get user by token ID'})
    async getByTokenId(@UserId() userId: number): Promise<ReturnUserDto> {
        return new ReturnUserDto(await this.userService.findById(userId));
    }

    /**
     * Asynchronously gets user relations by user ID.
     *
     * @param {number} userId - the ID of the user
     * @return {Promise<ReturnUserDto>} a promise that resolves to a ReturnUserDto
     */
    @Get('/:userId')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Get user relations by user ID', parameters: [{name: 'userId', in: 'query', description: 'User ID'}]})
    async getUserRelations(@Param('userId') userId: number): Promise<ReturnUserDto>{
        return new ReturnUserDto(await this.userService.getUserRelations(userId));
    }

    /**
     * A description of the entire function.
     *
     * @param {number} userId - description of parameter
     * @param {UpdatePasswordDto} updatePasswordDto - description of parameter
     * @return {Promise<User>} description of return value
     */
    @Patch()
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Update user password', parameters: [{name: 'userId', in: 'query', description: 'User ID'}]})
    async updatePassword(@UserId() userId: number, @Body() updatePasswordDto: UpdatePasswordDto): Promise<User>{
        return await this.userService.updatePassword(userId, updatePasswordDto);
    }
}

    