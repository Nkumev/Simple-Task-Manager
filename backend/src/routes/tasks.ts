import express from "express";
import * as task from "../controller/tasks";
const router = express.Router();

/* GET users listing. */
router.post("/", task.createTask);
router.get("/", task.getAllTasks);
router.get("/:id", task.getTask);
router.delete("/:id", task.deleteTask);
router.patch("/:id", task.updateTask);

export default router;
