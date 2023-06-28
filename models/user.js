/** */
const {dbQuery}=require("./mysqlconnect.js")

class User{
    //Create
    static createUser(user,callback){
        //requete
        const query="insert into users (first_name, last_name,birthday,inscr_date,email,pssword) values ('"+user.first_name+"', '"+user.last_name+"','"+user.birthday+"',now(),'"+user.email+"','"+user.password+"');"
        dbQuery(query,callback)
    } 
    //Read
    static getUser(id,callback){
        const query="select * from users where id="+id
        dbQuery(query,callback)
    }

    static getUserByEmail(email,callback){
        const query =" select  * from users where email='"+email+"'"
        dbQuery(query,callback)
    }    

    static getAllUsers(callback){
        const query="select * from users"
        dbQuery(query,callback)
    } 
    //Update
    static UpdateUser(user,callback){
        const query="update users set first_name='"+user.first_name+"',last_name='"+user.last_name+"',birthday=date('"+user.birthday+"'),email='"+user.email+"',pssword='"+user.password+"'"
        dbQuery(query,callback)
    } 
    //Delete
    static deleteUser(id,callback){
        const query="delete from users where id="+id
        dbQuery(query,callback)
    } 

}

module.exports = User



