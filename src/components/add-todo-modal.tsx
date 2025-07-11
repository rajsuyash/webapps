"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Calendar, Flag, Tag, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddTodoModalProps {
  onTodoAdded: () => void
}

export function AddTodoModal({ onTodoAdded }: AddTodoModalProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return

    setIsLoading(true)
    
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          priority,
        }),
      })

      if (response.ok) {
        setTitle("")
        setDescription("")
        setPriority("medium")
        setOpen(false)
        onTodoAdded()
      }
    } catch (error) {
      console.error("Error adding todo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const priorities = [
    { value: "low", label: "Low", color: "text-green-600", bg: "bg-green-50 border-green-200" },
    { value: "medium", label: "Medium", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" },
    { value: "high", label: "High", color: "text-red-600", bg: "bg-red-50 border-red-200" },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-200 hover:scale-105 group"
          size="lg"
        >
          <Plus className="h-7 w-7 group-hover:rotate-90 transition-transform duration-200" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 animate-scale-in">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Add New Task
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            What would you like to get done today?
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 p-6 pt-0">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Task Name
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Finish project proposal"
              className="border-0 bg-muted/50 focus:bg-card focus:ring-2 focus:ring-primary/20 text-base py-3 px-4"
              required
              autoFocus
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any details or notes..."
              className="border-0 bg-muted/50 focus:bg-card focus:ring-2 focus:ring-primary/20 min-h-[80px] resize-none px-4 py-3"
              rows={3}
            />
          </div>

          {/* Priority Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Priority
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={cn(
                    "p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium",
                    priority === p.value
                      ? `${p.bg} ${p.color} border-current`
                      : "bg-muted/30 border-muted-foreground/20 text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-4 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              disabled
            >
              <Calendar className="h-4 w-4 mr-2" />
              Due Date
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              disabled
            >
              <Tag className="h-4 w-4 mr-2" />
              Label
            </Button>
          </div>

          {/* Footer */}
          <DialogFooter className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || !title.trim()}
              className="px-8 py-2 font-medium"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                "Add Task"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}