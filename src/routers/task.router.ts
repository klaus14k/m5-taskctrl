import { Router } from "express"
import { TaskController } from "../controllers/taskController"
import { ensure } from "../middlewares/ensure.middleware"

export const taskRouter = Router()
const controller = new TaskController()

taskRouter.post("", controller.create)
taskRouter.get("", controller.read)
taskRouter.get("/:taskId", ensure.taskIdExists, controller.readById)
taskRouter.patch("/:taskId", ensure.taskIdExists, controller.update)
taskRouter.delete("/:taskId", ensure.taskIdExists, controller.delete)