import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';
import cors from 'cors';
import fetch from 'node-fetch';

import config from './config';
import authRoute from './routes/auth';
import postRoute from './routes/post';
import movieRouter from './routes/film';
import errorHandler from './middlewares/errorHandler';
import markdownConvert from './middlewares/markdownConvert';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConf from '../../webpack.config';

const isProd = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'travisci';
const app = express();

mongoose.Promise = bluebird;
mongoose.connect(config.database, { useMongoClient: true })
  .then(() => console.log('Mongo connected!'))
  .catch(err => { throw err });

app.listen(config.port, err => {
  if (err) throw err;
  console.log(`Server listening on port ${config.port}!`);
});
app.use(cors());
if (!isProd) {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret,
}));

if (isProd) {
  app.use(express.static('__build__'));
} else {
  const compiler = webpack(webpackConf);
  app.use(webpackMiddleware(compiler, {
    publicPath: webpackConf.output.publicPath,
    hot: true,
    historyApiFallback: true,
    contentBase: webpackConf.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}
app.use(express.static('public'));
app.use('/api', authRoute);
app.use('/api', postRoute, markdownConvert);
app.use('/api', movieRouter);
app.use('*', async (req, res) => {
  const indexPage = await fetch(req.protocol + '://' + req.get('host'))
    .then(async (response) => response.text())
    .catch(async (e) => console.error(e));
  return res.send(indexPage);
});

app.use(errorHandler);

