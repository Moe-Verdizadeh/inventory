import React from 'react';
import { Table, Button } from 'react-bootstrap';

function ItemTable({items, showHandler, deleteHandler}) {
    return (
        <div >
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr> 
                        <th>Name</th>
                        <th>Pounds</th>
                        <th>oz</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) =>(
                        <tr key={item._id}>
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
    )
}

export default ItemTable;