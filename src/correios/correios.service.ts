import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AddressByCepDto } from './dto/AddressByCep.dtp';
import { CityService } from 'src/city/city.service';
import { StateService } from 'src/state/state.service';
import { ReturnCityDto } from 'src/city/dto/returnCity.dto';
import { ReturnStateDto } from 'src/state/dto/returnState.dto';


@Injectable()
export class CorreiosService {
    URL_CORREIOS = process.env.URL_CORREIOS_CEP;
    constructor(
        private readonly httpService: HttpService,
        private readonly cityService: CityService,
        private readonly stateService: StateService,
    ) {}
    
    async findByCep(cep: string): Promise<AddressByCepDto> {   
        const url = this.URL_CORREIOS.replace('{CEP}', cep);

        const response = await this.httpService.axiosRef.get(url).catch((error) => {
            throw new BadRequestException(error.message);
        });

        if(response.data.erro ==='true' || response.data.erro){
            throw new BadRequestException('CEP not found');
        }

        const state = new ReturnStateDto(await this.stateService.getByUF(response.data.uf));
        const city = new ReturnCityDto(await this.cityService.getByName(response.data.localidade, state.id)); 
        return new AddressByCepDto(response.data, city, state);
    }
}