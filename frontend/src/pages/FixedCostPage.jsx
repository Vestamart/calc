import React from 'react';
import PageTemplate from './PageTemplate';
import API from '../components/API'

const FixedCostPage = () => {

    const page = ['fixedcost','ПОСТОЯННЫЕ РАСХОДЫ']
    const name = 'fixedcost'

    const addData = (totalcost, month) => {
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
        <PageTemplate  page={page} month={true} handlerData = {addData}/>
    );
}
export {FixedCostPage};
