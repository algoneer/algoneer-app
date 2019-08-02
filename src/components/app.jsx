import React from 'react'
import App from '../apps/main/main.jsx'
import Sidebar from '7s/components/sidebar'
import CenteredCard from '7s/components/centered_card'
import { withActions } from '7s/components/store'
import { withRouter } from '7s/components/router'

const LoginVerifyNotice = () => {
    return <CenteredCard>
        <p>
            Please wait, verifying your session...
        </p>
    </CenteredCard>
}

const LoginRedirectNotice = () => (
    <CenteredCard>
        <p>
            Please wait, we're redirecting you to the login page...
        </p>
    </CenteredCard>
)

class AlgoneerApp extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.checkLogin()
        this.checkVersion()
    }

    loginRequired() {
        const { route, user } = this.props
        return !route.noUserRequired
            && user.status != 'logged-in'
            && user.status != 'verifying-login'
    }

    checkVersion() {
        const { props } = this
        const { versionActions } = props
        versionActions.getVersion()
    }

    checkLogin() {
        const { router } = this.props
        if (this.loginRequired()) {
            setTimeout(() => router.navigateToUrl('/login'), 700)
        }
    }

    componentDidUpdate() {
        this.checkLogin()
    }

    render(){
        const { user } = this.props

        if (user.status == 'verifying-login')
            return <LoginVerifyNotice />

        if (this.loginRequired(this.props))
            return <LoginRedirectNotice />

        return <App {...this.props} />
    }
}

export default withRouter(withActions(AlgoneerApp, ['user', 'version']))
