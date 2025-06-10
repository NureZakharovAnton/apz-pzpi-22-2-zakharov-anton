import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <nav style={{ padding: 16, display: 'flex', gap: 16 }}>
        {/* <Link to="/admin">Admin Panel</Link> */}
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>Welcome! Use the navigation above.</div>} />
      </Routes>
    </Router>
  );
}

export default App;
