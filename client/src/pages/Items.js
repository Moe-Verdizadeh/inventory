import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Table, Modal } from 'react-bootstrap'; 
import axios from '../axios';
import EditModal from '../components/EditModal';
import ItemTable from '../components/ItemTable';
import NewItemForm from '../components/NewItemForm';

function Items() {
    const [items, setItems] = useState([]);
    const [itemInfo, setItemInfo] = useState({});
    const [show, setShow] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState({});

    // fetching data
    async function fetchData(){
        const req = await axios.get('/inventory');
        console.log('request');
        console.log(req);

        setItems(req.data);
    }

    // shows the modal
    const showHandler = async (event) => {
        try {
            const itemToEdit = await axios.get(`/inventory/item/${event.target.dataset.itemId}`);
            
            setCurrentEditItem(itemToEdit.data);
            setShow(true);
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => { 
        fetchData();
    }, [])

    // adding data (button)
    async function clickHandler() {
        try {
            await axios.post('/inventory/item',
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
    
    //deleting data
    function deleteHandler(event){

        axios.delete(`/delete/${event.target.dataset.itemId}`)
        .then(response => {
            console.log('deleted');
            fetchData();
        })
        .catch(err => console.log(err));
 
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

    // saves the currently edited item
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

    // closes the modal without saving
    const closeHandler = (event) => {
        setCurrentEditItem({});
        setShow(false);
    };

    return (
        <div >
            <div className="pt-5 pb-5">
                <NewItemForm changeHandler={changeHandler} itemInfo={itemInfo} clickHandler={clickHandler}/>
            </div>  
            <div>
                <ItemTable items={items} showHandler={showHandler} deleteHandler={deleteHandler} />
            </div>
            <EditModal show={show} closeHandler={closeHandler} editingChangeHandler={editingChangeHandler} saveEditHandler={saveEditHandler} currentEditItem={currentEditItem} />
        </div>
    )
}

export default Items;
