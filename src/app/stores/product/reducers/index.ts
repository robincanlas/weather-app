import { handleActions } from 'redux-actions';
import { ProductActions } from './../actions';
import { Product } from 'app/models';
import { ProductState, initialState } from '../state';
import update from 'immutability-helper';

export const productReducer = handleActions<ProductState, Product.Model[]>(
	{
		[ProductActions.Type.GET_PRODUCT_REQUEST]: (state, action) => {
			return state;
		},
		[ProductActions.Type.GET_PRODUCT_SUCCESS]: (state, action) => {
			return update(state, {
				products: { $set: action.payload }
			});
		},
		[ProductActions.Type.GET_PRODUCT_FAILURE]: (state, action) => {
			return state;
		},
	},
	initialState
);
