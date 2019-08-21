import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


class TabList extends PureComponent {
    handleClick(evt) {
        console.dir(evt.target);
        this.props.onSelectTab(evt.target.key);
    }

    render() {
        return (
            <ul
                role="tablist"
            >
                {this.props.tabs.map((tab) => (
                    <li
                        key={tab.id}
                        aria-selected={tab.id === this.props.selectedTab}
                        tabIndex={0}
                        onClick={this.handleClick}
                    >
                        {tab.label}
                    </li>
                ))}
            </ul>
        );
    }
}

TabList.propTypes = {
    selectedTab: PropTypes.string.isRequired,
    tabs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.node.isRequired,
    })).isRequired,
    onSelectTab: PropTypes.func.isRequired,
};

export default TabList;
