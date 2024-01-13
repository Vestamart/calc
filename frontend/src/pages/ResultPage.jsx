import React, {useState, useEffect} from 'react';
import API from '../components/API'

const ResultPage = () => {
    const [resultData, setResultData] = useState()
    const months = ['Январь','Февраль', 'Март', 'Апрель', 'Май','Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const [traffic, setTraffic] = useState()
    const [basicPrice, setBasicPrice] = useState()
    const [sesson, setSesson] = useState(new Map)

    useEffect(()=>{
        API.Check('result')
        .catch(err => console.log(err))
        fetch(`http://localhost:5000/result/get`, {
            'method':'GET', 
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(resp=>resp.json())
        .then(resp => setResultData(resp.sort((a,b)=> a.month - b.month)))
        .catch(err => console.log(err))
    },[])
    
    const monthSessonHandler = (month,e) => {
        setSesson(sesson.set(months.indexOf(month)+1,e.target.value))
    }

    const countRevenue = (count) => {
        var revenue = 0
        if (traffic && basicPrice && sesson.get(count)){
            revenue = traffic * basicPrice * (sesson.get(count)/100)
        } else if ( traffic && basicPrice) {
            revenue = traffic * basicPrice
        }
        return revenue.toFixed(0)
    }
    const varibleCost = (count) => {
        var variblecost = 0
        {resultData && resultData.map(data => {
            if (data.name == "variblecost" && data.month == count) {
                variblecost = data.totalcost
            }
        })}
        return variblecost.toFixed(0)
    }
    const grossProfit = (count) => {
        return (countRevenue(count) - varibleCost(count)).toFixed(0)
    }
    const fixedCost = (count) => {
        var fixedcost = 0
        {resultData && resultData.map(data => {
            if (data.name == "fixedcost" && data.month == count) {
                fixedcost = data.totalcost
            }
        })}
        return fixedcost.toFixed(0)
    }
    const capitalCost = () => {
        var capitalcost = 0
       {resultData && resultData.map(data => {
            if (data.name == 'capitalcost') {
                capitalcost = data.totalcost
            }
        })}
        return capitalcost
    }
    const profitBeforeTax = (count) => {
        return (grossProfit(count) - fixedCost(count)).toFixed(0)
    }
    const tax = (count) => {
        return (profitBeforeTax(count)*0.06).toFixed(0)
    }
    const profit = (count) => {
        return (profitBeforeTax(count) - tax(count)).toFixed()
    }
    return (
        <div>
            <h1>РЕЗУЛЬТАТ</h1>
            <div>
                <h2>Сезонность в %</h2>
                <p className='subTitle'>(от 0 до 1000)</p>
                <div className='sessons'>
                    {months.map((month,counter) => {
                        return (
                            <div key={counter+1} className='sesson'>
                                <p>{month}:</p>  
                                <input type='number' defaultValue={100} onChange={(e)=> {monthSessonHandler(month,e) 
                                setTraffic(traffic)}}/>
                            </div>
                        )
                    }
                    )}
                </div>
                <h2>Базовое значение</h2>
                <div className='result-constant'>
                    <div className='result-constant-item'>
                        <label>Трафик</label>
                        <hr />
                        <input type='number' placeholder='Кол-во клиентов' onChange={(e) => setTraffic(e.target.value)}/>
                    </div>
                    <div className='result-constant-item'>
                        <label>Цена</label>
                        <hr />
                        <input type='number' placeholder='Средний чек' onChange={(e) => setBasicPrice(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div>
                <h2 className='total'>Итого</h2>
                <p className='capitalcost'><span className='color'>Капитальные расходы:</span> {capitalCost()}</p>
                <table>
                    <thead>
                        <tr>
                        <th>Показатели</th>
                        {months.slice(0,6).map(month => {
                            return (
                                <th className='result' key={month}>{month}</th>
                                )
                            }
                            )}
                        </tr>
                    </thead>
                    <tbody className='tbody-result'>
                    <td className='result border-none'>
                            <tr className='category button_border'>Выручка</tr>
                            <tr className='category button_border'>Переменные расходы</tr>
                            <tr className='category button_border'>Валовая прибыль</tr>
                            <tr className='category button_border'>Постоянные расходы</tr>
                            <tr className='category button_border'>Прибыль до налогообложения</tr>
                            <tr className='category button_border'>Налог</tr>
                            <tr className='category'>Чистая прибль</tr>
                       </td>
                        {months.slice(0,6).map((el, counter) =>{
                            return(
                                <td className='result '>
                                <tr className='fr button_border'><p>{countRevenue(counter+1)}</p></tr>
                                <tr className='fr two-lines button_border'><p>{varibleCost(counter+1)}</p></tr>
                                <tr className='fr button_border two-lines'><p>{grossProfit(counter+1)}</p></tr>
                                <tr className='fr two-lines button_border'><p>{fixedCost(counter+1)}</p></tr>
                                <tr className='fr two-lines button_border'><p>{profitBeforeTax(counter+1)}</p></tr>
                                <tr className='fr button_border'><p>{tax(counter+1)}</p></tr>
                                <tr className='fr '><p>{profit(counter+1)}</p></tr>
                             </td>)})}
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr>
                        <th>Показатели</th>
                        {months.slice(6).map(month=> {
                            return (
                                <th className='result' key={month}>{month}</th>
                                )
                            }
                            )}
                        </tr>
                    </thead>
                    <tbody className='tbody-result'>
                    <td className='result border-none'>
                            <tr className='category button_border'>Выручка</tr>
                            <tr className='category button_border'>Переменные расходы</tr>
                            <tr className='category button_border'>Валовая прибыль</tr>
                            <tr className='category button_border'>Постоянные расходы</tr>
                            <tr className='category button_border'>Прибыль до налогообложения</tr>
                            <tr className='category button_border'>Налог</tr>
                            <tr className='category'>Чистая прибль</tr>
                        </td>
                        {months.slice(6).map((el, counter) =>{
                            return(
                                <td className='result '>
                                <tr className='fr button_border'><p>{countRevenue(counter+7)}</p></tr>
                                <tr className='fr two-lines button_border'><p>{varibleCost(counter+7)}</p></tr>
                                <tr className='fr button_border two-lines'><p>{grossProfit(counter+7)}</p></tr>
                                <tr className='fr two-lines button_border'><p>{fixedCost(counter+7)}</p></tr>
                                <tr className='fr two-lines button_border'><p>{profitBeforeTax(counter+7)}</p></tr>
                                <tr className='fr button_border'><p>{tax(counter+7)}</p></tr>
                                <tr className='fr '><p>{profit(counter+7)}</p></tr>
                        </td>)})}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export {ResultPage};
