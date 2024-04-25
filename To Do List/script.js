function adicionaTodo(descricao, concluido) {
  let textoInput = document.getElementById("texto-input").value || descricao;
  if (!textoInput) {
    return alert("Para adicionar uma tarefa é necessário um texto");
  }
  let li = document.createElement("li");
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(textoInput));
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");

  if (concluido) {
    input.checked = true;
    span.style.textDecoration = "line-through";
  }
  const button = document.createElement("button");
  button.textContent = "X";
  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  button.addEventListener("click", function () {
    const confirmado = confirm("Deseja realmente remover essa tarefa?");
    if (confirmado) {
      this.parentElement.remove();
      salvaLocalStorage();
      atualizaQuantidadeItens();
    }
  });
  input.addEventListener("change", function () {
    salvaLocalStorage();
    if (this.checked) {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "none";
    }
  });
  const lista = document.getElementById("lista");
  lista.appendChild(li);

  salvaLocalStorage();
  atualizaQuantidadeItens();

  document.getElementById("texto-input").value = "";
}

function salvaLocalStorage() {
  let lista = document.getElementById("lista").children;
  let listaTodos = [];

  for (let item of lista) {
    let todo = {
      descricao: item.querySelector("span").innerText,
      concluido: item.querySelector('input[type="checkbox"]').checked,
    };
    listaTodos.push(todo);
  }
  localStorage.setItem("listaTodos", JSON.stringify(listaTodos));
}

function atualizaQuantidadeItens() {
  let contador = document.getElementById("total-itens");
  let lista = JSON.parse(localStorage.getItem("listaTodos"));
  contador.innerHTML = `Quantidade de itens: ${lista.length}`;
}

function carregaListaTodos() {
  let lista = JSON.parse(localStorage.getItem("listaTodos"));

  for (let item of lista) {
    adicionaTodo(item.descricao, item.concluido);
  }
  atualizaQuantidadeItens();
}

window.onload = carregaListaTodos;
