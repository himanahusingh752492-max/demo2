
    
 async function auth(req, res, next ) {
    const user= await req.cookies?.user;
    if(!user){
        return res.redirect('/index1.html');

    }
     next();
}
module.exports={auth};
