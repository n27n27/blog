import mongoose from 'mongoose';
import Post from '../../models/post.tsx';

const { ObjectId } = mongoose.Types;

export const checkOwnPost = (ctx, next) => {
    const { user, post } = ctx.state;
    if(post.user._id.toString() !== user._id) {
        ctx.status = 403;
        return;
    }
    return next();
};

export const getPostById = async (ctx, next) => {
    const { id } = ctx.params;
    if(!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }
    try {
        const post = await Post.findById(id);
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.state.post = post;
        return next();
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const write = async ctx => {
    const { title, body, tags } = ctx.request.body;
    const post = new Post({
        title,
        body,
        tags,
        user: ctx.state.user,
    });
    try {
        await post.save();
        ctx.body = post;
    } catch(e) {
        ctx.thorw(500, e)
    }
};

export const list = async ctx => {
    // query는 문자열이기 때뭄ㄴ에 숫자로 변환해 주어야 합니다.
    // 값이 주어지지 않았다면 1을 기본으로 사용합니다. 

    const page = parseInt(ctx.query.page || '1', 10);
    if(page < 1) {
        ctx.status = 400;
        return;
    }
    
    const { tag, username } = ctx.query;
    // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
    const query = {
        ...(username ? { 'user.username': username } : {}),
        ...(tag ? { tags: tag }: {})
    }

    try {
        const posts = await Post.find(query)
        .sort({ _id: -1})
        .limit(10)
        .skip((page - 1) * 10)
        .lean()
        .exec();

        const postCount = await Post.countDocuments(query).exec();
        ctx.set('Last-Page', Math.ceil(postCount / 10));
        ctx.body = posts            
            .map(post => ({
                ...post,
                body:
                    post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
            }));
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const read = ctx => {
    ctx.body = ctx.state.post;
};

export const remove = async ctx => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const update = async ctx => {
    const { id } = ctx.params;
    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true,
        }).exec();
        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;        
    } catch(e) {
        ctx.throw(500, e);
    }

};