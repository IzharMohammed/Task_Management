type TaskCategory = "Work" | "Personal";
type TaskStatus = "TODO" | "INPROGRES" | "COMPLETED";  // Update status values based on your data

interface Task {
    id: number;
    title: string;
    description: string;
    category: TaskCategory;
    DueOn: string; // Use DueOn as the task date
    taskStatus: TaskStatus; // taskStatus corresponds to the task status in the data
    userId: string;
}

interface TaskState {
    todo: Task[];
    inProgress: Task[];
    completed: Task[];
}

interface TaskStateBoardView {
    todo: Task[];
    inprogres: Task[];
    completed: Task[];
}

type Category = "work" | "personal" | null
type SortOrder = "newest" | "oldest"

interface HandleListviewProps {
    category: Category
    sortOrder: SortOrder
}

interface HandleListviewProps {
    category: Category
    sortOrder: SortOrder
}

