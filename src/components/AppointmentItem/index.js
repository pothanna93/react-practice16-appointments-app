import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {id, name, date, isSelect} = appointmentDetails

  const starImage = isSelect
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onLikeStar = () => {
    const {onToggleStar} = props
    onToggleStar(id)
  }

  return (
    <li className="app-listItem">
      <div className="list-container">
        <p className="title">{name}</p>
        <button
          type="button"
          className="star-button"
          testid="star"
          onClick={onLikeStar}
        >
          <img src={starImage} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
