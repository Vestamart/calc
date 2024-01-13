import React, {useState, useEffect} from 'react';
import API from './API';


const Form = (props) => {

    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [amount, setAmount] = useState('')
    const [cost,setCost] = useState('')
    const [resultCost,setResultCost]= useState('')

    const month = props.month
    const editItem = () => {
        API.EditItem(props.item.id, {name,price,amount,cost,month}, props.page)
        .then(resp => props.updatedData(resp))
        .catch(err => console.log(err))
        props.closeForm()
    }

    const createItem = () => {
        API.CreateItem({name,price,amount,cost,month}, props.page)
        .then(resp => props.createdData(resp))
        .catch(err => console.log(err))
        props.closeForm()
    }

    const getItem = () => {
        fetch(`http://localhost:5000/${props.page}/get`, {
                'method':'GET',
                headers: {
                    'Content-Type':'application/json'
                }
            })
            .then(resp=>resp.json())
            .then(resp => getResult(resp))
            .catch(err => console.log(err))
        }
        
        useEffect(()=> {
            props.raiseCost(resultCost,month)
        },[resultCost])

    const getResult = (items) => {
        var result = 0
        try {items.map((el) => {
            if (el.month == props.month)
            result = result + el.cost
        })} catch {
            result = null
        }
            finally {
            setResultCost(result)
        }
    }
    
    
    useEffect(()=> {
        setCost(price*amount)
        getItem()
        
    })
    
    useEffect(()=> {
        setName(props.item.name)
        setPrice(props.item.price)
        setAmount(props.item.amount)
        setCost(props.item.cost)
    },[props.item])


    return (
        <tfoot>
            {props.item ? (
                <tr>
                    <td className='td-input '></td>
                    <td className='td-input '>
                        <input type="text" clas placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)}/>
                    </td>
                    <td className='td-input '>
                        <input className='tar' type="number" placeholder='Price' value={price} onChange={(e)=> setPrice(e.target.value)}/>
                    </td>
                    <td className='td-input '>
                        <input className='tar' type="number" placeholder='Amount'value={amount} onChange={(e)=> setAmount(e.target.value)}/>
                    </td>
                    <td className='tar td-input'>{resultCost}</td>
                    <td className='tar td-btn td-input'>
                    {
                        props.item.id ?
                        <button onClick={editItem}><img className='icon' src='img/tick_icon.svg' alt='success'></img></button> 
                        :
                        <button onClick={createItem}><img className='icon' src='img/add_icon.svg' alt='create'></img></button>
                    }
                    </td>
                </tr>
            ): null }
        </tfoot>
    );
}

export default Form;
