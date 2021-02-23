import React, { useState, useEffect } from 'react'
import axios from './axios'

function Items() {
    const [items, setItems] = useState([]);
    
    async function fetchData(){
        const req = await axios.get('/inventory/item');
        console.log('request');
        console.log(req);

        setItems(req.data)
    }

    useEffect(() => { 
        fetchData();
    }, [])

    async function clickHandler() {
        try {
            const req = await axios.post('/inventory/item',
            {
                newItem: {
                    name:'Brady Test',
                    amountInP: '6',
                    amountInOz: '10',
                }
            });

            console.log('posted');

            fetchData();
        } catch(error) {
            console.log('error');
            console.error(error);
        }
    }


    return (
        <div>
            <button onClick={clickHandler}>New Item</button>
        <p>this is the items list</p><br/>
            {items.map((item) =>(
                <h4>
                    <span>{item.name} </span><br/><br/>
                    <span>{item.amountInP} Pounds </span><br/><br/>
                    <span>{item.amountInOz} Oz </span><br/><br/><br/><br/>
                </h4> 
            ))}
        </div>
    )
}

export default Items
