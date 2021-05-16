const express = require("express");
const router = express.Router();
const books = require("../services/books");

// GET
router.get("/", async function (req, res, next) {
  try {
    res.json(await books.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Deu erro pegando os book `, err.message);
    next(err);
  }
});

//POST
router.post("/", async function (req, res, next) {
  try {
    res.json(await books.create(req.body));
  } catch (err) {
    console.error(`Deu erro criando o book`, err.message);
    next(err);
  }
});

// PUT
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await books.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Deu erro editando o book`, err.message);
    next(err);
  }
});

// DELETE
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await books.remove(req.params.id));
  } catch (err) {
    console.error(`Deu erro deletando o book`, err.message);
    next(err);
  }
});

module.exports = router;
