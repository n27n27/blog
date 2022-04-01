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
    } catch(e) {
        ctx.throw(500, e);
    }
};

export const login = async ctx => {

};

export const check = async ctx => {

};

export const logout = async ctx => {

};