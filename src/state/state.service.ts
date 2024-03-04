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

    /**
     * Retrieve a state by uf.
     *
     * @param {string} uf - The uf of the state
     * @return {Promise<State>} The state
     */
    async getByUF(uf: string): Promise<State>{
        const state = await this.stateRepository.findOneBy({uf: uf});
        if(!state){
            throw new Error('State not found');
        }
        return state;
    }
}
