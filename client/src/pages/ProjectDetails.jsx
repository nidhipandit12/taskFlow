import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/axios';

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const initialForm = {
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: ''
  };

  const [form, setForm] = useState(initialForm);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      const [projectRes, taskRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/projects/${id}/tasks`)
      ]);

      setProject(projectRes.data.project || projectRes.data);

      const taskData = Array.isArray(taskRes.data)
        ? taskRes.data
        : taskRes.data.tasks || [];

      setTasks(taskData);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load project');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createTask = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post(`/projects/${id}/tasks`, form);
      setForm(initialForm);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create task');
    }
  };

  const editTask = (task) => {
    setEditingTask(task._id);

    setForm({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : ''
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateTask = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.put(`/tasks/${editingTask}`, form);
      setEditingTask(null);
      setForm(initialForm);
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update task');
    }
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setForm(initialForm);
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update status');
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = !statusFilter || task.status === statusFilter;
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  if (loading) return <div className="page-container">Loading project...</div>;

  if (!project) {
    return (
      <div className="page-container">
        <p>{error || 'Project not found'}</p>
        <Link to="/projects">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/projects">← Back to Projects</Link>

      <h1>{project.title}</h1>
      <p>{project.description}</p>

      {error && <p className="error-message">{error}</p>}

      <form className="task-form" onSubmit={editingTask ? updateTask : createTask}>
        <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>

        <input
          name="title"
          placeholder="Task title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={form.description}
          onChange={handleChange}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
        />

        <button type="submit">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>

        {editingTask && (
          <button type="button" onClick={cancelEdit}>Cancel</button>
        )}
      </form>

      <div className="task-filters">
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <h2>Tasks ({filteredTasks.length})</h2>

      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filteredTasks.map(task => (
            <div className="task-card" key={task._id}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Priority: {task.priority}</p>
                <p>
                  Due: {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : 'Not set'}
                </p>
              </div>

              <select
                value={task.status}
                onChange={(e) => updateStatus(task._id, e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <button onClick={() => editTask(task)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;