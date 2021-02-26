import React from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

function EditModal({show, closeHandler, editingChangeHandler, saveEditHandler, currentEditItem}) {
    return (
        
        <Modal show={show} onHide={closeHandler}>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Row className="justify-content-md-center">
                    <Col className="text-center" lg="2">
                        <Form.Label>Name</Form.Label>
                    </Col>
                    <Col lg="6">
                        <Form.Control placeholder="Name" name='name' onChange={editingChangeHandler} value={currentEditItem?.name ? currentEditItem.name : ""}/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col className="text-center" lg="2">
                        <Form.Label>lb</Form.Label>
                    </Col>
                    <Col lg="6">
                        <Form.Control placeholder="0 lb" name='amountInP' onChange={editingChangeHandler} value={currentEditItem?.amountInP ? currentEditItem?.amountInP : ""}/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col className="text-center" lg="2">
                        <Form.Label>oz</Form.Label>
                    </Col>
                    <Col lg="6">
                        <Form.Control placeholder="0 Oz" name='amountInOz' onChange={editingChangeHandler} value={currentEditItem?.amountInOz ? currentEditItem?.amountInOz : "" }/>
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
    )
}

export default EditModal;