import * as Joi from '@hapi/joi';
import User from '../../models/user.tsx';

export const register = async ctx => {

    const schema = Joi.object().keys({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(20)
            .required(),
        password: Joi.string().required(),
    });

    const result = schema.validate(ctx.request.body);
    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { username, password } = ctx.request.body;
    try {
        const exists = await User.findByUsername(username);
        if(exists) {
            ctx.status = 409;
            return;
        }

        const user = new User({
            username,
        });
        // 비번 설정
        await user.setPassword(password);
        // DB 저장
        await user.save();

        // 응답할 데이터에서 hashedPassword 필드 제거
        // const data = user.toJSON();
        // delete data.hashedPassword;

        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true,
        });
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const login = async ctx => {
    const { username, password } = ctx.request.body;

    if(!username || !password) {
        ctx.status = 401;
        return;
    }

    try {
        const user = await User.findByUsername(username);
        if(!user) {
            ctx.status = 401;
            return;
        }

        const valid = await user.checkPassword(password);
        if(!valid) {
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true,
        });
        
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const check = async ctx => {
    const { user } = ctx.state;
    if(!user) {
        // 로그인 중 아님
        ctx.status = 401;
        return;
    }
    ctx.body = user;

};

export const logout = async ctx => {
    ctx.cookies.set('access_token');
    ctx.status = 204;
};