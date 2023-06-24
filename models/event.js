/* */
const {dbQuery}=require("./mysqlconnect.js")

class Event{

    //Create
    static createEvent(event,callback){
        const query="insert into mapan_events (title,address,datetime_event,description,poster_url,id_user) values ('"+event.title+"', '"+event.address+"',date('"+event.datetime+"'),'"+event.description+"','"+event.poster_url+"','"+event.id_user+"');"
        dbQuery(query,callback)
    } 
    //Read
    static getEvent(id,callback){
        const query="select * from mapan_events where id="+id
        dbQuery(query,callback)
    } 
    //Update
    static updateEvent(event,callback){
        const query= "update mapan_events set title='"+event.title+"', address='"+event.address+"', datetime_event='"+event.datetime+"',description='"+event.description+"',poster_url='"+event.poster_url+"' where id="+event.id
        dbQuery(query,callback)
    } 

    static getAllEvents(callback){
        const query = "select * from mapan_events"
        dbQuery(query,callback)
    }

    //Delete
    static deleteEvent(id,callback){
        const query="delete from mapan_events where id="+id
        dbQuery(query,callback)
    } 

}

module.exports = Event
