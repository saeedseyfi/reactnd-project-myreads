import React from 'react';
import PropTypes from 'prop-types';
import MESSAGES from '../../constsnts/messages';

class ShelfChanger extends React.Component {
    render() {
        const {shelf, onChangeShelf, allShelves, notSetShelfName} = this.props;

        return (
            <div className="book-shelf-changer">
                <select
                    value={shelf}
                    onChange={e => onChangeShelf(e.target.options[e.target.selectedIndex].value)}>
                    <option disabled>
                        {MESSAGES['MOVE_TO']}
                    </option>
                    {allShelves.map(shelf => (
                        <option
                            key={shelf}
                            value={shelf}>
                            {MESSAGES['SHELF_TITLE.' + shelf]}
                        </option>
                    ))}
                    <option value={notSetShelfName}>
                        {MESSAGES['SHELF_TITLE.none']}
                    </option>
                </select>
            </div>
        );
    }
}

ShelfChanger.propTypes = {
    shelf: PropTypes.string.isRequired,
    allShelves: PropTypes.array.isRequired,
    notSetShelfName: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default ShelfChanger;
