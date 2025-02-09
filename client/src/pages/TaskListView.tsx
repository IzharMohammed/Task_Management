import Navbar from "../component/Navbar";
import HandleListview from "../component/HandleListview";
import HandleBoardView from "../component/HandleBoardView ";
import { useState } from "react";
import List from "../component/List";
import Board from "../component/Board";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import AllFunctionalities from "../component/AllFunctionalities";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ViewType = "list" | "board";
type Category = "work" | "personal" | null

function TaskListView() {
    const context = useAuth();
    const navigate = useNavigate();
    const queryClient = new QueryClient();

    console.log(`context:- ${JSON.stringify(context)}`);
    if (!context.authData.displayName) {
        navigate('/');
    }

    const [view, setView] = useState<ViewType>("list");
    const [selectedCategory, setSelectedCategory] = useState<Category>(null);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

    return (
        <div className="bg-[#FFF9F9] w-full h-screen">
            <QueryClientProvider client={queryClient}>
                <Navbar />
                <div className="flex justify-between px-8 pt-4">
                    <div className="flex gap-4">
                        <List view={view} setView={setView} />
                        <Board view={view} setView={setView} />
                    </div>
                </div>
                <AllFunctionalities setSelectedCategory={setSelectedCategory} setSortOrder={setSortOrder} />

                <div>
                    {
                        view === "list" && <HandleListview category={selectedCategory} sortOrder={sortOrder} />
                    }
                    {
                        view === "board" && <HandleBoardView category={selectedCategory} sortOrder={sortOrder} />
                    }
                </div>
            </QueryClientProvider>

        </div >
    )
}

export default TaskListView;