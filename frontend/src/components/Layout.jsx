import { NavLink, Outlet } from "react-router-dom";
import React from 'react';

const Layout = () => {
    return (
        <>
        <nav>
            <div  className="flex">
                <NavLink to='/'>Главная</NavLink>
                <NavLink to='/capitalcost'>Капитальные расходы</NavLink>
                <NavLink to='/fixedcost'>Постоянные расходы</NavLink>
                <NavLink to='/variblecost'>Переменные расходы</NavLink>
                <NavLink to='/result'>Результат</NavLink>
            </div>
            <hr className="hr-nav"></hr>
        </nav>  
        <hr/>
        <div className="container">
            <Outlet/>
        </div>
        </>
    );
}

export default Layout;

