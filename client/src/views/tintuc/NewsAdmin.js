import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {Form , Button , Col} from 'react-bootstrap';
import NavigationAdmin from '../navAdmin';
import {connect} from 'react-redux';
import { addNews } from '../../redux/action/action';

class NewsAdmin extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            smNews : {}
        }
    }
    
    componentWillMount(){
        if(!localStorage.getItem('admin'))
        {
            alert('Bạn chưa đăng nhập')
            this.props.history.push('/')
        }
    }

    updateNews(event){
        let sm = {
            ...this.state.smNews
        }
        sm[event.target.name] = event.target.value
	    sm['ngaytao'] = `${new Date().getDate().toString()} Tháng ${(new Date().getMonth() + 1).toString()} <br/> ${new Date().getHours().toString()}:${new Date().getMinutes().toString()}:${new Date().getSeconds().toString()}`
        this.setState({
            smNews : sm
      })
    }

    submitNews(e){
        e.preventDefault()
        if(window.confirm('Bạn có chắc chắn muốn thêm tin tức này không?'))
            this.props.dispatch(addNews(this.state.smNews))
        e.target.reset()
    }
    render()
    {
        return(
            <NavigationAdmin>
            <div style={{width : '80%' , margin : '20px'}}>
            <h2 style={{color : '#dc3545' , textDecoration : 'underline'}}>THÊM THÔNG BÁO</h2>
            <Form onSubmit={this.submitNews.bind(this)}>
            <Form.Group controlId="formBasicEmail">
            <Form.Row>
                <Col sm={9}>
                    <Form.Control type="text" name="noidung" required onChange={this.updateNews.bind(this)} />
                </Col>
                <Col>
                <Button variant="primary" type="submit">
                    Thêm thông báo
                </Button>
                </Col>
            </Form.Row>
            </Form.Group>
            </Form>
            </div>
            </NavigationAdmin>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(withRouter(NewsAdmin));

