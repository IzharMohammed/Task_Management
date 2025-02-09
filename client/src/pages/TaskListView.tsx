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

function TaskListView() {
    const context = useAuth();
    const navigate = useNavigate();
    const queryClient = new QueryClient();

    console.log(`context:- ${JSON.stringify(context)}`);
    if (!context.authData.displayName) {
        navigate('/');
    }
    const [view, setView] = useState<ViewType>("list");

    return (
        <div className="bg-[#FFF9F9] w-full h-screen">
            <Navbar />
            <div className="flex justify-between px-8 pt-4">
                <div className="flex gap-4">
                    <List view={view} setView={setView} />
                    <Board view={view} setView={setView} />
                </div>
            </div>
            <QueryClientProvider client={queryClient}>
                <AllFunctionalities />

                <div>
                    {
                        view === "list" && <HandleListview />
                    }
                    {
                        view === "board" && <HandleBoardView />
                    }
                </div>
            </QueryClientProvider>

        </div>
    )
}

export default TaskListView;