import React , {Component} from 'react';
import Dshp from './dshp';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Form , Col , Button} from 'react-bootstrap';
import {DKhp} from '../../redux/action/action';

class Dkhp extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            smhp : {}
        }
    }

    componentWillMount(){
        if(!localStorage.getItem('user'))
        {
            alert('bạn chưa đăng nhập')
            this.props.history.push('/')
        }
    }

    updateHp(event){
        let sm = {
            ...this.state.smhp
        }
        sm[event.target.name] = event.target.value
        sm['user_fk'] = localStorage.getItem('user')
        this.setState({
            smhp : sm
        })
    }

    submithp(e){
        e.preventDefault()
        if(window.confirm('bạn có chắc chắn muốn đăng kí học phần này không?'))
            this.props.dispatch(DKhp(this.state.smhp))
        e.target.reset()
    }

    render(){
        return(
            <div>
            <p style={{fontSize : '25px' , fontWeight : 'bold' , color : 'red' , textDecoration : 'underline'}}>Danh sách các học phần</p>
            <Dshp></Dshp>
            <p style={{fontSize : '25px' , fontWeight : 'bold' , color : 'red' , textDecoration : 'underline'}}>Đăng kí học phần theo mã học phần</p>
            <Form onSubmit={this.submithp.bind(this)}>
            <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Mã học phần</Form.Label>
                    <Form.Control maxLength="10" placeholder="điền mã học phần vào đây..." required name="mahp" onChange={this.updateHp.bind(this)}/>
                    </Form.Group>
                    <Form.Group as={Col}>
                    <Button variant="primary" type="submit" style={{height : '40px' , marginTop : '30px'}}>Đăng kí</Button>
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

export default connect(mapStateToProps)(withRouter(Dkhp));