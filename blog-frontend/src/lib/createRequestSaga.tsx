import { ServerResponse } from 'http';
import { call, put } from 'redux-saga/effects';
import loading, { startLoading, finishLoading } from '../modules/loading';

export interface ResponseGenerator{
    config?:any,
    data?:any,
    headers?:any,
    request?:any,
    status?:number,
    statusText?:string
}

export const createRequsetActionTypes = (type: any) => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE]
}

export default function createRequestSaga(type: any, request: any) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action: any) {
        yield put(startLoading(type));

        try {
            const response: ResponseGenerator = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        } catch(e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        
        yield put(finishLoading(type));
    };
}