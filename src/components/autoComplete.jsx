import image from '../images/bull.jpg';
import React, { useState, useEffect,useContext } from "react";
import FinnHub from "../api/finnHub";
import { watchlistContext } from '../Context/watchlistContext';

const autoComplete = ()=>{
 
 const [showList, setShowList] = useState("");
 const [result, setResult] = useState([]);
 const {addStock} = useContext(watchlistContext);

  const renderDropdown = ()=>{
     const dropVal = showList ? "show":null;
     return(
      <ul style={{
        height:"450px",
        overflowY:"scroll",
        overflowX:"hidden",
        cursor:"pointer"
        }} className={`dropdown-menu ${dropVal}`}>
        {result.map((elm)=>{
        return (
          <li className="dropdown-item" key={elm.symbol} onClick={()=>addStock(elm.symbol)}>
            {elm.description} ({elm.symbol})
          </li>
        );
        })}
      </ul>
     )
  }

 useEffect(() => {
   var isMounted = true;
   const fetchData = async () => {
     try {
       const responses = await FinnHub.get("/search", {
         params: {
           q: showList,
         },
       });

       if(isMounted) setResult(responses.data.result);
     } catch (err) {}
   };
   if(showList.length > 0)  fetchData();
   else setResult([])
   return (()=>isMounted=false)
 }, [showList]);



return <div className="w-50 p-5 rounded mx-auto">
        <img
          src={image}
          style={{ width: 190, height: 190, marginLeft:130 }}
          alt="bull"
        ></img>
        <div className="from-floating dropdown">
          <input
            style={{ backgroundColor: "rgba(145,158,171,0.04)" }}
            id="search"
            className="form-control"
            placeholder="Search"
            type="text"
            value={showList}
            autoComplete="off"
            onChange={(e) => setShowList(e.target.value)}
          ></input>
           {renderDropdown()}
        </div>
      </div>
}

export default autoComplete;