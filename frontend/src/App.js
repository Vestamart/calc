import { Route, Routes } from 'react-router-dom';
import './reset.css';
import './Style.css';

import {useState} from 'react'
import Layout from './components/Layout';
import {CapitalCostPage} from './pages/CapitalCostPage';
import { FixedCostPage } from './pages/FixedCostPage';
import {HomePage} from './pages/HomePage';
import { ResultPage } from './pages/ResultPage';
import { VaribleCostPage } from './pages/VaribleCostPage';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HomePage art='Hello world'/>}/>
          <Route path='/capitalcost' element={<CapitalCostPage/>}/>
          <Route path='/variblecost' element={<VaribleCostPage />}/>
          <Route path='/fixedcost' element={<FixedCostPage/>}/>
          <Route path='/result' element={<ResultPage/>}/>
        </Route>
      </Routes>
    </>
  );
} 

export default App;
