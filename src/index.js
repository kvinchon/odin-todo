import { render, renderDefault } from './render.js';
import { storageAvailable } from './storage.js';
import './style.css';

let myProjects = [];

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
  if (!localStorage.getItem('projects')) {
    renderDefault();
  } else {
    myProjects = JSON.parse(localStorage.getItem('projects'));
    render(myProjects);
  }
} else {
  // Too bad, no localStorage for us
  renderDefault();
}
