import _ from 'lodash';

function pad(number) {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}

const toLocaleDateTimeString = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;

const createProjectModal = () => {
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');
  const modalClose = document.createElement('span');
  const modalForm = document.createElement('form');
  const modalTitleLabel = document.createElement('label');
  const modalTitleInput = document.createElement('input');
  const modalPriorityLabel = document.createElement('label');
  const modalPriorityInput = document.createElement('input');
  const modalBtn = document.createElement('button');

  modalClose.textContent = 'x';
  modalTitleLabel.textContent = 'Title';
  modalPriorityLabel.textContent = 'Priority';

  modalTitleLabel.setAttribute('for', 'title');
  modalTitleInput.id = 'title';
  modalTitleInput.name = 'title';
  modalTitleInput.type = 'text';
  modalTitleInput.value = '';
  modalTitleInput.required = true;

  modalPriorityLabel.setAttribute('for', 'priority');
  modalPriorityInput.id = 'priority';
  modalPriorityInput.name = 'priority';
  modalPriorityInput.type = 'number';
  modalPriorityInput.min = 1;
  modalPriorityInput.max = 5;
  modalPriorityInput.value = 1;

  modalBtn.id = 'add';
  modalBtn.name = 'add';
  modalBtn.type = 'submit';
  modalBtn.textContent = 'Create project';
  modalBtn.classList.add('btn');

  modal.classList.add('modal');
  modalContent.classList.add('modal-content');
  modalClose.classList.add('close');

  // When the user clicks on <span> (x), close the modal
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  modalForm.appendChild(modalTitleLabel);
  modalForm.appendChild(modalTitleInput);
  modalForm.appendChild(modalPriorityLabel);
  modalForm.appendChild(modalPriorityInput);
  modalForm.appendChild(modalBtn);

  modalContent.appendChild(modalClose);
  modalContent.appendChild(modalForm);

  modal.appendChild(modalContent);

  return { modal, modalForm };
};

const createTodoModal = (name, todo = {}) => {
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');
  const modalClose = document.createElement('span');
  const modalForm = document.createElement('form');
  const modalTitleLabel = document.createElement('label');
  const modalTitleInput = document.createElement('input');
  const modalDescLabel = document.createElement('label');
  const modalDescInput = document.createElement('input');
  const modalDueDateLabel = document.createElement('label');
  const modalDueDateInput = document.createElement('input');
  const modalPriorityLabel = document.createElement('label');
  const modalPriorityInput = document.createElement('input');
  const modalBtn = document.createElement('button');

  modalClose.textContent = 'x';
  modalTitleLabel.textContent = 'Title';
  modalDescLabel.textContent = 'Description';
  modalDueDateLabel.textContent = 'Due date';
  modalPriorityLabel.textContent = 'Priority';

  modalForm.setAttribute('action', '#');
  modalForm.setAttribute('method', 'post');
  modalForm.id = `${name}Form`;

  modalTitleLabel.setAttribute('for', `${name}title`);
  modalTitleInput.id = `${name}title`;
  modalTitleInput.name = 'title';
  modalTitleInput.type = 'text';
  modalTitleInput.required = true;

  modalDescLabel.setAttribute('for', `${name}description`);
  modalDescInput.id = `${name}description`;
  modalDescInput.name = 'description';
  modalDescInput.type = 'text';

  modalDueDateLabel.setAttribute('for', `${name}dueDate`);
  modalDueDateInput.id = `${name}dueDate`;
  modalDueDateInput.name = 'dueDate';
  modalDueDateInput.type = 'datetime-local';
  modalDueDateInput.required = true;

  modalPriorityLabel.setAttribute('for', `${name}priority`);
  modalPriorityInput.id = `${name}priority`;
  modalPriorityInput.name = 'priority';
  modalPriorityInput.type = 'number';
  modalPriorityInput.min = 1;
  modalPriorityInput.max = 5;

  modal.classList.add('modal');
  modalContent.classList.add('modal-content');
  modalClose.classList.add('close');

  modalBtn.type = 'submit';
  modalBtn.classList.add('btn');

  // When the user clicks on <span> (x), close the modal
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  if (_.isEmpty(todo)) {
    // Add modal
    modalTitleInput.value = '';
    modalDescInput.value = '';
    modalDueDateInput.value = toLocaleDateTimeString(new Date());
    modalPriorityInput.value = 1;

    modalBtn.id = 'add';
    modalBtn.name = 'add';
    modalBtn.textContent = 'Add task';
  } else {
    // Edit modal
    modalTitleInput.value = todo.title;
    modalDescInput.value = todo.description;
    modalDueDateInput.value = toLocaleDateTimeString(new Date(todo.dueDate));
    modalPriorityInput.value = todo.priority;

    modalBtn.id = 'edit';
    modalBtn.name = 'edit';
    modalBtn.textContent = 'Edit task';
  }

  modalForm.appendChild(modalTitleLabel);
  modalForm.appendChild(modalTitleInput);
  modalForm.appendChild(modalDescLabel);
  modalForm.appendChild(modalDescInput);
  modalForm.appendChild(modalDueDateLabel);
  modalForm.appendChild(modalDueDateInput);
  modalForm.appendChild(modalPriorityLabel);
  modalForm.appendChild(modalPriorityInput);
  modalForm.appendChild(modalBtn);

  modalContent.appendChild(modalClose);
  modalContent.appendChild(modalForm);

  modal.appendChild(modalContent);

  return { modal, modalForm };
};

export { createProjectModal, createTodoModal };
