import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Form, Table } from 'react-bootstrap'; 
import axios from './axios'

function Items() {
    const [items, setItems] = useState([]);
    const [itemInfo, setItemInfo] = useState({});
    
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
                newItem: itemInfo
            });

            console.log('posted');

            fetchData();
        } catch(error) {
            console.log('error');
            console.error(error);
        }
    }

    function changeHandler(event) {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;

        setItemInfo(itemInfo => {
            return {
                ...itemInfo, [name]: value
            }
        });
    }

    return (
        <div >
            <div className="pt-5 pb-5">
                <Form>
                    <Row>
                        <Col>
                          <Form.Control placeholder="Name" onChange={changeHandler} name='name'/>
                        </Col>
                        <Col>
                            <Form.Control placeholder="0 lb" onChange={changeHandler} name='amountInP'/>
                        </Col>
                        <Col>
                            <Form.Control placeholder="0 Oz" onChange={changeHandler} name='amountInOz'/>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={clickHandler}>New Item</Button>  
                        </Col>
                    </Row>
                    <Row>
                        
                    </Row>
                </Form> 
            </div>  
            <div>
                {items.map((item) =>( 
                    <div> 
                        <Table striped bordered hover>
                            <thead>
                                <tr> 
                                    <th>Name</th>
                                    <th>lb</th>
                                    <th>oz</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.amountInP}</td>
                                    <td>{item.amountInOz}</td> 
                                </tr> 
                            </tbody>
                        </Table>
                    </div> 
                ))}
            </div>
        </div>
    )
}

export default Items
