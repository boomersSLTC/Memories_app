const authReducer = (state={ authData:null }, action) => {
    switch (action.type) {
        case 'AUTH':
            //we save it in the local storage to make sure the browser knows we are still logged in
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return { ...state, authData: action?.data};
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, authData: null};
        default:
            return state;
    }
}

export default authReducer;