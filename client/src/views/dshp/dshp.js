import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchHp } from '../../redux/action/action';
import {Table , Spinner} from 'react-bootstrap';

class Dshp extends Component{
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

export default connect(mapStateToProps)(Dshp);
