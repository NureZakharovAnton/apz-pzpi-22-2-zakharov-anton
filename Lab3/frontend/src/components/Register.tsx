import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem, Link } from '@mui/material';

const roles = [
  { value: 'customer', label: 'Customer' },
  { value: 'freelancer', label: 'Freelancer' },
  { value: 'admin', label: 'Admin' },
];

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      if (!res.ok) throw new Error('Registration failed');
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 3, boxSizing: 'border-box' }}>
        <Typography variant="h5" align="center" gutterBottom fontWeight={600} color="primary.main">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
            autoFocus
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              label="Role"
              onChange={e => setRole(e.target.value)}
            >
              {roles.map(r => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
            </Select>
          </FormControl>
          {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2, borderRadius: 2 }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" underline="hover">
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 