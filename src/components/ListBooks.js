import React from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'
import ROUTES from '../constsnts/routes'
import MESSAGES from '../constsnts/messages'
import CONFIG from '../constsnts/config'

class ListBooks extends React.Component {
    sortShelves = shelves => {
        return shelves.sort((a, b) => (
            CONFIG.ALL_SHELVES.indexOf(a) > CONFIG.ALL_SHELVES.indexOf(b) ? 1 :
                CONFIG.ALL_SHELVES.indexOf(a) < CONFIG.ALL_SHELVES.indexOf(b) ? -1 : 0
        ));
    };

    getShelves = books => {
        const shelves = [];

        for (const book of books) {
            if (!shelves.includes(book.shelf)) {
                shelves.push(book.shelf)
            }
        }

        return this.sortShelves(shelves);
    };

    render() {
        const {books, onChangeShelf} = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>{MESSAGES['MY_READS']}</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.getShelves(books).map(shelf => (
                            <BookShelf
                                key={shelf}
                                shelf={shelf}
                                onChangeShelf={onChangeShelf}
                                books={books.filter(book => book.shelf === shelf)}/>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to={ROUTES.SEARCH}>{MESSAGES['ADD_BOOK']}</Link>
                </div>
            </div>
        );
    }
}

export default ListBooks;
