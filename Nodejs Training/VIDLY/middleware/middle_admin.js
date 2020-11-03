
module.exports	= function(req, res, next) {
	// 401 Unauthorized is used when no valid webtoken is provided
	// 403 Forbidden is used when a valid webtoken is provided but user is not allowed to access the resource
	
	// At this point the authentication process should have been done and req.user must be defined
	if (!req.user.isAdmin) return res.status(403).send('Acces denied.');
	
	// Pass the control to the next middleware function
	next(); 
}