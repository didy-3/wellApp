// eslint-disable-next-line import/no-anonymous-default-export
export default {
    project: "none",
    dataId: ""
}
//local storage
export let account = {
    username: "anonymous",
    password: "",
    email: "",
    userId: null,
    createdOn: null,
    dataIds: [],
    loggedIn: false,
}
if (localStorage.getItem("username") === null) {
    for (let [key, value] of Object.entries(account)) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export function checkFields(obj, map) {
    map.forEach((value, key)=>{
        if (obj[key] === undefined){
            obj[key]=value
        }
    })
}

