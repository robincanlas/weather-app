import api from 'app/lib/api';
import { ResourceFetch } from 'app/types/Api';
import { Product } from 'app/models';

const baseUrl: string = `http://localhost:8001/products`;

const { GET } = api;

export interface ProductResource {
  getProducts: ResourceFetch<Product.Model[]>;
}

export const ProductResource: ProductResource = {
  getProducts: GET(baseUrl, { authenticated: false })
};