import sendRequest from "./send-request";
const BASE_URL = "/api/liability";

export async function createLiability(liabilityFormData) {
  return await sendRequest(`${BASE_URL}`, "POST", liabilityFormData);
}

export async function getLiabilities() {
  return await sendRequest(`${BASE_URL}`, "GET");
}

export async function deleteLiability(liabilityId) {
  return await sendRequest(`${BASE_URL}/${liabilityId}`, "DELETE");
}

export async function updateLiability(liabilityId, liabilityFormData) {
  return await sendRequest(`${BASE_URL}/${liabilityId}`, "PUT", liabilityFormData);
}