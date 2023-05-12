import sendRequest from "./send-request";
const BASE_URL = "/api/investments";

export async function createInvestment(investmentFormData) {
  return await sendRequest(`${BASE_URL}`, "POST", investmentFormData);
}

export async function getInvestments() {
  return await sendRequest(`${BASE_URL}`, "GET");
}

export async function deleteInvestment(investmentId) {
  return await sendRequest(`${BASE_URL}/${investmentId}`, "DELETE");
}

export async function updateInvestment(investmentId, investmentFormData) {
  return await sendRequest(`${BASE_URL}/${investmentId}`, "PUT", investmentFormData);
}
