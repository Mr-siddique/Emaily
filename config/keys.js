if(process.env.NODE_ENV === 'production'){
 module.exports=require('./prod');
}else{
    //for devlopment mode;
    module.exports=require('./dev');
}