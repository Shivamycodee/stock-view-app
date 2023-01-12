import React,{useState,useEffect} from "react"
import FinnHub from '../api/finnHub';

const companyData = ({symbol})=>{

    const [Data,setData] = useState("");


    useEffect(()=>{
        const fetchData =async()=>{
           const {data} = await FinnHub.get("/stock/profile2", {
               params: {
                   symbol: symbol,
               },
               });
              setData(data);
              console.log(data);
           }
        fetchData();
    },[])
           
       
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
          className="container"
        >
          <div className="row">
            <p>
              <b>Country: </b>
              {Data.country}
            </p>
            <p>
              <b>Symbol: </b>
              {symbol}
            </p>
            <p>
              <b>Currency: </b>
              {Data.currency}
            </p>
          </div>
          <div className="row">
            <p>
              <b>Exchange: </b>
              {Data.exchange}
            </p>
            <p>
              <b>Name: </b>
              {Data.name}
            </p>
            <p>
              <b>IPO Date: </b>
              {Data.ipo}
            </p>
          </div>
          <div className="row">
            <p>
              <b>Market Capital: </b>
              {Data.marketCapitalization}
            </p>
            <p>
              <b>URL: </b>
              {Data.weburl}
            </p>
            <p>
              <b>Logo: </b>
              <img
                style={{ borderRadius: 50, width: 40, height: 40 }}
                src={Data.logo}
                alt="stockLogo"
              />
            </p>
          </div>
        </div>
        <hr />
        <i style={{ marginLeft: "530px" }}>
          Made by DecaStore
          <span role="img" aria-label="snowflake">
            ❄️
          </span>
        </i>
        <br />
      </div>
    );
}

export default companyData;