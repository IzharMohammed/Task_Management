import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

export const useTodos = () => {

    const [user] = useAuthState(auth);
    
    const fetchTasks = async () => {
        const response = await axios.get(`http://localhost:5000/api/v1/tasks/${user?.uid}`);
        console.log(`useTodo:- ${JSON.stringify(response.data)}`);
        return response.data.result; // Assuming your data is under "result" key
        
    };
    console.log(`uid:- ${user?.uid}`);
    
    console.log(`inside`);
    const { isLoading, error, data: tasks } = useQuery(['todos', user?.uid], fetchTasks, {
        enabled: !!user?.uid, // Only fetch if user is authenticated
    });

    console.log(`tasks from handleBoardView :- ${JSON.stringify(tasks)}`);


    // console.log(`tasks:- ${JSON.stringify(tasks)}`);

    // Categorize tasks based on their status
    const categorizedTasks: TaskStateBoardView = {
        todo: tasks.filter((task: Task) => task.taskStatus === 'TODO'),
        inprogres: tasks.filter((task: Task) => task.taskStatus === 'INPROGRES'),
        completed: tasks.filter((task: Task) => task.taskStatus === 'COMPLETED'),
    };

    return { isLoading, error, categorizedTasks }

}