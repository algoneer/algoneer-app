import React, {Component, Fragment} from 'react';
import Main from './main';
import { withActions } from '7s/components/store';
import { withRouter } from '7s/components/router';
import { withSettings } from '7s/components/settings';
import Notification from '7s/components/notification';

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.updateTitle();

        this.state = {
            active: false,
        };
    }

    onToggle() {
        this.setState({ active: !this.state.active });
    }

    componentDidUpdate(prevProps) {
        const { component } = this.props.route;
        const oldComponent = prevProps.route.component;
        //we only update the title if the component changed
        if (component !== oldComponent)
            this.updateTitle();
    }

    updateTitle() {
        const { props } = this;
        const { route, settings } = props;
        const newTitle = settings.t(['nav', route.title, 'title']) || settings.t(['nav', 'no-title']);
        props.titleActions.setTitle(newTitle);
    }

    render() {
        const { route } = this.props;
        const RouteComponent = route.component;

        const showsBackground = document.documentElement.classList.contains('background-algoneer');
        const shouldShowBackground = !RouteComponent.blocksBackground;
        if (showsBackground !== shouldShowBackground) {
            document.documentElement.classList.toggle('background-algoneer');
        }

        if (RouteComponent.isSimple)
            return this.renderSimple(RouteComponent, route.props);

        return this.renderFull(RouteComponent, route.props);
    }

    renderFull(Component, props) {
        return(
            <Fragment>
                <Notification />
                <Main>
                    <Component {...props} />
                </Main>
            </Fragment>
        );
    }

    renderSimple(Component, props) {
        return <Component {...props} />;
    }
}

export default withSettings(withRouter(withActions(App, ['title'])));
