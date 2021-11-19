import api from 'app/lib/api';
import secrets from 'app/secrets';
import { ResourceFetch } from 'app/types/Api';
import { Product } from 'app/models';

// const baseUrl: string = `${secrets.server.host}:${secrets.server.port}${secrets.server.productUrl}`;
const baseUrl: string = `http://localhost:8001/${secrets.server.productUrl}`;

const { GET } = api;

export interface ProductResource {
	getProducts: ResourceFetch<Product.Model[]>;
}

export const ProductResource: ProductResource = {
	getProducts: GET(baseUrl, { authenticated: false })
};