import { User } from "src/user/entities/user.entity";

export class LoginPayload{
    id: string;
    name: string;
    email: string;
    typeUser: number;

    constructor(user: User){
        this.id = user.id.toString();
        this.name = user.name;
        this.email = user.email;
        this.typeUser = user.typeUser
    }
}