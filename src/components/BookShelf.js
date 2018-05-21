import React from 'react'
import Book from './Book';
import MESSAGES from '../constsnts/messages'

function BookShelf(props) {
    const {shelf, onChangeShelf} = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{MESSAGES['SHELF_TITLE.' + shelf]}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map(book => (
                        <li key={book.id}>
                            <Book
                                book={book}
                                onChangeShelf={onChangeShelf}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default BookShelf
