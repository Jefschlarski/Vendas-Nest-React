import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StateService {
    
    constructor(
        @InjectRepository(State)
        private readonly stateRepository: Repository<State>
    ){};
    
    /**
     * Retrieve all states.
     *
     * @return {Promise<State[]>} The array of states
     */
    async getAll(): Promise<State[]>{
        return this.stateRepository.find()
    }
}
