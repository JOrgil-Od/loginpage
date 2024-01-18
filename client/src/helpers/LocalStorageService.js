const LocalStorageService = (function () {
  function _setToken(token) {
    localStorage.setItem("token", token);
  }
  function _getToken() {
    return localStorage.getItem("token");
  }
  function _clearToken() {
    localStorage.removeItem("token");
  }

  return {
    setToken: _setToken,
    getToken: _getToken,
    clearToken: _clearToken,
  };
})();
export default LocalStorageService;
