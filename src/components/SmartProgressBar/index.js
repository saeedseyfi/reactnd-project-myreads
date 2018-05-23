import React, {Component} from 'react';
import ProgressBar from 'react-progress-bar-plus';
import PropTypes from 'prop-types';
import 'react-progress-bar-plus/lib/progress-bar.css';

class SmartProgressBar extends Component {
    static propTypes = {
        show: PropTypes.bool.isRequired
    };

    state = {
        notShowingAnymore: false
    };

    componentWillUpdate(nextProps, nextState) {
        const {notShowingAnymore} = this.state;
        const {show} = this.props;
        const newLoadingIsJustCompleted = !nextProps.show && show;

        if (notShowingAnymore !== newLoadingIsJustCompleted) {
            this.setState({notShowingAnymore: newLoadingIsJustCompleted})
        }
    }

    render() {
        const {show} = this.props;
        const {notShowingAnymore} = this.state;
        return (
            <ProgressBar
                onTop={true}
                autoIncrement={true}
                spinner='right'
                percent={show ? 0 : notShowingAnymore ? 100 : -1}/>
        )
    }
}

export default SmartProgressBar;
