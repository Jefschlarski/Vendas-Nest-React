import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { AddressDto } from './dto/address.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>, 
        private readonly userService: UserService,
        private readonly cityService: CityService,
    ){}

    /**
     * Create a new address for a user.
     *
     * @param {AddressDto} addressDto - the address data transfer object
     * @param {number} userId - the user ID
     * @return {Promise<Address>} the newly created address
     */
    async create(addressDto: AddressDto, userId: number): Promise<Address>
    {
      await this.userService.getById(userId)
      await this.cityService.getById(addressDto.cityId)
      return this.addressRepository.save({
        ...addressDto,
        userId,
      })
    }

    /**
     * Find all addresses by user ID.
     *
     * @param {number} userId - The user ID
     * @return {Promise<Address[]>} The list of addresses
     */
    async findAllByUserId(userId: number): Promise<Address[]>{
        
      const addresses = await this.addressRepository.find({
            where: {
                userId
            },
            relations:{
                city: {
                    state: true,
                }
            }
        });
      if(!addresses || addresses.length === 0){
        throw new NotFoundException(`Addresses not found for userId: ${userId}`);
      }  

      return addresses
    }
}
