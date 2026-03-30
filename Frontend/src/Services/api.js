// src/services/api.js
const BASE = process.env.REACT_APP_API_URL || "/api";

const getToken = () => localStorage.getItem("royal_token");

const req = async (method, path, body, auth = false) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(auth && getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

export const authAPI = {
  login:       (email, pw)   => req("POST", "/auth/login", { email, password: pw }),
  me:          ()            => req("GET",  "/auth/me",    null, true),
  createStaff: (data)        => req("POST", "/auth/create-staff", data, true),
};

export const serviceAPI = {
  getAll:  (params = {}) => req("GET",  `/services?${new URLSearchParams(params)}`),
  getById: (id)          => req("GET",  `/services/${id}`),
  create:  (data)        => req("POST", "/services",    data, true),
  update:  (id, data)    => req("PUT",  `/services/${id}`, data, true),
  remove:  (id)          => req("DELETE",`/services/${id}`, null, true),
};

export const bookingAPI = {
  create:           (data)   => req("POST", "/bookings", data),
  getAll:           (params) => req("GET",  `/bookings?${new URLSearchParams(params)}`, null, true),
  getById:          (id)     => req("GET",  `/bookings/${id}`, null, true),
  updateStatus:     (id, status, reason) => req("PATCH", `/bookings/${id}/status`, { status, cancelReason: reason }, true),
  remove:           (id)     => req("DELETE", `/bookings/${id}`, null, true),
  getAvailableSlots:(date)   => req("GET",  `/bookings/available-slots?date=${date}`),
};

export const dashboardAPI = {
  getStats:         () => req("GET", "/dashboard/stats", null, true),
  getRecentBookings:() => req("GET", "/dashboard/recent-bookings", null, true),
};

export const contactAPI = {
  send: (data) => req("POST", "/contact", data),
};
