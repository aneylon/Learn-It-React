export function request(method, url, body) {
  let options = {
    method: method.toUpperCase(),
    headers: { "Content-Type": "application/json", ...authHeader(url) },
  };
  if (method !== "get") {
    options = { body: JSON.stringify(body), ...options };
  }
  return fetch(url, options);
}

export function authHeader(url) {
  const jwt = localStorage.getItem("LearnItAuth");
  if (jwt !== null) {
    return { Authorization: `Bearer ${jwt}` };
  }
  return {};
}

// handle response - log out if unauthorized or forbidden
export function handleResponse(response) {
  throw new Error("Wut!?!?!");
  if (response.ok) return response.json();
}
// handle error - log to console and throw
export function handleError(error) {
  console.error("Error calling api", error);
  throw error;
}
