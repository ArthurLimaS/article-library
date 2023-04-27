// CARREGAMENTO DE ARQUIVOS
function loadFile() {
  document.getElementById('file_loader').click();
}

document.getElementById('file_loader').addEventListener("input", showFile)

function showFile() {
  const file = document.getElementById("file_loader").files[0];
  alert(`File name: ${file.name}`); // e.g my.png
  const form = document.getElementById("file_loader_form")
  form.submit()
}

// var drop = document.getElementById("conteudo");
// drop.addEventListener("dragover", change, false);
// drop.addEventListener("dragleave",change_back, false);
// drop.addEventListener("drop", dropped, false);

// function change() {
//   drop.style.backgroundColor = "#FF0000";
// };

// function change_back() {
//   drop.style.backgroundColor = '#fff';
// };

// function dropped() {
//     change_back()
// }