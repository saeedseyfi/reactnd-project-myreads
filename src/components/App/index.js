import React from 'react';
import {Route} from 'react-router-dom';
import SmartProgressBar from '../SmartProgressBar';
import ListBooks from '../ListBooks';
import SearchBooks from '../SearchBooks';
import * as BooksAPI from '../../utils/BooksAPI';
import ROUTES from '../../constsnts/routes';
import CONFIG from '../../constsnts/config';
import './index.css';

class BooksApp extends React.Component {
    state = {
        loading: true,
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => this.setState({books, loading: false}));
    };

    onChangeShelf = (book, shelf) => {
        return BooksAPI.update(book, shelf)
            .then(() => {
                let books = this.state.books;

                if (shelf === CONFIG.SHELF_NOT_SET) { // Unsetting book from the shelf
                    books = books.filter(b => {
                        return b.id !== book.id;
                    })
                } else { // Updating from a shelf to other
                    books = books.map(b => {
                        if (b.id === book.id) {
                            b.shelf = shelf;
                        }
                        return b;
                    })
                }

                this.setState({books});
            });
    };

    render() {
        const {books, loading} = this.state;

        return (
            <div className="app">
                <SmartProgressBar show={loading}/>
                <Route
                    exact
                    path={ROUTES.LIST_BOOKS}
                    render={props => (
                        <ListBooks
                            {...props}
                            books={books}
                            onChangeShelf={this.onChangeShelf}/>
                    )}/>
                <Route
                    path={ROUTES.SEARCH}
                    render={props => (
                        <SearchBooks
                            {...props}
                            myBooks={books}
                            onChangeShelf={this.onChangeShelf}/>
                    )}/>
            </div>
        );
    }
}

export default BooksApp;
