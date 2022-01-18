const app = require('../../../app');

app.all('*', (req, res) => {
	res.status(404).send({ msg: 'Invalid URL' });
});

app.use((err, req, res, next) => {
	if (err.code === '22P02') {
		res.status(400).send({ msg: 'Bad request' });
	} else {
		next(err);
	}
});

app.use((err, req, res, next) => {
	res.status(500).send('Server error');
});
