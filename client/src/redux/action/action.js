import fetch from 'isomorphic-fetch';

export const Constants = {
    LOG_IN : "LOG_IN",
    ADMIN_LOGIN : "ADMIN_LOGIN",
    REGISTER : "REGISTER",
    REQUEST_NEWS : "REQUEST_NEWS",
    RECEIVE_NEWS : "RECEIVE_NEWS",
    REQUEST_SV : "REQUEST_SV",
    RECEIVE_SV : "RECEIVE_SV",
    REQUEST_ESV : "REQUEST_ESV",
    RECEIVE_ESV : "RECEIVE_ESV",
    REQUEST_HP : "REQUEST_HP",
    RECEIVE_HP : "RECEIVE_HP",
    REQUEST_HPDH : "REQUEST_HPDH",
    RECEIVE_HPDH : "RECEIVE_HPDH",
    REQUEST_DSSVHP : "REQUEST_DSSVHP",
    RECEIVE_DSSVHP : "RECEIVE_DSSVHP"
};

//common

export const requestHp = () => ({
    type : Constants.REQUEST_HP
})

export const receiveHp = json => ({
    type : Constants.RECEIVE_HP,
    hp : json
})

export const requestNews = () => ({
    type : Constants.REQUEST_NEWS
});

export const receiveNews = json => ({
    type : Constants.RECEIVE_NEWS,
    news : json
});

export const requestSv = () => ({
    type : Constants.REQUEST_SV
})

export const receiveSv = json => ({
    type : Constants.RECEIVE_SV,
    sv : json
})

export function fetchNews(){
    return dispatch => {
        dispatch(requestNews())
        return fetch(`/logged/news`, {
        method : 'GET',
        mode : 'cors'
        })
        .then(res => res.json())
        .then(dt => dispatch(receiveNews(dt)))
        .catch(err => console.log(err))
    }
}

export function fetchDssv(){
    return dispatch => {
        dispatch(requestSv())
        return fetch('/logged/dssv' , {
            method : 'GET',
            mode : 'cors'
        })
        .then(res => res.json())
        .then(dt => dispatch(receiveSv(dt)))
        .catch(err => console.log(err))
    }
}

//user

export const login = user => ({
    type : Constants.LOG_IN,
    user
});

export const regist = user => ({
    type : Constants.REGISTER,
    user,
});

export const requestHpdh = () => ({
    type : Constants.REQUEST_HPDH
})

export const receiveHpdh = json => ({
    type : Constants.RECEIVE_HPDH,
    hpdh : json
})

export function submitRegister(data , history){
    return dispatch => {
        return fetch('/regist' , {
            method : 'POST', 
            headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        },
    body : JSON.stringify(data),
    mode : 'cors'})
    .then(res => res.json())
    .then(dt => {
        if(dt.success === 1)
        {
        alert('Đăng kí thành công , di chuyển đến đăng nhập')
        history.push('/login')
        }
        else 
        alert('Đã tồn tại tài khoản này , hãy đăng kí thông tin tài khoản khác')
    })
    .catch(err => console.log(err));
    }
}

export function submitLogin(data , history){
    return dispatch => {
        return fetch('/login' , {
            method : 'POST', 
            headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        },
    body : JSON.stringify(data),
    mode : 'cors'})
    .then(res => res.json())
    .then(dt => {
        if(dt.success)
            return dt;
        else 
        {
            alert('sai mật khẩu hoặc tài khoản , nhập lại')
            throw Error;
        }
    })
    .then(async function(dt){
        await localStorage.setItem('user' , dt.user)
        return localStorage.getItem('user')
    })
    .then(dt => {
        dispatch(login(dt));
        return dt;})
    .then(dt => history.push(`/logged/sv`))
    .catch(err => console.log(err));
    }
}

export function dkSv(data){
    return dispatch => {
        return fetch('/logged/sv/dk' , {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data),
            mode : 'cors'})
            .then(res => res.json())
            .then(dt => {
                if(dt.success === -1)
                    alert('đăng kí thông tin thất bại , tài khoản này đã đăng kí thông tin')
                if(dt.success === 0)
                    alert('đăng kí thông tin thất bại , có thể bạn nhập không đúng 1 số thông tin quan trọng')
                if(dt.success === 1)
                    alert('đăng kí thông tin thành công')
            })
            .catch(err => console.log(err))
    }
}

export function cnSv(data){
    return dispatch => {
        return fetch('/logged/sv/cn' , {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data),
            mode : 'cors'})
            .then(res => res.json())
            .then(dt => {
                if(dt.success)
                    alert('cập nhật thành công')
                else
                    alert('cập nhật thất bại , có thể bạn nhập sai một số thông tin')
            })
            .catch(err => console.log(err))
    }
}

