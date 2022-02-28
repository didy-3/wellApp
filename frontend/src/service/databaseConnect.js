import {NotificationManager} from "react-notifications";

export const postData = (url, data) => {
    let res = fetch(url, {
        method: "POST",
        //mode: 'no-cors',
        headers: {
            "cookie": "JSESSIONID=C231EF11D57DEBA5A6CFA0A483497DA0",
            "Content-Type": "application/json"
        },
        body: data
    });
    return res
};

export function checkLogin(username, password, onSuccess) {
    let data = `{"username":"${username}","password":"${password}"}`;
    postData("/login", data)
        .then(res => {
            return res.json()

        })
        .then(res => {
            onSuccess(res)
        })
}

export function saveData(username, password, projectName, project, onSuccess) {
    let data = `{"dataName":"${projectName}","data":"${btoa(JSON.stringify(project))}","username":"${username}","password":"${password}"}`;
    postData("/saveData", data)
        .then(res => {
            return res.text()
        })
        .then(res => {
            onSuccess(res)
        })

}

export function getDataById(dataId, username, password, onSuccess) {
    let data = `{"dataId":"${dataId}", "username":"${username}","password":"${password}"}`;
    postData("/getDataById", data)
        .then(res => {
            return res.json()
        })
        .then(res => {
            onSuccess(res)
        })
}

export function changeData(dataId, newData, username, password) {
    let data = `{"dataId":"${dataId}","newData":"${btoa(JSON.stringify(newData))}","username":"${username}","password":"${password}"}`;
    postData("/changeData", data)
        .then(() => NotificationManager.success('Project saved', "", 2000))

}

export function createAccount(username, password, email, onSuccess) {
    let data = `{"username":"${username}","password":"${password}", "email":"${email}"}`;
    postData("/createAccount", data)
        .then(res => {
            return res.json()

        })
        .then(res => {
            onSuccess(res)
        })

}

export function deleteAccountById(id, username, password) {
    let data = `{"id":"${id}","username":"${username}","password":"${password}"}`;
    return postData("/deleteAccountById", data)
}

export function getAccount(username, password, onSuccess) {
    let data = `{"username":"${username}","password":"${password}"}`;
    postData("/getAccount", data)
        .then(res => {
            return res.json()

        })
        .then(res => {
            onSuccess(res)
        })
}

export function deleteDataById(dataId, username, password) {
    let data = `{"dataId":"${dataId}","username":"${username}","password":"${password}"}`;
    return postData("/deleteDataById", data)
}

export function editUsername(id, currentUsername, password, newUsername) {
    let data = `{"id":"${id}","currentUsername":"${currentUsername}","password":"${password}","newUsername":"${newUsername}"}`;
    return postData("/editUsername", data)
}

export function editPassword(id, username, currentPassword, newPassword) {
    let data = `{"id":"${id}","username":"${username}","currentPassword":${currentPassword},"newPassword":"${newPassword}"}`;
    return postData("/editPassword", data)
}

export function editEmail(id, email, username, password) {
    let data = `{"id":"${id}","email":"${email}","username":"${username}","password":"${password}"}`;
    return postData("/editEmail", data)
}


