import React from 'react'
import { Nav, Navbar, Row } from "react-bootstrap";


export default function Sidebar() {
    return (
        <div className="col-2">   
                <Navbar bg="dark" variant="dark">
                    <Row >
                        <span>
                            INVENTORY 
                        </span> 
                    </Row>
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link href="/home">Active</Nav.Link>
                        <Nav.Link eventKey="link-1">Link</Nav.Link>
                        <Nav.Link eventKey="link-2">Link</Nav.Link> 
                    </Nav>
                </Navbar> 
        </div>
    )
}
