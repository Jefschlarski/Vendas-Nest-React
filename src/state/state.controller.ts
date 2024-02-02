import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from './entities/state.entity';

@Controller('state')
export class StateController {

    constructor(private readonly stateService: StateService){}

    /**
     * Retrieve all states.
     *
     * @return {Promise<State[]>} The list of all states
     */
    @Get()
    async getAll(): Promise<State[]> {
        return this.stateService.getAll();
    }

}
