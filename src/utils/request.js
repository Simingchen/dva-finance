import fetch from 'dva/fetch';
import { getToken } from './auth'


function parseJSON(response) {
  console.log(response)
  return response.json();
}

function checkStatus(response) {
  console.log(response.status)
  if (response.status >= 200 && response.status < 300) {

  }
  return response;
  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

const baseUrl = 'http://47.107.46.219:8083/'

function request(options = {}) {
  const config = {
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    mode: 'no-cors',
  }
  config.headers['cache-control'] = 'no-cache'
  config.headers['Pragma'] = 'no-cache'
  config.headers['token'] = getToken() // 让每个请求携带自定义token

  options = { ...options, ...config}
  return fetch(baseUrl + options.url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}



export default request
