function UserService() {
    const key = 'User'
    function getUser() {
        return window.localStorage.getItem(key)
    }

    function setUser(user) {
        window.localStorage.setItem(key, token)
        tokenService.token = getUser()
    }

    function exists() {
        return getUser() !== null
    }

    function clearToken() {
        window.localStorage.setItem(key, null)
    }

    return { 
        getUser: getUser,
        setUser: setUser,
        exists: exists,
        clearToken: clearToken,
    }
}

angular.module('CA2')
       .factory('UserService', UserService)
