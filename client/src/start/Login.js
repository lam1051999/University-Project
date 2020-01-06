import React, { Component } from 'react';
import {Form , Button} from 'react-bootstrap';
import Template from './font';
import { submitLogin, adminlogin} from '../redux/action/action';
import {connect} from 'react-redux';


class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      smlogin : {}
    }
  }

  updateLogin(event)
  {
    let sm = {
      ...this.state.smlogin
    }
    sm[event.target.name] = event.target.value
    this.setState({
      smlogin : sm
    })
  }
  
  async submitlg(e){
    e.preventDefault()
    if(this.state.smlogin.user === "admin" && this.state.smlogin.pass === "admin")
    {
    await localStorage.setItem('admin' , this.state.smlogin.user)
    this.props.dispatch(adminlogin(localStorage.getItem('admin')))
    this.props.history.push(`/logged/admin/news`)
    window.location.reload(false)
    }
    else
    this.props.dispatch(submitLogin(this.state.smlogin , this.props.history))
  } 
  render(){
    return(
<Template>
<Form style={{width : '80%' , margin : 'auto' , padding : '20px'}} onSubmit={this.submitlg.bind(this)}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Tài khoản</Form.Label>
    <Form.Control maxLength="20" type="text" required name="user" onChange={this.updateLogin.bind(this)}/>
    <Form.Text className="text-muted">
      Chúng tôi sẽ không chia sẻ tài khoản của bạn với bất kỳ ai
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Mật khẩu</Form.Label>
    <Form.Control maxLength="20" type="password" required name="pass" onChange={this.updateLogin.bind(this)}/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Đăng nhập
  </Button>
</Form>
</Template>
    )}
}

const mapStateToProps = state => {
  return {
  }
}
export default connect(mapStateToProps)(Login);