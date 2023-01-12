import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FinnHub from "../api/finnHub";
import StockGraph from "../components/stockGraph";
import CompanyData from "../components/companyData"
// import "bootstrap/dist/css/bootstrap.min.css";



const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.floor(data.c[index]),
    };
  });
};

const stockDetailPage = () => {
  const { symbol } = useParams();

  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDay;
      if (date.getDay() === 6) oneDay = currentTime - 2 * 24 * 60 * 60;
      else if (date.getDay() === 0) oneDay = currentTime - 3 * 24 * 60 * 60;
      else oneDay = currentTime - 24 * 60 * 60;
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;

      try {
        const response = await Promise.all([
          FinnHub.get("/stock/candle", {
            params: {
              symbol: symbol,
              resolution: 30,
              from: oneDay,
              to: currentTime,
            },
          }),
          FinnHub.get("/stock/candle", {
            params: {
              symbol: symbol,
              resolution: 60,
              from: oneWeek,
              to: currentTime,
            },
          }),
          FinnHub.get("/stock/candle", {
            params: {
              symbol: symbol,
              resolution: "D",
              from: oneYear,
              to: currentTime,
            },
          }),
        ]);
        // let Day = [];
        // Day["c"] = response[0].data.c;
        // Day["t"] = response[0].data.t;

          setStockData({
            day: formatData(response[0].data),
            week: formatData(response[1].data),
            year: formatData(response[2].data),
          });
      } catch (e) {}
    };
    fetchData();
  }, [symbol]);

  return (
    <div>
      {stockData && <StockGraph symbol={symbol} stockData={stockData} />}
      <br />
      <br />
      <CompanyData symbol={symbol} />
    </div>
  );
};

export default stockDetailPage;
