import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl.tsx';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.checkObjectId, postsCtrl.read);
posts.delete('/:id', postsCtrl.checkObjectId, postsCtrl.remove);
posts.patch('/:id', postsCtrl.checkObjectId, postsCtrl.update);

export default posts;



/* 리팩토링 

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);

const post = new Router(); // /api/posts/:id
posts.get('/:id', postsCtrl.read);
posts.delete('/:id', postsCtrl.remove);
posts.patch('/:id', postsCtrl.update);

posts.use('/:id', postsCtrl,checkObjectId, post.routes());

*/