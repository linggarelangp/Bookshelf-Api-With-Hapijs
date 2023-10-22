import { nanoid } from 'nanoid'
import books from '../data/books.mjs'
import { response, responseError } from '../utils/response.mjs'

export const addBookData = (request, h) => {
    const { ...book } = request.payload

    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const finished = (book.pageCount === book.readPage)

    const newBook = {
        id, ...book, finished, insertedAt, updatedAt,
    }

    if (book.readPage > book.pageCount) return responseError(400, 'fail', 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount', h)
    if (!book.name) return responseError(400, 'fail', 'Gagal menambahkan buku. Mohon isi nama buku', h)

    books.push(newBook)
    return response(201, 'success', 'Buku berhasil ditambahkan', { bookId: id }, h)
}

export const getallBooksData = (request, h) => {
    const { name, reading, finished } = request.query

    if (reading) {
        const book = []

        books.filter((b) => {
            if (b.reading === !!parseInt(reading, 10)) {
                return book.push({ id: b.id, name: b.name, publisher: b.publisher })
            }
            return book
        })

        return response(200, 'success', 'Buku berhasil ditampilkan (reading)', { books: book }, h)
    }

    if (finished) {
        const book = []

        books.filter((b) => {
            if (b.finished === !!parseInt(finished, 10)) {
                return book.push({ id: b.id, name: b.name, publisher: b.publisher })
            }
            return book
        })

        return response(200, 'success', 'Buku berhasil ditampilkan (finished)', { books: book }, h)
    }

    if (name) {
        const book = []

        books.map((b) => {
            if (!b.name.toLowerCase().includes(name.toLowerCase())) {
                return book.push({ id: b.id, name: b.name, publisher: b.publisher })
            }
            return book
        })

        return response(200, 'success', 'Buku berhasil ditampilkan (name)', { books: book }, h)
    }

    const book = books.map((b) => ({ id: b.id, name: b.name, publisher: b.publisher }))

    return response(200, 'success', 'Buku berhasil ditampilkan', { books: book }, h)
}

export const getBooksDataById = (request, h) => {
    const { bookId } = request.params

    const book = books.filter((b) => b.id === bookId)

    if (book.length > 0) return response(200, 'success', 'Buku berhasil ditampilkan', { book: book[0] }, h)
    return responseError(404, 'fail', 'Buku tidak ditemukan', h)
}

export const updateBooksData = (request, h) => {
    const { bookId } = request.params
    const { ...book } = request.payload
    const updatedAt = new Date().toISOString()

    if (!book.name) return responseError(400, 'fail', 'Gagal memperbarui buku. Mohon isi nama buku', h)
    if (book.readPage > book.pageCount) return responseError(400, 'fail', 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', h)

    const index = books.findIndex((b) => b.id === bookId)

    if (index !== -1) {
        books[index] = {
            ...books[index],
            ...book,
            updatedAt,
        }

        return response(200, 'success', 'Buku berhasil diperbarui', { book: books[index] }, h)
    }

    return responseError(404, 'fail', 'Gagal memperbarui buku. Id tidak ditemukan', h)
}

export const deteleBooksData = (request, h) => {
    const { bookId } = request.params

    const bookIndex = books.findIndex((book) => book.id === bookId)

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1)
        return response(200, 'success', 'Buku berhasil dihapus', bookIndex + 1, h)
    }

    return responseError(404, 'fail', 'Buku gagal dihapus. Id tidak ditemukan', h)
}
