import {Constants} from '../action/action';


var initialState_start = {
    user : localStorage.getItem('user'),
    admin : localStorage.getItem('admin')
}

export const startReducer = (state = initialState_start , action) => {
    switch(action.type)
    {
        case Constants.LOG_IN:
            return {
                ...state,
                user : action.user
            }
        case Constants.ADMIN_LOGIN:
            return {
                ...state,
                admin : action.admin
            }
        default: return state;
    }
}

var initialState_news = {
    isfetching : true,
    news : [],
}

export const NewsReducer = (state = initialState_news , action) => {
    switch(action.type)
    {
        case Constants.REQUEST_NEWS:
            return {
                ...state,
                isfetching : true
            }
        case Constants.RECEIVE_NEWS:
            return {
                ...state,
                isfetching : false,
                news : action.news,
            }
        default: return state;
    }
}

var initialState_sv = {
    isfetching : true,
    sv : []
}

export const DssvReducer = (state = initialState_sv , action) => {
    switch(action.type)
    {
        case Constants.REQUEST_SV:
            return {
                ...state,
                isfetching : true
            }
        case Constants.RECEIVE_SV:
            return {
                ...state,
                isfetching : false,
                sv : action.sv
            }
        default: return state
    }
}

var initialState_hp = {
    isfetching : true,
    hp : []
}
export const DshpReducer = (state = initialState_hp , action) => {
    switch(action.type)
    {
        case Constants.REQUEST_HP:
            return {
                ...state,
                isfetching : true
            }
        case Constants.RECEIVE_HP:
            return {
                ...state,
                isfetching : false,
                hp : action.hp
            }
        default: return state
    }
}

var initialState_hpdh = {
    isfetching : true,
    hpdh : []
}

export const HpdhReducer = (state = initialState_hpdh , action) => {
    switch(action.type)
    {
        case Constants.REQUEST_HPDH:
            return {
                ...state,
                isfetching : true
            }
        case Constants.RECEIVE_HPDH:
            return {
                ...state,
                isfetching : false,
                hpdh : action.hpdh
            }
        default: return state
    }
}

var initialState_dssvhp = {
    isfetching : true,
    dssvhp : {}
}

export const DssvhpReducer = (state = initialState_dssvhp , action) => {
    switch(action.type)
    {
        case Constants.REQUEST_DSSVHP:
            return {
                ...state,
                isfetching : true
            }
        case Constants.RECEIVE_DSSVHP:
            return {
                ...state,
                isfetching : false,
                dssvhp : action.dssvhp
            }
        default: return state
    }
}

