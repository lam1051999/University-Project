import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchHp , deleteHpAdmin} from '../../redux/action/action';
import {Table , Spinner , Button} from 'react-bootstrap';

class HpAdmin extends Component{
    componentDidMount(){
        this.props.dispatch(fetchHp())
    }
    render(){
        return(
            <Table responsive>
            <thead style={{color : 'white' , backgroundColor : '#5e5b5b' , textAlign : 'center'}}>
                <tr>
                    <th>Mã học phần</th>
                    <th>Tên học phần</th>
                    <th></th>
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
                :(this.props.hp.length)?
                this.props.hp.map((h , i) =>
                    <tr key={i}>
                        <td>{h.mahp}</td>
                        <td>{h.tenhp}</td>
                        <td><Button variant="danger" onClick={() => 
                                {
                                    if(window.confirm('Bạn có chắc chắn muốn xóa học phần này ra khỏi danh sách học phần không?'))
                                        this.props.dispatch(deleteHpAdmin(h.mahp))
                                }} >Xóa</Button></td>
                    </tr>)
                :
                <p>Danh sách chưa có học phần</p>}
                </tbody>
            </Table>
        )
    }
}

const mapStateToProps = state => {
    return {
        hp : state.DshpReducer.hp,
        isf : state.DshpReducer.isfetching
    }
}

export default connect(mapStateToProps)(HpAdmin);
