import React, { Component } from 'react';
import NavigationAdmin from '../navAdmin';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { Cndiem } from '../../redux/action/action';
import {Form , Col , Button} from 'react-bootstrap';

class SvAdmin extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            smsvhp : {}
        }
    }

    componentWillMount(){
        if(!localStorage.getItem('admin'))
        {
            alert('bạn chưa đăng nhập')
            this.props.history.push('/')
        }
    }

    updateSvhp(event){
        let sm = {
            ...this.state.smsvhp
        }
        sm[event.target.name] = event.target.value
        this.setState({
            smsvhp : sm
        })
    }

    submit(e){
        e.preventDefault()
        if(window.confirm('bạn có chắc chắn muốn cập nhật thông tin này cho sinh viên không?'))
            this.props.dispatch(Cndiem(this.state.smsvhp))
        e.target.reset()
    }

    render(){
        return(
                    <NavigationAdmin>
                    <h2 style={{color : '#dc3545' , textDecoration : 'underline' , marginTop : '20px'}}>CẬP NHẬT THÔNG TIN CHO SINH VIÊN TẠI ĐÂY</h2>
                    <Form style={{marginTop : '20px'}} onSubmit={this.submit.bind(this)}>

                    <Form.Row>

                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>MSSV</Form.Label>
                    <Form.Control maxLength="8" required name="MSSV_fk" onChange={this.updateSvhp.bind(this)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Mã học phần</Form.Label>
                    <Form.Control maxLength="10" required name="mahp_fk" onChange={this.updateSvhp.bind(this)}/>
                    </Form.Group>

                    </Form.Row>

                    <Form.Row>

                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Điểm giữa kì</Form.Label>
                    <Form.Control as="input" type="number" step="0.1" min="0" max="10" required name="diemgk" onChange={this.updateSvhp.bind(this)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Điểm cuối kì</Form.Label>
                    <Form.Control as="input" type="number" step="0.1" min="0" max="10" required name="diemck" onChange={this.updateSvhp.bind(this)}/>
                    </Form.Group>

                    </Form.Row>
                    
                    <Button variant="primary" type="submit">Cập nhật</Button>

                    </Form>
                    </NavigationAdmin>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}
export default connect(mapStateToProps)(withRouter(SvAdmin));