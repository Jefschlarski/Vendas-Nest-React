import { stateMock } from "../../state/__mocks__/state.mock";
import { City } from "../entities/city.entity";

export const cityMock: City = {
    createdAt: new Date(),
    id: 421314,
    name: 'StateName',
    updatedAt: new Date(),
    stateId: stateMock.id,
}