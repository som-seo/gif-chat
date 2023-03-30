const mongoose=require('mongoose');

const {NODE_ENV}=process.env;


const connect=()=>{
    if(NODE_ENV!=='production'){
        mongoose.set('debug', true);
    }
    mongoose
    .connect("mongodb://127.0.0.1:27017/gifchat", {
        dbName: 'gifchat',
        useNewUrlParser: true,
      })
      .then(()=>{
        console.log('몽고디비 연결')
    })
    .catch((err) =>{
        console.log(err);
    });
;
};

mongoose.connection.on('error', (error)=>{
    console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', ()=>{
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});

module.exports=connect;