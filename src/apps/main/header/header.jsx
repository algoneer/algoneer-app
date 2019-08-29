import React, {PureComponent} from 'react';
import { A } from '7s/components';

import UserDropdown from './user-dropdown/user-dropdown.jsx';
//import NotificationBell from './notification-bell/notification-bell.jsx';
//import Search from './search/search.jsx';

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



// const NewAlgorithmButton = () => {
//     return (
//         <A
//             href="/projects/new"
//             className="header__new-project-button"
//         >
//             New project
//         </A>
//     );
// };

class Header extends PureComponent {
    render(){
        return (
            <nav
                className="header"
                role="banner"
            >
                <span className="header__logo">
                    <Logo />
                </span>
                {/*
                <span className="header__center">
                    <span>
                        <Search />
                    </span>
                    <span>
                        <NewAlgorithmButton />
                    </span>
                </span>
                */}
                <span className="header__button-area">
                    {/*<NotificationBell notificationCount={2} />*/}
                    <UserDropdown />
                </span>
            </nav>
        );
    }
}

export default Header;
