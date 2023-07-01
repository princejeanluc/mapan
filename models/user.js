/** */
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



