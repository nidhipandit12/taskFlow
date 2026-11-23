import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 const fetchProjects = async () => {
  try {
    const res = await api.get('/projects');

    const projectData = Array.isArray(res.data)
      ? res.data
      : res.data.projects || [];

    setProjects(projectData);
    setError('');
  } catch (err) {
    setError(err.response?.data?.message || 'Unable to load projects');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/projects', { title, description });
      setTitle('');
      setDescription('');
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create project');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete project');
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="page-container">
      <h1>My Projects</h1>
      <p>Manage all your projects in one place.</p>

      {error && <p className="error-message">{error}</p>}

      <form className="project-form" onSubmit={handleSubmit}>
        <h2>Create New Project</h2>

        <input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />

        <button type="submit">Create Project</button>
      </form>

      <div className="projects-grid">
        {projects.length === 0 ? (
          <p>No projects yet. Create your first project!</p>
        ) : (
          projects.map(project => (
            <div className="project-card" key={project._id}>
              <h3>{project.title}</h3>

              <p>
                {project.description || 'No description provided.'}
              </p>

              <div className="project-actions">
                <Link
                  to={`/projects/${project._id}`}
                  className="primary-link"
                >
                  View Tasks
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Projects;