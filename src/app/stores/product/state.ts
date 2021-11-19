import { Product } from 'app/models';

export const initialState: ProductState = {
	products: []
};

export type ProductState = {
	products: Product.Model[];
};
