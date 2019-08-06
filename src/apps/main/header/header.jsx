import React, {PureComponent} from 'react';
import { withActions } from '7s/components/store';
import { withRouter } from '7s/components/router';

import logo from './logo.svg';


const Logo = () => {
    return (
        <a href='/'>
            <img
                alt="Algoneer"
                src={logo}
                style={{
                    minWidth: '130px',
                }}
            />
        </a>
    );
};

const Search = () => {
    return (
        <form>
            <input type="search" />
        </form>
    );
};

const NewAlgorithmButton = () => {
    return (
        <button
            style={{
                background: '#4A83F4',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                padding: '10px 18px',
            }}
        >
            New Algo
        </button>
    );
};

const NotificationBell = () => {
    return (
        <a href='/'>
            🔔
        </a>
    );
};

const UserDropdown = () => (
    <a href='/'>
        <img alt="Profile and settings menu" />
    </a>
);

class Header extends PureComponent {
    render(){
        return (
            <div
                style={{
                    background: '#FBFBFB',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    width: '100%',
                    height: '100%',
                }}
            >
                <span>
                    <Logo />
                </span>
                <span>
                    <Search />
                </span>
                <span>
                    <NewAlgorithmButton />
                </span>
                <NotificationBell />
                <UserDropdown />
            </div>
        );
    }
}

export default withRouter(withActions(Header, ['user', 'version']));
