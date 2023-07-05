/* */
const {dbQuery}=require("./mysqlconnect.js")

class Event{

    //Create
    static createEvent(event,callback){
        const query="insert into mapan_events (title,address,datetime_event,description,poster_url,id_user) values (?,?,?,?,?,?);"
        dbQuery(query,
            [
                event.title,
                event.address,
                new Date(event.datetime),
                event.description,
                event.poster_url,
                event.id_user
            ],callback)
    } 
    //Read
    static getEvent(id,callback){
        const query="select * from mapan_events where id=?"
        dbQuery(query,
            [
                id
            ],callback)
    } 
    //Update
    static updateEvent(event,callback){
        const query= "update mapan_events set title=?, address=?, datetime_event=?,description=?,poster_url=? where id=?"
        dbQuery(query,
            [
                event.title,
                event.address,
                event.datetime,
                event.description,
                event.poster_url,
                event.id
            ],callback)
    } 

    static getAllEvents(id,callback){
        const query = "select * from mapan_events where id_user=?"
        dbQuery(query,[id],callback)
    }

    //Delete
    static deleteEvent(id,callback){
        const query="delete from mapan_events where id=?"
        dbQuery(query,
            [
                id
            ],callback)
    } 

}

module.exports = Event
