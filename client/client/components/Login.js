import React from 'react';
import {Link,Redirect} from 'react-router';
import Single from './Single'
import PhotoGrid from './PhotoGrid'
import FileDashBoard from './FileDashBoard'
//import Comments from './Comments';
const  Login = React.createClass({
    handleSubmit(e){
        console.log('submitting');
        const email =this.refs.email.value;
        const password =this.refs.password.value;
        this.props.loginForms(email,password);
        e.preventDefault();
    },
 
    render(){
       
        
        if(this.props.login[0].verified){
           this.props.history.push('/FileDashBoard');
        }
       
            return(
                
                   <div className="col-md-2 col-md-offset-7">
                    <form ref="loginForm" onSubmit={this.handleSubmit}>
                        <input type="email" ref="email" placeholder="Email" style={{"height":"30px","width":"270px","margin":"10px"}}/>
                        <input type="password" ref ="password" placeholder="Password" style={{"height":"30px","width":"270px","margin":"10px"}}/>
                        <input type="submit" value="submit" style={{"height":"30px","width":"270px","margin":"10px","background-color":"#1167fb","color":"white"}}/>
                    </form>
                    </div>
                   
                   
                )
        }
        
   
    
});
export default  Login;