// -----------------------------------------------------
// Dependencies
// -----------------------------------------------------

// -----------------------------------------------------
// Exports
// -----------------------------------------------------
module.exports = {
  index,
  newForm,
  destroy,
  update,
  create,
  edit,
  show,
  seed,
};

// -----------------------------------------------------
// Route Controllers
// -----------------------------------------------------
async function index(req, res) {
  // find all the books
  let books = await req.model.Book.find({});
  // render all of the books => index.ejs
  res.render("index.ejs", {
    books: books.reverse(),
  });
}

async function newForm(req, res) {
  // render the create form
  res.render("new.ejs");
}

async function destroy(req, res) {
  try {
    let deletedBook = await req.model.Book.findByIdAndDelete(req.params.id);
    console.log(deletedBook);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("something went wrong when deleting");
  }
}

async function update(req, res) {
  try {
    // handle our checkbox
    if (req.body.completed === "on") {
      req.body.completed = true;
    } else {
      req.body.completed = false;
    }
    // find by id and update with the req.body
    // findByIdAndUpdate - id , data to update , options (in here, true)
    let updatedBook = await req.model.Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // send it to the show route with updated book
    res.redirect(`/books/${updatedBook._id}`);
    // res.send(req.body);
  } catch (error) {
    res.send("wrong!");
  }
}

async function create(req, res) {
  try {
    if (req.body.completed === "on") {
      // if checked
      req.body.completed = true;
    } else {
      // if not checked
      req.body.completed = false;
    }
    let newBook = await req.model.Book.create(req.body);
    res.redirect("/books");
  } catch (err) {
    res.send(err);
  }
}

async function edit(req, res) {
  try {
    // find the book and edit
    let foundBook = await req.model.Book.findById(req.params.id);
    res.render("edit.ejs", {
      book: foundBook,
    });
  } catch (error) {
    res.send("yo, error");
  }
}

async function seed(req, res) {
  try {
    // delete everything in the DB - clean it out
    await req.model.Book.deleteMany({});

    // create data in the DB
    await req.model.Book.create(req.model.seedData);

    // redirect back to the index
    res.redirect("/books/");
  } catch (error) {
    res.send("something went wrong with you seeds");
  }
}
async function show(req, res) {
  //find book by _id
  let foundBook = await req.model.Book.findById(req.params.id); // requested params object
  console.log(foundBook);
  // render show.ejs with foundBook
  res.render("show.ejs", {
    book: foundBook,
  });
}
