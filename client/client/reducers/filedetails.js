import axios from 'axios';
import localstorage from 'local-storage';

function firePost(url,action){
    axios.post(url,action).then(function (response) {
            
        console.log(response);
        return response;
         })
         .catch(function (error) {
           console.log(error);
         })
}

 function filedetails (state =[], action) {
     
     console.log(action);

     switch(action.type){ 
        case 'UPLOAD_FILE':
            fetch("http://localhost:8080/routes/upload",
            {
                method: 'POST',                                                     
                body: action.payload
            })
            .then(res => {
                console.log(res);
                //return res.status;        
                return 200;
            })
            .catch(error => {
                    console.log(error);
                    return error;
            });
            return [
                state
             ]
        case 'GET_ALL_FILES':
             console.log('get all files');
             console.log(action.email)
             axios.get('http://localhost:8080/routes/getalldata',{params:{action:action.email}}).then(function (response) { 
                console.log('cheetah');
             console.log(response.data.file_data);  
             localStorage.removeItem('filenamearray',0); 
             localstorage.set('filenamearray',response.data.file_data);
             return response;
                 })
                 .catch(function (error) {
                   console.log(error);
                 })

            /* fetch("http://localhost:8080/routes/getalldata",
             {
                 method: 'GET',                                                     
                 body: action.email,
                 email:action.email
             })
             .then(res => {
                 console.log(res);
                 //return res.status;        
                 return 200;
             })
             .catch(error => {
                     console.log(error);
                     return error;
             });*/
             console.log('asd');
             console.log(state);
             return {...state,filename:localstorage.get('filenamearray')};
             
             default:
              return state;
    }
}

/*
function filedetails(state =[], action){
    console.log('reducer');
    console.log('action.payload:')
    console.log(action.payload);
    switch(action.type){
        case 'UPLOAD_FILE':
        console.log('upload called')
        firePost("http://localhost:8080/routes/upload",action.payload);
        return [
           state
        ]
        default:
         return state;
    }
}

*/
export default filedetails;


