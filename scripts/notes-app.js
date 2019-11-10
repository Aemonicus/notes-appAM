'use strict'




// ------------------- FILTRER dans un search input

let notes = getSavedNotes();

// On crée l objet qui va recevoir le texte à chercher
const filters = {
  searchText: "",
  sortBy: "byEdited"
};

// On appelle la fonction si on veut voir quelque chose..
renderNotes(notes, filters);

document.querySelector("#createNote").addEventListener("click", e => {
  const id = uuidv4();
  const timestamp = moment().valueOf();
  notes.push({
    id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp
  });
  saveNotes(notes);
  location.assign(`/edit.html#${id}`);
});

// On remplit l'objet search avec la valeur recherchée
document.querySelector("#search-text").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters); // On rappelle la fonction dans le search pour le mettre à jour avec les données entrées dans le search car l'appel initial de la fonction renderNotes n'affiche que les données initiales
});

// ------------------- FILTRER dans un search input

document.querySelector("#filter-by").addEventListener("change", e => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener("storage", e => {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});

// // CRUD Local Storage

// // Create/Update
// localStorage.setItem('location', 'Montpellier')

// // Read
// localStorage.getItem('location')

// // Delete
// localStorage.removeItem('location')
// // localStorage.clear() // Supprime tout !
