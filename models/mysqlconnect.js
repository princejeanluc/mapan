const mysql = require("mysql")

 


exports.dbQuery= function dbQuery(query,callback){
    const con = mysql.createConnection(
        {
            host:"localhost",
            user:"root",
            password:"",
            database:"mapan"
        }
    )
    con.connect((error)=>{
        if(error) throw error
        else{
            con.query(query, (error, result,fields)=>{
                if(error) callback(error, null)
                else{
                 callback(null,result)
                 con.end()
                }
            })
        }
    })
}


