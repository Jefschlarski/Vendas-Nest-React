import { UpdatePasswordDto } from "../dto/update.password";

export const userPasswordMock: UpdatePasswordDto = {
    oldPassword: 'password',
    newPassword: 'newPassword'
}

export const invalidPasswordMock: UpdatePasswordDto = {
    oldPassword: 'password2',
    newPassword: 'password'
}