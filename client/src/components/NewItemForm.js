import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

function NewItemForm ({changeHandler, itemInfo, clickHandler}) {
    return (
        <div className="pt-5 pb-5">
            <Form>
                <Row>
                    <Col>
                        <Form.Control placeholder="Name" onChange={changeHandler} name='name' value={itemInfo.name ? itemInfo.name : ""}/>
                    </Col>
                    <Col>
                        <Form.Control placeholder="0 P" onChange={changeHandler} name='amountInP' value={itemInfo.amountInP ? itemInfo.amountInP : ""}/>
                    </Col>
                    <Col>
                        <Form.Control placeholder="0 Oz" onChange={changeHandler} name='amountInOz' value={itemInfo.amountInOz ? itemInfo.amountInOz : ""}/>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={clickHandler}>New Item</Button>
                    </Col>
                </Row>
                <Row>
                    
                </Row>
            </Form>
        </div>
    )
}

export default NewItemForm;