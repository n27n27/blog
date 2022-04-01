import Router from 'koa-router';
import posts from './posts/index.tsx';

const api = new Router();

api.use('/posts', posts.routes());

// 라우터를 내보냅니다.
export default api;