import * as React from 'react';
import { HomePage } from 'app/pages';

export namespace App {
	export interface Props {

	}

	export interface State {

	}
}

export class App extends React.Component<App.Props, App.State> {
	constructor(props: App.Props, context?: any) {
		super(props, context);

		this.state = {};
	}

	public render() {
		return (
			<HomePage />
		);
	}
}
