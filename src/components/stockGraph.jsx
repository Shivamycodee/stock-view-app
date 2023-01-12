import React,{useState,useEffect} from "react";
import Chart from "react-apexcharts";


const stockGraph = ({symbol,stockData})=>{

    const {day,week,year} = stockData;
    const [graphRange,setGraphRange] = useState("")

   useEffect(()=>{

   },[graphRange])


    const options = {
      title: {
        text: symbol,
        align: "center",
        style: {
          fontSize: "24px",
        },
      },
      chart: {
        id: "Stock Data Chart",
        animations: {
          speed: 1300,
        },
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeUTC: false,
        },
      },
      tooltip: {
        x: {
          format: "MMM dd HH:MM",
        },
      },
    };

    
    const series = [
      {
        name: symbol,
        data: graphRange || day,
      },
    ];



     

    return (
      <div className="mt-5 p-4 shadow-sm bg-white">
        <div style={{ width: "60%",marginLeft:"200px" }}>
          <Chart options={options} series={series} type="area" width="100%" />
          <button
            style={{ marginLeft: 240, minWidth: 70 }}
            className="btn btn-primary"
            onClick={() => setGraphRange(day)}
          >
            Day
          </button>
          <button
            style={{ marginLeft: 50, marginRight: 50, minWidth: 70 }}
            className="btn btn-primary"
            onClick={() => setGraphRange(week)}
          >
            Week
          </button>
          <button
            style={{ minWidth: 70 }}
            className="btn btn-primary"
            onClick={() => setGraphRange(year)}
          >
            Year
          </button>
        </div>
      </div>
    );
}

export default stockGraph;