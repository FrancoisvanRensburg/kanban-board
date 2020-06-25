import {
  CREATE_TASK,
  ADD_LIST,
  GET_PROJECT,
  ERROR,
  GET_PROJECTS,
  GET_COLUMNS,
} from '../actions/types';

const initialState = {
  projects: [],
  project: null,
  columns: [],
  column: null,
  tasks: [],
  task: null,
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECT:
      return {
        ...state,
        project: payload,
        loading: false,
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false,
      };
    case GET_COLUMNS:
      return {
        ...state,
        columns: payload,
        loading: false,
      };
    default:
      return state;
  }
}
