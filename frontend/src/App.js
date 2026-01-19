import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axios from 'axios';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const App = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    doing: [],
    done: []
  });
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      const tasksByStatus = {
        todo: [],
        doing: [],
        done: []
      };

      response.data.forEach(task => {
        tasksByStatus[task.status].push(task);
      });

      setTasks(tasksByStatus);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      await axios.post(`${API_BASE_URL}/tasks`, {
        title: newTaskTitle,
        description: newTaskDescription,
        status: 'todo'
      });

      setNewTaskTitle('');
      setNewTaskDescription('');
      setIsAddingTask(false);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${id}`, updates);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const taskId = parseInt(draggableId);
    const newStatus = destination.droppableId;

    updateTask(taskId, {
      status: newStatus,
      position: destination.index
    });

    // Optimistic update
    const newTasks = { ...tasks };
    const sourceColumn = newTasks[source.droppableId];
    const destColumn = newTasks[destination.droppableId];
    const [movedTask] = sourceColumn.splice(source.index, 1);
    movedTask.status = newStatus;
    destColumn.splice(destination.index, 0, movedTask);
    setTasks(newTasks);
  };

  const renderColumn = (status, title, color) => (
    <div className="column">
      <div className="column-header" style={{ backgroundColor: color }}>
        <h2>{title}</h2>
        <span className="task-count">{tasks[status].length}</span>
      </div>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
          >
            {tasks[status].map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`task-card ${snapshot.isDragging ? 'dragging' : ''}`}
                  >
                    <div className="task-header">
                      <h3>{task.title}</h3>
                      <button
                        className="delete-btn"
                        onClick={() => deleteTask(task.id)}
                        title="Delete task"
                      >
                        ×
                      </button>
                    </div>
                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}
                    <div className="task-footer">
                      <span className="task-id">#{task.id}</span>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Kanban Board</h1>
        <button className="add-task-btn" onClick={() => setIsAddingTask(true)}>
          + New Task
        </button>
      </header>

      {isAddingTask && (
        <div className="modal-overlay" onClick={() => setIsAddingTask(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Task</h2>
            <input
              type="text"
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="input"
              autoFocus
            />
            <textarea
              placeholder="Description (optional)"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="textarea"
              rows={4}
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setIsAddingTask(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={createTask}>
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {renderColumn('todo', '📝 To Do', '#6366f1')}
          {renderColumn('doing', '⚡ In Progress', '#f59e0b')}
          {renderColumn('done', '✅ Done', '#10b981')}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
