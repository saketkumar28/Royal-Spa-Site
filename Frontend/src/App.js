// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { globalCSS } from "./theme.js";
import { AuthProvider, useAuth } from "./Context/AuthContext.js";

// Pages
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ServicesPage from "./Pages/ServicesPage";
import GalleryPage from "./Pages/GalleryPage";
import JournalPage from "./Pages/JournalPage";
import ContactPage from "./Pages/ContactPage";
import BookingPage from "./Pages/BookingPage";
import AdminDashboard from "./Pages/AdminDashboard";
import NotFoundPage from "./Pages/NotFoundPage";
import BookingPopup from "./Components/BookingPopup.jsx";
import MembershipPage from "./Pages/MembershipPage.jsx";

// Inject global styles once
function GlobalStyles() {
  useEffect(() => {
    const id = "royal-global-css";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = globalCSS;
      document.head.appendChild(el);
    }
  }, []);
  return null;
}

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0A0A0A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: "2px solid #C9A84C",
            borderTop: "2px solid transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  return user ? children : <Navigate to="/admin/login" replace />;
}

// Scroll to top on route change
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <BrowserRouter>
        <BookingPopup />
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/memberships" element={<MembershipPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/booking" element={<BookingPage />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<AdminDashboard />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
