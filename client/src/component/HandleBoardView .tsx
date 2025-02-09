import axios from "axios";
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "@tanstack/react-query";

type Category = "work" | "personal" | null
type SortOrder = "newest" | "oldest"
interface HandleListviewProps {
    category: Category
    sortOrder: SortOrder
}

const HandleBoardView: React.FC<HandleListviewProps> = ({ category, sortOrder }) => {
    const fetchTasks = async () => {
        const response = await axios.get(`http://localhost:5000/api/v1/tasks/${user?.uid}`);
        return response.data.result; // Assuming your data is under "result" key
    };
    const [user] = useAuthState(auth);


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
    const filteredTasks = category ? tasks.filter((task: Task) => task.category?.toLowerCase() === category.toLowerCase()) : tasks
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        const dateA = new Date(a.DueOn).getTime()
        const dateB = new Date(b.DueOn).getTime()
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })


    // Categorize tasks based on their status
    const categorizedTasks: TaskStateBoardView = {
        todo: sortedTasks.filter((task: Task) => task.taskStatus === 'TODO'),
        inprogres: sortedTasks.filter((task: Task) => task.taskStatus === 'INPROGRES'),
        completed: sortedTasks.filter((task: Task) => task.taskStatus === 'COMPLETED'),
    };

    categorizedTasks.todo.map((task) => {
        console.log(`todo task:- ${JSON.stringify(task)}`);
    });

    // const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const renderColumn = (status: TaskStatus, title: string, color: string) => (
        <div className="w-1/3 bg-gray-100 p-4 rounded-md">
            <h2 className={`text-lg font-bold mb-4`} style={{ color }}>
                {title.toUpperCase()}
            </h2>
            <div className="space-y-4">
                {categorizedTasks[status.toLowerCase() as keyof TaskStateBoardView].map((task) => (
                    <div key={task.id} className="bg-white p-4 rounded-md shadow-sm relative">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-500">{task.category}</p>
                        <p className="text-sm text-gray-400">{task.DueOn}</p>
                        <div className="absolute top-2 right-2">
                            <button className="text-blue-500 hover:underline text-sm mr-2">
                                Edit
                            </button>
                            <button className="text-red-500 hover:underline text-sm">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex space-x-4 p-8">
            {renderColumn("TODO", "To Do", "#A855F7")}
            {renderColumn("INPROGRES", "In Progres", "#3B82F6")}
            {renderColumn("COMPLETED", "Completed", "#22C55E")}
        </div>
    );
};

export default HandleBoardView;