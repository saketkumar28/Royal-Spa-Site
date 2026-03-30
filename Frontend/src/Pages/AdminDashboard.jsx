import { useState, useEffect, useCallback } from "react";

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

// Mock API — replace with real fetch calls to your backend
const API_BASE = "http://localhost:5000/api";
const mockToken = "mock_admin_token";

const mockStats = {
  totalBookings: 284,
  pendingBookings: 12,
  confirmedBookings: 38,
  completedBookings: 220,
  cancelledBookings: 14,
  todayBookings: 8,
  monthBookings: 46,
  lastMonthBookings: 38,
  growthRate: "21.1",
  totalRevenue: 892500,
  monthRevenue: 148000,
  totalServices: 6,
  topServices: [
    { name: "Bridal Package", bookingCount: 82, price: 18000, category: "Bridal" },
    { name: "Royal Signature Facial", bookingCount: 64, price: 4500, category: "Facial" },
    { name: "Hot Stone Therapy", bookingCount: 58, price: 3800, category: "Massage" },
    { name: "Aromatherapy Massage", bookingCount: 45, price: 3200, category: "Massage" },
    { name: "Gold Leaf Body Wrap", bookingCount: 35, price: 7500, category: "Body" },
  ],
  last7Days: [
    { date: "2026-03-23", count: 5 },
    { date: "2026-03-24", count: 9 },
    { date: "2026-03-25", count: 6 },
    { date: "2026-03-26", count: 11 },
    { date: "2026-03-27", count: 7 },
    { date: "2026-03-28", count: 13 },
    { date: "2026-03-29", count: 8 },
  ],
};

const mockBookings = [
  { _id: "b1", clientName: "Priya Sharma", clientEmail: "priya@gmail.com", clientPhone: "9876543210", service: { name: "Bridal Package", price: 18000 }, bookingDate: "2026-03-30", timeSlot: "10:00 AM", status: "confirmed", totalAmount: 18000, createdAt: "2026-03-28" },
  { _id: "b2", clientName: "Ananya Bose", clientEmail: "ananya@gmail.com", clientPhone: "9123456780", service: { name: "Gold Leaf Body Wrap", price: 7500 }, bookingDate: "2026-03-29", timeSlot: "2:00 PM", status: "pending", totalAmount: 7500, createdAt: "2026-03-27" },
  { _id: "b3", clientName: "Ritika Dey", clientEmail: "ritika@yahoo.com", clientPhone: "8765432190", service: { name: "Aromatherapy Massage", price: 3200 }, bookingDate: "2026-03-29", timeSlot: "4:00 PM", status: "completed", totalAmount: 3200, createdAt: "2026-03-26" },
  { _id: "b4", clientName: "Sneha Gupta", clientEmail: "sneha@gmail.com", clientPhone: "7654321890", service: { name: "Royal Signature Facial", price: 4500 }, bookingDate: "2026-04-01", timeSlot: "11:00 AM", status: "pending", totalAmount: 4500, createdAt: "2026-03-29" },
  { _id: "b5", clientName: "Meera Singh", clientEmail: "meera@gmail.com", clientPhone: "9988776655", service: { name: "Hair Spa Ritual", price: 2500 }, bookingDate: "2026-03-30", timeSlot: "3:00 PM", status: "cancelled", totalAmount: 2500, createdAt: "2026-03-25" },
  { _id: "b6", clientName: "Kavitha Nair", clientEmail: "kavi@gmail.com", clientPhone: "9001122334", service: { name: "Hot Stone Therapy", price: 3800 }, bookingDate: "2026-04-02", timeSlot: "1:00 PM", status: "confirmed", totalAmount: 3800, createdAt: "2026-03-29" },
];

