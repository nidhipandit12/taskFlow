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
        setError(err.response?.data?.message || 'Unable to load dashboard');
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

  const cards = [
    { title: 'Total Projects', value: stats.totalProjects },
    { title: 'Total Tasks', value: stats.totalTasks },
    { title: 'To Do', value: stats.todo },
    { title: 'In Progress', value: stats.inProgress },
    { title: 'Completed', value: stats.done },
    { title: 'Overdue', value: stats.overdue }
  ];

  return (
    <div className="page-container">
      <h1>Dashboard</h1>
      <p>Track your projects and tasks.</p>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <div className="dashboard-card" key={card.title}>
            <h3>{card.title}</h3>
            <h2>{card.value ?? 0}</h2>
          </div>
        ))}
      </div>

      <Link to="/projects" className="primary-btn">
        Manage Projects
      </Link>
    </div>
  );
}

export default Dashboard;