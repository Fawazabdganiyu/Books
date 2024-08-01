# Books API
This is a simple CRUD (Create, Read, Update, Delete) API for managing a collection of books.

## Feature
- Create a new book
- Update Book Cover Image
- Read a list of books or a single book by ID
- Update book information
- Delete a book

## Installation
1. Clone the repository:
```bash
git clone https://github.com/Fawazabdganiyu/Books-API
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory and add your environment variables:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```
4. Run the server:
```bash
npm run dev
```

## Endpoints
| HTTP Verbs | Endpoint | Action |
| --- | --- | --- |
| GET | /status | Get Application Status |
| POST | /books | Create a Book |
| PATCH | /books/cover-image/:id | Update book with cover image |
| GET | /books | Get All Books |
| GET | /books/:id | Get a Book by ID |
| PUT | /books/:id | Update a Book|
| DELETE | /books/:id | Delete a Book |
| PUT | /books/upload/:id | Upload a Book File |


## Documentation
The API documentation is available and interactive through Swagger.

### Access Swagger UI
To view the interactive API documentation:

1. Run the server:
```bash
npm run dev
```
2. Open your browser and go to:
```
http://localhost:3000/api-docs
```

## Usage examples
### Get Application Status
#### Request Example
```bash
curl https://localhost:3000/status
```
#### Response:
```bash
{
  "success": "true",
  "message": "Database is connected"
}
```

### Add a New Book

To add a new book to the collection, send a `POST` request to `/api/books`. This endpoint requires a JSON body with the book's title, author, published date, and ISBN. Optionally, you can upload a book file using multipart/form-data encoding.

#### Request Example

```bash
curl -X POST http://localhost:3000/api/books \
-H "Content-Type: application/json" \
-d '{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedDate": "1925-04-10",
  "ISBN": "9780743273565"
}'
```

For uploading a book file, use the following curl command:

```bash
curl -X POST http://localhost:3000/api/books \
-H "Content-Type: multipart/form-data" \
-F "title=The Great Gatsby" \
-F "author=F. Scott Fitzgerald" \
-F "publishedDate=1925-04-10" \
-F "ISBN=9780743273565" \
-F "bookFile=@/path/to/file"
```

#### Response Example
```bash
{
  "success": "true",
  "data": {
    "_id": "60af9044854b231c12345678",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedDate": "1925-04-10T00:00:00.000Z",
    "ISBN": "9780743273565",
    "bookFile": "uploads/filename.pdf",
    "__v": 0
  }
}
```

### Update Book Cover Image
To update the cover image of an existing book, send a PATCH request to /api/books/:id/cover, where :id is the MongoDB ObjectId of the book. The request should be multipart/form-data encoded with the new cover image file.

#### Request Example
```bash
curl -X PATCH http://localhost:3000/api/books/60af9044854b231c12345678/cover \
-H "Content-Type: multipart/form-data" \
-F "coverImage=@/path/to/cover/image"
```

#### Response Example
The response will include the updated book information, similar to the add new book response.
```bash
{
  "success": "true",
  "message": "Book cover image updated successfully",
  "data": {
    "_id": "60af9044854b231c12345678",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publishedDate": "1925-04-10T00:00:00.000Z",
    "ISBN": "9780743273565",
    "bookFile": "uploads/filename.pdf",
    "coverImage": "uploads/coverImageFilename.jpg",
    "__v": 0
  }
}
```

The remaining examples can be found in the [API Documentation](http://localhost:3000/api-docs)

## Runing tests:
```bash
npm test
```

## Technologies Used
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Jest
- Swagger

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/Fawazabdganiyu/Books-API/blob/main/LICENSE) file for details.
