import { tokenKey } from "../config.js";
import apiFetch from "./api-fetch.js";

export async function createUser( 
  newUser = { username, email, first_name, last_name, password }
) {
  const { token, ...user } = await apiFetch("users", { body: newUser });
  sessionStorage.setItem(tokenKey, token);
  return user;
}

export async function getUser(id) {
  const { token, ...user } = await apiFetch(`users/${id}`);
  return user;
}

export async function updateUser( id,
  dataUser = { username, email, first_name, last_name }
) {
  return apiFetch(`users/${id}`, { body: dataUser, method: "PATCH"});
}

export async function deleteUser(id) {
  return apiFetch(`users/${id}`, { method: "DELETE" });
}