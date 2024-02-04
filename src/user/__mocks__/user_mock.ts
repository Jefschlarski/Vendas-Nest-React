import { User } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userMock: User = {
    cpf: "11422333951",
    createdAt: new Date(),
    email: 'jeferson@gmail.com',
    id: 1,
    name: 'nameMock',
    password: '$2b$10$MC0p9yDD0LZgM4C3aDGvne/FsStxbrvkeMwzYwnH3Xy2ebHOvHIGK',
    typeUser: UserType.User,
    phone: '49001230014',
    updatedAt: new Date()
}