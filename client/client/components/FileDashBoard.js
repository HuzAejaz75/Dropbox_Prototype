import React from 'react';
import {Link,Redirect} from 'react-router';
import localstorage from 'local-storage';
import axios from 'axios';


//import Comments from './Comments';
const  FileDashBoard = React.createClass({
   
    handleSubmit(e){
       /* console.log('uploading file');
        console.log(e);
        console.log(this.refs.fileup.files);
        //const pl = new FormData();
        
       //pl.append('fileup', this.refs.fileup.files);
        var fullPath =this.refs.fileup.value;
       
      
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        alert(filename);  
        console.log('nop');
        console.log(this.refs.fileup.files.File);
       // this.props.uploadFile(pl);*/

        console.log(this.refs.fileup.files[0]);
        const pl = new FormData();
        
       pl.append('fileup', this.refs.fileup.files[0]);
       this.props.uploadFile(pl);
       var user =localstorage.get('user')
       {this.props.getallfiles(user.email)}
       
        e.preventDefault();
    },
    filelist(){
        {this.props.getallfiles(email)}
        return(
            <div >
                 <strong>file</strong>   
            </div>
        );
    },
    
    
    render(){
        
       if(localstorage.get('user')!==null){
                
            
                
                var user = localstorage.get('user')
                var email = user.email;
        
                var files = localstorage.get('filenamearray')
                this.state = {files}
            
       
        
            return(
                            <div>   
                                <div className="col-md-2 col-md-offset-9">
                                <form ref="fileupload" onChange={this.handleSubmit} >
                                        <div id="fileupload" style={{"height":"20px", "width":"100px"}}>
                                            <input  type="file" ref="fileup" name="fileup" id="myFile" style={{"opacity":"0.5"}} />
                                            <input type="submit" value="Upload files" className="btn btn-primary" style={{"background-color":"#1167fb"}}/>
                                        </div>
                                </form></div>
                       <div className="col-md-2 col-md-offset-3">
                      
                       <div className="well" style={{"width":"550px"}}>
                            {this.state.files.map((file)=>{
                                    return(
                                            
                                            <ul className="list-group">
                                            <li className="list-group-item">{file}</li>
                                            </ul>
                                        )
                                        
                                            
                                    })}
                                    </div>
                        </div>
                            
                            </div>
                           
                        
       
                    
                   
                   
                )
        }
    }
        
   
    
});
export default  FileDashBoard;