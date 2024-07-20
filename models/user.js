/*
const {dbQuery}=require("./mysqlconnect.js")

class User{
    //Create
    static createUser(user,callback){
        //requete
        const query="insert into users (first_name, last_name,birthday,inscr_date,email,pssword) values (?, ?,?,now(),?,?);"
        dbQuery(query,
            [
                user.first_name,
                user.last_name,
                new Date(user.birthday),
                user.email,
                user.password
            ],callback)
    } 
    //Read
    static getUser(id,callback){
        const query="select * from users where id=?"
        dbQuery(query,[id],callback)
    }

    static getUserByEmail(email,callback){
        const query =" select  * from users where email=?"
        dbQuery(query,[email],callback)
    }    

    static getAllUsers(callback){
        const query="select * from users"
        dbQuery(query,[],callback)
    } 
    //Update
    static UpdateUser(user,callback){
        const query="update users set first_name=?,last_name=?,birthday=?,email=?,pssword=?"
        dbQuery(query,
            [   user.first_name,
                user.last_name,
                new Date(user.birthday),
                user.email,
                user.password
            ]
            ,callback)
    } 
    //Delete
    static deleteUser(id,callback){
        const query="delete from users where id=?"
        dbQuery(query,
            [
                id
            ],callback)
    } 

}

module.exports = User
*/

const { Sequelize, DataTypes, Model } = require('sequelize');



const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'msql'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

class User extends Model {}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  birthday: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  mdp: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  phoneNumber: {
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});




