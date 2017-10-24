import React from 'react';
import {Link} from 'react-router';
import Photo from './Photo';
import Leftpanel from './Leftpanel'
const  Groups = React.createClass({
    render(){

    return(
        <div className="rowC" style={{"display":"flex", "flex-direction":"row"}}>
            <Leftpanel  />
         
     
        </div>
            
        )
    }
    


});
export default  Groups;