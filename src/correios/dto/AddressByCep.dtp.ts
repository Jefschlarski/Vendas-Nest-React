
import { IsInt, IsOptional, IsString } from "class-validator";
import { ReturnCityDto } from "../../city/dto/returnCity.dto";
import { ReturnStateDto } from "../../state/dto/returnState.dto";

export class AddressByCepDto{
    
    @IsString()
    @IsOptional()
    complement: string;

    @IsString()
    cep: string;

    @IsString()
    street: string;

    @IsString()
    neighborhood: string;

    @IsInt()
    city: ReturnCityDto;

    @IsInt()
    state: ReturnStateDto;

    constructor(response: any, city: ReturnCityDto, state: ReturnStateDto){
        this.complement = response.complement;
        this.street = response.logradouro;
        this.neighborhood = response.bairro;
        this.cep = response.cep;
        this.city = city;
        this.state = state;  
    }
}