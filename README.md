# Backend_Script_Nodejs_Login
SignUp &amp; LogIn

    cd to root dir

    npm install express express-session mysql pug-cli bcrypt util.promisify

    then 
    
    node app
    
    and to change the config and table column field for DB see
    
    core/poole.js and core/user.js
    
    
# Post login Info



        // Post login data
        router.post('/login', (req, res, next) => {
            // The data sent from the user are stored in the req.body object.
            // call our login function and it will return the result(the user data).
            user.login(req.body.username, req.body.password, function(result) {
                if(result) {
                    // Store the user data in a session.
                    req.session.user = result;
                    req.session.opp = 1;
                    // redirect the user to the home page.
                    res.redirect('/home');
                }else {
                    // if the login function returns null send this error message back to the user.
                    res.send('Username/Password incorrect!');
                }
            })

        });


        // Post register data
        router.post('/register', (req, res, next) => {
            // prepare an object containing all user inputs.
            let userInput = {
                username: req.body.username,
                fullname: req.body.fullname,
                password: req.body.password
            };
            // call create function. to create a new user. if there is no error this function will return it's id.
            user.create(userInput, function(lastId) {
                // if the creation of the user goes well we should get an integer (id of the inserted user)
                if(lastId) {
                    // Get the user data by it's id. and store it in a session.
                    user.find(lastId, function(result) {
                        req.session.user = result;
                        req.session.opp = 0;
                        res.redirect('/home');
                    });

                }else {
                    console.log('Error creating a new user ...');
                }
            });

        });
