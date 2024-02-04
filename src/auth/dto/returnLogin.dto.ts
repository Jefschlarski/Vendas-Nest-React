<<<<<<< HEAD
import { ReturnUserDto } from "../../user/dto/return.user.dto";
=======
import { ReturnUserDto } from "../../user/dto/returnUser.dto";
>>>>>>> develop

export interface ReturnLoginDto{
    user: ReturnUserDto;
    accessToken: string;
}