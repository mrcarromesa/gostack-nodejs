const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();
app.use(cors());
app.use(express.json());

const projects = [];

function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  
  next();
  // Executa após o next
  console.timeEnd(logLabel);
}

app.use(logRequests);

function validateProjectId(req, res, next) {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({error: 'Invalid project ID'});
  }

  return next();
}

app.use('/projects/:id', validateProjectId);

app.get('/projects', (req, res) => {

  const { title } = req.query;

  const result = title ? projects.filter((p) => p.title.includes(title)) : projects;

  return res.json(result);
});

app.post('/projects', (req, res) => {

  const { title, owner } = req.body;

  const project = { id: uuid(), title, owner };
  
  projects.push(project);
  return res.json(project);
});

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectId = projects.findIndex((p) => p.id === id);

  if (projectId >= 0) {
    const { title, owner } = req.body;
    const project = { id, title, owner };
    projects[projectId] = project;
    return res.json(project);
  }

  return res.status(400).json({msg: 'project not found'});
});

app.delete('/projects/:id', (req, res) => {
  
  const {id} = req.params;
  
  const projectId = projects.findIndex((p) => p.id === id);

  if (projectId >= 0) {
    projects.splice(projectId, 1);
    return res.status(204).send();
  }

  return res.status(400).json({msg: 'project not found'});
});

app.listen(3333, () => {
  console.log('🚀 back-end started');
});