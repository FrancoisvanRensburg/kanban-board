import axios from 'axios';

import { GET_PROJECT, GET_PROJECTS, ERROR, GET_COLUMNS } from './types';

export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/projects');

    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProject = (projectId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/projects/${projectId}`);

    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getColumns = (projectId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/projects/columns/${projectId}`);

    dispatch({
      type: GET_COLUMNS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
