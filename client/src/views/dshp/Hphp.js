import React, { Component } from 'react';
import {Route , withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import NavigationUser from '../nav';
import {Nav} from 'react-bootstrap';
import Dkhp from './dkhp';
import Hpdh from './hpdh';

const HpTemplate = () => 
                <Nav variant="tabs" style={{marginTop : '30px'}}>
                    <Nav.Item style={{textAlign : 'center' , width : '50%'}}>
                        <Nav.Link as={Link} to="/logged/hp/dk" eventKey="dangki">Đăng kí học phần</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{textAlign : 'center' , width : '50%'}}>
                        <Nav.Link as={Link} to="/logged/hp/ds" eventKey="danghoc">Học phần đã đăng kí</Nav.Link>
                    </Nav.Item>
                </Nav>
class Hp extends Component{
    componentWillMount(){
        if(!localStorage.getItem('user'))
        {
            alert('bạn chưa đăng nhập')
            this.props.history.push('/')
        }
    }
    render(){
        return(
                <NavigationUser>
                    <div>
                            <Route component={HpTemplate}></Route>
                            <Route path="/logged/hp/dk" component={Dkhp}></Route>
                            <Route path="/logged/hp/ds" component={Hpdh}></Route>
                    </div>
                </NavigationUser>
        )
    }
}

export default withRouter(Hp)