import React, {PureComponent} from 'react';

import UserDropdown from './user-dropdown.jsx';

import logo from './logo.svg';


const Logo = () => {
    return (
        <a href="/">
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
            <input
                type="search"
                disabled
                placeholder="Search"
            />
        </form>
    );
};

const NewAlgorithmButton = () => {
    return (
        <a
            href="/algorithms/new"
            style={{
                background: '#4A83F4',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                padding: '10px 18px',
            }}
        >
            New Algo
        </a>
    );
};

const NotificationBell = () => {
    return (
        <a href="/">
            🔔
        </a>
    );
};

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
                <span
                    style={{
                        gridColumn: 2,
                    }}
                >
                    <Search />
                </span>
                <span
                    style={{
                        gridColumn: 10,
                    }}
                >
                    <NewAlgorithmButton />
                </span>
                <span
                    style={{
                        gridColumn: 12,
                    }}
                >
                    <NotificationBell />
                    <UserDropdown />
                </span>
            </div>
        );
    }
}

export default Header;
