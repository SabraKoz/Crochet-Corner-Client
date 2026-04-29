export function getAllProjects() {
    return fetch(`http://localhost:8000/projects`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export function getAllTypes() {
    return fetch(`http://localhost:8000/projecttypes`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export function getAllLevels() {
    return fetch(`http://localhost:8000/projectlevels`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export function getProjectById(id) {
    return fetch(`http://localhost:8000/projects/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}
