import React, { Component } from 'react';
import { fetchHpdh } from '../../redux/action/action';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {Table , Spinner} from 'react-bootstrap';

class Hpdh extends Component{
    componentWillMount(){
        if(!localStorage.getItem('user'))
        {
            alert('bạn chưa đăng nhập')
            this.props.history.push('/')
        }
    }
    componentDidMount(){
        this.props.dispatch(fetchHpdh(localStorage.getItem('user')))
    }
    render(){
        return(
            <div>
            <p style={{fontSize : '25px' , fontWeight : 'bold' , color : 'red' , textDecoration : 'underline'}}>Danh sách các học phần bạn đã đăng kí</p>
            <Table responsive>
            <thead style={{color : 'white' , backgroundColor : '#5e5b5b' , textAlign : 'center'}}>
                <tr>
                    <th>Mã học phần</th>
                    <th>Tên học phần</th>
                    <th>Điểm giữa kì</th>
                    <th>Điểm cuối kì</th>
                    <th>Điểm tổng kết</th>
                </tr>
            </thead>
            <tbody style={{textAlign : 'center'}}>
                {this.props.isf?<div>
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                </div>
                :(this.props.hpdh.length)?
                this.props.hpdh.map((h , i) =>
                    <tr key={i}>
                        <td>{h.mahp_fk}</td>
                        <td>{h.tenhp}</td>
                        <td>{h.diemgk}</td>
                        <td>{h.diemck}</td>
                        <td>{h.diemgk*0.3 + h.diemck*0.7}</td>
                    </tr>)
                :
                <p>Bạn chưa đăng kí học phần nào</p>}
                </tbody>
            </Table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        hpdh : state.HpdhReducer.hpdh,
        isf : state.HpdhReducer.isfetching
    }
}

export default connect(mapStateToProps)(withRouter(Hpdh));