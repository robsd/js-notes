output = document.getElementById('notes');

if (typeof(Storage) !== 'undefined') {
	
	notes = JSON.parse(localStorage.getItem('notes'));
	
	if (notes && notes.length > 0) {
		for (i = notes.length - 1; i >= 0; i--) {
			output.innerHTML += '<div class="card mb-3"><div class="card-header">'+ notes[i]['timestamp'] + '</div><div class="card-body">' + notes[i]['contents'] + '<button class="btn btn-danger float-end" onclick="deleteNote(' + i + ');">Delete</button></div></div>';
		}
	}
	else {
		output.innerHTML += '<div class="alert alert-danger">You have no notes yet!</div>';
	}
	
	function reloadNotes() {
		newNotes = JSON.stringify(notes);
		localStorage.setItem('notes', newNotes);
		location.reload();
	}
	
	function deleteNote(id) {
		for (i = 0; i < notes.length; i++) {
			if (id == i) {
				notes.splice(i, 1);
				reloadNotes();
			}
		}
	}
	
	function createNote() {
		contents = document.getElementById('contents').value;
		if (contents) {
			if (!notes) {
				notes = [];
			}
			timestamp = new Date().toLocaleString();
			notes.push({'timestamp': timestamp, 'contents': contents});
			reloadNotes();
		}
	}
	
}
else {
	output.innerHTML = '<div class="alert alert-danger">Sorry, your browser doesn\'t support Local Storage!</div>';
}