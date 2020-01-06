import React from 'react';
import {NavLink} from 'react-router-dom';
import Y from './Y';

const selectedStyle = {
  backgroundColor : '#dc3545',
  color : 'white',
  borderRadius : '10px',
  margin : '20px'
}

const NavigationUser = ({children}) =>
<div style={{width : '60%' , marginTop : '20px'}}>
<nav>
        <NavLink style={{textAlign : 'center' , padding : '20px'}} to="/logged/sv" activeStyle={selectedStyle}>QUẢN LÍ SINH VIÊN</NavLink>
        <NavLink style={{textAlign : 'center' , padding : '20px'}} to="/logged/dssv" activeStyle={selectedStyle}>DANH SÁCH SINH VIÊN</NavLink>
        <NavLink style={{textAlign : 'center' , padding : '20px'}} to="/logged/hp" activeStyle={selectedStyle}>QUẢN LÍ HỌC PHẦN</NavLink>
</nav>
<Y></Y>
{children}
</div>

export default NavigationUser;