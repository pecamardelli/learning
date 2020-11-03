const	express	= require('express');
const	router	= express.Router();

router.get('/', (req, res) => {
	//res.send('Express demo<br>First endpoint definition. And now I changed this.');
	res.render('index', { title: 'My Express App', message: 'Hello'});
});

module.exports	= router;