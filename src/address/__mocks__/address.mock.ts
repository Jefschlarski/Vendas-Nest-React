import { userMock } from "../../user/__mocks__/user_mock";
import { Address } from "../entities/address.entity";
import { cityMock } from "../../city/__mocks__/city.mock";

export const addressMock: Address = {
    createdAt: new Date(),
    id: 1,
    updatedAt: new Date(),
    userId: userMock.id,
    cep: '1234512315',
    cityId: cityMock.id,
    numberAddress: 12,
    complement: 'mockComplement'

}