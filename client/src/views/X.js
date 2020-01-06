import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class X extends Component{

    render(){
        return(
            <div style={{position : 'absolute' , top : '20px' , right : '40px' , color : 'white'}}>
                <p>Logged in as : {this.props.ad}</p> 
                <span style={{cursor : 'pointer' , fontWeight : 'bold'}}
                onClick={() => {localStorage.removeItem('admin');
                this.props.history.push('/');
                window.location.reload(false)}}>[LOG OUT]</span>
            </div>
        )
}
}

const mapStateToProps = state => {
    return {
        ad : state.startReducer.admin
    }
}

export default connect(mapStateToProps)(withRouter(X));