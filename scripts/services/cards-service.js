import apiFetch from "./api-fetch.js";

export function createCard(idList, newCard = { nameCard }) {
  return apiFetch(`lists/${idList}/cards`, { body: newCard });
}

export function deleteCard(idList, idCard) {
  return apiFetch(`lists/${idList}/cards/${idCard}`, { method: "DELETE" });
}

export function sortCard(idList, data = { ids }) {
  return apiFetch(`lists/${idList}/cards/sort`, { body: data });
}