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
        
        
        //login-form.pug
        
            form(method="post" action="/login")
            table 
                tr
                    td Username 
                    td 
                        input(type="text" name="username")
                tr 
                    td Password 
                    td 
                        input(type="password" name="password")
                tr 
                    td
                    td
                        input(type="submit" value="Login")
        
        


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
        
        
        // register-form.pug
        
        form(method="post" action="/register")
            table 
                tr
                    td Username 
                    td 
                        input(type="text" name="username")
                tr 
                    td Fullname 
                    td 
                        input(type="text" name="fullname")
                tr 
                    td Password 
                    td 
                        input(type="password" name="password")
                tr 
                    td Confirm password 
                    td 
                        input(type="password" name="confirm-password")
                tr 
                    td
                    td
                        input(type="submit" value="Register")


# File Uploader Post

  https://github.com/danysantiago/NodeJS-Android-Photo-Upload/blob/master/Server/app.js


       var express = require('express');
       var app = express()

        var fs = require('fs');
        var im = require('imagemagick');

        var Db = require('mongodb').Db;
        var dbServer = require('mongodb').Server;
        var dbConnection = require('mongodb').Connection;
        var db = new Db('photos', new dbServer('localhost', dbConnection.DEFAULT_PORT, {}));
        db.open(function(err, db){});


        app.use(express.bodyParser())


        app.get('/', function(req, res){
            res.send(
                '<form action="/upload" method="post" enctype="multipart/form-data">'+
                '<input type="file" name="source">'+
                '<input type="submit" value="Upload">'+
                '</form>'
            );
        });


        app.post('/upload', function(req, res){
            console.log("Received file:\n" + JSON.stringify(req.files));

            var photoDir = __dirname+"/photos/";
            var thumbnailsDir = __dirname+"/photos/thumbnails/";
            
            
            var photoName = req.files.source.name;

            
            fs.rename(
                req.files.source.path,
                photoDir+photoName,
                function(err){
                    if(err != null){
                        console.log(err)
                        res.send({error:"Server Writting No Good"});
                    } else {
                        im.resize(
                            {
                                srcData:fs.readFileSync(photoDir+photoName, 'binary'),
                                width:256
                            }, 
                            function(err, stdout, stderr){
                                if(err != null){
                                    console.log('stdout : '+stdout)

                                    res.send({error:"Resizeing No Good"});
                                } else {
                                    //console.log('ELSE stdout : '+stdout)
                                    fs.writeFileSync(thumbnailsDir+"thumb_"+photoName, stdout, 'binary');
                                    res.send("Ok");
                                }
                            }
                        );
                    }
                }
            );
        });


