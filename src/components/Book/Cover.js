import React from 'react';
import makeComponentTrashable from 'trashable-react';

class Cover extends React.Component {
    state = { // Default dimensions
        width: 128,
        height: 170
    };

    componentDidMount() {
        this.props
            .registerPromise(this.getImageDimensions(this.props.image))
            .then(dimensions => {
                const {width, height} = dimensions;
                this.setState({
                    imageDimensions: {width, height}
                });
            });
    }

    getImageDimensions = (imageUrl) => {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = function () {
                const {width, height} = this;
                resolve({width, height});
            };
            img.onerror = reject;
            img.src = imageUrl;
        });
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

export default makeComponentTrashable(Cover);
