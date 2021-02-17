const { users } = require('./models');
const bcrypt = require('bcryptjs');


const processNewUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    console.log("=================")
    console.log(email)
    console.log("=================")
    console.log(password)
    console.log("=================")

    if (email == '' || password == '') {
      // Really should give the user a message
      
      console.log('email or password is blank', req.baseUrl);
      // res.redirect(`${req.baseUrl}/new`);
      console.log("API: sending back 404");
      res.status(400).json({
        message: "email or password is blank"
      });
    } else {
      const salt = bcrypt.genSaltSync(9);
      const hash = bcrypt.hashSync(password, salt);
      try {
        const newUser = await users.create({
          email,
          password: hash
        });
        console.log("API: user created successfully");
        res.status(200).json({
          message: "Success"
        });
        // res.redirect(`${req.baseUrl}/login`);
      } catch (e) {
        // e.name will be "SequelizeUniqueConstraintError"
        console.log(e.name);
        if (e.name === "SequelizeUniqueConstraintError") {
          // We should tell the user that the email is taken
          // and then redirect them
        }
        console.log("API: username already taken");
        res.status(400).json({
          message: "Username is already taken"
        });      
        // res.redirect(`${req.baseUrl}/new`);
      }
    }
  };
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
    loginVerify,
    processNewUser
};

