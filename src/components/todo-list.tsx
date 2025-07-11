"use client"

import { useState, useEffect } from "react"
import { TodoItem } from "./todo-item"
import { AddTodoModal } from "./add-todo-modal"
import { CalendarDays, CheckCircle2, Clock, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: string
  category?: string
  createdAt: string
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "today" | "completed">("all")

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos")
      if (response.ok) {
        const todosData = await response.json()
        setTodos(todosData)
      }
    } catch (error) {
      console.error("Error fetching todos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleTodoAdded = () => {
    fetchTodos()
  }

  const handleTodoUpdated = () => {
    fetchTodos()
  }

  const handleTodoDeleted = () => {
    fetchTodos()
  }

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    switch (activeFilter) {
      case "completed":
        return matchesSearch && todo.completed
      case "today":
        return matchesSearch && !todo.completed
      default:
        return matchesSearch
    }
  })

  const completedTodos = filteredTodos.filter(todo => todo.completed)
  const pendingTodos = filteredTodos.filter(todo => !todo.completed)
  const totalTodos = todos.length
  const completedCount = todos.filter(todo => todo.completed).length

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-lg font-medium text-muted-foreground">Loading your tasks...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Today</h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {completedCount} of {totalTodos} completed
              </span>
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ 
                    width: totalTodos > 0 ? `${(completedCount / totalTodos) * 100}%` : '0%'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 border-0 bg-muted/50 focus:bg-card focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={activeFilter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter("all")}
                className="text-sm"
              >
                <Filter className="h-4 w-4 mr-1" />
                All
              </Button>
              <Button
                variant={activeFilter === "today" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter("today")}
                className="text-sm"
              >
                <Clock className="h-4 w-4 mr-1" />
                Active
              </Button>
              <Button
                variant={activeFilter === "completed" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter("completed")}
                className="text-sm"
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Completed
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-6">
          {/* Active Tasks */}
          {pendingTodos.length > 0 && (
            <div className="animate-fade-in">
              <div className="space-y-2">
                {pendingTodos.map((todo, index) => (
                  <div
                    key={todo.id}
                    className="animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TodoItem
                      todo={todo}
                      onTodoUpdated={handleTodoUpdated}
                      onTodoDeleted={handleTodoDeleted}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTodos.length > 0 && (
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <h2 className="text-lg font-semibold text-foreground">
                  Completed ({completedTodos.length})
                </h2>
              </div>
              <div className="space-y-2">
                {completedTodos.map((todo, index) => (
                  <div
                    key={todo.id}
                    className="animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TodoItem
                      todo={todo}
                      onTodoUpdated={handleTodoUpdated}
                      onTodoDeleted={handleTodoDeleted}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredTodos.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <CalendarDays className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {searchTerm ? "No tasks found" : "All clear!"}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchTerm 
                  ? "Try adjusting your search terms or filters."
                  : "Looks like you've got everything under control. Add a new task to get started."
                }
              </p>
            </div>
          )}
        </div>
      </div>

      <AddTodoModal onTodoAdded={handleTodoAdded} />
    </div>
  )
}