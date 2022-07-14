import { TaskModel } from './task'

export type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  tasks: TaskModel[]
}
