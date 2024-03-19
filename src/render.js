import { format } from 'date-fns';
import Project from './project';
import { createProjectModal, createTodoModal } from './modal';
import { storageAvailable, populateStorage } from './storage';

const renderNavbar = (projects) => {
  const container = document.querySelector('.nav-container');

  container.innerHTML = '';

  projects.forEach((project) => {
    const element = document.createElement('li');
    const link = document.createElement('a');

    link.href = '#';
    link.textContent = project.name;

    element.appendChild(link);
    container.appendChild(element);
  });
};

const render = (projects) => {
  const container = document.querySelector('.container');
  const projectBtn = document.querySelector('#projectBtn');
  const projectModal = createProjectModal();

  container.innerHTML = '';

  projects.forEach((project, projectIndex) => {
    const projectContainer = document.createElement('div');
    const myProject = new Project(
      project.name,
      project.priority,
      project.todos
    );

    const titleContainer = document.createElement('div');
    const title = document.createElement('h2');
    const deleteBtn = document.createElement('button');
    const separator = document.createElement('hr');

    title.textContent = myProject.name;
    deleteBtn.textContent = 'Delete project';
    deleteBtn.classList.add('btn');

    deleteBtn.addEventListener('click', () => {
      // remove project
      projects.splice(projectIndex, 1);
      if (storageAvailable('localStorage')) {
        populateStorage(projects);
      }

      render(projects);
    });

    titleContainer.appendChild(title);
    titleContainer.appendChild(deleteBtn);
    titleContainer.classList.add('title');

    projectContainer.appendChild(titleContainer);
    projectContainer.appendChild(separator);

    myProject.todos.forEach((todo, todoIndex) => {
      const todoContainer = document.createElement('div');
      const todoEditBtn = document.createElement('button');
      const todoTitle = document.createElement('h3');
      const todoDueDate = document.createElement('span');
      const todoDeleteBtn = document.createElement('button');
      const todoSeparator = document.createElement('hr');
      const editModal = createTodoModal(
        `edit${projectIndex}${todoIndex}`,
        todo
      );

      todoTitle.textContent = todo.title;
      todoDueDate.textContent = format(todo.dueDate, 'Pp');
      todoDeleteBtn.textContent = 'Delete task';

      todoEditBtn.classList.add('edit');
      todoDeleteBtn.classList.add('delete');
      todoDeleteBtn.classList.add('btn');

      todoContainer.appendChild(todoEditBtn);
      todoContainer.appendChild(editModal.modal);
      todoContainer.appendChild(todoTitle);
      todoContainer.appendChild(todoDueDate);
      todoContainer.appendChild(todoDeleteBtn);
      todoContainer.classList.add('todo');

      projectContainer.appendChild(todoContainer);
      projectContainer.appendChild(todoSeparator);

      todoEditBtn.addEventListener('click', () => {
        // When the user clicks on the button, open the modal
        editModal.modal.style.display = 'block';
      });

      editModal.modalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        myProject.editTodo(
          editModal.modalForm.title.value,
          editModal.modalForm.description.value,
          editModal.modalForm.dueDate.value,
          editModal.modalForm.priority.value,
          todoIndex
        );

        if (storageAvailable('localStorage')) {
          populateStorage(projects);
        }

        render(projects);
      });

      todoDeleteBtn.addEventListener('click', () => {
        // remove task from project
        myProject.deleteTodo(todoIndex);

        if (storageAvailable('localStorage')) {
          populateStorage(projects);
        }

        render(projects);
      });
    });

    const addTask = document.createElement('button');
    const addModal = createTodoModal(`add${projectIndex}`);

    addTask.textContent = 'Add task';
    addTask.classList.add('add');

    addTask.addEventListener('click', () => {
      addModal.modal.style.display = 'block';
    });

    addModal.modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      myProject.addTodo(
        addModal.modalForm.title.value,
        addModal.modalForm.description.value,
        addModal.modalForm.dueDate.value,
        addModal.modalForm.priority.value
      );

      if (storageAvailable('localStorage')) {
        populateStorage(projects);
      }

      render(projects);
    });

    projectContainer.appendChild(addTask);
    projectContainer.appendChild(addModal.modal);
    projectContainer.classList.add('project');
    container.appendChild(projectModal.modal);
    container.appendChild(projectContainer);
  });

  projectBtn.addEventListener('click', () => {
    // When the user clicks on the button, open the modal
    projectModal.modal.style.display = 'block';
  });

  projectModal.modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const myProject = new Project(
      projectModal.modalForm.title.value,
      projectModal.modalForm.priority.value
    );

    projects.push(myProject);

    if (storageAvailable('localStorage')) {
      populateStorage(projects);
    }

    render(projects);
  });

  renderNavbar(projects);
};

const renderDefault = () => {
  const appointments = new Project('Appointments', 1);
  const groceries = new Project('Groceries', 2);
  const fitness = new Project('Fitness', 3);

  // Add Todos to Projects
  appointments.addTodo(
    'Dentist',
    'Dentist appointment',
    new Date('2024-03-16 10:00:00'),
    1
  );

  groceries.addTodo('Bread', 'Buy bread', new Date('2024-03-15 18:00:00'), 2);

  fitness.addTodo(
    'Yoga',
    'Do 30 minutes of yoga',
    new Date('2024-03-15 17:00:00'),
    3
  );

  const myProjects = [appointments, groceries, fitness];

  if (storageAvailable('localStorage')) {
    populateStorage(myProjects);
  }

  render(myProjects);
};

export { render, renderDefault };
