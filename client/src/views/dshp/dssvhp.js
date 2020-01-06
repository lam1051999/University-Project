import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { fetchDssvHp } from '../../redux/action/action';
import {Col , Form , Table , Spinner , Button} from 'react-bootstrap';

class DssvHp extends Component{

    constructor(props)
    {
        super(props)
        this.state = {
            smsearch : {},
            isShow : 0
        }
    }
    componentWillMount(){
        if(!localStorage.getItem('admin'))
        {
            alert('bạn chưa đăng nhập')
            this.props.history.push('/')
        }
    }

    searchhp(event)
    {
        let sm = {
            ...this.state.smsearch
        }
        sm[event.target.name] = event.target.value
        this.setState({
            smsearch : sm
        })
    }

    submit(e)
    {
        e.preventDefault()
        this.setState({isShow : 1})
        this.props.dispatch(fetchDssvHp(this.state.smsearch.mahp))
    }

    render(){
        return(
            <div>
            <Form style={{marginTop : '20px'}} onSubmit={this.submit.bind(this)}>
                <Form.Row>
                    <Form.Group as={Col} controlId="exampleForm.ControlInput1">
                        <Form.Label>Mã học phần</Form.Label>
                        <Form.Control maxLength="10" required name="mahp" placeholder="nhập mã học phần ở đây..." onChange={this.searchhp.bind(this)} />
                    </Form.Group>
                    <Form.Group as={Col}>
                    <Button style={{marginTop : '30px' , height : '60%'}} type="submit" variant="primary">Tìm kiếm</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
            
            <div>
                {this.state.isShow?(this.props.isf?<div>
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                    <Spinner animation="border" variant="danger" />
                </div>:
                (this.props.dssvhp.success === -1?
                <p>Không có mã học phần này</p>:
                this.props.dssvhp.success === 1?
                <div>
                <p><span style={{fontWeight : 'bold'}}>Mã học phần là : </span>{this.props.dssvhp.kq[0].mahp}</p>
                <p><span style={{fontWeight : 'bold'}}>Tên học phần là : </span>{this.props.dssvhp.kq[0].tenhp}</p>
                <Table responsive>
                    <thead style={{color : 'white' , backgroundColor : '#5e5b5b' , textAlign : 'center'}}>
                        <tr>
                            <th>Họ và tên</th>
                            <th>Lớp</th>
                            <th>Điểm giữa kì</th>
                            <th>Điểm cuối kì</th>
                            <th>Điểm tổng kết</th>
                        </tr>
                    </thead>
                    <tbody style={{textAlign : 'center'}}>
                    {this.props.dssvhp.kq.sort((a,b) => layten(a.name)>layten(b.name)?1:-1).map((x , i) => 
                        <tr key={i}>
                            <td>{x.name}</td>
                            <td>{x.class}</td>
                            <td>{x.diemgk}</td>
                            <td>{x.diemck}</td>
                            <td>{x.diemgk*0.3 + x.diemck*0.7}</td>
                        </tr>
                        )}
                    </tbody>
                </Table>
                </div>:<p>chưa có sinh viên đăng kí môn này</p>)):null}
            </div>
            </div>
        )
    }
   
}

const layten = s => {
    for(let i = s.length - 1 ; i>= 0 ; i--)
    if(s[i] === ' ')
    return s.slice(i+1);
}

const mapStateToProps = state => {
    return {
        dssvhp : state.DssvhpReducer.dssvhp,
        isf : state.DssvhpReducer.isfetching
    }
}

export default connect(mapStateToProps)(withRouter(DssvHp));