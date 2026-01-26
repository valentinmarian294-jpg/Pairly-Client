const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005/api";

function getToken() {
  return localStorage.getItem("authToken");
}

function authFetch(url, options = {}) {
  const token = getToken();

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
}

export function signup(email, password, name) {
  return fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        throw new Error(data.message || "Signup failed");
      });
    }
    return res.json();
  });
}

export function login(email, password) {
  return fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  });
}

export function verifyToken() {
  return authFetch(`${API_URL}/auth/verify`).then((res) => {
    if (!res.ok) throw new Error("Token invalid");
    return res.json();
  });
}

export function getTasteItems() {
  return fetch(`${API_URL}/taste-items`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch taste items");
    return res.json();
  });
}

export function addUserTaste(tasteItemId) {
  return authFetch(`${API_URL}/user-tastes`, {
    method: "POST",
    body: JSON.stringify({ tasteItemId }),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to add user taste");
    return res.json();
  });
}

export function getUserTastes() {
  return authFetch(`${API_URL}/user-tastes`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch user tastes");
    return res.json();
  });
}

export function removeUserTaste(userTasteId) {
  return authFetch(`${API_URL}/user-tastes/${userTasteId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to delete user taste");
  });
}

export function getDiscoverUsers() {
  return authFetch(`${API_URL}/users/discover`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  });
}

export function getLikes() {
  return authFetch(`${API_URL}/likes`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch likes");
    return res.json();
  });
}

export function likeUser(userId) {
  return authFetch(`${API_URL}/likes/${userId}`, {
    method: "POST",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to like user");
    return res.json();
  });
}

export function getUserChats() {
  return authFetch(`${API_URL}/chats`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch chats");
    return res.json();
  });
}

export function getChatMessages(chatId) {
  return authFetch(`${API_URL}/chats/${chatId}/messages`).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch messages");
    return res.json();
  });
}

export function sendMessage(chatId, text) {
  return authFetch(`${API_URL}/chats/${chatId}/messages`, {
    method: "POST",
    body: JSON.stringify({ text }),
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
}