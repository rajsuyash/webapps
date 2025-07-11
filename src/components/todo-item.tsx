"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Clock, Circle, AlertCircle, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: string
  category?: string
  createdAt: string
}

interface TodoItemProps {
  todo: Todo
  onTodoUpdated: () => void
  onTodoDeleted: () => void
}

export function TodoItem({ todo, onTodoUpdated, onTodoDeleted }: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleToggleComplete = async () => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed,
        }),
      })

      if (response.ok) {
        onTodoUpdated()
      }
    } catch (error) {
      console.error("Error updating todo:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onTodoDeleted()
      }
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "medium":
        return <ArrowUp className="h-4 w-4 text-yellow-500" />
      case "low":
        return <Circle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50/50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50/50"
      case "low":
        return "border-l-green-500 bg-green-50/50"
      default:
        return "border-l-gray-200 bg-white"
    }
  }

  return (
    <div
      className={cn(
        "group relative flex items-start space-x-3 p-4 border-l-4 rounded-lg bg-card transition-all duration-200 hover:shadow-md",
        getPriorityColor(todo.priority),
        todo.completed && "opacity-60"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0 mt-1">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggleComplete}
          disabled={isUpdating}
          className={cn(
            "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
            todo.priority === "high" && "border-red-300",
            todo.priority === "medium" && "border-yellow-300",
            todo.priority === "low" && "border-green-300"
          )}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-base font-medium leading-6 text-foreground",
              todo.completed && "line-through text-muted-foreground"
            )}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={cn(
                "text-sm mt-1 text-muted-foreground leading-5",
                todo.completed && "line-through"
              )}>
                {todo.description}
              </p>
            )}
            <div className="flex items-center space-x-3 mt-2">
              {/* Priority indicator */}
              <div className="flex items-center space-x-1">
                {getPriorityIcon(todo.priority)}
                <span className="text-xs text-muted-foreground capitalize">
                  {todo.priority}
                </span>
              </div>
              
              {/* Category */}
              {todo.category && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {todo.category}
                </span>
              )}
              
              {/* Date */}
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>
                  {new Date(todo.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={cn(
            "flex items-center space-x-1 ml-4 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}