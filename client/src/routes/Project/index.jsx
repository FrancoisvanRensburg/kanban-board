import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { getProject, getColumns } from '../../redux/actions/projectActions';
import Columns from './Columns';

const Project = ({ match }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProject(match.params.projectId));
  }, [dispatch, match.params.projectId]);
  const project = useSelector((store) => store.project.project);
  useEffect(() => {
    dispatch(getColumns(match.params.projectId));
  }, [dispatch, match.params.projectId]);
  const columns = useSelector((store) => store.project.columns);
  return (
    <Fragment>
      {project === null ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{ display: 'flex', justifyContent: 'center', height: '100%' }}
        >
          <Columns project={project} cols={columns} />
          {/* <DragDropContext onDragEnd={(result) => console.log(result)}>
          
          </DragDropContext> */}
        </div>
      )}
    </Fragment>
  );
};

export default Project;