const mockServices = [
  { _id: "s1", name: "Royal Signature Facial", category: "Facial", duration: 90, price: 4500, bookingCount: 64, isActive: true },
  { _id: "s2", name: "Hot Stone Therapy", category: "Massage", duration: 75, price: 3800, bookingCount: 58, isActive: true },
  { _id: "s3", name: "Aromatherapy Massage", category: "Massage", duration: 60, price: 3200, bookingCount: 45, isActive: true },
  { _id: "s4", name: "Bridal Package", category: "Bridal", duration: 240, price: 18000, bookingCount: 82, isActive: true },
  { _id: "s5", name: "Hair Spa Ritual", category: "Hair", duration: 45, price: 2500, bookingCount: 30, isActive: true },
  { _id: "s6", name: "Gold Leaf Body Wrap", category: "Body", duration: 120, price: 7500, bookingCount: 35, isActive: true },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────
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
  .row-hover:hover { background: rgba(201,168,76,0.04) !important; }
  .tab-btn { 
    background: none; border: none; color: ${MUTED}; padding: 10px 20px;
    font-family: 'Jost', sans-serif; font-size: 12px; letter-spacing: 2px;
    text-transform: uppercase; cursor: pointer; border-bottom: 2px solid transparent;
    transition: all 0.2s; font-weight: 400;
  }
  .tab-btn.active { color: ${GOLD}; border-bottom-color: ${GOLD}; }
  .tab-btn:hover { color: ${WHITE}; }
  .action-btn {
    background: none; border: 1px solid; padding: 5px 12px; font-size: 11px;
    font-family: 'Jost', sans-serif; letter-spacing: 1px; cursor: pointer;
    transition: all 0.2s; text-transform: uppercase; border-radius: 2px;
  }
`;

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color = GOLD, icon }) {
  return (
    <div style={{
      background: SURFACE2, border: `1px solid rgba(201,168,76,0.12)`,
      padding: "24px 20px", animation: "fadeIn 0.5s ease",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <p style={{ fontSize: 11, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>{label}</p>
        {icon && <span style={{ fontSize: 18, opacity: 0.6 }}>{icon}</span>}
      </div>
      <p style={{ fontSize: 32, fontWeight: 300, color: color, fontFamily: "Cormorant Garamond, serif" }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: MUTED, marginTop: 6 }}>{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending:   { color: WARNING, bg: "rgba(232,160,32,0.12)" },
    confirmed: { color: INFO,    bg: "rgba(74,144,217,0.12)" },
    completed: { color: SUCCESS, bg: "rgba(76,175,125,0.12)" },
    cancelled: { color: DANGER,  bg: "rgba(224,80,80,0.12)" },
  };
  const s = map[status] || { color: MUTED, bg: "rgba(136,128,112,0.12)" };
  return (
    <span style={{
      fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
      color: s.color, background: s.bg, padding: "4px 10px", borderRadius: 2,
    }}>{status}</span>
  );
}

function MiniBarChart({ data }) {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80, padding: "0 4px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 10, color: MUTED }}>{d.count}</span>
          <div style={{
            width: "100%", background: GOLD, opacity: 0.7 + (d.count / max) * 0.3,
            height: `${(d.count / max) * 56}px`, borderRadius: "2px 2px 0 0",
            transition: "height 0.4s ease",
          }} />
          <span style={{ fontSize: 9, color: MUTED }}>{d.date.slice(5)}</span>
        </div>
      ))}
    </div>
  );
}

// ─── VIEWS ───────────────────────────────────────────────────────────────────
function DashboardView({ stats }) {
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 300, color: WHITE }}>
          Good morning, <span style={{ color: GOLD }}>Admin</span> ✦
        </h2>
        <p style={{ color: MUTED, fontSize: 13, marginTop: 4 }}>Here's what's happening at The Royal Salon & Spa today.</p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard label="Today's Bookings" value={stats.todayBookings} sub="Active appointments" icon="📅" />
        <StatCard label="Pending" value={stats.pendingBookings} sub="Awaiting confirmation" color={WARNING} icon="⏳" />
        <StatCard label="This Month" value={stats.monthBookings} sub={`+${stats.growthRate}% vs last month`} color={SUCCESS} icon="📈" />
        <StatCard label="Month Revenue" value={`₹${stats.monthRevenue.toLocaleString()}`} sub="Completed payments" color={GOLD} icon="💰" />
        <StatCard label="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} sub="All time" color={GOLD_LIGHT} icon="✦" />
        <StatCard label="Services Active" value={stats.totalServices} sub="Live offerings" icon="💅" />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <div style={{ background: SURFACE2, border: `1px solid rgba(201,168,76,0.1)`, padding: "24px 20px" }}>
          <p style={{ fontSize: 11, letterSpacing: 2, color: GOLD, textTransform: "uppercase", marginBottom: 20 }}>Bookings — Last 7 Days</p>
          <MiniBarChart data={stats.last7Days} />
        </div>
        <div style={{ background: SURFACE2, border: `1px solid rgba(201,168,76,0.1)`, padding: "24px 20px" }}>
          <p style={{ fontSize: 11, letterSpacing: 2, color: GOLD, textTransform: "uppercase", marginBottom: 16 }}>Top Services</p>
          {stats.topServices.map((s, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: WHITE }}>{s.name}</span>
                <span style={{ fontSize: 12, color: MUTED }}>{s.bookingCount} bookings</span>
              </div>
              <div style={{ height: 3, background: SURFACE3, borderRadius: 2 }}>
                <div style={{
                  height: "100%", borderRadius: 2,
                  background: GOLD, opacity: 0.5 + (i === 0 ? 0.5 : (5 - i) * 0.1),
                  width: `${(s.bookingCount / stats.topServices[0].bookingCount) * 100}%`,
                  transition: "width 0.6s ease",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking status breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Pending", val: stats.pendingBookings, color: WARNING },
          { label: "Confirmed", val: stats.confirmedBookings, color: INFO },
          { label: "Completed", val: stats.completedBookings, color: SUCCESS },
          { label: "Cancelled", val: stats.cancelledBookings, color: DANGER },
        ].map((item, i) => (
          <div key={i} style={{ background: SURFACE2, border: `1px solid rgba(201,168,76,0.08)`, padding: "16px", textAlign: "center" }}>
            <p style={{ fontSize: 24, color: item.color, fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}>{item.val}</p>
            <p style={{ fontSize: 10, color: MUTED, letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingsView() {
  const [bookings, setBookings] = useState(mockBookings);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = bookings.filter(b => {
    const matchSearch = b.clientName.toLowerCase().includes(search.toLowerCase()) ||
      b.clientEmail.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id, status) => {
    setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
    // In production: bookingAPI.updateStatus(id, status)
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 300, color: WHITE }}>
          Bookings
        </h2>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <input
            placeholder="Search client..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 200 }}
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: 140 }}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div style={{ border: `1px solid rgba(201,168,76,0.12)`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid rgba(201,168,76,0.15)` }}>
              {["Client", "Service", "Date & Time", "Amount", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, letterSpacing: 2, color: GOLD, textTransform: "uppercase", fontWeight: 400, background: SURFACE2 }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, i) => (
              <tr key={b._id} className="row-hover" style={{ borderBottom: `1px solid rgba(201,168,76,0.06)`, background: i % 2 === 0 ? SURFACE : SURFACE2, transition: "background 0.2s" }}>
                <td style={{ padding: "14px 16px" }}>
                  <p style={{ color: WHITE, fontWeight: 400 }}>{b.clientName}</p>
                  <p style={{ color: MUTED, fontSize: 11, marginTop: 2 }}>{b.clientEmail}</p>
                </td>
                <td style={{ padding: "14px 16px", color: MUTED }}>{b.service.name}</td>
                <td style={{ padding: "14px 16px" }}>
                  <p style={{ color: WHITE }}>{new Date(b.bookingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                  <p style={{ color: MUTED, fontSize: 11 }}>{b.timeSlot}</p>
                </td>
                <td style={{ padding: "14px 16px", color: GOLD }}>₹{b.totalAmount?.toLocaleString()}</td>
                <td style={{ padding: "14px 16px" }}><StatusBadge status={b.status} /></td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {b.status === "pending" && (
                      <button className="action-btn" onClick={() => updateStatus(b._id, "confirmed")}
                        style={{ color: INFO, borderColor: INFO }}>Confirm</button>
                    )}
                    {b.status === "confirmed" && (
                      <button className="action-btn" onClick={() => updateStatus(b._id, "completed")}
                        style={{ color: SUCCESS, borderColor: SUCCESS }}>Complete</button>
                    )}
                    {!["cancelled","completed"].includes(b.status) && (
                      <button className="action-btn" onClick={() => updateStatus(b._id, "cancelled")}
                        style={{ color: DANGER, borderColor: DANGER }}>Cancel</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: "48px", textAlign: "center", color: MUTED }}>
            No bookings found matching your filters.
          </div>
        )}
      </div>
      <p style={{ color: MUTED, fontSize: 12, marginTop: 12 }}>Showing {filtered.length} of {bookings.length} bookings</p>
    </div>
  );
}

