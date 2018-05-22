import React from 'react';
import {Link} from 'react-router-dom';
import makeComponentTrashable from 'trashable-react';
import PropTypes from 'prop-types';
import BooksGrid from '../BooksGrid';
import ROUTES from '../../constsnts/routes';
import MESSAGES from '../../constsnts/messages/index';
import * as BooksAPI from '../../utils/BooksAPI';
import './index.css';

class SearchBooks extends React.Component {
    static propTypes = {
        registerPromise: PropTypes.func.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    };

    state = {
        loading: false,
        books: [],
        query: ''
    };

    previousSearchPromise; // To abort the last request if it's still pending
    keyPressTimeout; // To make sure we don't send repeated requests to server while typing
    searchInput; // To keep a reference of input to focus on it

    componentDidMount() {
        this.searchInput.focus();
    }

    search = query => {
        const {registerPromise} = this.props;

        // Forget about the previous request if it's still running
        if (this.previousSearchPromise) {
            this.previousSearchPromise.trash();
        }

        const trashablePromise = registerPromise(BooksAPI.search(query));

        trashablePromise.then(books => {
            if (books) {
                if (books.error) {
                    this.setState({
                        books: []
                    });
                } else if (books.length) {
                    this.setState({
                        books: books
                    });
                }
            }

            this.setState({loading: false});
        });

        this.previousSearchPromise = trashablePromise;
    };

    onChangeQuery = e => {
        const query = e.target.value;
        this.setState({
            query
        });

        if (this.keyPressTimeout) {
            clearInterval(this.keyPressTimeout);
        }

        if (query) {
            this.setState({loading: true});

            this.keyPressTimeout = setTimeout(() => this.search(query), 500);
        } else {
            this.setState({books: [], loading: false});
        }
    };

    onChangeShelf = (book, shelf) => {
        const {registerPromise, onChangeShelf} = this.props;

        return registerPromise(onChangeShelf(book, shelf))
            .then(() => {
                this.setState({
                    books: this.state.books.map(b => {
                        if (b.id === book.id) {
                            b.shelf = shelf;
                        }

                        return b;
                    })
                });
            });
    };

    render() {
        const {loading, books} = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to={ROUTES.LIST_BOOKS}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder={MESSAGES['SEARCH']}
                            value={this.state.query}
                            onChange={this.onChangeQuery}
                            ref={(input) => {
                                this.searchInput = input;
                            }}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {loading &&
                    <h2 className="loading">
                        <span>
                            {MESSAGES['LOADING']}
                        </span>
                    </h2>
                    }
                    {books.length > 0 &&
                    <BooksGrid
                        onChangeShelf={this.onChangeShelf}
                        books={books}/>
                    }
                </div>
            </div>
        );
    }
}

export default makeComponentTrashable(SearchBooks);
