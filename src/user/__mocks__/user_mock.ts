import { User } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userMock: User = {
    cpf: "11422333951",
    createdAt: new Date(),
    email: 'email@email.com.br',
    id: 999,
    name: 'nameMock',
    password: 'largepassword',
    typeUser: UserType.User,
    phone: '49001230014',
    updatedAt: new Date()
}