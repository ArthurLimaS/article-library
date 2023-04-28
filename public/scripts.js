// CARREGAMENTO DE ARQUIVOS
function loadFile() {
  document.getElementById('file_loader').click();
}

document.getElementById('file_loader').addEventListener("input", submitFile)

/** @param {Event} event */
function submitFile(event) {
  const file = event.target.files[0];
  const fileName = event.target.files[0].name;
  
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    fetch("/store", {
      method: "POST",
      body: JSON.stringify({
        dados: reader.result,
        fileName: fileName
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async function (res) {
      const result = await res.json();
      if (result.inserido) {
        document.location.reload()
      }
    }).catch(function (err) {
      console.log(err);
    });
  };
  
  reader.onerror = function () {
    console.log(reader.error);
  };
}

function downloadFile(url, fileName) {
  fetch(url, {
    method: 'get',
    mode: 'no-cors',
    referrerPolicy: 'no-referrer'
  }).then(
    res => res.blob()
  ).then(res => {
    const aElement = document.createElement('a');
    aElement.setAttribute('download', fileName);
    const href = URL.createObjectURL(res);
    aElement.href = href;
    aElement.setAttribute('target', '_blank');
    aElement.click();
    URL.revokeObjectURL(href);
    aElement.remove()
  });
};

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