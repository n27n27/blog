import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestSaga, { createRequsetActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequsetActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequsetActionTypes('auth/LOGIN');

export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }: any) => ({
            form,       // register, login
            key,        // username, password, passwordConfirm
            value,      // 실제 바꾸려는 값
    }),
);

export const initializeForm = createAction(INITIALIZE_FORM, (form: any) => form); // register /login  

export const register = createAction(REGISTER, ({ username, password }: any) => ({
    username,
    password,
}));

export const login = createAction(LOGIN, ({ username, password }: any) => ({
    username,
    password,
}));

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}

const initialState: any = {
    register: {
        username: '',
        password: '',
        passwordConfirm: '',
    },
    login: {
        username: '',
        password: '',
    },
    auth: null,
    authError: null,
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }: any) => 
            produce(state, (draft: any) => {
                draft[form][key] = value;
                // draft[form][key] = value;       //예: state.register.username을 바꾼다.
            }),
        [INITIALIZE_FORM]: (state, { payload: form }: any) => ({
            ...state,
            [form]: initialState[form],
            // 폼 전환 시 회원 인증 에러 초기화
            authError: null,
        }),
        // 회원가입 성공
        [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        // 회원가입 실패
        [REGISTER_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
        // 로그인 성공
        [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
            ...state,
            authError: null,
            auth,
        }),
        // 로그인 실패
        [LOGIN_FAILURE]: (state, { payload: error }) => ({
            ...state,
            authError: error,
        }),
    },
    initialState
    
);

export default auth;