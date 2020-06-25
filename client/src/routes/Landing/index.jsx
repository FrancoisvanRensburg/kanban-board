import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProjects } from '../../redux/actions/projectActions';

const Projects = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  const projects = useSelector((store) => store.project.projects);

  return (
    <div>
      <h1>Projects list</h1>
      <ul>
        {projects === null ? (
          <p>Loading...</p>
        ) : (
          projects.map((project) => (
            <li key={project._id}>
              <Link to={`/project/${project._id}`}>{project.name}</Link>{' '}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Projects;
