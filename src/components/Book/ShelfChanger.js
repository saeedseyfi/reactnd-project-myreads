import React from 'react';
import MESSAGES from '../../constsnts/messages/index';
import CONFIG from '../../constsnts/config';

class ShelfChanger extends React.Component {
    render() {
        const {shelf, onChangeShelf} = this.props;
        const shelves = CONFIG.ALL_SHELVES;

        return (
            <div className="book-shelf-changer">
                <select
                    value={shelf || CONFIG.SHELF_NOT_SET}
                    onChange={e => onChangeShelf(e.target.options[e.target.selectedIndex].value)}>
                    <option disabled>
                        {MESSAGES['MOVE_TO']}
                    </option>
                    {shelves.map(shelf => (
                        <option
                            key={shelf}
                            value={shelf}>
                            {MESSAGES['SHELF_TITLE.' + shelf]}
                        </option>
                    ))}
                    <option value={CONFIG.SHELF_NOT_SET}>
                        {MESSAGES['SHELF_TITLE.none']}
                    </option>
                </select>
            </div>
        );
    }
}

export default ShelfChanger;
