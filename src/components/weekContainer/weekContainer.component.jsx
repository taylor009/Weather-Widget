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
        let zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;

        let search = this.state.search;

        if (zipCodePattern.test(search)) {
            fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${this.state.search},us&units=imperial&APPID=${config.openWeatherMapKey}`)
                .then(res => res.json())
                .then(data => {
                    const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
                    this.setState({days: dailyData, city: data.city.name})
                })
        } else {
            console.error(`Incorrect zipcode entered`);
        }
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.callApi();
    }

    formatCards = () => {
        return this.state.days.map((day, index) => <Card day={day} key={index}/>)
    }

    render() {
        return (
            <div className="container">
                <h1 className="display-3 jumbotron">5-Day Forecast for {this.state.city}</h1>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <form className="form-inline" onSubmit={this.handleSubmit}>
                                <div className="form-group m-3">
                                    <input type="text" id="search" className="form-control" placeholder="Search by zip"
                                           onChange={this.handleChange}
                                           aria-label="Search by zip" aria-describedby="button-addon2"/>
                                </div>
                                    <button className="btn btn-outline-secondary" type="submit"
                                            id="button-addon2">Search
                                    </button>
                            </form>
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


