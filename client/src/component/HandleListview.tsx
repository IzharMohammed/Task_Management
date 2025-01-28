import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { auth } from "../config/firebase-config";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

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

const HandleListview: React.FC = () => {
    const context = useAuth();
    const [user] = useAuthState(auth);

    const [checkedTasks, setCheckedTasks] = useState<Set<number>>(new Set()); // State to store checked task IDs


    const fetchTasks = async () => {
        const response = await axios.get(`http://localhost:5000/api/v1/tasks/${user?.uid}`);
        return response.data.result; // Assuming your data is under "result" key
    };

    const { isLoading, error, data: tasks } = useQuery(['todos', user?.uid], fetchTasks, {
        enabled: !!user?.uid, // Only fetch if user is authenticated
    });

    // If loading
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // If error
    if (error) {
        return <p>An error occurred</p>;
    }
    // console.log(`tasks:- ${JSON.stringify(tasks)}`);

    // Categorize tasks based on their status
    const categorizedTasks: TaskState = {
        todo: tasks.filter((task: Task) => task.taskStatus === 'TODO'),
        inProgress: tasks.filter((task: Task) => task.taskStatus === 'INPROGRES'),
        completed: tasks.filter((task: Task) => task.taskStatus === 'COMPLETED'),
    };
    console.log(`todo categorizedTasks:- ${JSON.stringify(categorizedTasks.todo)}`);
    console.log(`inProgress categorizedTasks:- ${JSON.stringify(categorizedTasks.inProgress)}`);
    console.log(`completed categorizedTasks:- ${JSON.stringify(categorizedTasks.completed)}`);

    const deleteTask = async (taskId: number) => {
        await axios.delete(`http://localhost:5000/api/v1/tasks/${taskId}`);
    }


    const checkHandler = (taskId: number) => {
        setCheckedTasks(prevState => {
            const newCheckedTasks = new Set(prevState);
            console.log(`Before newCheckedTasks:- ${[...newCheckedTasks]}`);
            if (newCheckedTasks.has(taskId)) {
                newCheckedTasks.delete(taskId);
            } else {
                newCheckedTasks.add(taskId);
                deleteTask(taskId);
            }
            console.log(`After newCheckedTasks:- ${[...newCheckedTasks]}`);

            return newCheckedTasks;
        });
    }



    const renderTask = (task: Task) => (
        <div className="flex items-center justify-between border-b p-2" key={task.id}>
            <div className="flex items-center gap-2">
                <div className="cursor-move">☰</div>
                <input type="checkbox"
                    id="checkbox" checked={checkedTasks.has(task.id)}
                    onChange={() => checkHandler(task.id)}
                />
                <div>{task.title}</div>
            </div>
            <div className="flex items-center gap-4">
                <div>{task.DueOn}</div> {/* Display DueOn date */}
                <div>
                    <select value={task.taskStatus}>
                        <option value="TODO">TO-DO</option>
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
                <h2 className="text-purple-800 font-bold">Todo ({categorizedTasks.todo.length})</h2>
                <div className="border-t mt-2">
                    {categorizedTasks.todo.map(renderTask)}
                </div>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg mb-4">
                <h2 className="text-blue-800 font-bold">In-Progress ({categorizedTasks.inProgress.length})</h2>
                <div className="border-t mt-2">
                    {categorizedTasks.inProgress.map(renderTask)}
                </div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
                <h2 className="text-green-800 font-bold">Completed ({categorizedTasks.completed.length})</h2>
                <div className="border-t mt-2">
                    {categorizedTasks.completed.map(renderTask)}
                </div>
            </div>
        </div>
    );
};

export default HandleListview;
