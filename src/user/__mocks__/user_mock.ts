import { User } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userMock: User = {
    cpf: "11422333951",
    createdAt: new Date(),
    email: 'jeferson@gmail.com',
    id: 1,
    name: 'nameMock',
    password: '$2b$10$ZYKjdAHIHo9TpPYzDc9qv.x7bRofot9L5k4DRzAxwXDvhj8WLd49m',
    typeUser: UserType.User,
    phone: '49001230014',
    updatedAt: new Date()
}