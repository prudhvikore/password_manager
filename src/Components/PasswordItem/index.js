import './index.css'

const PasswordItem = props => {
  const {eachPassword, isChecked, onDeletePassword} = props
  const {id, website, username, password, classname} = eachPassword

  const onDelete = () => {
    onDeletePassword(id)
  }

  const renderText = () => <p className="text">{password}</p>

  const renderImage = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars"
    />
  )

  return (
    <li className="list-item">
      <p className={`initial ${classname}`}>{website[0].toUpperCase()}</p>
      <div className="details-cont">
        <p className="text">{website}</p>
        <p className="text">{username}</p>
        {isChecked ? renderText() : renderImage()}
      </div>
      <button
        type="button"
        testid="delete"
        className="del-button"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="del-img"
        />
      </button>
    </li>
  )
}

export default PasswordItem
