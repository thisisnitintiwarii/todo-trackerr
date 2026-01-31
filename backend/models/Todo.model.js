import mongoose from "mongoose"

const todoSchema = new  mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"        
    },
    work:{
        type: String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["p","c"],
        default:"p",  // pending -> p completed -> c
    }
},{timestamps:true});


const Todo = mongoose.model("Todo",todoSchema);

export default Todo;