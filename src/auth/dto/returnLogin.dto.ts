import { ReturnUserDto } from "../../user/dto/return.user.dto";

export interface ReturnLoginDto{
    user: ReturnUserDto;
    accessToken: string;
}