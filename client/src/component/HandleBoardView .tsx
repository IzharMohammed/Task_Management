import { useState } from "react";

interface Task {
    id: string;
    title: string;
    category: "Work" | "Personal";
    dueDate: string;
    status: "To Do" | "In Progress" | "Completed";
}

const initialTasks: Task[] = [
    { id: "1", title: "Interview with Design Team", category: "Work", dueDate: "Today", status: "To Do" },
    { id: "2", title: "Team Meeting", category: "Work", dueDate: "30 Dec, 2024", status: "To Do" },
    { id: "3", title: "Design a Dashboard page along with wireframes", category: "Work", dueDate: "31 Dec, 2024", status: "To Do" },
    { id: "4", title: "Morning Workout", category: "Personal", dueDate: "Today", status: "In Progress" },
    { id: "5", title: "Code Review", category: "Personal", dueDate: "Today", status: "In Progress" },
    { id: "6", title: "Update Task Tracker", category: "Personal", dueDate: "31 Dec, 2024", status: "In Progress" },
    { id: "7", title: "Submit Project Proposal", category: "Work", dueDate: "Today", status: "Completed" },
    { id: "8", title: "Birthday Gift Shopping", category: "Personal", dueDate: "Today", status: "Completed" },
    { id: "9", title: "Client Presentation", category: "Work", dueDate: "25 Dec, 2024", status: "Completed" },
    { id: "1", title: "Interview with Design Team", category: "Work", dueDate: "Today", status: "To Do" },
    { id: "2", title: "Team Meeting", category: "Work", dueDate: "30 Dec, 2024", status: "To Do" },
    { id: "3", title: "Design a Dashboard page along with wireframes", category: "Work", dueDate: "31 Dec, 2024", status: "To Do" },
    { id: "4", title: "Morning Workout", category: "Personal", dueDate: "Today", status: "In Progress" },
    { id: "5", title: "Code Review", category: "Personal", dueDate: "Today", status: "In Progress" },
    { id: "6", title: "Update Task Tracker", category: "Personal", dueDate: "31 Dec, 2024", status: "In Progress" },
    { id: "7", title: "Submit Project Proposal", category: "Work", dueDate: "Today", status: "Completed" },
    { id: "8", title: "Birthday Gift Shopping", category: "Personal", dueDate: "Today", status: "Completed" },
    { id: "9", title: "Client Presentation", category: "Work", dueDate: "25 Dec, 2024", status: "Completed" },

];

const HandleBoardView: React.FC = () => {

    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const renderColumn = (status: "To Do" | "In Progress" | "Completed", color: string) => (
        <div className="w-1/3 bg-gray-100 p-4 rounded-md">
            <h2 className={`text-lg font-bold mb-4`} style={{ color }}>
                {status.toUpperCase()}
            </h2>
            <div className="space-y-4">
                {tasks
                    .filter((task) => task.status === status)
                    .map((task) => (
                        <div key={task.id} className="bg-white p-4 rounded-md shadow-sm relative">
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-gray-500">{task.category}</p>
                            <p className="text-sm text-gray-400">{task.dueDate}</p>
                            <div className="absolute top-2 right-2">
                                <button
                                    className="text-blue-500 hover:underline text-sm mr-2"
                                // onClick={() => handleEdit(task.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500 hover:underline text-sm"
                                // onClick={() => handleDelete(task.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )

    return (
        <div className="flex space-x-4 p-8">
            {renderColumn("To Do", "#A855F7")}
            {renderColumn("In Progress", "#3B82F6")}
            {renderColumn("Completed", "#22C55E")}
        </div>
    )
}

export default HandleBoardView;