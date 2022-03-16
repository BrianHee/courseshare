import express from 'express';
import mongoose from 'mongoose';
// import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

const LocalStrategy = require('passport-local').Strategy;

import logging from './config/logging';
import config from './config/config';
import authRoutes from './routes/user';
import courseRoutes from './routes/course';

const app = express();

// Connect to Mongo
mongoose
	.connect(config.mongo.url, config.mongo.options)
	.then(() => {
		logging.info('Mongo connected.');
	})
	.catch((error) => {
		logging.error(error);
	});

// Logging Middleware
app.use((req, res, next) => {
	logging.info(
		`METHOD: '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}'`
	);

	res.on('finish', () => {
		logging.info(
			`METHOD: '${req.method}' - URL: '${req.url}' - IP: '${req.socket.remoteAddress}' - STATUS: '${res.statusCode}'`
		);
	});

	next();
});

// BodyParser & Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// Passport
// app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// API Access
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	if (req.method == 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}

	next();
});

// Routes
// app.get('/', (req, res) => res.send('hello world'));
app.use('/auth', authRoutes); // designates all auth routes eg) /auth/signup
app.use('/courses', courseRoutes);

// Error Handling
app.use((req, res, next) => {
	const error = new Error('not found');

	return res.status(404).json({
		message: error.message
	});
});

// Listen for Requests
app.listen(config.server.port, () =>
	console.log(`app listening on port ${config.server.port}`)
);
