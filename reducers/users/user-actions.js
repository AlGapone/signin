export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export function fetchUsers () {
  const url = 'https://jsonplaceholder.typicode.com/users';
  return {
    type: FETCH_USERS,
    payload: url
  }
}