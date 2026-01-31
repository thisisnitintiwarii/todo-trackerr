import User from "../models/User.model.js"
import Todo from "../models/Todo.model.js"
import jwt from "jsonwebtoken"


export const getAllTodo = async (req, res) => {
  try {
    const  userId  = req.userId;

    const user = await User.findById(userId).populate("todo");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      todos: user.todo
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching todos"
    });
  }
};


export const addTodo = async(req,res)=>{
    // first verify with middleware 
    try {
        const userId = req.userId;
    
        const {work,status,title} = req.body
    
        const todo = await Todo.create({
            author:userId,
            work,
            status,
            title
        })

        //push into user todo list

        await User.findByIdAndUpdate(userId,{
            $push:{
                todo:todo._id
            }
        })

        return res.status(200).json({
            message:"todo added successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Their is a fault in adding todo"
        })
    }
}

export const updateStatus = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { status: "c" },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    return res.status(200).json({
      message: "Todo marked as completed",
      todo: updatedTodo
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "There is an error updating the status"
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const userId = req.userId;

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found"
      });
    }

    // remove reference from user
    await User.findByIdAndUpdate(userId, {
      $pull: { todo: todoId }
    });

    // delete todo
    await Todo.findByIdAndDelete(todoId);

    return res.status(200).json({
      message: "Todo deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "There is a fault in deleting todo"
    });
  }
};



