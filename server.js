/* eslint-disable no-unused-expressions */
/* eslint-disable import/order */
/* eslint-disable no-use-before-define */
require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
// const variables = require('./bin/configuration/variables');
// ROTAS
const userRouter = require('./modules/user/routes/user-router');

const app = express();
const server = require('http').Server(app);

// eslint-disable-next-line no-unused-vars

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin); // || '*');
	res.header(
		'Access-Control-Allow-Methods',
		'GET,POST,PUT,HEAD,DELETE,OPTIONS',
	);
	res.header(
		'Access-Control-Allow-Headers',
		'content-Type,x-requested-with,Authorization',
	);
	next();
});
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', userRouter);

const port = process.env.PORT || 3333;

server.listen(port, () => {
	console.info(`Servidor rodando na porta ${port}`);
});
