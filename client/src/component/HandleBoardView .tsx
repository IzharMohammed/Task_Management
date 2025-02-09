import { useTodos } from "../hooks/useTodos";

const HandleBoardView: React.FC = () => {

    const { isLoading, error, categorizedTasks } = useTodos()

    // If loading
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // If error
    if (error) {
        return <p>An error occurred</p>;
    }

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