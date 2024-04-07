import { ReturnProductDto } from "../dto/return.product.dto"

export const returnProductDtoMock: ReturnProductDto = {
    name: 'Product 1',
    id: 1,
    price: 10,
    image: 'image.png',
    category: {
        id: 1,
        name: 'Category 1',
        categoryColor: '#FFFFFF'
    }
}