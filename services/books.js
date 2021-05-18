const db = require("./db");
const helper = require("../helper");

async function getMultiple() {
  const rows = await db.query(
    `SELECT book_id, book_name, quantity, date_aquisiton
    FROM books`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function create(book) {
  const result = await db.query(
    `INSERT INTO books
      (book_name, quantity, date_aquisiton)
      VALUES
      (?, ?, ?)`,
    [book.book_name, book.quantity, book.date_aquisiton]
  );

  let message = "Deu merda criando o book";

  if (result.affectedRows) {
    message = "Deu bom criando o book";
  }

  return { message };
}

async function update(id, book) {
  const result = await db.query(
    `UPDATE books 
    SET book_name=?, quantity=?, date_aquisiton=?
    WHERE book_id=?`,
    [book.book_name, book.quantity, book.date_aquisiton, id]
  );

  let message = "Deu merda editando o book";

  if (result.affectedRows) {
    message = "Deu bom editando o book";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM books WHERE book_id=?`, [id]);

  let message = "Deu merda deletando o book";

  if (result.affectedRows) {
    message = "Deu bom deletando o book";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
