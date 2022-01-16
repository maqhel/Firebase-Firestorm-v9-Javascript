import {
	saveTask,
	onGetTasks,
	deleteTask,
	getTask,
	updateTask,
} from './firebase.js';

let tasksContainer = document.querySelector('#task-container');
let taskForm = document.querySelector('#task-form');

let isEdit = false;
let id = ``;

window.addEventListener('DOMContentLoaded', async () => {
	onGetTasks(querySnapshot => {
        //document.createElement('div')
		tasksContainer.innerHTML = '';
		querySnapshot.forEach(doc => {
			const task = doc.data();
			tasksContainer.innerHTML += `<div class="card card-body mt-2 border-primary>
            <h3 class="h5">title: ${task.title}</h3>
            <p>Description: ${task.description}</p>
            <div class="d-flex">
            <button class='btn-delete btn btn-warning mx-3' data-id="${doc.id}">Delete</button>
            <button class='btn-edit btn btn-info' data-id="${doc.id}">Edit</button></div>
            </div>`;
		});

		const btnDelete = tasksContainer.querySelectorAll('.btn-delete');

		btnDelete.forEach(btn => {
			btn.addEventListener('click', ({ target: { dataset } }) => {
				deleteTask(dataset.id);
			});
		});

		const btnEdit = tasksContainer.querySelectorAll('.btn-edit');

		btnEdit.forEach(btn => {
			btn.addEventListener('click', async ({ target: { dataset } }) => {
				id = dataset.id;
				const task = await getTask(id);

				taskForm['task-title'].value = task.data().title;
				taskForm['task-description'].value = task.data().description;
				taskForm['btn-task-save'].innerHTML = `Update`;

				isEdit = true;
			});
		});
	});
});

taskForm.addEventListener('submit', e => {
	e.preventDefault();
	let title = taskForm['task-title'].value;
	let description = taskForm['task-description'].value;
	if (isEdit) {
		updateTask(id, { title, description });
		isEdit = false;
		taskForm['btn-task-save'].innerHTML = `Save`;
	} else {
		saveTask(title, description);
	}

	taskForm.reset();
});
