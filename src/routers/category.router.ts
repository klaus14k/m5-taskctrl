import { Router } from "express"
import { CategoryController } from "../controllers/categoryController"
import { ensure } from "../middlewares/ensure.middleware"

export const categoryRouter = Router()
const controller = new CategoryController()

categoryRouter.post("", controller.create)
categoryRouter.delete("/:categoryId", ensure.paramCategoryIdExists, controller.delete)