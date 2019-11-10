'use strict'




// Check for existing saved data from Local Storage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  try {
    return notesJSON ? JSON.parse(notesJSON) : []
  } catch (e) {
    return []
  }
};

// Save note to Local Storage
const saveNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes)); // setItem(arg1, arg2). arg1 = la clé dans la bdd locale. arg2 la data/objet que l'on transforme en string pour le stockage
  // Remove a note from the list
};

// Remove a note from the list
const removeNote = id => {
  const noteIndex = notes.findIndex(note => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Generate the DOM structure for a note
const generateNoteDOM = note => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement('p')
  // const button = document.createElement("button");

  // // Set up the remove button
  // button.textContent = "X";
  // noteEl.appendChild(button);
  // button.addEventListener("click", () => {
  //   removeNote(note.id);
  //   saveNotes(notes);
  //   renderNotes(notes, filters);
  // });

  // Set up the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.classList.add('list-item__title')
  noteEl.appendChild(textEl);

  // Setup the link
  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add('list-item')

  // Setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt)
  statusEl.classList.add('list-item__subtitle')
  noteEl.appendChild(statusEl)

  return noteEl;
};

// Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

// Fonction principale pour filtrer
const renderNotes = (notes, filters) => {
  const notesEl = document.querySelector("#notes")
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

  // On vide le html pour éviter une liste interminable
  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    // On affiche chaque élément retourné par filteredNotes
    filteredNotes.forEach(note => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = 'No notes to show'
    emptyMessage.classList.add('empty-message')
    notesEl.appendChild(emptyMessage)
  }


};

// Generate the last edited message
const generateLastEdited = timestamp => `Last edited ${moment(timestamp).fromNow()}`;
