import {
    getallBooksData,
    addBookData,
    getBooksDataById,
    deteleBooksData,
    updateBooksData,
} from '../handler/handler.mjs'

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookData,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getallBooksData,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBooksDataById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBooksData,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deteleBooksData,
    },
]

export default routes
