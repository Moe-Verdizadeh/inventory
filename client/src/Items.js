import React, { useState, useEffect } from 'react'
import { Button, Col, Row, Form, Table, Modal } from 'react-bootstrap'; 
import axios from './axios'

function Items() {
    const [items, setItems] = useState([]);
    const [itemInfo, setItemInfo] = useState({});
    const [show, setShow] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState({});

    const closeHandler = (event) => {
        setCurrentEditItem({});
        setShow(false);
    };

    const saveEditHandler = (event) => {
        axios.put(`/inventory/item/${event.target.dataset.itemId}`,
        {
            editedItem: currentEditItem
        })
        .then(response => {
            console.log(response);
            setCurrentEditItem({});
            setShow(false);
            fetchData();
        })
        .catch(err => console.log(err));
    };

    const showHandler = async (event) => {
        try {
            const itemToEdit = await axios.get(`/inventory/item/${event.target.dataset.itemId}`);
            
            setCurrentEditItem(itemToEdit.data);
            setShow(true);
        } catch(err) {
            console.log(err);
        }
    };

    // fetching data
    async function fetchData(){
        const req = await axios.get('/inventory');
        console.log('request');
        console.log(req);

        setItems(req.data);
    }

    useEffect(() => { 
        fetchData();
    }, [])
    // adding data (button)
    async function clickHandler() {
        try {
            const req = await axios.post('/inventory/item',
            {
                newItem: itemInfo
            });

            console.log('posted');
            Array.from(document.querySelectorAll("input")).forEach(
                input => (input.value = "")
            );

            setItemInfo({});
            fetchData();
        } catch(error) {
            console.log('error');
            console.error(error);
        }
    }
    // adding data from input form to the 'setItemInfo'
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
    // adding data to 'currentEditItem'
    function editingChangeHandler(event) {
        event.persist();
        const name = event.target.name;
        const value = event.target.value;

        setCurrentEditItem(currentEditItem => {
            return {
                ...currentEditItem, [name]: value
            }
        });
    }
    //deleting data
    function deleteHandler(event){

        axios.delete(`/delete/${event.target.dataset.itemId}`)
        .then(response => {
            console.log('deleted');
            fetchData();
        })
        .catch(err => console.log(err));
 
    }

    return (
        <div >
            <div className="pt-5 pb-5">
                <Form>
                    <Row>
                        <Col>
                          <Form.Control placeholder="Name" onChange={changeHandler} name='name' value={itemInfo.name}/>
                        </Col>
                        <Col>
                            <Form.Control placeholder="0 lb" onChange={changeHandler} name='amountInP' value={itemInfo.amountInP}/>
                        </Col>
                        <Col>
                            <Form.Control placeholder="0 Oz" onChange={changeHandler} name='amountInOz' value={itemInfo.amountInOz}/>
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
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr> 
                            <th>Name</th>
                            <th>lb</th>
                            <th>oz</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) =>(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.amountInP}</td>
                                <td>{item.amountInOz}</td> 
                                <td><Button variant="outline-warning" data-item-id={item._id} onClick={showHandler}>Edit</Button> </td> 
                                <td><Button variant="outline-danger" data-item-id={item._id} onClick={deleteHandler}>Delete</Button> </td>
                            </tr> 
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal show={show} onHide={closeHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Test</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Row className="justify-content-md-center">
                        <Col className="justify-content-md-center" lg="6">
                            <Form.Label>Test</Form.Label>
                            <Form.Control placeholder="Name" name='name' onChange={editingChangeHandler} value={currentEditItem?.name}/>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="6">
                            <Form.Control placeholder="0 lb" name='amountInP' onChange={editingChangeHandler} value={currentEditItem?.amountInP}/>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="6">
                            <Form.Control placeholder="0 Oz" name='amountInOz' onChange={editingChangeHandler} value={currentEditItem?.amountInOz}/>
                        </Col>
                    </Row>
                </Form> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeHandler}>
                        Close
                    </Button>
                    <Button variant="primary" data-item-id={currentEditItem?._id} onClick={saveEditHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Items;
