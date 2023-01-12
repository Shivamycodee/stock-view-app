import React,{useEffect,useState} from 'react';
import FinnHub from '../api/finnHub';
import {BsFillCaretUpFill} from 'react-icons/bs'
import {BsFillCaretDownFill} from "react-icons/bs";
import { useGlobalContext } from '../Context/watchlistContext';
import { useNavigate } from 'react-router-dom';

const stockList = ()=>{

    const [stock, setStock] = useState([]);
    const { watchlist, removeStock } = useGlobalContext();
    const navigate = useNavigate();
    
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchlist.map((stock) => {
            return FinnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );

        // console.log(responses);
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        // console.log(data);
        if (isMounted) {
          setStock(data);
        }
      } catch (err) {}
    };
    fetchData();
    return () => (isMounted = false);
  },[watchlist]);


//     useEffect(() => {    // My useEffect code...
//       const getData = async () => {
//       watchlist.map(async(mnc)=>{   
//         var content = await FinnHub.get(`/quote`, {
//           params: {
//             symbol: mnc,
//           },
//         });
//         response.push({
//           data: content.data,
//           symbol: content.config.params.symbol,
//         });
//       })
//      };
//   getData()
//   setStock(response);
// }, []); 



  const priceColor= (value)=>{
    return value >= 0 ? "text-success" : "text-danger";
  } 

  const setIcon = (value)=>{
    return value >= 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  }

  const handleStockSelect = (symbol)=>{
      navigate(`detail/${symbol}`)
  }

  

    return (
      <div className="container">
        <table  className="table table-hover">
          <thead style={{ color: "rgb(79,89,102)" }}>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Last</th>
              <th scope="col">Chg</th>
              <th scope="col">Chg%</th>
              <th scope="col">High</th>
              <th scope="col">Low</th>
              <th scope="col">Open</th>
              <th scope="col">Pclose</th>
            </tr>
          </thead>
          {stock.map((val) => {
          return (
            <tbody style={{ cursor: "pointer" }} key={val.symbol}>
              <tr onClick={() => handleStockSelect(val.symbol)}>
                <th>{val.symbol}</th>
                <td className={priceColor(val.data.c)}>
                  {setIcon(val.data.c)}
                  {val.data.c}
                </td>
                <td className={priceColor(val.data.c)}>
                  {setIcon(val.data.d)}
                  {val.data.d}
                </td>
                <td className={priceColor(val.data.dp)}>
                  {setIcon(val.data.dp)}
                  {val.data.dp}
                </td>
                <td className={priceColor(val.data.h)}>
                  {setIcon(val.data.h)}
                  {val.data.h}
                </td>
                <td className={priceColor(val.data.l)}>
                  {setIcon(val.data.l)}
                  {val.data.l}
                </td>
                <td className={priceColor(val.data.o)}>
                  {setIcon(val.data.o)}
                  {val.data.o}
                </td>
                <td className={priceColor(val.data.pc)}>
                  {setIcon(val.data.pc)}
                  {val.data.pc}
                </td>
                <td>
                  <button
                    onClick={() => removeStock(val.symbol)}
                    className="btn btn-danger btn-sm ml-3 d-inline-block delete-button rmStock"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          );
        
})}
        </table>
      </div>
    );
}

export default stockList;