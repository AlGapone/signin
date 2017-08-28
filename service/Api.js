import axios from "axios";
import { browserHistory } from 'react-router';
const ROOT_URL = 'http://localhost:3090';

export default class Api {
  static fetch (url) {
    return axios.get(url)
    .then(response => {
      return response.data
    })
    .catch(err => {
      let error = err;
      error.message = "User fetch failed!";
      throw error;
    });
  }

  static signIn(email, password) {
    return axios.post(`${ROOT_URL}/signin`, { email, password })
    .then(response => {
      return response.data.token;
    })
    .catch(error => {
      throw new Error(error)
    });
  }
  static setItem (itemName, item) {
    return localStorage.setItem(itemName,item);
  }
  static removeItem (itemName) {
    return localStorage.removeItem(itemName);
  }
  static redirectTo (url) {
    browserHistory.push(url);
  }
}
