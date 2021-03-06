const BASE_URL = "https://nutri-tracking.herokuapp.com/";
const VALIDATE_URL = BASE_URL + "/validate"
const LOGIN_URL = BASE_URL + "/login";
const SIGNUP_URL = BASE_URL + "/users";
const MEAL_PLAN_URL = BASE_URL + "/meal_plans/";
const MEAL_URL = BASE_URL + "/meals/";
const EDIT_URL = BASE_URL + "/users/update"

function loginUser(user) {
    
    return fetch(LOGIN_URL, createUserObj(user))
        .then(JSONresp)
        .then(handleUserResponse)
} 

function postMeal(meal) {
    return fetch(MEAL_URL, createObj({ meal }))
        .then(JSONresp)
}

function deleteMeal(id) {
    return fetch(MEAL_URL + id, {
        method: "DELETE"
    }).then(JSONresp)
}

function deleteMealPlan(id) {
    return fetch(MEAL_PLAN_URL + id, {
        method: "DELETE"
    }).then(JSONresp)
}

function editUser(obj){
    return fetch(EDIT_URL, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorisation": localStorage.token
            },
            body: JSON.stringify(obj)
    })
}


function signUp(user) {
    return fetch(SIGNUP_URL, createUserObj(user))
        .then(JSONresp)
        .then(handleUserResponse)
}

function newMealPlan(meal_plan) {
    return fetch(MEAL_PLAN_URL, createObj({ meal_plan }))
        .then(JSONresp)
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

function createObj(obj) {

    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorisation": localStorage.token
        },
        body: JSON.stringify(obj)
    }
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
    clearToken: () => localStorage.removeItem("token"),
    newMealPlan,
    postMeal,
    deleteMealPlan,
    editUser,
    deleteMeal
};
