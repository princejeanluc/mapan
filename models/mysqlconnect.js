const mysql = require("mysql")

 


exports.dbQuery= function dbQuery(query,data,callback){
    const con = mysql.createConnection(
        {
            host:"localhost",
            user:"root",
            password:"",
            database:"mapan"
        }
    )
    con.connect((error)=>{
        if(error) {
            error.message = "impossible de se connecter à la base de donnée"
            callback(error,null)
        }
        else{
            con.query(query,data, (error, result,fields)=>{
                if(error) {
                    error.message = "La requete à la base de donnée à génerer une erreur"
                    callback(error, null)
                }
                else{
                 callback(null,result)
                 con.end()
                }
            })
        }
    })
}


