const express = require("express");
const req = require("express/lib/request");

const {
  getAllBookmarks,
  getBookmark,
  createBookmark,
  deleteBookmark,
  updateBookmark,
} = require("../queries/bookmarks");

const bookmarks = express.Router();

bookmarks.get("/", async (_, response) => {
  console.log("GET request to /bookmarks");
  const allBookmarks = await getAllBookmarks();
  if (allBookmarks.length === 0) {
    response.status(500).json({ error: "server error" });

    return;
  }

  response.status(200).json(allBookmarks);
});

bookmarks.get("/:id", async (request, response) => {
  console.log("GET request to /bookmarks/:id");
  const bookmark = await getBookmark(request.params.id);
  response.status(200).json(bookmark);
});

bookmarks.post("/", async (request, response) => {
  const bookmark = await createBookmark(request.body);

  response.status(200).json(bookmark);
});

bookmarks.delete("/:id", async (request, response) => {
  console.log("DELETE request to /bookmarks/:id");
  const deletedBookmark = await deleteBookmark(request.params.id);
  if (deletedBookmark.id) {
    response.status(200).json(deletedBookmark);
  } else {
    response.status(404).json("Bookmark does not exist.");
  }
});

bookmarks.put("/:id", async (request, response) => {
  console.log("UPDATE request to /bookmarks/:id");
  const updatedBookmark = await updateBookmark(request.params.id, request.body);
  if (updatedBookmark.id) {
    response.status(200).json(updatedBookmark);
  } else {
    response.status(404).json("Update did not work.");
  }
});

module.exports = bookmarks;
