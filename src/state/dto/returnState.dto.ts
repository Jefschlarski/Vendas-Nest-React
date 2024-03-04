import { State } from "../entities/state.entity";

export class ReturnStateDto{
    id: number;
    name: string;

    constructor(state: State){
        this.id = state.id;
        this.name = state.name;
    }
}