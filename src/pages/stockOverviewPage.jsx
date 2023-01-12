import React from 'react';
import AutoComplete from '../components/autoComplete';
import StockList from '../components/stockList';

const stockOverviewPage = () => {
  return <div className='container'>
           <AutoComplete />
           <StockList />
  </div>
};

export default stockOverviewPage;