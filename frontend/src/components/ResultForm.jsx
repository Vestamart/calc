import React, {useState, useEffect} from 'react';
import API from './API';


const ResultForm = (props) => {
    
    // const    

    useEffect(() =>{
        
    },[])

    return (
        <div>
            <p>{props.month}</p>
            <input type="text" placeholder='Трафик' onChange={(e)=> (e.target.value)}/>
            <input className='tar' type="number" placeholder='Сезон%' onChange={(e)=> (e.target.value)}/>
        </div>
        )
}

export default ResultForm;
