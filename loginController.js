const { users } = require('./models');
const bcrypt = require('bcryptjs');

const loginLanding = (req, res) => {
    res.render('login')
};

const loginVerify = async (req, res) => {
    console.log(req.body)
    const {username, password} = req.body;
    console.log('Username: ', username)
    console.log('Password: ', password)

    
    req.session.username = username;
    
    
    
    const user = await users.findOne({
        where: {
            email: username
        }
    })

    console.log("USER", user)

    if(user) {
       
        const isValid = bcrypt.compareSync(password, user.password);
       
        console.log(isValid)
        if(isValid){
            req.session.user_id = user.id;
            res.json({id: user.id});
        } else {
            res.redirect('/products');
        }
    } else {
        res.redirect('/prodcuts');
    }






}

module.exports = {
    loginLanding, 
    loginVerify
};

