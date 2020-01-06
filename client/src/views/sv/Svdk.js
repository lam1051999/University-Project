import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {Form , Col , Button} from 'react-bootstrap';
import { dkSv } from '../../redux/action/action';
import {connect} from 'react-redux';

class Svdk extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            smdk : {} 
        }
    }

    componentWillMount(){
        if(!localStorage.getItem('user')){
            alert('Bạn chưa đăng nhập')
            this.props.history.push('/')
        }
    }

    updateDk(event){
        let sm = {
            ...this.state.smdk
        }
        sm[event.target.name] = event.target.value
        sm['user_fk'] = localStorage.getItem('user')
        this.setState({
            smdk : sm
        })
    }

    submitDk(e){
        e.preventDefault()
        if(window.confirm('bạn có chắc chắn muốn gửi bản đăng kí này không?'))
            this.props.dispatch(dkSv(this.state.smdk))
        e.target.reset()
    }

    render(){
        return(
            <div>
                            <h2 style={{color : '#dc3545' , textDecoration : 'underline' , marginTop : '20px'}}>ĐĂNG KÍ THÔNG TIN TẠI ĐÂY</h2>
                            <Form onSubmit={this.submitDk.bind(this)} style={{marginTop : '10px'}}>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Họ và tên</Form.Label>
                                    <Form.Control maxLength="25" required name="name" onChange={this.updateDk.bind(this)} />
                                    </Form.Group>

                                    <Form.Row>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>CMND</Form.Label>
                                    <Form.Control maxLength="11" required name="CMND" onChange={this.updateDk.bind(this)} />
                                    </Form.Group>
                                    
                                    <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>Giới tính</Form.Label>
                                    <Form.Control required name="gender" as="select" onChange={this.updateDk.bind(this)}>
                                        <option>...</option>
                                        <option>Nam</option>
                                        <option>Nữ</option>
                                    </Form.Control>
                                    </Form.Group>

                                    </Form.Row>

                                    <Form.Group controlId="formGridAddress1">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control required name="address" onChange={this.updateDk.bind(this)}/>
                                    </Form.Group>

                                    <Form.Group controlId="formGridAddress2">
                                    <Form.Label>Lớp</Form.Label>
                                    <Form.Control maxLength="20" required name="class" onChange={this.updateDk.bind(this)}/>
                                    </Form.Group>

                                    <Form.Row>

                                    <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control maxLength="15" required name="phone" onChange={this.updateDk.bind(this)}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control maxLength="20" required name="email" type="email" onChange={this.updateDk.bind(this)}/>
                                    </Form.Group>

                                    </Form.Row>

                                    <Button variant="primary" type="submit">Đăng kí</Button>
                            </Form>
                            </div>

        )
}}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(withRouter(Svdk));