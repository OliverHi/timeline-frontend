import React from 'react';
import DayList from './components/DayList'
import Button from 'react-bootstrap/Button'

class TimelineApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {days: []};

        this.addDay = this.addDay.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/day')
            .then(res => res.json())
            .then((data) => {
                console.log("Received json data from backend for days" ,data);
                this.setState({ days: data })
            })
            .catch(console.error)
    }

    render() {
        return (
            <div>
                <h1 className={'text-center'}>Timeline</h1>
                <DayList days={this.state.days} />

                <div className={'text-center'}>
                    <Button id={'newDay'} variant="outline-secondary" size="lg" onClick={this.addDay}>
                        Add today to the list
                    </Button>
                </div>
            </div>
        );
    }

    addDay(e) {
        e.preventDefault();
        var date = new Date();
        console.log('New day with date ', date);

        const newDay = {
            id: date.getTime(),
            name: date.toLocaleDateString(),
            tasks: []
        };

        fetch('http://localhost:3000/api/day', {method: 'POST', body: JSON.stringify(newDay), headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})
            .then(res => res.json())
            .then((data) => {
                console.log("Successfully created new day ", data);
                this.setState(state => ({
                    days: state.days.concat(data)
                }));
            })
            .catch(console.error)
    }
}

export default TimelineApp;