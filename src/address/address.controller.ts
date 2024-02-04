import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnAddressDto } from './dto/return.address.dto';


@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService: AddressService,
    ){}
    
    /**
     * Create a new address.
     *
     * @param {AddressDto} addressDto - the address data transfer object
     * @param {number} userId - the user ID
     * @return {Promise<Address>} the newly created address
     */
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() addressDto: AddressDto,  @UserId() userId: number,): Promise<Address>
    {
        return this.addressService.create(addressDto, userId)
    }

    /**
     * Find all addresses by user ID.
     *
     * @param {number} userId - the user ID
     * @return {Promise<ReturnAddressDto[]>} a promise that resolves to an array of ReturnAddressDto objects
     */
    @Get()
    async findAllByUserId(@UserId() userId: number): Promise<ReturnAddressDto[]>{
        return (await this.addressService.findAllByUserId(userId)).map((address) => new ReturnAddressDto(address));
    }

}
