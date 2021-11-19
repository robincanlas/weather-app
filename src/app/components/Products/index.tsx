import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from 'app/stores';
import { omit } from 'app/utils';
import { ProductState } from 'app/stores/product/state';
import { ProductActions } from 'app/stores/product/actions';

export namespace Products {
	export interface Props {
		productState: ProductState;
		actions: ProductActions;
	}

	export interface State {
	}
}

@connect(
	(state: RootState, ownProps): Pick<Products.Props, 'productState'> => {
		return {
			productState: state.product,
		};
	},
	(dispatch: Dispatch): Pick<Products.Props, 'actions'> => ({
		actions: bindActionCreators(omit(ProductActions, 'Type'), dispatch),
	})
)

export class Products extends React.Component<Products.Props, Products.State> { 
	public static defaultProps: Partial<Products.Props> = { };

	constructor(props: Products.Props, context?: any) {
		super(props, context);
		this.state = {

		};
	}

	public componentDidMount() {
		this.props.actions.getProducts();
	}

	public componentDidUpdate() {
		console.log(this.props.productState.products, 'testtttttttt');
	}

	public render() {
		return (
			<main>
				{/* {this.props.productState.products.map((element, index) => (
					<span key={index}>{element.name} ${element.price}</span>
				))} */}
			</main>
		);
	}
};
