import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>
    ){}
    
    async create(addressDto: AddressDto, userId: number): Promise<Address>
    {
      return this.addressRepository.save({
        ...addressDto,
        userId,
      })
    }
}
