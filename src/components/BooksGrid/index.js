import React from 'react'
import Book from '../Book';
import './index.css'

function BooksGrid(props) {
    const {books, onChangeShelf} = props;

    return (
        <ol className="books-grid">
            {books.map(book => (
                <li key={book.id}>
                    <Book
                        book={book}
                        onChangeShelf={onChangeShelf}
                    />
                </li>
            ))}
        </ol>
    )
}

export default BooksGrid;
