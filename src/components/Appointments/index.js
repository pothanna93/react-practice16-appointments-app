import {Component} from 'react'

import {format} from 'date-fns'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentLists: [],
    isFilterActive: false,
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      appointmentLists: prevState.appointmentLists.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isSelect: !eachItem.isSelect}
        }
        return eachItem
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onClickAllStars = () => {
    const {appointmentLists, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentLists.filter(
        eachTransaction => eachTransaction.isSelect === true,
      )
    }
    return appointmentLists
  }

  onSubmitAdd = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formatDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      name: titleInput,
      date: formatDate,
      isSelect: false,
    }

    this.setState(prevState => ({
      appointmentLists: [...prevState.appointmentLists, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.onClickAllStars()

    return (
      <div className="app-container">
        <div className="appointment-container">
          <h1 className="heading">Add Appointments</h1>
          <div className="input-elements-container">
            <form onSubmit={this.onSubmitAdd} className="form">
              <label htmlFor="title" className="label-element">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input-element"
                placeholder="Title"
                onChange={this.onTitleInput}
                value={titleInput}
              />
              <label htmlFor="date" className="label-element">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="input-element"
                onChange={this.onDateInput}
                value={dateInput}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="hr-line" />
          <div className="start-button-container">
            <p className="appointment-heading">Appointments</p>
            <button
              type="button"
              className={`start-button ${filterClassName}`}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="all-list-items">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                onToggleStar={this.onToggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
