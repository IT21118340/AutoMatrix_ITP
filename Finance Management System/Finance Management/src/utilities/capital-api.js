import sendRequest from "./send-request";
const BASE_URL = "/api/capital";

export async function createCapital(capitalFormData) {
  return await sendRequest(`${BASE_URL}`, "POST",capitalFormData);
}

export async function getCapital() {
  return await sendRequest(`${BASE_URL}`, "GET");
}

export async function deleteCapital(capitalId) {
  return await sendRequest(`${BASE_URL}/${capitalId}`, "DELETE");
}

export async function updateCapital(capitalId, capitalFormData) {
  return await sendRequest(`${BASE_URL}/${capitalId}`, "PUT", capitalFormData);}