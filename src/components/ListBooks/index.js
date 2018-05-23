import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import BooksGrid from '../BooksGrid';
import ROUTES from '../../constsnts/routes';
import MESSAGES from '../../constsnts/messages';
import CONFIG from '../../constsnts/config';
import './index.css';

const sortShelves = shelves => {
    return shelves.sort((a, b) => (
        CONFIG.ALL_SHELVES.indexOf(a) > CONFIG.ALL_SHELVES.indexOf(b) ? 1 :
            CONFIG.ALL_SHELVES.indexOf(a) < CONFIG.ALL_SHELVES.indexOf(b) ? -1 : 0
    ));
};

const getShelvesOfBooks = books => {
    const shelves = [];

    for (const book of books) {
        if (!shelves.includes(book.shelf)) {
            shelves.push(book.shelf)
        }
    }

    return sortShelves(shelves);
};

function ListBooks(props) {
    const {onChangeShelf, books} = props;

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>{MESSAGES['MY_READS']}</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {getShelvesOfBooks(books).map(shelf => (
                        <div className="bookshelf" key={shelf}>
                            <h2 className="bookshelf-title">{MESSAGES['SHELF_TITLE.' + shelf]}</h2>
                            <div className="bookshelf-books">
                                <BooksGrid
                                    onChangeShelf={onChangeShelf}
                                    books={books.filter(book => book.shelf === shelf)}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="open-search">
                <Link to={ROUTES.SEARCH}>{MESSAGES['ADD_BOOK']}</Link>
            </div>
        </div>
    );
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default ListBooks;
