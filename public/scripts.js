// CARREGAMENTO DE ARQUIVOS
function loadFile() {
  document.getElementById('file_loader').click();
}

document.getElementById('file_loader').addEventListener("input", submitFile)
const form = document.getElementById("file_loader_form")

/** @param {Event} event */
function submitFile(event) {
  //handleSubmit(event)
  form.submit() 
}

/** @param {Event} event */
function handleSubmit(event) {
  const url = new URL(form.action);
  
  const formData = new FormData(form)
  console.log(formData)

  /** @type {Parameters<fetch>[1]} */
  const fetchOptions = {
    method: form.method,
    body: formData,
  };

  fetch(url, fetchOptions);
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