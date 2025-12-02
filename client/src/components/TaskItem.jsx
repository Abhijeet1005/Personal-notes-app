import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const TaskItem = ({ task }) => {
    const { updateTask, deleteTask } = useTasks();
    const [isExpanded, setIsExpanded] = useState(false);
    const [details, setDetails] = useState(task.description || '');
    const [isEditing, setIsEditing] = useState(false);

    // Sync details if task prop changes (e.g. from server)
    useEffect(() => {
        setDetails(task.description || '');
    }, [task.description]);

    const handleToggleDone = () => {
        updateTask(task._id, { isDone: !task.isDone });
    };

    const handleSaveDetails = () => {
        updateTask(task._id, { description: details });
        setIsEditing(false);
        toast.success("Details saved successfully");
    };

    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent expand
        if (confirm('Are you sure you want to delete this task?')) {
            deleteTask(task._id);
            toast.success("Task deleted");
        }
    };

    return (
        <Card
            className={cn(
                "transition-all duration-300 ease-in-out overflow-hidden cursor-pointer hover:shadow-md",
                isExpanded ? "ring-2 ring-primary" : "",
                task.isDone ? "opacity-60" : ""
            )}
            onClick={() => !isExpanded && setIsExpanded(true)}
        >
            <CardHeader className="flex flex-row items-center space-y-0 p-4 pb-2">
                <div className="flex items-center space-x-3 flex-1">
                    <Checkbox
                        checked={task.isDone}
                        onCheckedChange={handleToggleDone}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span className={cn(
                        "font-medium text-lg transition-all",
                        task.isDone ? "line-through text-muted-foreground" : ""
                    )}>
                        {task.title}
                    </span>
                </div>
                <div className="flex items-center space-x-1">
                    {isExpanded && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(false);
                            }}
                        >
                            <ChevronUp className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardHeader>

            {/* Expanded Content */}
            <div className={cn(
                "grid transition-all duration-300 ease-in-out",
                isExpanded ? "grid-rows-[1fr] opacity-100 p-4 pt-0" : "grid-rows-[0fr] opacity-0 p-0"
            )}>
                <div className="overflow-hidden">
                    <div className="mt-2 space-y-4">
                        <Textarea
                            placeholder="Add details..."
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className="min-h-[100px] resize-none"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex justify-between items-center">
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleDelete}
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                            <Button
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveDetails();
                                }}
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save Details
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default TaskItem;
