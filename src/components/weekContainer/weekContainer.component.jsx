import React from 'react';
import config from "../../config";
import Card from "../card/card.component";

const weatherURLInit = "http://api.openweathermap.org/data/2.5/forecast?zip=32789,us&units=imperial&APPID=" + config.openWeatherMapKey;

class WeekContainer extends React.Component {
    state = {
        days: [],
        search: '',
        city: ''
    }

    componentDidMount = () => {
        fetch(weatherURLInit)
            .then(res => res.json())
            .then(data => {
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                this.setState({days: dailyData, city: data.city.name})

            })
    }

    handleChange = e => {
        this.setState({search: e.target.value});
    }

    callApi = () => {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.search},us&units=imperial&APPID=${config.openWeatherMapKey}`)
            .then(res => res.json())
            .then(data => {
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                this.setState({days: dailyData, city: data.city.name})

            })
    }

    formatCards = () => {
        return this.state.days.map((day, index) => <Card day={day} key={index}/>)
    }

    render() {
        return (
            <div className="container">
                <h1 className="display-3 jumbotron">5-Day Forecast for {this.state.city}.</h1>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search by city or zip"
                                   onChange={this.handleChange}
                                   aria-label="Search by city or zip" aria-describedby="button-addon2" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" onSubmit={this.callApi} type="button"
                                            id="button-addon2">Search
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">

                    {this.formatCards()}

                </div>
            </div>
        )
    }
}

export default WeekContainer;


