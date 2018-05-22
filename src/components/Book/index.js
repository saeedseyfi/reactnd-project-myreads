import React from 'react';
import makeComponentTrashable from 'trashable-react';
import PropTypes from 'prop-types';
import BookCover from './Cover';
import ShelfChanger from './ShelfChanger';
import CONFIG from '../../constsnts/config';
import './index.css';

class Book extends React.Component {
    static propTypes = {
        registerPromise: PropTypes.func.isRequired,
        book: PropTypes.object.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    };

    state = {
        updating: false
    };

    onChangeShelf = shelf => {
        const {registerPromise, book} = this.props;

        return registerPromise(this.props.onChangeShelf(book, shelf))
            .then(() => {
                this.setState({updating: false});
            });
    };

    render() {
        const {book} = this.props;

        return (
            <div className={`book ${this.state.updating && 'updating'}`}>
                <div className="book-top">
                    <BookCover image={book.imageLinks.smallThumbnail}/>
                    <ShelfChanger
                        shelf={book.shelf || CONFIG.SHELF_NOT_SET}
                        allShelves={CONFIG.ALL_SHELVES}
                        notSetShelfName={CONFIG.SHELF_NOT_SET}
                        onChangeShelf={this.onChangeShelf}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.subtitle}</div>
            </div>
        );
    }
}

export default makeComponentTrashable(Book);
