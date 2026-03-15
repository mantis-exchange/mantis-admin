import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Withdrawals from './pages/Withdrawals';
import TradingPairs from './pages/TradingPairs';

const navStyle = {
  display: 'flex',
  gap: '16px',
  padding: '12px 24px',
  backgroundColor: '#1e2329',
  borderBottom: '1px solid #2b3139',
};

const linkStyle = { color: '#848e9c', textDecoration: 'none', fontWeight: 600 as const };
const activeStyle = { color: '#f0b90b' };

function App() {
  return (
    <BrowserRouter>
      <nav style={navStyle}>
        <span style={{ color: '#f0b90b', fontWeight: 700, marginRight: 24 }}>MANTIS ADMIN</span>
        <NavLink to="/" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeStyle : {}) })} end>Dashboard</NavLink>
        <NavLink to="/users" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeStyle : {}) })}>Users</NavLink>
        <NavLink to="/withdrawals" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeStyle : {}) })}>Withdrawals</NavLink>
        <NavLink to="/pairs" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeStyle : {}) })}>Trading Pairs</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/withdrawals" element={<Withdrawals />} />
        <Route path="/pairs" element={<TradingPairs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