function ServicesView() {
  const [services, setServices] = useState(mockServices);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Facial", duration: 60, price: 0, description: "" });

  const handleAdd = () => {
    if (!form.name || !form.description) return;
    setServices(prev => [...prev, { ...form, _id: `s${Date.now()}`, bookingCount: 0, isActive: true }]);
    setForm({ name: "", category: "Facial", duration: 60, price: 0, description: "" });
    setShowForm(false);
  };

  const toggleActive = (id) => {
    setServices(prev => prev.map(s => s._id === id ? { ...s, isActive: !s.isActive } : s));
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 300, color: WHITE }}>Services</h2>
        <button className="action-btn" onClick={() => setShowForm(!showForm)}
          style={{ color: GOLD, borderColor: GOLD, padding: "8px 20px", fontSize: 12 }}>
          {showForm ? "Cancel" : "+ Add Service"}
        </button>
      </div>

      {showForm && (
        <div style={{ background: SURFACE2, border: `1px solid rgba(201,168,76,0.2)`, padding: 24, marginBottom: 24, animation: "fadeIn 0.3s ease" }}>
          <p style={{ fontSize: 12, letterSpacing: 2, color: GOLD, textTransform: "uppercase", marginBottom: 16 }}>New Service</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <input placeholder="Service Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {["Facial","Massage","Hair","Body","Bridal","Other"].map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="number" placeholder="Duration (mins)" value={form.duration} onChange={e => setForm({ ...form, duration: Number(e.target.value) })} />
            <input type="number" placeholder="Price (₹)" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
          <textarea placeholder="Description *" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ marginBottom: 12 }} />
          <button className="action-btn" onClick={handleAdd} style={{ color: GOLD, borderColor: GOLD, padding: "8px 24px" }}>Save Service</button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {services.map(s => (
          <div key={s._id} style={{
            background: SURFACE2, border: `1px solid rgba(201,168,76,${s.isActive ? "0.12" : "0.04"})`,
            padding: 20, opacity: s.isActive ? 1 : 0.55, transition: "opacity 0.3s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <span style={{ fontSize: 10, letterSpacing: 2, color: GOLD, textTransform: "uppercase" }}>{s.category}</span>
                <h3 style={{ fontSize: 16, color: WHITE, marginTop: 4, fontWeight: 400 }}>{s.name}</h3>
              </div>
              <button className="action-btn" onClick={() => toggleActive(s._id)}
                style={{ color: s.isActive ? DANGER : SUCCESS, borderColor: s.isActive ? DANGER : SUCCESS, fontSize: 10 }}>
                {s.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
            <div style={{ display: "flex", gap: 20, marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: MUTED }}>{s.duration} min</span>
              <span style={{ fontSize: 14, color: GOLD, fontWeight: 400 }}>₹{s.price.toLocaleString()}</span>
            </div>
            <p style={{ fontSize: 11, color: MUTED }}>{s.bookingCount} bookings total</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("admin@theroyalspa.in");
  const [password, setPassword] = useState("Admin@Royal2026");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    // Mock auth — replace with: authAPI.login(email, password)
    setTimeout(() => {
      if (email === "admin@theroyalspa.in" && password === "Admin@Royal2026") {
        localStorage.setItem("royal_spa_token", mockToken);
        onLogin({ name: "Admin", email, role: "admin" });
      } else {
        setError("Invalid credentials. Try admin@theroyalspa.in / Admin@Royal2026");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{
      minHeight: "100vh", background: BLACK, display: "flex", alignItems: "center", justifyContent: "center",
      background: `radial-gradient(ellipse at center, rgba(139,105,20,0.1) 0%, ${BLACK} 70%)`,
    }}>
      <div style={{ width: 380, padding: 48, border: `1px solid rgba(201,168,76,0.2)`, background: SURFACE, animation: "fadeIn 0.6s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontSize: 10, letterSpacing: 6, color: GOLD, textTransform: "uppercase", marginBottom: 6 }}>Admin Panel</p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 30, fontWeight: 300, color: WHITE }}>The Royal</h1>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 300, color: MUTED }}>Salon & Spa</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()} />
          {error && <p style={{ fontSize: 12, color: DANGER }}>{error}</p>}
          <button onClick={handleLogin} disabled={loading} style={{
            background: GOLD, border: "none", color: BLACK, padding: "13px",
            fontFamily: "Jost, sans-serif", fontSize: 11, letterSpacing: 3,
            textTransform: "uppercase", cursor: "pointer", fontWeight: 500,
            opacity: loading ? 0.7 : 1, marginTop: 8,
          }}>
            {loading ? "Signing in..." : "Sign In"}
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
  const [stats] = useState(mockStats);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => { localStorage.removeItem("royal_spa_token"); setUser(null); };

  if (!user) return (
    <>
      <style>{css}</style>
      <LoginScreen onLogin={handleLogin} />
    </>
  );

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "bookings",  label: "Bookings" },
    { id: "services",  label: "Services" },
  ];

  return (
    <>
      <style>{css}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: BLACK }}>
        {/* Sidebar */}
        <aside style={{
          width: 220, background: SURFACE, borderRight: `1px solid rgba(201,168,76,0.1)`,
          display: "flex", flexDirection: "column", padding: "32px 0",
          position: "fixed", top: 0, left: 0, bottom: 0,
        }}>
          <div style={{ padding: "0 24px 32px", borderBottom: `1px solid rgba(201,168,76,0.1)` }}>
            <p style={{ fontSize: 9, letterSpacing: 5, color: GOLD, textTransform: "uppercase", marginBottom: 4 }}>The Royal</p>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, color: WHITE, fontWeight: 300 }}>Admin Panel</p>
          </div>

          <nav style={{ flex: 1, padding: "24px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                background: activeTab === t.id ? `rgba(201,168,76,0.1)` : "none",
                border: activeTab === t.id ? `1px solid rgba(201,168,76,0.2)` : "1px solid transparent",
                color: activeTab === t.id ? GOLD : MUTED,
                padding: "10px 16px", textAlign: "left",
                fontFamily: "Jost, sans-serif", fontSize: 12, letterSpacing: 2,
                textTransform: "uppercase", cursor: "pointer", borderRadius: 2, transition: "all 0.2s",
              }}>
                {t.label}
              </button>
            ))}
          </nav>

          <div style={{ padding: "24px 16px", borderTop: `1px solid rgba(201,168,76,0.1)` }}>
            <p style={{ fontSize: 12, color: WHITE, marginBottom: 2 }}>{user.name}</p>
            <p style={{ fontSize: 11, color: MUTED, marginBottom: 12 }}>{user.role}</p>
            <button onClick={handleLogout} style={{
              background: "none", border: `1px solid rgba(201,168,76,0.2)`,
              color: MUTED, padding: "8px 16px", width: "100%",
              fontFamily: "Jost, sans-serif", fontSize: 11, letterSpacing: 1.5,
              textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseOver={e => { e.target.style.borderColor = DANGER; e.target.style.color = DANGER; }}
              onMouseOut={e => { e.target.style.borderColor = "rgba(201,168,76,0.2)"; e.target.style.color = MUTED; }}
            >
              Log Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ marginLeft: 220, flex: 1, padding: "40px 48px", maxWidth: "calc(100vw - 220px)" }}>
          {activeTab === "dashboard" && <DashboardView stats={stats} />}
          {activeTab === "bookings"  && <BookingsView />}
          {activeTab === "services"  && <ServicesView />}
        </main>
      </div>
    </>
  );
}
