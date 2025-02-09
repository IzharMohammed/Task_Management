import CreateTaskModal from "./CreateTaskModal"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { auth } from "../config/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";

type Category = "work" | "personal" | null
type SortOrder = "newest" | "oldest"
interface AllFunctionalitiesProps {
    setSelectedCategory: (category: Category) => void
    setSortOrder: (sortOrder: SortOrder) => void
}
const AllFunctionalities: React.FC<AllFunctionalitiesProps> = ({ setSelectedCategory, setSortOrder }) => {
    // const { isLoading, error, categorizedTasks } = useTodos()
    const fetchTasks = async () => {
        const response = await axios.get(`http://localhost:5000/api/v1/tasks/${user?.uid}`);
        return response.data.result; // Assuming your data is under "result" key
    };
    const [user] = useAuthState(auth);


    const { isLoading, error, data: tasks } = useQuery(['todos', user?.uid], fetchTasks, {
        enabled: !!user?.uid, // Only fetch if user is authenticated
    });

    console.log(`tasks:- ${JSON.stringify(tasks)}`);

    // If loading
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // If error
    if (error) {
        return <p>An error occurred</p>;
    }


    return (
        <div className="flex justify-between mb-4 mt-4">
            <div className="flex items-center gap-3">
                <div>Filter by:</div>
                <div>
                    <details className="dropdown inline-block">
                        <summary className="btn m-1 border  cursor-pointer">Categories</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40  bg-[#7B198426] p-2 shadow">
                            <li className="cursor-pointer" onClick={() => setSelectedCategory("work")} ><a>work</a></li>
                            <li className="cursor-pointer" onClick={() => setSelectedCategory("personal")}><a>personal</a></li>
                        </ul>
                    </details>
                </div>
                <div>
                    <details className="dropdown inline-block">
                        <summary className="btn m-1 cursor-pointer">Due date:</summary>
                        <ul className="menu bg-[#7B198426] dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li className="cursor-pointer" onClick={() => setSortOrder("oldest")} ><a>oldest</a></li>
                            <li className="cursor-pointer" onClick={() => setSortOrder("newest")} ><a>newest</a></li>
                        </ul>
                    </details>
                </div>
            </div>
            <div className="flex">
                <div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    // value={searchTerm}
                    // onChange={handleSearchChange}
                    />
                </div>
                <div>
                    {/* <button
                        type="submit"
                        className="ml-3 px-4 py-2 bg-[#7B1984] w-[13rem] rounded-lg text-white hover:bg-#7B1984/80"
                        
                    >
                        Add Task
                    </button> */}
                    <CreateTaskModal />
                </div>
            </div>
        </div>
    )
}

export default AllFunctionalities