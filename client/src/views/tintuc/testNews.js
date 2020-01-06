import React, { Component } from 'react';
import { fetchNews } from '../../redux/action/action';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Spinner , Carousel} from 'react-bootstrap';
import {Markup} from 'interweave';
import Logo from '../../logo111.png'

class TestNews extends Component{
    componentDidMount(){
       this.props.dispatch(fetchNews())
    }
    render(){
        console.log(`length : ${this.props.nw.length}`)
        return(
            <Carousel interval="3000" style={{width : '35%' , float : 'right' , marginTop : '20px'}}>
            {((this.props.isf)?
            <Carousel.Item>
            <img
            className="d-block w-100"
            src={Logo}
            alt="logo"/>
            <Carousel.Caption>
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="danger" />
            </Carousel.Caption>
            </Carousel.Item>
            :
            ((this.props.nw.length)?
            this.props.nw.map((en,i) => 
                            <Carousel.Item key={i}>
                                <img
                                className="d-block w-100"
                                src={Logo}
                                alt="logo"/>
                                <Carousel.Caption>
                                <p style={{color : 'black' , marginBottom : '80px' , fontSize : '20px'}}>{en.noidung}</p>
                                <p style={{color : 'red' , fontFamily : 'cursive'}}><Markup content={en.ngaytao}></Markup></p>
                                </Carousel.Caption>
                            </Carousel.Item>
            ):<Carousel.Item>
            <img
            className="d-block w-100"
            src={Logo}
            alt="logo"/>
            <Carousel.Caption>
            <h2 style={{color : 'black' , marginBottom : '150px'}}>Chưa có tin tức gì</h2>
            </Carousel.Caption>
            </Carousel.Item>
            ))}
            </Carousel>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        nw : state.NewsReducer.news,
        isf : state.NewsReducer.isfetching
    }
}

export default connect(mapStateToProps)(withRouter(TestNews));