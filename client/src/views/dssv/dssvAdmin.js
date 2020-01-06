import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Table , Spinner , Button} from 'react-bootstrap';
import NavigationAdmin from '../navAdmin';
import { deleteSV , fetchDssv } from '../../redux/action/action';

class DssvAdmin extends Component{
    constructor(props){
        super(props)
        this.deleteSv = this.deleteSv.bind(this)
    }
    componentWillMount(){
        if(!localStorage.getItem('admin'))
        {
            alert('bạn chưa đăng nhập')
            this.history.push('/')
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchDssv())
    }

    deleteSv(sv){
        if(window.confirm('bạn có chắc chắn muốn xóa sinh viên này ra khỏi danh sách không?'))
            this.props.dispatch(deleteSV(sv))
    }

    render(){
        return(
            <NavigationAdmin>
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
                        <th></th>
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
                        <td><Button variant="danger" onClick={() => this.deleteSv(sv.MSSV)} >Xóa</Button></td>
                    </tr>)
                :
                <p>Danh sách chưa có sinh viên nào</p>}
                </tbody>
            </Table>
            </NavigationAdmin>
        )
    }
}

const mapStateToProps = state => {
    return {
        svs : state.DssvReducer.sv.sort((a , b) => a.MSSV > b.MSSV?1:-1),
        isf : state.DssvReducer.isfetching
    }
}

export default connect(mapStateToProps)(withRouter(DssvAdmin));