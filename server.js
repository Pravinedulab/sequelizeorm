const express = require('express');
const Sequelize = require('sequelize');
const Data = require('./data');
const app = express();
const port= 8001;

const connection = new Sequelize('cartdb','root','password',{
    dialect:'mysql'
})



const User = connection.define('Users',{
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    company: Sequelize.STRING,
    address: Sequelize.STRING
});

const Post = connection.define('Posts',{
    title: Sequelize.STRING,
    decription: Sequelize.STRING      
});

        User.hasMany(Post);
        Post.belongsTo(User);
 
    connection
    .authenticate()    
    .then(() => {
        console.log('Connection to database established successfully.');
    })
        .catch(err =>{
            console.error('Unable to connect the database',err);
        });  
        
       
    connection 
    .sync({
             logging:console.log,
        force: true
    })  
    

    .then(() => {
        console.log('Connection to database established successfully.');
        app.listen (port,() => {
            console.log('Running server on port' + port);
        });
    })
    .then(() =>{
    User.bulkCreate(Data)
    .then(() => {
        console.log('user inserted successfully');
    })
    .catch(error =>{
        console.log(error);
    })
})
.then(() =>{
Post.bulkCreate([{
    UserID:1,
    title: "hello",
    description: "demo post"
}])

}) 
    
     .catch(err =>{
        console.error('Unable to connect the database:',err);
     } );