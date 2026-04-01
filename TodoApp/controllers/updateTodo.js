// import the model
const Todo = require("../models/Todo");

// define the route handlers

exports.updateTodo=  async(req,res)=>{
    try{
        const {id} = req.params;
        const {title,description}= req.body;

        const todo=await Todo.findByIdAndUpdate(
            id,
            {title,description , updatedAt: Date.now()}
        )
        res.status(200).json({
            success:true,
            data:todo,
            message:'Updated successfully'
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