import React, {PureComponent} from 'react';
import { A } from '7s/components';

import UserDropdown from './user-dropdown.jsx';
import NotificationBell from './notification-bell/notification-bell.jsx';

import logo from './logo.svg';
import './header.scss';


const Logo = () => {
    return (
        <A href="/">
            <img
                alt="Algoneer"
                src={logo}
                style={{
                    minWidth: '130px',
                }}
            />
        </A>
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
        <A
            href="/algorithms/new"
            className="header__new-algo-button"
        >
            New Algo
        </A>
    );
};

class Header extends PureComponent {
    render(){
        return (
            <nav
                className="header"
                role="banner"
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
                <span className="header__button-area">
                    <NotificationBell notificationCount={2} />
                    <UserDropdown />
                </span>
            </nav>
        );
    }
}

export default Header;
