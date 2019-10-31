import React from "react";
import './styles.css';
import ListGroup from 'react-bootstrap/ListGroup'

class Day extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newTask: '',
            tasks: this.props.tasks
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addTask(task) {
        console.log('Adding new task', this.props.id, task);
        const newTaskForDay = {
            task: {
                task: task,
                id: new Date().getTime()
            },
            dayId: this.props.id
        };

        console.log(JSON.stringify(newTaskForDay));
        fetch('http://localhost:3000/api/task', {method: 'POST', body: JSON.stringify(newTaskForDay),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }})
            .then((data) => {
                console.log("Successfully added task to day ", data);
                this.setState(state => ({
                    tasks: state.tasks.concat(newTaskForDay.task),
                    newTask: ''
                }));
            })
            .catch(console.error)
    }

    handleChange(event) {
        this.setState({newTask: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.addTask(this.state.newTask);
    }

    render() {
        if (this.state.tasks && this.state.tasks.length) {
            return (
                <div className={'Day'}>
                    <ListGroup variant="flush">
                        {this.state.tasks.map(task => (
                            <ListGroup.Item>{task.task}</ListGroup.Item>
                        ))}
                    </ListGroup>

                    <form onSubmit={this.handleSubmit} className={'add-day-form'}>
                        <input
                            id="new-task"
                            type="text"
                            value={this.state.newTask}
                            onChange={this.handleChange}
                        />
                    </form>
                </div>
            );
        } else {
            return (
                <div className={'Day'}>
                    <ListGroup variant="flush">
                        <ListGroup.Item variant="light">Nothing yet</ListGroup.Item>
                    </ListGroup>

                    <form onSubmit={this.handleSubmit} className={'add-day-form'}>
                        <input
                            id="new-task"
                            type="text"
                            value={this.state.newTask}
                            onChange={this.handleChange}
                        />
                    </form>
                </div>
            )
        }
    }
}

export default Day;