
import { productMock } from '../../product/__mocks__/product.mock';
import { FavoriteProduct } from '../entities/favorite-product.entity';

export const favoriteProductMock : FavoriteProduct = {
    id: 1,
    userId: 1,
    productId: productMock.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    product: productMock
  }
