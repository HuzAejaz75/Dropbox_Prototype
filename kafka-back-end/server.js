var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var mongoose = require('mongoose');
var config = require('./config/mongoConfig');

mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
    console.log('connected to db '+ config.database);
})

mongoose.connection.on('error',(err )=>{
    console.log('error in db '+ err);
})


var topic_name = 'dropboxlogin_topic';


var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function (message) {
    console.log('message received  '+ message.email);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    login.handle_request(data.data, function(err,res){
       
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});