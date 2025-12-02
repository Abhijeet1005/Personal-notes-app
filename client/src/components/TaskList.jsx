import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { ScrollArea } from "@/components/ui/scroll-area";

const TaskList = () => {
    const { tasks, loading, fetchTasks } = useTasks();

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-muted-foreground">Loading tasks...</div>;
    }

    if (tasks.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                <p>No tasks for today.</p>
                <p className="text-sm">Add one above to get started!</p>
            </div>
        );
    }

    return (
        <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <div className="space-y-3 pb-10">
                {tasks.map(task => (
                    <TaskItem key={task._id} task={task} />
                ))}
            </div>
        </ScrollArea>
    );
};

export default TaskList;
