import React from 'react';
import makeComponentTrashable from 'trashable-react';
import BookCover from './Cover';
import ShelfChanger from './ShelfChanger';
import './index.css';

class Book extends React.Component {
    state = {
        updating: false
    };

    onChangeShelf = shelf => {
        return this.props
            .registerPromise(this.props.onChangeShelf(this.props.book, shelf))
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
                        shelf={book.shelf}
                        onChangeShelf={this.onChangeShelf}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.subtitle}</div>
            </div>
        );
    }
}

export default makeComponentTrashable(Book);
