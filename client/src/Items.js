import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Form, Table } from 'react-bootstrap'; 
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
                    name:'Brady Test 2',
                    amountInP: '133',
                    amountInOz: '7',
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
        <div >
            <div className="pt-5 pb-5">
                <Form>
                    <Row>
                        <Col>
                          <Form.Control placeholder="Name" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="0 lb" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="0 Oz" />
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={clickHandler} >New Item</Button>  
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
