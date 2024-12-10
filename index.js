const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const {v4: uuidv4} = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req, res) => {
    res.render("newpost.ejs");
     
})
app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {username,content}= req.body;
   posts.push({ id,username, content});
  res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
   let {id} =req.params;

   let post = posts.find((p)=>id ===p.id);
   console.log(post);
   res.render("show.ejs",{post})
})


app.listen(port,()=>{
   console.log("listening on port : 3000") 
});
app.patch("/posts/:id", (req, res)=>{
    let {id} =req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id ===p.id);
   post.content = newContent;

    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req,res)=>{
    let {id} =req.params;
    let post = posts.find((p)=>id ===p.id);
res.render("edit.ejs",{post});
});
app.delete("/post/:id",(req,res)=>{
    let {id} =req.params;
    posts = posts.filter((p) =>id !== p.id);
    res.redirect("/posts");
})

let posts = [
    {
        id:uuidv4(),
        username:"sibgatullah",
        content: "I learn coding",
    },
    {
        id:uuidv4(),
        username:"Asad",
        content: "Consitency is Key",
    },
    {
        id:uuidv4(),
        username:"Asiya ",
        content: "AI disturb human being",
    }

];