import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
   constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
   ){};

    async create(userDto: UserDto)
    {
        const user = await this.getByEmail(userDto.email).catch(() => undefined)

        if(user){
            throw new BadRequestException('email já está em uso')
        }

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

    async getUserRelations(userId: number): Promise<User>{
        return this.userRepository.findOne({
            where:{
                id:userId
            },
            relations:{
                addresses:{
                    city:{
                        state: true,
                    }
                }
            }
        })
    }   

    async getById(userId: number): Promise<User>{

        const user = await this.userRepository.findOne({
            where:{
                id:userId
            }
        })
        
        if(!user){
            throw new NotFoundException(`userId ${userId} Not Found`)
        }

        return user;
    }

    async getByEmail(email: string): Promise<User>{

        const user = await this.userRepository.findOne({
            where:{
                email:email
            }
        })
        
        if(!user){
            throw new NotFoundException(`Email Not Found`)
        }

        return user;
    }
}
