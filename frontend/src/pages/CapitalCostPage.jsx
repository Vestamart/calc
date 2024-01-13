import React from 'react';
import PageTemplate from './PageTemplate';
import API from '../components/API'


const CapitalCostPage = () => { 

    const page = ['capitalcost','КАПИТАЛЬНЫЕ РАСХОДЫ']
    const name = 'capitalcost'
    const month = '0'
    
    const addData = (totalcost) => {
        if (totalcost != '') {
            API.CreateItem({name,totalcost,month}, 'result')
            .catch(err => console.log(err))
            API.Check('result')
            .catch(err => console.log(err))
        } else if (totalcost === 0) {
            API.CreateItem({name,totalcost,month}, 'result')
            .catch(err => console.log(err))
            API.Check('result')
            .catch(err => console.log(err))
        }
    }

    return (
        <PageTemplate page={page} handlerData = {addData}/>
    );
}

export {CapitalCostPage};
