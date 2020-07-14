import React from 'react';

class Card extends React.Component {
    render() {
        let newDate = new Date();
        const weekday = this.props.day.dt * 1000
        newDate.setTime(weekday)

        const imgURL = "owf owf-"+ this.props.day.weather[0].id +" owf-5x red"

        // const farenheit = (parseInt(this.props.day.main.temp) - 273.15) * (9/5) + 32


        return (
            <div className="col-auto">
                <div className="card bg-light">
                    <i className={imgURL}></i>
                    <h2>{Math.round(this.props.day.main.temp)} °F</h2>
                    <div className="card-body">
                        <p className="card-text">{this.props.day.weather[0].description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;
