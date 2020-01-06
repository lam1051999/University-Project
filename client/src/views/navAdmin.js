import React from 'react';
import {NavLink} from 'react-router-dom';
import X from './X';

const selectedStyle = {
  backgroundColor : '#dc3545',
  color : 'white',
  borderRadius : '10px',
  margin : '20px'
}

const NavigationAdmin = ({children}) =>
<div style={{width : '60%' , marginTop : '20px'}}>
<nav>
        <NavLink style={{textAlign : 'center' , padding : '20px'}} to="/logged/admin/news" activeStyle={selectedStyle}>TIN TỨC</NavLink>
        <NavLink style={{textAlign : 'center' , padding : '20px'}} to="/logged/admin/sv" activeStyle={selectedStyle}>QUẢN LÍ SINH VIÊN</NavLink>
        <NavLink style={{textAlign : 'center' , padding : '20px'}} to="/logged/admin/dssv" activeStyle={selectedStyle}>DANH SÁCH SINH VIÊN</NavLink>
        <NavLink style={{textAlign : 'center' , padding : '20px'}} to="/logged/admin/hp" activeStyle={selectedStyle}>QUẢN LÍ HỌC PHẦN</NavLink>
</nav>
<X></X>
{children}
</div>

export default NavigationAdmin;