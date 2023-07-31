// Write your JS code here
import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', loading: true, isactive: ''}

  changeusername = event => {
    this.setState({username: event.target.value})
  }

  changepassword = event => {
    this.setState({password: event.target.value})
  }

  //   successresult = () => {}

  submitting = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(response)
    console.log(data)

    if (response.ok === true) {
      const {history} = this.props

      history.replace('/')
      //   this.successresult()
    } else {
      const errorMsg = {errormsg: data.error_msg}
      this.setState({isactive: errorMsg.errormsg, loading: false})
    }
  }

  render() {
    const {username, password, loading, isactive} = this.state
    return (
      <>
        <div className="bg_loginform">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
              alt="website login"
              className="login_image"
            />
          </div>
          <div className="form_div">
            <form onSubmit={this.submitting} className="form_container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                alt="website logo"
                className="form_logo"
              />

              <label htmlFor="username" className="username_">
                USERNAME
              </label>
              <input
                onChange={this.changeusername}
                value={username}
                type="text"
                id="username"
                className="input_"
                placeholder="Username"
              />

              <label htmlFor="password" className="username_">
                PASSWORD
              </label>
              <input
                onChange={this.changepassword}
                value={password}
                type="password"
                id="password"
                className="input_"
                placeholder="Password"
              />

              <button type="submit" className="btn_login">
                Login
              </button>
              {loading ? '' : <p className="error_msg">*{isactive}</p>}
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default LoginForm
