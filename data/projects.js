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

export function addProject(project) {
    return fetch(`http://localhost:8000/projects`, {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    }).then(res => res.json())
}

export function editProject(id, project) {
    return fetch(`http://localhost:8000/projects/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    }).then(res => {
        if (res.status === 204) {
            return null
        }
        return res.text()
    })
}

export function deleteProject(id) {
    return fetch(`http://localhost:8000/projects/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => {
        if (res.status === 204) {
            return null
        }
        return res.text()
    })
}


