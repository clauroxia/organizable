import apiFetch from "./api-fetch.js";

export function getBoards() {
  return apiFetch("boards");
}

export function getBoard(id) {
  return apiFetch(`boards/${id}`);
}

export function createBoard(newBoard = { nameBoard, color }) {
  return apiFetch("boards", { body: newBoard });
}

export function destroyBoard(id) {
  return apiFetch(`boards/${id}`, { method: "DELETE" });
}

