const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiGET(path) {
  const response = await fetch(`${BASE_URL}${path}`,{
    method: "GET",
    });
    console.log(response);
    
  if (!response.ok) throw new Error(`GET ${path} failed: ${response.status}`);
  return await response.json();
}

export async function apiPOST(path, body = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`POST ${path} failed: ${response.status}`);
  return await response.json();
}

export async function apiDEL(path) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error(`DELETE ${path} failed: ${response.status}`);
  return await response.json();
}

export async function apiPUT(path, body = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`PUT ${path} failed: ${response.status}`);
  return await response.json();
}
