import { Cart } from "../entities/cart.entity";

export const cartMock : Cart = {
    id: 1,
    userId: 1,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    getTotalPrice: function (): number {
        return 0
    }
}
