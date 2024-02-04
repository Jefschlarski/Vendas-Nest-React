import { Product } from "../entities/product.entity";
import { createProductDtoMock } from "./product.dto.mock";
export const productMock: Product  = {
    id: 1,
    name: createProductDtoMock.name,
    categoryId: createProductDtoMock.categoryId,
    price: createProductDtoMock.price,
    image: createProductDtoMock.image,
    createdAt: new Date(),
    updatedAt: new Date()
}  