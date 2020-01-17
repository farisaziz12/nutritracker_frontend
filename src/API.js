const BASE_URL = "http://localhost:3000";
const VALIDATE_URL = BASE_URL + "/validate"
const LOGIN_URL = BASE_URL + "/login";
const SIGNUP_URL = BASE_URL + "/users"

function loginUser(user) {
    
    return fetch(LOGIN_URL, createUserObj(user))
        .then(JSONresp)
        .then(handleUserResponse)
} 

function signUp(user) {
    fetch(SIGNUP_URL, createUserObj(user))
        .then(JSONresp)
        .then(handleUserResponse)
}

function handleUserResponse(user) {
    if (user.token) {
        localStorage.token = user.token;
    }
    return user;
}

function JSONresp(resp) {
    if (resp.ok) return resp.json();
    throw resp.json();
}

function createUserObj(user) {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({user})
    }
}

function validate() {
    return fetch(VALIDATE_URL, {
        method: "GET",
        headers: {
            Authorisation: localStorage.token,
        }
    }).then(JSONresp).then(handleUserResponse);
}

export default {loginUser,
    signUp,
    validate,
    hasToken: () => !!localStorage.token,
    clearToken: () => localStorage.removeItem("token")
};
