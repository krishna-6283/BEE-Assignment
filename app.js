const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataPath = path.join(__dirname, 'books.json');

const getBooksData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const saveBooksData = (books) => fs.writeFileSync(dataPath, JSON.stringify(books, null, 2), 'utf8');

app.get('/books', (req, res) => {
    const { page = 1, limit = 10, genre, author, publicationYear } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let books = getBooksData();
    let filteredBooks = books;

    if (genre) filteredBooks = filteredBooks.filter(book => book.genre === genre);
    if (author) filteredBooks = filteredBooks.filter(book => book.author === author);
    if (publicationYear) filteredBooks = filteredBooks.filter(book => book.publicationYear === Number(publicationYear));

    res.json(filteredBooks.slice(startIndex, endIndex));
});

app.post('/books', (req, res) => {
    const { title, author, genre, publicationYear, imageUrl, ISBN, description } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required.' });
    }

    let books = getBooksData();
    if (books.some(book => book.ISBN === ISBN)) {
        return res.status(400).json({ error: 'Book with this ISBN already exists.' });
    }

    const newBook = {
        id: uuidv4(),
        title,
        author,
        genre: genre || 'Unknown',
        publicationYear: publicationYear || 'Unknown',
        imageUrl: imageUrl || 'https://via.placeholder.com/150',
        ISBN: ISBN || uuidv4(),
        description: description || 'No description available',
    };

    books.push(newBook);
    saveBooksData(books);
    res.status(201).json(newBook);
});

app.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const books = getBooksData();
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ error: 'Book not found.' });
    }

    res.json(book);
});

app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, genre, publicationYear, imageUrl, ISBN, description } = req.body;

    let books = getBooksData();
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found.' });
    }

    if (books.some(book => book.ISBN === ISBN && book.id !== id)) {
        return res.status(400).json({ error: 'Book with this ISBN already exists.' });
    }

    books[bookIndex] = { ...books[bookIndex], title, author, genre, publicationYear, imageUrl, ISBN, description };
    saveBooksData(books);
    res.json(books[bookIndex]);
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    let books = getBooksData();
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found.' });
    }

    books.splice(bookIndex, 1);
    saveBooksData(books);
    res.status(204).send();
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
