export function login(user) {
    return fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

export function register(user) {
    return fetch(`http://localhost:8000/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
}

export function getUserProfile() {
    return fetch(`http://localhost:8000/profile`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    }).then(res => res.json())
}