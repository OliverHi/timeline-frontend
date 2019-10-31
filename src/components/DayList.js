import React from "react";
import Day from './Day'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

class DayList extends React.Component {
    render() {
        if (this.props.days.length) {
            return (
                <VerticalTimeline>
                    {this.props.days.map((day, index) => (
                        <VerticalTimelineElement iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }} position={index % 2 === 0 ? 'left' : 'right'}>
                            <h3 className="vertical-timeline-element-title">{day.name}</h3>
                            <Day date={day.name} id={day.id} tasks={day.tasks}/>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            );
        } else {
            return (
                <div className={"text-center"}>
                    Nothing yet
                </div>
            )
        }
    }
}

export default DayList;