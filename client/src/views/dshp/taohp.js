import React, { Component } from 'react';
import HpAdmin from './HpAdmin';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { createHp } from '../../redux/action/action';
import {Form , Col , Button} from 'react-bootstrap';

class TaoHp extends Component{
    constructor(props){
        super(props)
        this.state = {
            smtaohp : {}
        }
    }

    componentWillMount(){
        if(!localStorage.getItem('admin')){
            alert('bạn chưa đăng nhập')
            this.props.history.push('/')
        }
    }

    updateTaohp(event){
        let sm = {
            ...this.state.smtaohp
        }
        sm[event.target.name] = event.target.value
        this.setState({
            smtaohp : sm
        })
    }

    submittaohp(e){
        e.preventDefault()
        if(window.confirm('bạn có chắc chắn muốn tạo học phần này không?'))
            this.props.dispatch(createHp(this.state.smtaohp))
        e.target.reset()
    }

    render(){
        return(
            <div>
                <p style={{fontSize : '25px' , fontWeight : 'bold' , color : 'red' , textDecoration : 'underline'}}>Danh sách các học phần</p>
                <HpAdmin></HpAdmin>
                <p style={{fontSize : '25px' , fontWeight : 'bold' , color : 'red' , textDecoration : 'underline'}}>Tạo học phần</p>
                <Form onSubmit={this.submittaohp.bind(this)}>
                    <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Mã học phần</Form.Label>
                            <Form.Control maxLength="10" placeholder="điền mã học phần vào đây..." required name="mahp" onChange={this.updateTaohp.bind(this)}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Tên học phần</Form.Label>
                            <Form.Control maxLength="45" placeholder="điền tên học phần vào đây..." required name="tenhp" onChange={this.updateTaohp.bind(this)}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                            <Button variant="primary" type="submit" style={{height : '40px' , marginTop : '30px'}}>Tạo học phần</Button>
                            </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(withRouter(TaoHp));