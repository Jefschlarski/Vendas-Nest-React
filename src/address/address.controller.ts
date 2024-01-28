import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';


@Roles(UserType.User)
@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService: AddressService,
    ){}

    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async create(@Body() addressDto: AddressDto,  @Param('userId') userId: number,): Promise<Address>
    {
        return this.addressService.create(addressDto, userId)
    }
}
