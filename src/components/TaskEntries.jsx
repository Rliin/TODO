import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "../styles/taskEntries.css";

export default function TaskEntries(props) {
  const TodoItem = ({ task, index }) => {
    return (
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <article
              className="taskCard"
              key={task.id}
              {...(task.taskColorSelection
                ? {
                    style: {
                      borderStyle: "solid",
                      borderColor: task.taskColorSelection,
                      borderWidth: 4,
                    },
                  }
                : null)}
            >
              <div className="card-header">
                <h3 className="index">{index + 1}</h3>
                <h3 className="card-title">{task.taskTitle}</h3>
              </div>

              {task.taskDescription && (
                <div className="card-content">
                  <p>{task.taskDescription}</p>
                </div>
              )}

              <div className="card-footer">
                <div>
                  <p>{task.taskTeamSelection}</p>
                  <p className="deadline">{task.taskDateTime}</p>
                </div>
                <div>
                  <button className="btn-edit" onClick={() => handleEdit(task)}>
                    ✏️
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(task)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}
      </Draggable>
    );
  };

  const TodoColumn = ({ title, columnId, items }) => {
    return (
      <div className={`todo-column ${columnId}`}>
        <h2 className="column-title">{title}</h2>
        <Droppable droppableId={columnId}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <TodoItem key={item.id} task={item} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // No destination or dropped in the same place
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    // Create a proper deep clone of the task data structure
    const newTodoData = JSON.parse(JSON.stringify(props.task));

    // Remove from source
    const sourceItems = newTodoData[source.droppableId];
    const [removedItem] = sourceItems.splice(source.index, 1);

    // Add to destination
    const destinationItems = newTodoData[destination.droppableId];
    destinationItems.splice(destination.index, 0, removedItem);

    // Update state immediately without console logs
    props.handleDragEndFunction(newTodoData);
  };

  const getFilteredTasks = () => {
    return props.task.filter((item) => {
      const matchesCategory =
        props.category === "All" || item.taskTeamSelection === props.category;

      // Create a case-insensitive regex pattern from the search term
      const searchRegex = new RegExp(props.search, "i");
      const matchesSearch =
        props.search === "" ||
        searchRegex.test(item.taskTitle) ||
        searchRegex.test(item.taskDescription);

      return matchesCategory && matchesSearch;
    });
  };

  function handleEdit(taskToEdit) {
    props.handleEdit(taskToEdit);
  }

  function handleDelete(taskToDelete) {
    props.handleDelete(taskToDelete);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="entry-container">
        <TodoColumn title="New" columnId="new" items={props.task.new} />
        <TodoColumn
          title="On-Going"
          columnId="ongoing"
          items={props.task.ongoing}
        />
        <TodoColumn
          title="Completed"
          columnId="completed"
          items={props.task.completed}
        />
      </div>
    </DragDropContext>
  );
}

{
  /* {task.filter((item => {
    return search.toLowerCase() === '' ? item : item.taskTitle.toLowerCase().includes(search);
  })).map((tasks, i) => (
    <article key={i}>
    
      <div className="left-section">
        <h3 className="index">{i + 1}</h3>
        <h3>{tasks.taskTitle}</h3>
        <p>{tasks.taskDescription}</p>
      </div>

      <div className="right-section">
        <p>{tasks.taskTeamSelection}</p>
        <p>{tasks.taskDateTime}</p>
        <button className="btn-delete" onClick={() => deleteEntry(i)}>Delete</button>
      </div>
    </article>
  ))} */
}
