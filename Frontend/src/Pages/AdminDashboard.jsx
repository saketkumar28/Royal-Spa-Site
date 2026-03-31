import { useState, useEffect } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";
const BLACK = "#0A0A0A";
const SURFACE = "#111111";
const SURFACE2 = "#181818";
const SURFACE3 = "#222222";
const WHITE = "#F5F0E8";
const MUTED = "#888070";
const SUCCESS = "#4CAF7D";
const WARNING = "#E8A020";
const DANGER = "#E05050";
const INFO = "#4A90D9";

// ─── API CONFIG ──────────────────────────────────────────────────────────────
// This ensures we use the environment variable from Vercel/Local
const API_BASE = (
  process.env.REACT_APP_API_URL || "https://royal-spa-site.onrender.com/api"
).replace(/\/$/, "");

const getToken = () => localStorage.getItem("royal_token");

const apiFetch = async (method, path, body = null) => {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// ─── STYLES (UNCHANGED) ──────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@200;300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${BLACK}; color: ${WHITE}; font-family: 'Jost', sans-serif; font-weight: 300; }
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: ${GOLD}; opacity: 0.4; }
  input, select, textarea {
    background: ${SURFACE3}; border: 1px solid rgba(201,168,76,0.2);
    color: ${WHITE}; padding: 10px 14px; font-family: 'Jost', sans-serif;
    font-size: 13px; font-weight: 300; width: 100%; outline: none; border-radius: 2px;
    transition: border-color 0.2s;
  }
  input:focus, select:focus, textarea:focus { border-color: ${GOLD}; }
  input::placeholder { color: ${MUTED}; }
  select option { background: ${SURFACE2}; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  .row-hover:hover { background: rgba(201,168,76,0.04) !important; }
  .action-btn {
    background: none; border: 1px solid; padding: 5px 12px; font-size: 11px;
    font-family: 'Jost', sans-serif; letter-spacing: 1px; cursor: pointer;
    transition: all 0.2s; text-transform: uppercase; border-radius: 2px;
  }
`;

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function Loader() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", padding: "100px" }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          border: `2px solid ${GOLD}`,
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
    </div>
  );
}

function StatCard({ label, value, sub, color = GOLD, icon }) {
  return (
    <div
      style={{
        background: SURFACE2,
        border: `1px solid rgba(201,168,76,0.12)`,
        padding: "24px 20px",
        animation: "fadeIn 0.5s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: MUTED,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {label}
        </p>
        {icon && <span style={{ fontSize: 18, opacity: 0.6 }}>{icon}</span>}
      </div>
      <p
        style={{
          fontSize: 32,
          fontWeight: 300,
          color: color,
          fontFamily: "Cormorant Garamond, serif",
        }}
      >
        {value}
      </p>
      {sub && <p style={{ fontSize: 11, color: MUTED, marginTop: 6 }}>{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: { color: WARNING, bg: "rgba(232,160,32,0.12)" },
    confirmed: { color: INFO, bg: "rgba(74,144,217,0.12)" },
    completed: { color: SUCCESS, bg: "rgba(76,175,125,0.12)" },
    cancelled: { color: DANGER, bg: "rgba(224,80,80,0.12)" },
  };
  const s = map[status] || { color: MUTED, bg: "rgba(136,128,112,0.12)" };
  return (
    <span
      style={{
        fontSize: 10,
        letterSpacing: 1.5,
        textTransform: "uppercase",
        color: s.color,
        background: s.bg,
        padding: "4px 10px",
        borderRadius: 2,
      }}
    >
      {status}
    </span>
  );
}

function MiniBarChart({ data }) {
  if (!data || data.length === 0)
    return <p style={{ color: MUTED, fontSize: 12 }}>No recent activity</p>;
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        height: 80,
        padding: "0 4px",
      }}
    >
      {data.map((d, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ fontSize: 10, color: MUTED }}>{d.count}</span>
          <div
            style={{
              width: "100%",
              background: GOLD,
              opacity: 0.7 + (d.count / max) * 0.3,
              height: `${(d.count / max) * 56}px`,
              borderRadius: "2px 2px 0 0",
              transition: "height 0.4s ease",
            }}
          />
          <span style={{ fontSize: 9, color: MUTED }}>{d.date.slice(5)}</span>
        </div>
      ))}
    </div>
  );
}

// ─── DASHBOARD VIEW (REAL DATA) ──────────────────────────────────────────────
function DashboardView() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("GET", "/dashboard/stats")
      .then((data) => setStats(data.stats))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (!stats)
    return <p style={{ color: MUTED }}>Failed to load dashboard data.</p>;

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 32 }}>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 28,
            fontWeight: 300,
            color: WHITE,
          }}
        >
          Good morning, <span style={{ color: GOLD }}>Admin</span> ✦
        </h2>
        <p style={{ color: MUTED, fontSize: 13, marginTop: 4 }}>
          Here's what's happening at The Royal Salon & Spa today.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <StatCard
          label="Today"
          value={stats.todayBookings}
          sub="Appointments"
          icon="📅"
        />
        <StatCard
          label="Pending"
          value={stats.pendingBookings}
          sub="Confirmation needed"
          color={WARNING}
          icon="⏳"
        />
        <StatCard
          label="Monthly Growth"
          value={`${stats.growthRate}%`}
          sub="vs last month"
          color={SUCCESS}
          icon="📈"
        />
        <StatCard
          label="Total Revenue"
          value={`₹${stats.totalRevenue?.toLocaleString()}`}
          sub="Lifetime"
          color={GOLD_LIGHT}
          icon="💰"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div
          style={{
            background: SURFACE2,
            border: `1px solid rgba(201,168,76,0.1)`,
            padding: "24px 20px",
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: 2,
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Weekly Activity
          </p>
          <MiniBarChart data={stats.last7Days} />
        </div>
        <div
          style={{
            background: SURFACE2,
            border: `1px solid rgba(201,168,76,0.1)`,
            padding: "24px 20px",
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: 2,
              color: GOLD,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Top Services
          </p>
          {stats.topServices?.map((s, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 12, color: WHITE }}>{s.name}</span>
                <span style={{ fontSize: 12, color: MUTED }}>
                  {s.bookingCount}
                </span>
              </div>
              <div style={{ height: 3, background: SURFACE3, borderRadius: 2 }}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: 2,
                    background: GOLD,
                    width: `${(s.bookingCount / (stats.topServices[0].bookingCount || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BOOKINGS VIEW (REAL DATA) ───────────────────────────────────────────────
function BookingsView() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadBookings = () => {
    setLoading(true);
    apiFetch("GET", "/bookings")
      .then((data) => setBookings(data.bookings || data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await apiFetch("PATCH", `/bookings/${id}/status`, { status });
      loadBookings(); // Refresh list
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const filtered = bookings.filter((b) =>
    b.clientName.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <Loader />;

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <h2
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: 28,
            color: WHITE,
          }}
        >
          Live Bookings
        </h2>
        <input
          placeholder="Search client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
      </div>

      <div
        style={{
          border: `1px solid rgba(201,168,76,0.12)`,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: SURFACE2 }}>
            <tr>
              {["Client", "Service", "Date", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: 10,
                    color: GOLD,
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr
                key={b._id}
                className="row-hover"
                style={{
                  borderBottom: `1px solid rgba(201,168,76,0.06)`,
                  background: SURFACE,
                }}
              >
                <td style={{ padding: "14px 16px" }}>
                  <p style={{ color: WHITE }}>{b.clientName}</p>
                  <p style={{ color: MUTED, fontSize: 11 }}>{b.clientEmail}</p>
                </td>
                <td style={{ padding: "14px 16px", color: MUTED }}>
                  {b.service?.name}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <p>{new Date(b.bookingDate).toLocaleDateString()}</p>
                  <p style={{ color: MUTED, fontSize: 11 }}>{b.timeSlot}</p>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <StatusBadge status={b.status} />
                </td>
                <td style={{ padding: "14px 16px" }}>
                  {b.status === "pending" && (
                    <button
                      className="action-btn"
                      onClick={() => updateStatus(b._id, "confirmed")}
                      style={{ color: INFO }}
                    >
                      Confirm
                    </button>
                  )}
                  {b.status === "confirmed" && (
                    <button
                      className="action-btn"
                      onClick={() => updateStatus(b._id, "completed")}
                      style={{ color: SUCCESS }}
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── LOGIN SCREEN (REAL AUTH) ────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("admin@theroyalspa.in");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("POST", "/auth/login", { email, password });
      localStorage.setItem("royal_token", data.token);
      onLogin(data.user);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BLACK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 380,
          padding: 48,
          border: `1px solid rgba(201,168,76,0.2)`,
          background: SURFACE,
        }}
      >
        <h1
          style={{
            fontFamily: "Cormorant Garamond, serif",
            textAlign: "center",
            color: GOLD,
            marginBottom: 30,
          }}
        >
          The Royal Admin
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {error && <p style={{ fontSize: 12, color: DANGER }}>{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              background: GOLD,
              color: BLACK,
              padding: "13px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ADMIN APP ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      apiFetch("GET", "/auth/me")
        .then((data) => setUser(data.user))
        .catch(() => localStorage.removeItem("royal_token"))
        .finally(() => setInitialLoading(false));
    } else {
      setInitialLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("royal_token");
    setUser(null);
  };

  if (initialLoading)
    return (
      <div style={{ background: BLACK, height: "100vh" }}>
        <Loader />
      </div>
    );

  if (!user)
    return (
      <>
        <style>{css}</style>
        <LoginScreen onLogin={setUser} />
      </>
    );

  return (
    <>
      <style>{css}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: BLACK }}>
        <aside
          style={{
            width: 220,
            background: SURFACE,
            borderRight: `1px solid rgba(201,168,76,0.1)`,
            padding: "32px 16px",
            position: "fixed",
            height: "100vh",
          }}
        >
          <div style={{ marginBottom: 40 }}>
            <p style={{ color: GOLD, fontSize: 12, letterSpacing: 3 }}>
              THE ROYAL
            </p>
            <p style={{ fontSize: 11, color: MUTED }}>Admin Management</p>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["dashboard", "bookings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background:
                    activeTab === tab ? "rgba(201,168,76,0.1)" : "none",
                  border: "none",
                  color: activeTab === tab ? GOLD : MUTED,
                  textAlign: "left",
                  padding: "10px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  fontSize: 11,
                }}
              >
                {tab}
              </button>
            ))}
          </nav>
          <div
            style={{
              marginTop: "auto",
              position: "absolute",
              bottom: 30,
              width: "180px",
            }}
          >
            <p style={{ fontSize: 12, color: WHITE }}>{user.name}</p>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: `1px solid ${DANGER}`,
                color: DANGER,
                marginTop: 10,
                padding: "5px 10px",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          </div>
        </aside>

        <main style={{ marginLeft: 220, flex: 1, padding: "40px 48px" }}>
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "bookings" && <BookingsView />}
        </main>
      </div>
    </>
  );
}
