import express, { Request, Response } from "express";
import Task from "../model/tasks";

// create a task
export async function createTask(req: Request, res: Response) {
  try {
    const { name, completed } = req.body;
    const tasks = await Task.create({ name, completed });
    res.status(201).json({
      status: "successful",
      newtask: {
        tasks,
      },
    });
  } catch (err: any) {
    console.log(`error occured, failed to create task`, err);
    res.status(400).json({ status: "failed to create user", msg: err.message });
  }
}

//get a tasks
export async function getAllTasks(req: Request, res: Response) {
  try {
    const alltasks = await Task.find();
    if (alltasks.length === 0) {
      console.log(`no task was found`);
      return res.status(400).json({
        msg: "no task in database",
      });
    }
    res.status(200).json({
      status: "successful",
      noOfTasks: alltasks.length,
      tasks: {
        alltasks,
      },
    });
  } catch (err: any) {
    console.log(`Error fetching tasks`, err);
    res.status(404).json({
      status: "failed to get tasks",
      msg: err.message,
    });
  }
}

// get a task
export async function getTask(req: Request, res: Response) {
  try {
    const task = await Task.findById({ _id: req.params.id });
    if (!task) {
      console.log(`this task does not exist`);
      return res.status(404).json({ message: `task does not exist` });
    }
    return res.status(200).json({
      status: "successful",
      task: task,
    });
  } catch (err: any) {
    console.log(`Error fetching the task`, err);
    return res.status(404).json({
      status: "failed",
      msg: err.message,
    });
  }
}

// delete a task
export async function deleteTask(req: Request, res: Response) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(200).json({
        msg: `task failed, could not find task with ${req.params.id} in database`,
      });
    }
    return res.status(200).json({
      status: "successful",
      task: null,
    });
  } catch (err: any) {
    console.log(`Error deleting the task`, err);
    return res.status(404).json({
      status: "failed",
      msg: err.message,
    });
  }
}

//update a task
export async function updateTask(req: Request, res: Response) {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!task) {
      return res.status(404).json({
        msg: `task with id ${req.params.id} not found, can't update`,
      });
    }
    return res.status(200).json({ status: "successful", task });
  } catch (err: any) {
    console.log(`Error, failed to update the task`, err);
    res.status(200).json({
      status: `Error occured, failed to update the task`,
      msg: err.message,
    });
  }
}
