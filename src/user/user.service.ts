import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
   constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
   ){};

    async create(userDto: UserDto)
    {
        const saltOrRounds = 10;
        const passwordHashed = await hash(userDto.password, saltOrRounds);  

        return this.userRepository.save(
            {
                ...userDto,
                typeUser: 1,
                password: passwordHashed
            })
    }

    async getAll(): Promise<User[]>{
        return this.userRepository.find();
    }
}
