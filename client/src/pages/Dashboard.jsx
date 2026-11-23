import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        setStats(res.data.stats || res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Unable to load dashboard'
        );
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return <div className="page-container error-message">{error}</div>;
  }

  if (!stats) {
    return <div className="page-container">Loading dashboard...</div>;
  }

  return (
    <div className="page-container">
      <h1>Dashboard</h1>
      <p>Here's an overview of your TaskFlow workspace.</p>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Projects</h3>
          <h2>{stats.totalProjects ?? 0}</h2>
        </div>

        <div className="stat-card">
          <h3>Total Tasks</h3>
          <h2>{stats.totalTasks ?? 0}</h2>
        </div>

        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <h2>{stats.completedTasks ?? 0}</h2>
        </div>

        <div className="stat-card">
          <h3>Overdue Tasks</h3>
          <h2>{stats.overdueTasks ?? 0}</h2>
        </div>

      </div>

      <div className="dashboard-action">
        <h2>Manage Your Work</h2>
        <p>Create projects and organize your tasks.</p>

        <Link to="/projects" className="primary-link">
          View My Projects
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;