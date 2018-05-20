import React from 'react'
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf'
import ROUTES from '../constsnts/routes';
import MESSAGES from '../constsnts/messages';

class ListBooks extends React.Component {
    state = {
        books: []
    };

    componentDidMount = () => {
        // Load data
    };

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>{MESSAGES['MY_READS']}</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to={ROUTES.SEARCH}>{MESSAGES['ADD_BOOK']}</Link>
                </div>
            </div>
        );
    }
}

export default ListBooks
