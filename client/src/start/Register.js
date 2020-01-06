import React, { Component } from 'react';
import Template from './font';
import {Form , Button} from 'react-bootstrap';
import {submitRegister} from '../redux/action/action';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class Register extends Component
{
  constructor(props){
    super(props)
    this.state={
      submission : {}
    }
  }
  updateSubmit(event)
  {
    let sm = {
      ...this.state.submission
    }
    sm[event.target.name] = event.target.value
    this.setState({
      submission : sm
    })
  }
  submit(e){
    e.preventDefault()
    if(window.confirm('bạn có chắc chắn muốn gửi bản đăng kí này không?'))
      this.props.dispatch(submitRegister(this.state.submission , this.props.history))
  } 
  render(){
  return(
<Template>
<Form style={{width : '80%' , margin : 'auto' , padding : '20px'}} onSubmit={this.submit.bind(this)}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Tài khoản</Form.Label>
    <Form.Control maxLength="20" type="text" required name="user" onChange={this.updateSubmit.bind(this)}/>
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Mật khẩu</Form.Label>
    <Form.Control maxLength="20" type="password" required name="pass" onChange={this.updateSubmit.bind(this)}/>
  </Form.Group>
  <Button variant="primary" type="submit" >
    Đăng kí
  </Button>
</Form>
</Template>
  )}
  }

const mapStateToProps = state => {
  return {
  }
}


export default connect(mapStateToProps)(withRouter(Register));