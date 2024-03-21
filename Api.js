const express = require("express")
const app = express()
const bodyP = require("body-parser")
const compiler = require("compilex")
const options = {stats: true}
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.16", express.static("E:/WEB DEVELOPMENT/inter2/codemirror-5.65.16"))
app.get("/", function(req,res) {
    compiler.flush(function() {
        console.log("deleted")
    })
    res.sendFile("E:/WEB DEVELOPMENT/inter2/index.html")
})
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    try{
        if(lang == "cpp"){
            if(!input){
                var envData = { OS : "windows" , cmd : "g++", options: {timeout : 10000} }; 
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                });
            }
            else {
                var envData = { OS : "windows" , cmd : "g++", options: {timeout : 10000}};
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                });

            }
        }
        else if(lang == "java"){
            if(!input){
                var envData = { OS : "windows"};
                compiler.compileJava( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                }); 
            }
            else {
                var envData = { OS : "windows"};
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                });
            }
        }
        else if (lang =="Python") {

            if(!input){
                var envData = { OS : "windows"};
                compiler.compilePython( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                }); 
            }
            else {
                var envData = { OS : "windows"};
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                });
            }
        }
        else if (lang == "C#") {
            if (!input) {
                var envData = { OS : "windows"};
                compiler.compileCS( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                });  
            }
            else {
                var envData = { OS : "windows"};
                compiler.compileCSWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"error"})
                    }
                });
            }
        }
    }
    catch(e){
        console.log("error")
    }
})

app.listen(8000)