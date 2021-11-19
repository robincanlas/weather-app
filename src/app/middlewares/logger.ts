import secrets from '../secrets';
import { Middleware } from 'redux';

export const logger: Middleware = (store) => (next) => (action) => {
	if (secrets.app.environment !== 'production') {
		console.log(action);
	}
	return next(action);
};
