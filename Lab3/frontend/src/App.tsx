import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <nav style={{ padding: 16 }}>
        <Link to="/admin">Admin Panel</Link>
      </nav>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<div>Welcome! Use the navigation above.</div>} />
      </Routes>
    </Router>
  );
}

export default App;
