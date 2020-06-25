import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid/v4';

import { getColumns } from '../../../redux/actions/projectActions';

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Columns = ({ cols }) => {
  const defaultValue = cols;
  const [columns, setColumns] = useState(defaultValue);
  console.log('useState', columns);
  console.log('props', cols);
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      {Object.entries(cols).map(([_id, column], index) => {
        return (
          <div>
            <h2 style={{ textAlign: 'center' }}>{column.name}</h2>
            <div style={{ margin: '0 8px' }}>
              <Droppable droppableId={_id} key={_id}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      provided={provided.innerRef}
                      style={{
                        backgroundColor: snapshot.isDraggingOver
                          ? 'lightblue'
                          : 'lightgrey',
                        padding: 4,
                        width: 250,
                        minHeight: 500,
                      }}
                    >
                      {column.tasks.map((task, index) => {
                        return (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    userSelect: 'none',
                                    padding: 16,
                                    margin: '0 0 8px 0',
                                    minHeight: '50px',
                                    backgroundColor: snapshot.isDragging
                                      ? '#263B4A'
                                      : '#456C86',
                                    color: 'white',
                                    ...provided.draggableProps.style,
                                  }}
                                >
                                  {task.content}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </div>
        );
      })}
    </DragDropContext>
  );
};

export default Columns;

{
  /* <DragDropContext onDragEnd={(result) => console.log(result)}>
  {Object.entries(columns).map(([columnId, column], index) => {
    return (
      <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => {
          return (
            <div
              {...provided.droppableProps}
              provided={provided.innerRef}
              style={{
                backgroundColor: snapshot.isDraggingOver
                  ? 'lightblue'
                  : 'lightgrey',
                padding: 4,
                width: 250,
                minHeight: 500,
              }}
            ></div>
          );
        }}
      </Droppable>
    );
  })}
</DragDropContext>; */
}
