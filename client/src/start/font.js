import React from 'react';
import {Link} from 'react-router-dom';
import {Nav} from 'react-bootstrap';

const Template = ({children}) => 
    <div style={{width : '50%' , marginTop : '20px'}}>
        <Nav variant="tabs">
        <Nav.Item style={{width : '50%' , textAlign : 'center'}}>
            <Nav.Link eventKey="login" as={Link} to="/login">Đăng nhập</Nav.Link>
        </Nav.Item>
        <Nav.Item style={{width : '50%' , textAlign : 'center'}}>
            <Nav.Link eventKey="register" as={Link} to="/regist">Đăng kí</Nav.Link>
        </Nav.Item>
        </Nav>
        {children}
    </div>

export default Template;