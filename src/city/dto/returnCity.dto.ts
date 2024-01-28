import { ReturnStateDto } from "src/state/dto/returnState.dto";
import { City } from "../entities/city.entity";

export class ReturnCityDto{
    name: string;
    state?: ReturnStateDto;

    constructor(city: City){
        this.name = city.name;
        this.state = city.state ? new ReturnStateDto(city.state) : undefined;
    }
}