import { Address } from "../entities/address.entity";

export class ReturnAddressDto{
    
    complement: string;
    numberAddress: number;
    cep: string;
    cityId: number;

    constructor(address: Address){
        this.complement = address.complement;
        this.numberAddress = address.numberAddress;
        this.cep = address.cep;
        this.cityId = address.cityId;
    }
}