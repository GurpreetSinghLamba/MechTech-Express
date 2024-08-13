
module.exports = async (req, res, next) => {
    
        req.body.username && (req.body.password == req.body.cpassword) ? next() : res.redirect('/login')
    
};