export function fetchHp(){
    return dispatch => {
        dispatch(requestHp())
        return fetch('/logged/hp' , {
            method : 'GET',
            mode : 'cors'
        })
        .then(res => res.json())
        .then(dt => dispatch(receiveHp(dt)))
        .catch(err => console.log(err))
    }
}

export function DKhp(data){
    return dispatch => {
        return fetch('/logged/hp/dk' , {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(data),
            mode : 'cors'})
            .then(res => res.json())
            .then(dt => {
                if(dt.success === -1)
                    alert('đăng kí thất bại , không tồn tại học phần này')
                if(dt.success === 0)
                    alert('đăng kí thất bại , bạn đã đăng kí học phần này')
                if(dt.success === 1)
                    alert('đăng kí thành công')
            })
            .catch(err => console.log(err))
        }
}

export function fetchHpdh(sv){
    return dispatch => {
        dispatch(requestHpdh())
        return fetch(`/logged/hp/ds/${sv}` , {
            method : 'GET',
            mode : 'cors'
        })
        .then(res => res.json())
        .then(dt => dispatch(receiveHpdh(dt)))
        .catch(err => console.log(err))
    }
}


//admin

export const adminlogin = admin => ({
    type : Constants.ADMIN_LOGIN,
    admin
});

export const requestDssvhp = () => ({
    type : Constants.REQUEST_DSSVHP
})

export const receiveDssvhp = json => ({
    type : Constants.RECEIVE_DSSVHP,
    dssvhp : json
})

export function addNews(data){
    return dispatch => {
        return fetch('/logged/admin/addNews' , {
            method : 'POST', 
            headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        },
    body : JSON.stringify(data),
    mode : 'cors'})
    .then(res => res.json())
    .then(dt => {
        if(dt.success)
        {
            alert('Thêm tin tức thành công')
            dispatch(fetchNews())
        }
        else
            alert('Thêm tin tức thất bại')
    })
    .catch(err => console.log(err))
    }
}

export function Cndiem(data){
    return dispatch => {
        return fetch('/logged/admin/sv' , {
            method : 'POST', 
            headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        },
    body : JSON.stringify(data),
    mode : 'cors'})
    .then(res => res.json())
    .then(dt => {
        if(dt.success)
            alert('Cập nhật thành công')
        else
            alert('Cập nhật thất bại , một số thông tin bạn nhập không đúng , mời bạn nhập lại')
    })
    .catch(err => console.log(err))
    }
}

export function deleteSV(sv){
    return dispatch => {
        return fetch(`/logged/admin/dssv/${sv}` , {
            method : 'GET',
            mode : 'cors'
        })
        .then(res => res.json())
        .then(dt => {
            dispatch(fetchDssv())
            if(dt.success)
                alert('Xóa thành công');
            else
                alert('Xóa thất bại');
        })
        .catch(err => console.log(err))
    }
}

export function createHp(data){
    return dispatch => {
        return fetch('/logged/admin/hp/taohp' , {
            method : 'POST', 
            headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
        },
    body : JSON.stringify(data),
    mode : 'cors'})
    .then(res => res.json())
    .then(dt => {
        if(dt.success)
        {
            alert('Tạo thành công')
            dispatch(fetchHp())
        }
        else
            alert('Tạo thất bại , mã học phần trùng nhau')
    })
    .catch(err => console.log(err))
    }
}

export function fetchDssvHp(mahp){
    return dispatch => {
        dispatch(requestDssvhp())
        return fetch(`/logged/admin/hp/${mahp}` , {
            method : 'GET',
            mode : 'cors'})
            .then(res => res.json())
            .then(dt => dispatch(receiveDssvhp(dt)))
            .catch(err => console.log(err))
    }
}


export function deleteNews(news){
    return dispatch => {
        return fetch(`/logged/admin/${news}` , {
            method : 'GET',
            mode : 'cors'
        })
        .then(res => res.json())
        .then(dt => {
            if(dt.success){
                alert('Xóa thành công');
                dispatch(fetchNews())
            }
            else
                alert('Xóa thất bại');
        })
        .catch(err => console.log(err))
    }
}


export function deleteHpAdmin(hp){
    return dispatch => {
        return fetch(`/logged/admin/delete/${hp}` , {
            method : 'GET',
            mode : 'cors'
        })
        .then(res => res.json())
        .then(dt => {
            if(dt.success){
                alert('Xóa thành công');
                dispatch(fetchHp())
            }
            else
                alert('Xóa thất bại');
        })
        .catch(err => console.log(err))
    }
}