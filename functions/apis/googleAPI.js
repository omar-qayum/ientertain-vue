/* eslint-disable max-len */
const { getFirestore } = require("firebase-admin/firestore");
const axios = require("axios");

const firestore = getFirestore();

exports.getBooksData = async () => {
  const bookGenres = ["Action", "Adventure", "Drama", "Thriller", "Horror", "Fantasy", "Romance", "Science Fiction", "Biography", "Mystery"];
  try {
    const bookData = await Promise.all(bookGenres.map(async (bookGenre) => {
      firestore.collection("Books").doc(bookGenre).set({ genre: bookGenre });
      const booksByGenre = (await axios.get("https://www.googleapis.com/books/v1/volumes", {
        params: {
          key: process.env.GOOGLE_BOOKS_API_KEY,
          q: `subject:${bookGenre}`,
          orderBy: "newest",
          printType: "books",
          maxResults: 40,
        },
      })).data.items;
      return {
        genre: bookGenre,
        books: booksByGenre,
      };
    }));
    await Promise.all(bookData.map(async (booksByGenre) => {
      const bookData3 = await Promise.all(booksByGenre.books.map(async (book) => {
        return {
          genre: booksByGenre.genre,
          title: book.volumeInfo.title,
          author: book.volumeInfo.authors === undefined ? null : book.volumeInfo.authors[0],
          date: book.volumeInfo.publishedDate === undefined ? null : book.volumeInfo.publishedDate,
          summary: book.volumeInfo.description === undefined ? null : book.volumeInfo.description,
          posterPath: book.volumeInfo.imageLinks === undefined ? null : book.volumeInfo.imageLinks["thumbnail"],
          pages: book.volumeInfo.pageCount === undefined ? null : book.volumeInfo.pageCount,
        };
      }));
      bookData3.forEach((book) => firestore.collection("Books").doc(book.genre).collection("Book").add(book));
    }));
  } catch (error) {
    console.log(error.message);
    console.log(error.response.data);
  }
};

