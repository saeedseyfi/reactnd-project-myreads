import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import makeComponentTrashable from 'trashable-react';
import ProgressBar from 'react-progress-bar-plus';
import BooksGrid from '../BooksGrid';
import * as BooksAPI from '../../utils/BooksAPI';
import ROUTES from '../../constsnts/routes';
import MESSAGES from '../../constsnts/messages';
import CONFIG from '../../constsnts/config';
import './index.css';
import 'react-progress-bar-plus/lib/progress-bar.css';

class ListBooks extends React.Component {
    static propTypes = {
        registerPromise: PropTypes.func.isRequired
    };

    state = {
        loading: true,
        books: []
    };

    componentDidMount() {
        const {registerPromise} = this.props;

        registerPromise(BooksAPI.getAll())
            .then(books => this.setState({books, loading: false}));
    };

    onChangeShelf = (book, shelf) => {
        const {registerPromise} = this.props;

        return registerPromise(BooksAPI.update(book, shelf))
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
        const {loading, books} = this.state;

        return (
            <div className="list-books">
                <ProgressBar onTop={true} autoIncrement={true} spinner='right' percent={loading ? 20 : 100}/>
                {!loading && (
                    <div className="list-books-title">
                        <h1>{MESSAGES['MY_READS']}</h1>
                    </div>
                )}
                <div className="list-books-content">
                    <div>
                        {this.getShelves(books).map(shelf => (
                            <div className="bookshelf" key={shelf}>
                                <h2 className="bookshelf-title">{MESSAGES['SHELF_TITLE.' + shelf]}</h2>
                                <div className="bookshelf-books">
                                    <BooksGrid
                                        onChangeShelf={this.onChangeShelf}
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
}

export default makeComponentTrashable(ListBooks);
