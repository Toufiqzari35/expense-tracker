import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from "react-chartjs-2";
import './bootstrap.css';
import Navbar from './Navbar';
import Card from './Card';
import axios from 'axios';
import YearMonthPicker from './YearMonthPicker';

function Home() {
  let token = '8b8682cf23fd2ead33e2d37f4060e88733fbff9b';
  let todaysDate = new Date()
  let currentMonth = todaysDate.getMonth() + 1;
  
  // let monthsArray = [
  //   {1 : "Jan"},
  //   {2 : "Feb"},
  //   {3 : "Mar"},
  //   {4 : "Apr"},
  //   {5 : "May"},
  //   {6 : "Jun"},
  //   {7 : "Jul"},
  //   {8 : "Aug"},
  //   {9 : "Sep"},
  //   {10 : "Oct"},
  //   {11 : "Nov"},
  //   {12 : "Dec"}
  // ]

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(todaysDate.getFullYear());
  const [barChartData, setBarChartData] = useState({});
  const [doghoutChartData, setDoghoutChartData] = useState({});
  const [lineChartData, setLineCHartData] = useState({});
  const [monthSum, setMonthSum] = useState();
  const [lastmonthSum, setLastMonthSum] = useState();
  const [todaySum, setTodaySum] = useState();
  const [yesterdaySum, setYesterdaySum] = useState();

  let daysOfMonth = new Date(year, month, 0).getDate();

  const getCardData = () => {
    axios.get(`http://localhost:8000/expenses/getCardData/`, {
      headers: {
        'Authorization': `token ${token}`
      },
    })
    .then(res => {
      if (res.status === 200) {
        setTodaySum(res.data.today_sum)
        setYesterdaySum(res.data.yesterday_sum)
        setMonthSum(res.data.month_sum)
        setLastMonthSum(res.data.last_month_sum)
      }
    });
  }


  const getGraphData = () => {
    let graphData = [];
      let graphColor = {
        'Grossery' : 'rgb(255, 99, 132)',
        'Outing' :  'rgb(54, 162, 235)',
        'Medicine' : 'rgb(255, 205, 86)',
        'Telecommunication' : 'rgb(232, 102, 206)',
        'Shopping' : 'rgb(150, 210, 112)',
        'Other' : 'rgb(260, 140, 112)',
        'Bills' : 'rgb(180, 120, 112)'
      }
      let doughnut_label = []
      let doughnut_data = []
      let doughnut_color = []
      let lineChartRawData = Array.from(Array(daysOfMonth), () => 0)
      let daysAsLabel = Array.from(Array(daysOfMonth), (_, index) => index + 1)
  
  
      axios.get(`http://localhost:8000/expenses/getGraphData/?month=${month}&year=${year}`, {
          headers: {
            'Authorization': `token ${token}`
          },
        })
        .then(res => {
          if (res.status === 200) {

            for (const data of Object.keys(res.data.daily_data)) {

              graphData.push({
                "label" : data,
                "data" : res.data.daily_data[data],
                "backgroundColor" : graphColor[data]
              })
              doughnut_label.push(data)
              doughnut_color.push(graphColor[data])
              const totalSpend = res.data.daily_data[data].reduce((totalAmount, amount) => totalAmount + amount, 0);
              doughnut_data.push(totalSpend)

              // add day to day data in single array for line chart
              let linedata = lineChartRawData.map((sum, x) => sum + res.data.daily_data[data][x], 0);
              lineChartRawData = linedata;
            }

            setBarChartData({
              labels: daysAsLabel,
              datasets: graphData
            });
            
            setDoghoutChartData({
              datasets: [
                {
                  label: 'Todays Expenses',
                  data: doughnut_data,
                  backgroundColor: doughnut_color,
                  hoverOffset: 10,
              }],
              labels: doughnut_label,
            })

            setLineCHartData({
              labels: daysAsLabel,
              datasets: [
                {
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgb(54, 162, 235)',
                  borderWidth: 3,
                  data: lineChartRawData
                }
              ]
            })
        }
      })
  }

  const option = {
    responsive: true,
    scales: {
      xAxes: [{
          stacked: true
      }],
      yAxes: [{
          stacked: true
      }]
    } 
  };
  

const changeMonth = (event) => {
  setMonth(event.getMonth()+1)
  setYear(event.getFullYear())
}

/**
 * Get and show card data 
 */
useEffect( () => { 
  getCardData();
}, []);
  

/**
 * Get graph data and 
 */
useEffect( () => {    
  getGraphData();
}, [month, year]);



  return (
    <>
      <Navbar />
      <div className="container" style={{marginTop : '60px'}}>
        <Card todaySum={todaySum} yesterdaySum={yesterdaySum} monthSum={monthSum} lastmonthSum={lastmonthSum}/>
        <div className="row">
          <div className="col-12">
          <div className="row">
          <span className="col-6">
            <h2> Category wise day to day data</h2>
          </span>
          <span className="col-6">
            <YearMonthPicker parentcallback={changeMonth}/>
          </span>
          </div>
          <Bar data={barChartData} width={500} height={100} options={option}/>
          </div>
          <div className="col-lg-6">
            <h2>Category wise months data</h2>
            <Doughnut data={doghoutChartData} />
          </div>
          <div className="col-lg-6">
          <Line
          data={lineChartData}
          options={{
            title:{
              display:true,
              text:'Monthly Expenses',
              fontSize:32,
              fontColor:'#ebebeb',
              fontFamily: 'Lato',
            },
            legend:{
              display:false,
            }
          }}
        />
          </div>
          </div>
      </div>
    </>
  );
}

export default Home;
