const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().then((res)=>{
    console.log("connection sucessful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allchats = [
    {
    from : "rohit",
    to : "samar",
    message :"hello i am doing b.tech in CSE",
    created_at : new Date(),
},
{
        from : "aman",
        to : "seema",
        message :"hello nice to meet you seema!",
        created_at : new Date(),
},
{
    from : "elmaa",
    to : "aqsaa",
    message :"Islam is really a pure religion",
    created_at : new Date(),
},
{
    from : "aiman",
    to : "samiya",
    message :"send me a notes of dsa lectures",
    created_at : new Date(),
},
{
    from : "aisha",
    to : "nomaan",
    message :"you will move out of school with me",
    created_at : new Date(),
},
];
Chat.insertMany(allchats);
// Chat.deleteMany({from: "neha"})
// .then((res)=>{
//     console.log(res);
// })
// .catch(err => console.log(err));
