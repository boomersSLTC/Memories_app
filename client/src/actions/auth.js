import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => { //redux thunk becauses are actions are async
    try {
        //login in the user ...
        const {data} = await api.signin(formData);
        dispatch({
            type: 'AUTH',
            data
        });
        history('/');
    } catch (error) {
        console.log(error.message);
    }
}

export const signup = (formData, history) => async (dispatch) => { //redux thunk becauses are actions are async
    try {
        //sign up the user
        const {data} = await api.signup(formData);

        dispatch({
            type: 'AUTH',
            data
        });
        history('/');
    } catch (error) {
        console.log(error.message);
    }
}
    