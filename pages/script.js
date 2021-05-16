const tablebody = document.getElementById("tablebody");

function request_get() {
  let request = new XMLHttpRequest();

  request.open("GET", "http://localhost:3000/books", true);

  request.onload = function () {
    let data = JSON.parse(this.response);

    data = data.data;
    data.forEach((book) => {
      print_table(
        book.book_id,
        book.book_name,
        book.quantity,
        book.date_aquisiton
      );
    });
  };
  request.send();
}
function delete_book(book_id) {
  let r = window.confirm("Tem certeza que deseja deletar o livro?");
  if (r == true) {
    request_delete(book_id);
  }
}

function edit_book(book_id) {
  let name = prompt("Digite um novo nome para o livro: ");
  let qtd = prompt("Digite uma nova quantidade para o livro: ");
  let dt = prompt("Digite uma nova data de aquisição para o livro: ");
  if (name != "" && qtd != "" && dt != "") {
    request_edit(book_id, name, qtd, dt);
  } else {
    alert("você deixou campos em branco");
  }
}
function cadastre_book() {
  let name = prompt("Digite um nome para o livro: ");
  let qtd = prompt("Digite uma quantidade para o livro: ");
  let dt = prompt("Digite uma data de aquisição para o livro: ");
  if (name != "" && qtd != "" && dt != "") {
    request_post(name, qtd, dt);
  } else {
    alert("você deixou campos em branco");
  }
}

function print_table(id, name, qtd, dt) {
  tablebody.innerHTML += `<tr>
    <td>${id}</td>
    <td>${name}</td>
    <td>${qtd}</td>
    <td>${dt}</td>
  </tr>`;
}

function request_delete(id) {
  let request = new XMLHttpRequest();

  request.open("DELETE", "http://localhost:3000/books/" + id, true);

  request.send();
}

function request_post(name, qtd, dt) {
  let data = JSON.stringify({
    book_name: name,
    quantity: qtd,
    date_aquisiton: dt,
  });
  let request = new XMLHttpRequest();

  request.open("POST", "http://localhost:3000/books/", true);

  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.onload = function () {
    var users = JSON.parse(request.responseText);
    if (request.readyState == 4 && request.status == "201") {
      console.table(users);
    } else {
      console.error(users);
    }
  };
  request.send(data);
}

function request_edit(id, name, qtd, dt) {
  let data = JSON.stringify({
    book_name: name,
    quantity: qtd,
    date_aquisiton: dt,
  });
  let request = new XMLHttpRequest();

  request.open("PUT", "http://localhost:3000/books/" + id, true);

  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.onload = function () {
    let books = JSON.parse(request.responseText);
    if (request.readyState == 4 && request.status == "200") {
      console.table(books);
    } else {
      console.error(books);
    }
  };
  request.send(data);
}

request_get();
