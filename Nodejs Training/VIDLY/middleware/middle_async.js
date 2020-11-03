
module.exports	= function (handler) {
	return async (req, res, next) => {
		try {
		//throw new Exeption;
		await handler(req, res);
		}
		catch (ex) {
			next(ex);
		}
	};
}