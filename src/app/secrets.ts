export default {
	app: {
		environment: typeof process.env.NODE_ENV !== undefined
			? process.env.NODE_ENV
			: 'production',
		logLevel: process.env.APP_LOG_LEVEL,
		port: process.env.APP_PORT || 8001
	},
	server: {
		host: process.env.SERVER_HOST,
		port: process.env.SERVER_PORT,
		productUrl: 'products'
	}
};
