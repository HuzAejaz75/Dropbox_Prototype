import axios from 'axios';


export function increment(index){
    return{
        type:"INCREMENT_LIKES",
        index
    }
}
export function registers(firstname,lastname,email,password){
    console.log('registeration initiated');
    return {
        type:"REGISTER",
        firstname,
        lastname,
        email,
        password
    }
}

export function loginForms(email,password){


    return {
        type:"LOG_IN",
        email,
        password,
        info :  axios.post('http://localhost:8080/routes/login',{email,password})

    }
   
       
   
}

export function uploadFile(payload){
   console.log("inside the action");
    console.log(payload);
    return{
        type:"UPLOAD_FILE",
        payload
     
    }
}

   
   
export function verifying(token,user){
    console.log('verifying');
    console.log(token);
    console.log(user);
    console.log(verified);
    return {
        type: 'LOGIN_VERIFY',
        token,
        user
    }
}

export function Addcomment(postId, author, comment){
    
    return{
        type:"ADD_COMMENT",
        postId,
        author,
        comment
    }
}
export function removeComment(index, postId){
    return{
        type:"REMOVE_COMMENT",
        index,
        postId
    }
}

export function getallfiles(email){
    console.log('facts'+email);
    return{
        type:"GET_ALL_FILES",
        email
    }
}
