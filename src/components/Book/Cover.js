import React from 'react';
import makeComponentTrashable from 'trashable-react';
import PropTypes from 'prop-types';

class Cover extends React.Component {
    static propTypes = {
        registerPromise: PropTypes.func.isRequired,
        image: PropTypes.string.isRequired
    };

    state = { // Default dimensions
        width: 128,
        height: 170
    };

    componentDidMount() {
        const {registerPromise, image} = this.props;

        registerPromise(this.getImageDimensions(image))
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
