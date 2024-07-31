# Books API
This is a simple CRUD (Create, Read, Update, Delete) API for managing a collection of books.

## Feature
- Create a new book
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
| GET | /api/books | Get all books |
| GET | /api/books/:id | Get a book by ID |
| POST | /api/books | Create a new book |
| PUT | /api/books/:id | Update a book by ID |
| DELETE | /api/books/:id | Delete a book by ID |

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
