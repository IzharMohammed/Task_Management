import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { auth } from "../config/firebase-config";
import { useAuth } from "../hooks/useAuth";
type TaskCategory = "Work" | "Personal";
type TaskStatus = "TO-DO" | "IN-PROGRESS" | "COMPLETED"
interface Task {
    id: number,
    title: string,
    date: string,
    category: TaskCategory,
    status: TaskStatus
}
interface TaskState {
    todo: Task[],
    inProgress: Task[],
    completed: Task[]
}

const HandleListview: React.FC = () => {
    // const [tasks, setTasks] = useState<TaskState>({
    //     todo: [
    //         { id: 1, title: "Interview with Design Team", date: "Today", category: "Work", status: "TO-DO" },
    //         { id: 2, title: "Team Meeting", date: "30 Dec, 2024", category: "Personal", status: "TO-DO" },
    //         { id: 3, title: "Design a Dashboard page along with wireframes", date: "31 Dec, 2024", category: "Work", status: "TO-DO" },
    //         { id: 1, title: "Interview with Design Team", date: "Today", category: "Work", status: "TO-DO" },
    //         { id: 2, title: "Team Meeting", date: "30 Dec, 2024", category: "Personal", status: "TO-DO" },
    //         { id: 3, title: "Design a Dashboard page along with wireframes", date: "31 Dec, 2024", category: "Work", status: "TO-DO" },

    //     ],
    //     inProgress: [
    //         { id: 4, title: "Morning Workout", date: "Today", category: "Work", status: "IN-PROGRESS" },
    //         { id: 5, title: "Code Review", date: "Today", category: "Personal", status: "IN-PROGRESS" },
    //         { id: 6, title: "Update Task Tracker", date: "25 Dec, 2024", category: "Work", status: "IN-PROGRESS" },
    //     ],
    //     completed: [
    //         { id: 7, title: "Submit Project Proposal", date: "Today", category: "Work", status: "COMPLETED" },
    //         { id: 8, title: "Birthday Gift Shopping", date: "Today", category: "Personal", status: "COMPLETED" },
    //         { id: 9, title: "Client Presentation", date: "25 Dec, 2024", category: "Work", status: "COMPLETED" },
    //     ],
    // });
    const context = useAuth();

    const [user] = useAuthState(auth);

    const fetchTasks = async () => {
        const response = await axios.get(`http://localhost:5000/api/v1/tasks/${user?.uid}`);
        return response.data; // Ensure it returns the data
    };

    const { isLoading, error, data: todos } = useQuery(['todos', user?.uid], fetchTasks, {
        enabled: !!user?.uid, // Only fetch if user is authenticated
    });

        console.log(`todos:- ${JSON.stringify(todos)}`);
 

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>An error occurred</p>;
    }

    const renderTask = (task: Task) => (
        <div className="flex items-center justify-between border-b p-2" key={task.id}>
            <div className="flex items-center gap-2">
                <div className="cursor-move">☰</div>
                <input type="checkbox" />
                <div>{task.title}</div>
            </div>
            <div className="flex items-center gap-4">
                <div>{task.date}</div>
                <div>
                    <select value={task.status}>
                        <option value="TO-DO">TO-DO</option>
                        <option value="IN-PROGRESS">IN-PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                    </select>
                </div>
                <div>
                    <select value={task.category}>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <AiOutlineEdit className="cursor-pointer" />
                    <AiOutlineDelete className="cursor-pointer text-red-500" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-4 bg-gray-100 h-screen">
            <div className="bg-purple-100 p-4 rounded-lg mb-4">
                {/* <h2 className="text-purple-800 font-bold">Todo ({tasks.todo.length})</h2> */}
                {/* <div className="border-t mt-2">
                    {tasks.todo.map(renderTask)}
                </div> */}
            </div>
            <div className="bg-blue-100 p-4 rounded-lg mb-4">
                {/* <h2 className="text-blue-800 font-bold">In-Progress ({tasks.inProgress.length})</h2> */}
                {/* <div className="border-t mt-2">
                    {tasks.inProgress.map(renderTask)}
                </div> */}
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
                {/* <h2 className="text-green-800 font-bold">Completed ({tasks.completed.length})</h2> */}
                {/* <div className="border-t mt-2">
                    {tasks.completed.map(renderTask)}
                </div> */}
            </div>
        </div>
    );
};

export default HandleListview;