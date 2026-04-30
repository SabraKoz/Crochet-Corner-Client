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

export function commentProject(projectId, comment) {
    return fetch(`http://localhost:8000/projects/${projectId}/comment`, {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())
}

export function deleteComment(projectId) {
    return fetch(`http://localhost:8000/projects/${projectId}/comment`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    }).then(res => {
        if (res.status === 200) {
            return null
        }
        return res.text()
    })
}

export function likeProject(projectId) {
    return fetch(`http://localhost:8000/projects/${projectId}/like`, {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.status === 201) {
            return null
        }
        return res.text()
    })
}

export function unlikeProject(projectId) {
    return fetch(`http://localhost:8000/projects/${projectId}/like`, {
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

export function getLikedProjects() {
    return fetch(`http://localhost:8000/projects/liked`, {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
}
