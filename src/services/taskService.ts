import { prisma } from "../database/prisma"
import { TaskCreate, TaskRead, TaskReturn, TaskUpdate } from "../interfaces/task.interface"
import { readTaskSchema, taskSchema } from "../schemas/task.schema"

export class TaskService {
    public create = async (payload: TaskCreate): Promise<TaskReturn> => {
        const newTask = await prisma.task.create({data: payload})
        return taskSchema.parse(newTask)
    }

    public read = async (category?: string): Promise<Array<TaskRead>> => {
        let query: any = {include: {category: true}}

        if (category){
            const whereField = {name: {equals: category, mode: "insensitive"}}
            query = { ...query, where: {category: whereField} }
        }

        const allTasks = await prisma.task.findMany(query)
        
        return readTaskSchema.array().parse(allTasks)
    }

    public readById = async (id: string): Promise<TaskReturn> => {
        const task = await prisma.task.findFirst({include: {category: true}, where: {id: Number(id)}})

        return taskSchema.parse(task)
    }

    public update = async (id: string, payload: TaskUpdate): Promise<TaskReturn> => {
        const updatedTask = await prisma.task.update({where: {id: Number(id)}, data: payload})

        return taskSchema.parse(updatedTask)
    }

    public delete = async (id: string): Promise<void> => {
        await prisma.task.delete({where: {id: Number(id)}})
    }
}