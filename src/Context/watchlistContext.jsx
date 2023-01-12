import React, { useState,useContext, useEffect} from "react";

export const watchlistContext = React.createContext();

 const watchlistContextProvider = (props) => {

    const [watchlist, setWatchlist] = useState(
      localStorage.getItem("watchlist").split(",") || [("GOOGL", "GS", "HON")]
    );
    
    useEffect(()=>{
      localStorage.setItem("watchlist",watchlist);
    },[watchlist])

    console.log("localstore watchlist",(localStorage.getItem("watchlist").split(",")));
     
    const addStock = (stock)=>{
       if(!watchlist.includes(stock)) {
        setWatchlist([...watchlist,stock]);
       }
       else alert("already exist")
    }

    const removeStock = (symbol)=>{

        const response = watchlist.filter((val)=>val !== symbol)
        return setWatchlist(response);
        
    }

  return <watchlistContext.Provider value={{ watchlist,setWatchlist,addStock,removeStock }}>
      {props.children}
    </watchlistContext.Provider>
};


export const useGlobalContext = () => {
  return useContext(watchlistContext);
};


export default watchlistContextProvider;
