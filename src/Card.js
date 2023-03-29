import React from 'react';
import Counter from 'react-number-counter'

const Card = (props) =>  {
    let initialData = 500;
    return (
        <>
            <div className="row">
                <div className="col-lg-3">
                    <div className="card text-grey bg-dark mb-3" >
                        <div className="card-body">
                            <h5 className="card-title">Today </h5>
                            <h1 className="card-title"><Counter start={initialData} end={props.todaySum} delay={1} /> </h1>
                            <p className="card-text">
                                <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card text-white bg-info mb-3" >
                        <div className="card-body">
                        <h5 className="card-title">Yesterday</h5>
                        <h1 className="card-title"><Counter start={initialData} end={props.yesterdaySum} delay={1} /></h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card text-white bg-success mb-3" >
                        <div className="card-body">
                        <h5 className="card-title">This month</h5>
                        <h1 className="card-title">{props.monthSum}</h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <div className="card text-white bg-danger mb-3" >
                        <div className="card-body">
                        <h5 className="card-title">Last Month</h5>
                        <h1 className="card-title">{props.lastmonthSum}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;