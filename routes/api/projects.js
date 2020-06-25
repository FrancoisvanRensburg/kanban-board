const express = require('express');
const router = express.Router();
const Project = require('../../models/Project');
const Column = require('../../models/Column');
const Task = require('../../models/Task');

// @route   POST /api/projects
// @desc    Create Project
// @access  Private
router.post('/', async (req, res) => {
  const { name } = req.body;

  const projectFields = {};
  if (name) projectFields.name = name;
  try {
    const project = new Project(projectFields);

    project.save();

    res.json(project);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
});

// @route   GET /api/projects
// @desc    GET all projects
// @access  Private
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().select('-columns');
    res.json(projects);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
});

// @route   GET /api/projects
// @desc    GET Project by id
// @access  Private
router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
    });
    // .populate({ path: 'columns', populate: { path: 'tasks' } });

    res.json(project);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
});

// @route   POST /api/projects/columns/:projectId
// @desc    Create Project columns
// @access  Private
router.post('/columns/:projectId', async (req, res) => {
  const { name } = req.body;

  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
    })
      .select('-name')
      .populate('columns', 'name');

    const columnFields = {};
    columnFields.project = req.params.projectId;
    if (name) columnFields.name = name;

    const column = new Column(columnFields);

    project.columns.push(column);

    await column.save();
    await project.save();

    res.json(project.columns);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
});

// @route   POST /api/projects/tasks/:columnId
// @desc    Create Project task
// @access  Private
router.post('/tasks/:columnId', async (req, res) => {
  const { name, content } = req.body;

  try {
    const column = await Column.findOne({
      _id: req.params.columnId,
    })
      .select('-name')
      .populate('tasks', 'content');

    const taskFields = {};
    taskFields.column = req.params.columnId;
    if (content) taskFields.content = content;

    const task = new Task(taskFields);

    column.tasks.push(task);

    await task.save();
    await column.save();

    res.json(column.tasks);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
});

// @route   GET /api/projects/columns/:projectId
// @desc    Get all columns for a project
// @access  Private
router.get('/columns/:projectId', async (req, res) => {
  try {
    const columns = await Column.find({
      project: req.params.projectId,
    }).populate('tasks', 'content');

    res.json(columns);
  } catch (error) {
    if (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
});

module.exports = router;
