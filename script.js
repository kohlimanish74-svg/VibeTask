// VibeTask Prototype - script.js

const STORAGE_KEY = 'vibetask.tasks';
let tasks = [];
let editingId = null;

const $form = document.getElementById('task-form');
const $title = document.getElementById('task-title');
const $due = document.getElementById('task-due');
const $list = document.getElementById('task-list');
const $cancelEdit = document.getElementById('task-cancel-edit');

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : [];
  } catch (e) {
    tasks = [];
  }
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,6);
}

function render() {
  $list.innerHTML = '';
  if (tasks.length === 0) {
    $list.innerHTML = '<div class="task-item">No tasks yet — add one above.</div>';
    return;
  }

  tasks.forEach(task => {
    const item = document.createElement('div');
    item.className = 'task-item' + (task.completed ? ' task-completed' : '');
    item.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!task.completed;
    checkbox.addEventListener('change', () => toggleComplete(task.id));

    const meta = document.createElement('div');
    meta.className = 'task-meta';

    const title = document.createElement('p');
    title.className = 'task-title';
    title.textContent = task.title;

    const subtitle = document.createElement('small');
    subtitle.textContent = task.due ? `Due ${task.due}` : '';

    meta.appendChild(title);
    meta.appendChild(subtitle);

    const controls = document.createElement('div');
    controls.className = 'task-controls';

    const editBtn = document.createElement('button');
    editBtn.className = 'task-btn';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => startEdit(task.id));

    const delBtn = document.createElement('button');
    delBtn.className = 'task-btn';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => removeTask(task.id));

    controls.appendChild(editBtn);
    controls.appendChild(delBtn);

    item.appendChild(checkbox);
    item.appendChild(meta);
    item.appendChild(controls);

    $list.appendChild(item);
  });
}

function addTask(title, due) {
  const task = { id: uid(), title: title.trim(), due: due || '', completed: false, created: Date.now() };
  tasks.unshift(task);
  save();
  render();
}

function startEdit(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  editingId = id;
  $title.value = t.title;
  $due.value = t.due || '';
  $cancelEdit.style.display = 'inline-block';
}

function cancelEdit() {
  editingId = null;
  $title.value = '';
  $due.value = '';
  $cancelEdit.style.display = 'none';
}

function finishEdit(id, title, due) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.title = title.trim();
  t.due = due || '';
  save();
  cancelEdit();
  render();
}

function removeTask(id) {
  tasks = tasks.filter(x => x.id !== id);
  save();
  render();
}

function toggleComplete(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  t.completed = !t.completed;
  save();
  render();
}

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = $title.value;
  const due = $due.value;
  if (!title.trim()) return;
  if (editingId) {
    finishEdit(editingId, title, due);
  } else {
    addTask(title, due);
    $title.value = '';
    $due.value = '';
  }
});

$cancelEdit.addEventListener('click', () => cancelEdit());

// Initialize
load();
render();

// Expose for debugging in console
window.vibetask = { tasks, save, load, render };
