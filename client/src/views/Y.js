import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class Y extends Component{

    render(){
        return(
            <div style={{position : 'absolute' , top : '20px' , right : '40px' , color : 'white'}}>
                <p>Logged in as : {this.props.us}</p> 
                <span style={{cursor : 'pointer' , fontWeight : 'bold'}}
                onClick={() => {localStorage.removeItem('user');
                this.props.history.push('/');}}>[LOG OUT]</span>
            </div>
                        )}}

const mapStateToProps = state => {
    return {
        us : state.startReducer.user
    }
}

export default connect(mapStateToProps)(withRouter(Y));