if(process.env.NODE_ENV === 'production'){
    // for production
 module.exports=require('./prod');
}else{
    //for devlopment mode;
    module.exports=require('./dev');
}