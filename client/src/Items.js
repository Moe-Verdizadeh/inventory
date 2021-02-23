import React, { useState, useEffect } from 'react'
import axios from './axios'

function Items() {
    const [items, setItems] = useState( [  ] );

    useEffect(() => { 
        async function fetchData(){
            const req = await axios.get('/inventory/item');

            setItems(req.data)
        }
        fetchData();
    }, [])

    console.log(items)


    return (
        <div>
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
