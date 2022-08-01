import {Component} from 'react'
import {v4} from 'uuid'
import Header from '../Header/index'
import PasswordItem from '../PasswordItem/index'
import './index.css'

const initialBackgroundColorClassnames = [
  'yellow',
  'green',
  'orange',
  'cyan',
  'red',
  'blue',
]

class PasswordManager extends Component {
  state = {
    passwordList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isChecked: false,
  }

  onWebsiteChange = event => {
    this.setState({websiteInput: event.target.value})
  }

  onUsernameChange = event => {
    this.setState({usernameInput: event.target.value})
  }

  onSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({passwordInput: event.target.value})
  }

  onDeletePassword = id => {
    const {passwordList} = this.state
    const newPasswordList = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: newPasswordList})
  }

  onSubmit = event => {
    event.preventDefault()
    const {usernameInput, websiteInput, passwordInput} = this.state
    const classNameColor =
      initialBackgroundColorClassnames[
        Math.ceil(Math.random() * initialBackgroundColorClassnames.length - 1)
      ]
    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      classname: classNameColor,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  isChecked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  renderNoPasswordScreen = () => (
    <div className="no-password-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-image"
      />
      <p className="no-pass">No Passwords</p>
    </div>
  )

  renderPasswordsList = (filteredList, isChecked) => (
    <ul className="password-list">
      {filteredList.map(each => (
        <PasswordItem
          eachPassword={each}
          key={each.id}
          isChecked={isChecked}
          onDeletePassword={this.onDeletePassword}
        />
      ))}
    </ul>
  )

  render() {
    const {
      searchInput,
      passwordList,
      usernameInput,
      websiteInput,
      passwordInput,
      isChecked,
    } = this.state

    const filteredList = passwordList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <Header />
        <div className="new-password-input-container">
          <div className="form-container">
            <h1 className="new-password-heading">Add New Password</h1>
            <form>
              <div className="text-input-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-img"
                />
                <input
                  className="text-input"
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.onWebsiteChange}
                  value={websiteInput}
                />
              </div>
              <div className="text-input-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-img"
                />
                <input
                  className="text-input"
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.onUsernameChange}
                  value={usernameInput}
                />
              </div>
              <div className="text-input-cont">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-img"
                />
                <input
                  className="text-input"
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.onPasswordChange}
                  value={passwordInput}
                />
              </div>
              <div className="add-btn-cont">
                <button
                  className="add-btn"
                  type="submit"
                  onClick={this.onSubmit}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-image"
            />
          </div>
        </div>
        <div className="your-passwords-container">
          <div className="your-passwords-header">
            <div className="pass-count">
              <h1 className="your-password-heading">Your Passwords</h1>
              <p className="count">{passwordList.length}</p>
            </div>
            <div className="text-input-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-img"
              />
              <input
                type="search"
                className="text-input search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onSearchChange}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="check-box-cont">
            <input type="checkbox" id="checkbox" onChange={this.isChecked} />
            <label htmlFor="checkbox" className="checkbox-label">
              Show Passwords
            </label>
          </div>
          {filteredList.length === 0
            ? this.renderNoPasswordScreen()
            : this.renderPasswordsList(filteredList, isChecked)}
        </div>
      </div>
    )
  }
}

export default PasswordManager
