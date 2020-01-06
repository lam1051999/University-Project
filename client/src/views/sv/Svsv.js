import React, { Component } from 'react';
import {Route , withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import NavigationUser from '../nav';
import Svdk from './Svdk';
import Svcn from './Svcn';
import {Nav} from 'react-bootstrap';

const SvTemplate = () =>

                <Nav variant="tabs" style={{marginTop : '30px'}}>
                <Nav.Item style={{textAlign : 'center' , width : '50%'}}>
                    <Nav.Link as={Link} to="/logged/sv/dk" eventKey="dangki">Đăng kí thông tin</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{textAlign : 'center' , width : '50%'}}>
                    <Nav.Link as={Link} to="/logged/sv/cn" eventKey="capnhat">Cập nhật thông tin</Nav.Link>
                </Nav.Item>
                </Nav>

class Sv extends Component{
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
                                        <Route component={SvTemplate}></Route>
                                        <Route path="/logged/sv/dk" component={Svdk}></Route>
                                        <Route path="/logged/sv/cn" component={Svcn}></Route>
                                </div>
                            </NavigationUser>
                    )
                }
}
export default withRouter(Sv);

