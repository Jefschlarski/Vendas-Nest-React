import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { AddressDto } from './dto/address.dto';
import { UserService } from 'src/user/user.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>, 
        private readonly userService: UserService,
        private readonly cityService: CityService,
    ){}
    
    async create(addressDto: AddressDto, userId: number): Promise<Address>
    {
      await this.userService.getById(userId)
      await this.cityService.getById(addressDto.cityId)
      return this.addressRepository.save({
        ...addressDto,
        userId,
      })
    }
}
