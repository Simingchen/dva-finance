import fetch from 'dva/fetch';
import { getToken } from './auth'
import qs from 'qs'


function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

function request(options = {}) {
  const config = {
    headers: {
      'content-type': 'application/json'
    },
  }
  config.headers['cache-control'] = 'no-cache'
  config.headers['Pragma'] = 'no-cache'
  config.headers['token'] = getToken() // 让每个请求携带自定义token

  options = { ...options, ...config}
  console.log(options)
  return fetch(options.url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}



export default request
