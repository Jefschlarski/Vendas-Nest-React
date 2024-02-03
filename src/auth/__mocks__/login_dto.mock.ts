import { userDtoMock } from "../../user/__mocks__/user_dto_mock";
import { LoginDto } from "../dto/login.dto";


export const loginDtoMock: LoginDto = {
    email: userDtoMock.email,
    password: '12234',
}