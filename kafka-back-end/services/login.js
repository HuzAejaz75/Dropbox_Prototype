var FileData = require('./filedatamodel');
function handle_request(msg, callback){

    var res = {};
 
   switch(msg.type){
       case 'get_files':
       FileData.getfiles(msg.email,(err,data)=>{
      
         if(err){
             console.log('error');
             console.log(err);
             res.json({success:false,msg:'Data is mismatched'});
         }
         else{
            
          
             callback(null, data);
         }
     });
       break;
       case 'upload_files':
       FileData.uploadfile(msg.data,(err,file)=>{
        if(err){
            console.log(err);
            callback(null, err);
            //res.json({success:false,msg:'failed to upload'});
        }
        else{
            callback(null, file);
            //res.json({success:true,msg:'upload successful',});
        }
    });

       break;
   }
    
    //just call the file data model

   // callback(null, res);
}

exports.handle_request = handle_request;