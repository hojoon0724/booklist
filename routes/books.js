// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------
const express = require("express");
const router = express.Router();

// need to bring in controller
const bookController = require("../controllers/books.js");

// -----------------------------------------------------
// Routes INDUCES
// Index
// New
// Delete
// Update
// Create
// Edit
// Show
// -----------------------------------------------------
// router.get("/", (req, res) => {
//   res.send(`root response`);
// });

// Index - GE rendel all of the books
router.get("/", bookController.index);

// New - GET for the form to create a new book
router.get("/new", bookController.newForm);

// Delete
router.delete("/:id", bookController.destroy);

// Update
router.put("/:id", bookController.update);

// create - POST
router.post("/", bookController.create);

// Edit
router.get("/edit/:id", bookController.edit);

// Seed - GET
router.get("/seed", bookController.seed);

// Show - GET rendering only one book
router.get("/:id", bookController.show);

// export our router
module.exports = router;
