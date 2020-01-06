import React, { Component } from 'react';
import {Route , withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import NavigationAdmin from '../navAdmin';
import TaoHp from './taohp';
import DssvHp from './dssvhp';

const AdminHpTemplate = () =>

                <Nav variant="tabs" style={{marginTop : '30px'}}>
                <Nav.Item style={{textAlign : 'center' , width : '50%'}}>
                    <Nav.Link as={Link} to="/logged/admin/hp/taohp" eventKey="taohp">Tạo học phần</Nav.Link>
                </Nav.Item>
                <Nav.Item style={{textAlign : 'center' , width : '50%'}}>
                    <Nav.Link as={Link} to="/logged/admin/hp/svhp" eventKey="dssvhp">Danh sách sinh viên theo học phần</Nav.Link>
                </Nav.Item>
                </Nav>

class DshpAdmin extends Component{
    componentWillMount(){
        if(!localStorage.getItem('admin'))
        {
            alert('bạn chưa đăng nhập')
            this.props.history.push('/')
        }
    }
                render(){
                    return(
                            <NavigationAdmin>
                                <div>
                                        <Route component={AdminHpTemplate}></Route>
                                        <Route path="/logged/admin/hp/taohp" component={TaoHp}></Route>
                                        <Route path="/logged/admin/hp/svhp" component={DssvHp}></Route>
                                </div>
                            </NavigationAdmin>
                    )
                }
}
export default withRouter(DshpAdmin);
