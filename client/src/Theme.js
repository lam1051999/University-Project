import React from 'react';
import Logo from './bklogo.jpg';
import {Card} from 'react-bootstrap';
import TestNews from './views/tintuc/testNews';
import News from './views/tintuc/News';


const Theme = ({children}) =>
<div style={{ width: '95%' , margin : 'auto' , position : 'sticky' , top : '0px'}}>
    <Card id = "card" bg="danger" text="white">
        <Card.Header></Card.Header>
        <Card.Body>
        <img height="120px" src={Logo} alt="logo" />
        <Card.Text style={{ position : 'absolute' , left : '110px' , top : '40px'}}>
            <span style={{display : 'block' , fontSize : '30px' , fontWeight : 'bold'}}>TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI</span>
            <span style={{fontWeight : 'bold'}}>Địa chỉ:</span> 1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội
        </Card.Text>
        </Card.Body>
    </Card>
    <div>
    {localStorage.getItem('admin')?<News></News>
        :<TestNews></TestNews>}
    </div>
    {children}
</div>

export default Theme;