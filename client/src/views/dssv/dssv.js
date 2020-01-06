import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { fetchDssv } from '../../redux/action/action';
import {Table , Spinner} from 'react-bootstrap';
import NavigationUser from '../nav';

class Dssv extends Component{

    componentWillMount(){
        if(!localStorage.getItem('user'))
        {
            alert('bạn chưa đăng nhập')
            this.history.push('/')
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchDssv())
    }

    render(){
        return(
            <NavigationUser>
            <p style={{marginTop : '40px' , fontSize : '35px' , fontWeight : 'bold' , color : '#dc3545' , textDecoration : 'underline'}}>Số sinh viên đang học là : {this.props.svs.length}</p>
            <Table responsive>
                <thead style={{color : 'white' , backgroundColor : '#5e5b5b' , textAlign : 'center'}}>
                    <tr>
                        <th>MSSV</th>
                        <th>Họ và tên</th>
                        <th>CMND</th>
                        <th>Giới tính</th>
                        <th>Địa chỉ</th>
                        <th>Lớp</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.isf?<div>
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                </div>
                :(this.props.svs.length)?
                this.props.svs.map((sv , i) =>
                    <tr key={i}>
                        <td>{sv.MSSV}</td>
                        <td>{sv.name}</td>
                        <td>{sv.CMND}</td>
                        <td>{sv.gender}</td>
                        <td>{sv.address}</td>
                        <td>{sv.class}</td>
                        <td>{sv.phone}</td>
                        <td>{sv.email}</td>
                    </tr>)
                :
                <p>Danh sách chưa có sinh viên nào</p>}
                </tbody>
            </Table>
            </NavigationUser>
        )
    }
}

const mapStateToProps = state => {
    return {
        svs : state.DssvReducer.sv.sort((a , b) => a.MSSV > b.MSSV?1:-1),
        isf : state.DssvReducer.isfetching
    }
}

export default connect(mapStateToProps)(withRouter(Dssv));