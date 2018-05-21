import React from 'react'
import makeTrashable from "trashable";

class BookCover extends React.Component {
    state = { // Default dimensions
        width: 128,
        height: 170
    };

    trashablePromises = []; // To keep track of async side effect

    componentDidMount() {
        const promise = this.getImageDimensions(this.props.image);
        const trashablePromise = makeTrashable(promise);
        trashablePromise
            .then(dimensions => {
                const {width, height} = dimensions;
                this.setState({
                    imageDimensions: {width, height}
                });
            });
        this.trashablePromises.push(trashablePromise);
    }

    componentWillUnmount() {
        // To make sure the is no async side effect running
        while (this.trashablePromises.length) {
            this.trashablePromises.shift().trash();
        }
    }

    getImageDimensions = (imageUrl) => {
        return makeTrashable(new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = function () {
                const {width, height} = this;
                resolve({width, height});
            };
            img.onerror = reject;
            img.src = imageUrl;
        }));
    };

    render() {
        const {image} = this.props;
        const {width, height} = this.state;

        return (
            <div
                className="book-cover"
                style={{
                    width: width,
                    height: height,
                    backgroundImage: `url("${image}")`
                }}
            ></div>
        );
    }
}

export default BookCover