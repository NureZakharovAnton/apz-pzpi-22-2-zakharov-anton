import { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Paper, CircularProgress } from '@mui/material';

export default function ProfileSettings() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setLoading(true);
    setError(null);
    fetch('/api/v1/users/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => setProfile(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    const token = localStorage.getItem('accessToken');
    try {
      const res = await fetch(`/api/v1/users/${profile.sub || profile.id || profile._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          password: profile.password,
        }),
      });
      if (!res.ok) throw new Error('Failed to save profile');
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;
  if (!profile) return null;

  return (
    <Paper sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>Profile Settings</Typography>
      <Box component="form" onSubmit={handleSave}>
        <TextField
          label="Name"
          name="name"
          value={profile.name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={profile.email || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={profile.password || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {success && <Alert severity="success" sx={{ my: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </Paper>
  );
} 