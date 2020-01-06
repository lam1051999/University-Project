import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {Form , Button , Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import { cnSv } from '../../redux/action/action';

class Svcn extends Component{
    constructor(props){
        super(props)
        this.state = {
            smcn : {}
        }
    }

    componentWillMount(){
        if(!localStorage.getItem('user')){
            alert('Bạn chưa đăng nhập')
            this.props.history.push('/')
        }
    }

    updateCn(event){
        let sm = {
            ...this.state.smcn
        }
        sm[event.target.name] = event.target.value
        sm['user_fk'] = localStorage.getItem('user')
        this.setState({
            smcn : sm
        })
    }

    submitCn(e){
        e.preventDefault()
        if(window.confirm('bạn có chắc chắn muốn gửi bản cập nhật này không?'))
            this.props.dispatch(cnSv(this.state.smcn))
        e.target.reset()
    }
    render(){
        return(
            <div>
                <h2 style={{color : '#dc3545' , textDecoration : 'underline' , marginTop : '20px'}}>CẬP NHẬT THÔNG TIN TẠI ĐÂY</h2>
                <Form onSubmit={this.submitCn.bind(this)} style={{marginTop : '10px'}}>
                                    <Form.Group controlId="formGridAddress1">
                                        <Form.Label>Địa chỉ</Form.Label>
                                        <Form.Control required name="address" onChange={this.updateCn.bind(this)}/>
                                    </Form.Group>
                                    <Form.Group controlId="formGridAddress2">
                                        <Form.Label>Lớp</Form.Label>
                                        <Form.Control maxLength="20" required name="class" onChange={this.updateCn.bind(this)}/>
                                    </Form.Group>
                                    <Form.Row>

                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control maxLength="15" required name="phone" onChange={this.updateCn.bind(this)}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridCity">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control maxLength="20" required name="email" type="email" onChange={this.updateCn.bind(this)}/>
                                    </Form.Group>

                                    </Form.Row>
                                    <Button variant="primary" type="submit">Cập nhật</Button>
                </Form>
                </div>
        )
}}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(withRouter(Svcn));