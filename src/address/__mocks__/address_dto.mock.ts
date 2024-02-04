
import { AddressDto } from "../dto/address.dto";
import { addressMock } from "./address.mock";

export const addressDtoMock: AddressDto = {

    cep: addressMock.cep,
    cityId: addressMock.cityId,
    numberAddress: addressMock.numberAddress,
    complement: addressMock.complement

}