export const setLogin = () => {
  return {
    type: "SET_LOGIN",
    isLogin: true,
  };
};

export const setLogout = () => {
  return {
    type: "SET_LOGOUT",
    isLogin: false,
  };
};
