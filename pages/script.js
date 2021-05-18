// DIV TABELA HTML
const tablebody = document.getElementById("tablebody");
let books;

// ERRO
// function error(param) {
//   if (request.readyState == 4 && request.status == "201") {
//     console.table(param);
//   } else {
//     console.error(param);
//   }
// }

// PRINTAR TABELA
function print_table(id, name, qtd, dt) {
  const row = tablebody.insertRow();
  const cellId = row.insertCell(0);
  const cellName = row.insertCell(1);
  const cellQtd = row.insertCell(2);
  const cellDt = row.insertCell(3);
  cellId.innerHTML = id;
  cellName.innerHTML = name
  cellQtd.innerHTML = qtd
  cellDt.innerHTML = dt
}


// GET
async function request_get() {
  const response = await fetch('http://localhost:3000/books');  
  
  const { data }  = await response.json();
  return data;
}

// ORGANIZANDO OS DADOS
async function monta_tabela() {
  books = await request_get();  
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  
  books.forEach((book) => {
    print_table(
      book.book_id,
      book.book_name,
      book.quantity,        
      new Date(book.date_aquisiton).toLocaleDateString("pt-br", options)
    );
  });
}

// CONFIRMA DELETE
function delete_book(book_id) {
  console.log(book_id)
  let r = window.confirm("Tem certeza que deseja deletar o livro?");
  if (r == true) {
    request_delete(book_id);
  }
}

// DELETE
function request_delete(id) {
  let request = new XMLHttpRequest();

  request.open("DELETE", "http://localhost:3000/books/" + id, true);

  request.send();
}


// DIGITA PARA CADASTRAR
async function cadastre_book(nameBook, qtdBook, dataBook) {
  let date = new Date(dataBook);
  if (nameBook != "" && qtdBook != "" && dataBook != "") {    
    const id = await request_post(nameBook, qtdBook, date);
    document.location.reload(true)    
  } else {
    alert("você deixou campos em branco");
  }
}

// CADASTRA
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
    let users = JSON.parse(request.responseText);

    if (request.readyState == 4 && request.status == "201") {
      console.table(users);
    } else {
      console.error(users);
    }
  };  
  request.send(data);
}


// DIGITA PARA EDITAR
function edit_book(idBook, nameBook, qtdBook, dataBook) {
  let date = new Date(dataBook);
  console.log(date)
  if (nameBook != "" && qtdBook != "" && dataBook != "") {
    request_edit(idBook, nameBook, qtdBook, date);    
  } else {
    alert("você deixou campos em branco");
  }
}

// EDITA
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
    if (request.readyState == 4 && request.status == "201") {
      console.table(books);
    } else {
      console.error(books);
    }
  };
  request.send(data);
}

monta_tabela();

