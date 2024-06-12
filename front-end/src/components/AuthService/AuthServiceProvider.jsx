const login = (userData) => {

    localStorage.setItem('user',JSON.stringify(userData));
}

const logout = () => {
    localStorage.removeItem('user')
}

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export default {
    login,
    logout,
    getUser
  };