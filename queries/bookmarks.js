const bookmarks = require("../controllers/bookmarksController");
const db = require("../db/dbConfig");

const getAllBookmarks = async () => {
  try {
    const bookmarks = await db.any("SELECT * from bookmarks");

    return bookmarks;
  } catch (error) {
    return error;
  }
};

const getBookmark = async (id) => {
  try {
    const bookmark = await db.one("SELECT * FROM bookmarks WHERE id=$1", id);

    return bookmark;
  } catch (error) {
    return error;
  }
};

const createBookmark = async (bookmark) => {
  const { name, url, category, is_favorite } = bookmark;
  const newBookmark = await db.one(
    "INSERT INTO bookmarks (name, url, category, is_favorite) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, url, category, is_favorite]
  );

  return newBookmark;
};

const deleteBookmark = async (id) => {
  try {
    const deletedBookmark = await db.one(
      "DELETE FROM bookmarks WHERE id=$1 RETURNING *",
      id
    );
    return deletedBookmark;
  } catch (error) {
    return error;
  }
};

const updateBookmark = async (id, bookmark) => {
  const { name, url, category, is_favorite } = bookmark;
  try {
    const updatedBookmark = await db.one(
      "UPDATE bookmarks SET name=$2, url=$3, category=$4, is_favorite=$5 WHERE id=$1 RETURNING *",
      [id, name, url, category, is_favorite]
    );
    return updatedBookmark;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createBookmark,
  getAllBookmarks,
  getBookmark,
  deleteBookmark,
  updateBookmark,
};
