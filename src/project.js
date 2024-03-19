import Todo from './todo';

class Project {
  constructor(name, priority, todos) {
    this.name = name;
    this.priority = priority;
    this.todos = todos || [];
  }

  addTodo(title, description, dueDate, priority) {
    const t = new Todo(title, description, dueDate, priority);
    this.todos.push(t);
  }

  editTodo(title, description, dueDate, priority, index) {
    const t = new Todo(title, description, dueDate, priority);
    this.todos[index] = t;
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
  }
}

export default Project;
