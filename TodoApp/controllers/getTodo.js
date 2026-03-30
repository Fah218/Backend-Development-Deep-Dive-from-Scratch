// import the model
const { response } = require("express");
const Todo = require("../models/Todo");

// define the route handlers

exports.getTodo=  async(req,res)=>{
    try{
        // fetch all todo items
        const todos= await Todo.find({});
       
        // response

        res.status(200)
        .json({
            success:true,
            data:todos,
            message:"Entire Todo Data is fetched"
        })
    }
    catch(err){
         console.error(err);
         console.log(err);
         res.status(500)
         .json({
            success:false,
            error:err.message,
            message:'server error',
        });
    }
}

exports.getTodoById=  async(req,res)=>{
    try{
        // fetch todo item based on id
        const id= req.params.id;
        const todo= await Todo.findById({_id:id})

       
        // data forgiven id not found
        if(!todo){
            return res.status(404).json({
                   success:false,
                   message:"No Data Found with Given id",
            })
        }
        // data for an id found
        res.status(200).json({
            success:true,
            data:todo,
            message:`Todo ${id} data successfully fetched`,
        })



    }
    catch(err){
         console.error(err);
         console.log(err);
         res.status(500)
         .json({
            success:false,
            error:err.message,
            message:'server error',
        });
    }
}