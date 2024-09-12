# BEE-Assignment

# **Develop a Book Management API**

## Objective

Develop a **RESTful API** using Node.js and Express.js that allows users to manage a collection of books. The API should support basic **CRUD *(Create, Read, Update, Delete)*** operations and should take necessary inputs such as the book's title, author, genre, publication year, and an image of the book's front page.

## Requirements

### **Book Model**

- Design a data model to represent a book, including the following fields:
    - **Title**: The name of the book **(required)**.
    - **Author**: The author(s) of the book **(required)**.
    - **Genre**: The genre or category of the book **(optional)**.
    - **Publication Year**: The year the book was published **(optional)**.
    - **Image URL**: A URL pointing to an image of the book's front page **(optional)**.
    - **ISBN**: The book's International Standard Book Number **(optional but should be unique)**.
    - **Description**: A brief description or summary of the book **(optional)**.

### **CRUD Operations**

- Implement the following endpoints:
    - **`POST /books`**: Create a new book entry. Validate inputs to ensure that required fields are provided and correctly formatted.
    - **`GET /books`**: Retrieve a list of all books in the collection. Support query parameters to filter books by genre, author, or publication year.
    - **`GET /books/:id`**: Retrieve the details of a single book by its ID.
    - **`PUT /books/:id`**: Update an existing book's details. Allow users to update any field, including the front page image URL.
    - **`DELETE /books/:id`**: Remove a book from the collection.

### **Validation and Error Handling**

- Implement input validation to ensure that required fields like the title and author are not empty and that the ISBN is unique.
- Provide meaningful error messages for invalid inputs, such as missing required fields or invalid URLs.
- Handle cases where a book with the given ID does not exist for update or deletion operations, and return appropriate HTTP status codes (e.g., 404 Not Found).

### **Image URL Handling**

- Ensure that the image URL provided is a valid URL format. If the image URL is not provided, use a default placeholder image.
- Implement a feature to allow users to update or change the image URL associated with a book.

### **Bonus Features**

- **Pagination**: Add pagination to the **`GET /books`** endpoint to handle large collections of books.
- **Search Functionality**: Implement a search endpoint that allows users to search for books by title, author, or ISBN.

### **Security Considerations**

- Implement basic authentication to restrict access to the API, especially for create, update, and delete operations.
