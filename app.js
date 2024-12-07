const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ccfplatform', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// MongoDB Model for Projects
const Project = mongoose.model('Project', {
  name: String,
  description: String,
});

// Routes
app.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post('/submit-project', async (req, res) => {
  const { name, description } = req.body;
  const newProject = new Project({ name, description });
  await newProject.save();
  res.status(201).send("Project submitted successfully!");
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
