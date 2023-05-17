output = document.getElementById('notes');
input = document.getElementById('contents');
action = document.getElementById('action');

function getNotes() {
	return JSON.parse(localStorage.getItem('notes')) || [];
}

function setNotes(notes) {
	newNotes = JSON.stringify(notes);
	localStorage.setItem('notes', newNotes);
}

function noteLayout(id, timestamp, text) {
	layout = '<div class="card mb-3" id="' + id + '">';
	layout += '<div class="card-header">' + timestamp + '</div>';
	layout += '<div class="card-body"><span>' + text + '</span>';
	layout += '<div class="btn-group float-end">';
	layout += '<button class="btn btn-primary" onclick="editNote(this);">Edit</button>';
	layout += '<button class="btn btn-danger" onclick="deleteNote(this);">Delete</button>';
	layout += '</div></div></div>';
	return layout;
}

function addNote() {
	noteText = input.value;
	input.value = "";
	notes = getNotes();
	if (noteText) {
		timestamp = new Date().toLocaleString();
		output.innerHTML += noteLayout(notes.length, timestamp, noteText);
		notes = getNotes();
		notes.push({'timestamp': timestamp, 'text': noteText});
		setNotes(notes);
	}
}

function editNote(note) {
	id = note.closest('.card').id;
	input.value = note.closest('.card-body').firstChild.innerText;
	action.className = 'btn btn-success';
	action.innerText = 'Update';
	action.setAttribute('onclick', 'updateNote(' + id + ');');
}

function updateNote(id) {
	noteText = input.value;
	input.value = "";
	notes = getNotes();
	if (noteText) {
		document.getElementById(id).lastChild.firstChild.innerText = noteText;
		notes = getNotes();
		notes[id]['text'] = noteText;
		setNotes(notes);
	}
	action.className = 'btn btn-primary';
	action.innerText = 'Create';
	action.setAttribute('onclick', 'addNote();');
}

function deleteNote(note) {
	note = note.closest('.card');
	id = note.id;
	note.remove();
	notes = getNotes();
	delete notes[id];
	setNotes(notes);
}

notes = getNotes();
layout = '';

for (i = 0; i < notes.length; i++) {
	if (notes[i]) {
		layout += noteLayout(i, notes[i]['timestamp'], notes[i]['text']);
	}
}

output.innerHTML = layout;