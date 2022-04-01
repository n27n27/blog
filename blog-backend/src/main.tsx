require('dotenv').config();
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import mongoose from 'mongoose';
import api from './api/index.tsx';


// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI, {})
    .then(() => {
        console.log('Connected to MongoDB');
        
    })
    .catch(e => {
        console.error(e);
    });

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes());

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4030;
app.listen(4030, () => {
    console.log('Listening to port 4030');
});