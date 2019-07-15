import React from 'react'
import {render} from 'react-dom'
//we import the electron module
import electron from 'electron'

export default class App extends React.Component {

  componentDidMount() {
    electron.remote.dialog.showMessageBox(
        {message: "It works!",
         buttons: ["OK"] })
  }

  render () {
    return <div>{this.props.children}</div>
  }
}
