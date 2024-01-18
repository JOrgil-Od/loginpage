
const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    localStorage.setItem('bb_access_token', tokenObj.access_token);
    localStorage.setItem('bb_refresh_token', tokenObj.refresh_token);
  }
  function _getAccessToken() {
    return localStorage.getItem('bb_access_token');
  }
  function _getRefreshToken() {
    return localStorage.getItem('bb_refresh_token');
  }
  function _clearToken() {
    localStorage.removeItem('bb_access_token');
    localStorage.removeItem('bb_refresh_token');
  }
  
  function _getSearchFields() {
    return localStorage.getItem('hrs_search_fields');
  }
  function _setSearchFields(searchFields) {
    localStorage.setItem('hrs_search_fields', searchFields);
  }
  function _setToday(date) {
    localStorage.setItem('today', date);
  }
  function _getToday() {
    return localStorage.getItem('today');
  }

  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    getToday: _getToday,
    setToday: _setToday,
    getSearchFields: _getSearchFields,
    setSearchFields: _setSearchFields,
  };
})();
export default LocalStorageService;
