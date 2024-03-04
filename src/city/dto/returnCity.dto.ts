import { ReturnStateDto } from "../../state/dto/returnState.dto";
import { City } from "../entities/city.entity";

export class ReturnCityDto{
    id: number;
    name: string;
    state?: ReturnStateDto;

    constructor(city: City){
        this.id = city.id;
        this.name = city.name;
        this.state = city.state ? new ReturnStateDto(city.state) : undefined;
    }
}