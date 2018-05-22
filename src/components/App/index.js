import React from 'react';
import {Route} from 'react-router-dom';
import ListBooks from '../ListBooks/index';
import SearchBooks from '../SearchBooks/index';
import * as BooksAPI from '../../utils/BooksAPI';
import ROUTES from '../../constsnts/routes';
import MESSAGES from '../../constsnts/messages/index';
import './index.css';

class BooksApp extends React.Component {
    state = {
        loading: true,
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then(books => this.setState({books, loading: false}));
    };

    onChangeShelf = (book, shelf) => {
        return BooksAPI
            .update(book, shelf)
            .then(() => {
                let books = this.state.books;

                if (shelf === 'none') { // Unsetting the book from any shelf
                    books = books.filter(b => {
                        return b.id !== book.id;
                    })
                } else if (books.filter(b => b.id === book.id).length === 0) { // Setting a new book to a shelf
                    books.push(book)
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
        const {loading} = this.state;
        return (
            <div className="app">
                {loading ?
                    <h2 className='loading'>
                        <span>{MESSAGES['LOADING']}</span>
                    </h2> :
                    <div>
                        <Route
                            exact
                            path={ROUTES.HOME}
                            render={() => (
                                <ListBooks
                                    books={this.state.books}
                                    onChangeShelf={this.onChangeShelf}/>
                            )}
                        />
                        <Route
                            path={ROUTES.SEARCH}
                            render={() => (
                                <SearchBooks
                                    onChangeShelf={this.onChangeShelf}/>
                            )}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default BooksApp;
