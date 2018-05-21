import React from 'react';
import makeTrashable from 'trashable';
import BookCover from './BookCover';
import BookShelfChanger from './BookShelfChanger';

class Book extends React.Component {
    state = {
        updating: false
    };

    trashablePromises = []; // To keep track of async side effect

    componentWillUnmount() {
        // To make sure the is no async side effect running
        while (this.trashablePromises.length) {
            this.trashablePromises.shift().trash();
        }
    }

    onChangeShelf = shelf => {
        const promise = this.props.onChangeShelf(this.props.book, shelf);
        const trashablePromise = makeTrashable(promise);
        this.setState({updating: true});
        trashablePromise.then(() => {
            this.setState({updating: false});
        });
        this.trashablePromises.push(trashablePromise);
        return trashablePromise;
    };

    render() {
        const {book} = this.props;

        return (
            <div className={`book ${this.state.updating && 'updating'}`}>
                <div className="book-top">
                    <BookCover image={book.imageLinks.smallThumbnail}/>
                    <BookShelfChanger
                        shelf={book.shelf}
                        onChangeShelf={this.onChangeShelf}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.subtitle}</div>
            </div>
        );
    }
}

export default Book;
