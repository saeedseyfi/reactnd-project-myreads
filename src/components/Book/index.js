import React from 'react';
import makeComponentTrashable from 'trashable-react';
import PropTypes from 'prop-types';
import BookCover from './Cover';
import ShelfChanger from './ShelfChanger';
import CONFIG from '../../constants/config';
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

        this.setState({updating: true});

        return registerPromise(this.props.onChangeShelf(book, shelf))
            .then(() => {
                this.setState({updating: false});
            });
    };

    render() {
        const {updating} = this.state;
        const {imageLinks = {smallThumbnail: CONFIG.IMAGE_NOT_SET}, shelf = CONFIG.SHELF_NOT_SET, title, authors = []} = this.props.book;

        return (
            <div className={`book ${updating ? 'updating' : ''}`}>
                <div className="book-top">
                    <BookCover image={imageLinks.smallThumbnail}/>
                    <ShelfChanger
                        shelf={shelf}
                        allShelves={CONFIG.ALL_SHELVES}
                        notSetShelfName={CONFIG.SHELF_NOT_SET}
                        onChangeShelf={this.onChangeShelf}/>
                </div>
                {title && <div className="book-title">{title}</div>}
                {authors.length > 0 && <div className="book-authors">{authors.join(', ')}</div>}
            </div>
        );
    }
}

export default makeComponentTrashable(Book);
