import { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Chip, CircularProgress } from '@mui/material';

export default function JobsList() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/v1/jobs')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch jobs');
        return res.json();
      })
      .then(data => setJobs(data.map((job: any) => ({ ...job, id: job._id }))))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ color: 'red', textAlign: 'center', mt: 4 }}>{error}</Box>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Jobs</Typography>
      <Grid container spacing={3}>
        {jobs.map(job => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{job.name}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>{job.description}</Typography>
                <Typography variant="subtitle2" color="text.secondary">Price: ${job.price}</Typography>
                <Typography variant="subtitle2" color="text.secondary">Creator: {job.creator}</Typography>
                <Chip label={job.status} size="small" sx={{ mt: 1 }} color={job.status === 'completed' ? 'success' : 'primary'} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 