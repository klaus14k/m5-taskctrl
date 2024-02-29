import { Router } from "express"
import { TaskController } from "../controllers/taskController"
import { ensure } from "../middlewares/ensure.middleware"
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema"

export const taskRouter = Router()
const controller = new TaskController()

taskRouter.post("", ensure.validBody(createTaskSchema), ensure.bodyCategoryIdExists, controller.create)
taskRouter.get("", controller.read)
taskRouter.get("/:id", ensure.taskIdExists, controller.readById)
taskRouter.patch("/:id", ensure.validBody(updateTaskSchema), ensure.taskIdExists, controller.update)
taskRouter.delete("/:id", ensure.taskIdExists, controller.delete)