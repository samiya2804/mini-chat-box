const express = require("express");
const app =  express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname , "views"));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));

main().then((res)=>{
    console.log("connection sucessful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
// Index route ----> to show all chats
app.get("/chats" , async(req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs" , {chats});
});

//new route---> to creaate  a button for new chat which in turn gives a form render and we aubmit it .
app.get("/chats/new" ,(req,res)=>{
    res.render("new.ejs");
});

//create rout --> sbmit by new and now we will insert in database and show in all chats section by redirecting .

app.post("/chats",(req,res)=>{
    let { from , to , message} = req.body;
    let newChat = new Chat ({
        from : from,
        to :to ,
        message : message,
        created_at : new Date(),
    });
    newChat.save().then((res)=>{
        console.log("chat was saved");
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/chats");
});
//Edit Route --> chat message edit 
app.get("/chats/:id/edit" , async(req ,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
//update route --> db update
app.put("/chats/:id" , async(req,res)=>{
    let {id} = req.params;
    let {message :newmsg} = req.body;
    let updatedchat = await Chat.findByIdAndUpdate(
        id , {message:newmsg} , 
        {runValidators:true , new : true}
    );
   console.log(updatedchat); 
   res.redirect("/chats");
});
//Destroy Route ---> to delete a message with id 
 app.delete("/chats/:id", async(req,res)=> {
    let {id} = req.params;
   let deletedchat =  await Chat.findByIdAndDelete(id);
   console.log(deletedchat);
   res.redirect("/chats");
});
app.get("/", (req, res)=>{
    res.send("root is working");
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

