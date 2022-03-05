import apiFetch from "./api-fetch.js";

export function createList(idBoard, newList = { nameList }) {
  return apiFetch(`boards/${idBoard}/lists`, { body: newList });
}

export function updateList(idBoard, idList, dataList = { nameList }) {
  return apiFetch(`boards/${idBoard}/lists/${idList}`, { 
    body: dataList,
    method: "PATCH"
  });
}

export function deleteList(idBoard, idList) {
  return apiFetch(`boards/${idBoard}/lists/${idList}`, { method: "DELETE" });
}

export function sortList(idBoard, data = { ids }) {
  return apiFetch(`boards/${idBoard}/lists/sort`, { body: data });
}