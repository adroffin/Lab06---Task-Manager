import React, { useState } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Funcion que maneja el campo de las entradas de tareas, le llega la funcion para añadir tareas a la lista
// Se declara un estado para la tarea y otro para la categoria
function TaskInput({ addTask }) {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== "" && category.trim() !== "") {
      addTask(task, category);
      setTask("");
      setCategory("");
    }
  };

  // Retorno del formulario que vera el usuario en la aplicacion
  // Se tiene 2 grupos para el form, uno para la tarea y otro para la categoria. De igual forma el boton para agregar la tarea
  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group>
        <Form.Label>Add a new task</Form.Label>
        <Form.Control
          type="text"
          value={task}
          placeholder="Write a task..."
          onChange={(e) => setTask(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mt-2">
        <Form.Label>Choose a category for your task:</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="homework/school">Homework/School</option>
          <option value="work">Work</option>
          <option value="urgent">Urgent</option>
          <option value="home">Home</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Add
      </Button>
    </Form>
  );
}

// Funcion que representa la lista de tareas y el manejo tanto para irlas agregando con su respectiva categoria y un boton para eliminarlas dinamicamente
function TaskList({ tasks, removeTask }) {
  return (
    <ListGroup>
      {tasks.map((task, index) => (
        <ListGroup.Item key={index} className="d-flex justify-content-between">
          <div>
            <strong>{task.task}</strong> <br />
            <small className="text-muted">{task.category}</small>
          </div>
          <Button variant="danger" size="sm" onClick={() => removeTask(index)}>
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

// Funcion que le muestra al usuario la lista de tareas que se van agregando
// Maneja tanto las tareas como la forma de filtrarlas por medio de estados. Incluyendo el select para filtrarlas, asi como las funciones de addtask y removetask que se utilizan en otras funciones
function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("");

  const addTask = (task, category) => {
    setTasks([...tasks, { task, category }]);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  let filteredTasks;
  if (filter) {
    filteredTasks = tasks.filter((task) => task.category === filter);
  } else {
    filteredTasks = tasks;
  }

  return (
    <Container className="mt-4">
      <div className="p-3 mb-2 bg-info-subtle text-info-emphasis">
        <h2>Task Manager</h2>
      </div>
      <TaskInput addTask={addTask} />

      {/* Selector de categoría para filtrar */}
      <Form.Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-3"
      >
        <option value="">All</option>
        <option value="homework/school">Homework/School</option>
        <option value="work">Work</option>
        <option value="urgent">Urgent</option>
        <option value="home">Home</option>
      </Form.Select>

      {/* Mostrar tareas filtradas */}
      <TaskList tasks={filteredTasks} removeTask={removeTask} />
    </Container>
  );
}

export default TaskDashboard;
