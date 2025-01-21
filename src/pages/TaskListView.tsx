import Navbar from "../component/Navbar"
import { CiBoxList } from "react-icons/ci";
import { CiViewBoard } from "react-icons/ci";
import HandleListview from "../component/HandleListview";
import HandleBoardView from "../component/HandleBoardView ";
import { useState } from "react";
import List from "../component/List";
import Board from "../component/Board";

type ViewType = "list" | "board";

function TaskListView() {
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
            <div>
                {
                    view === "list" && <HandleListview />
                }
                {
                    view === "board" && <HandleBoardView />
                }
            </div>
        </div>
    )
}

export default TaskListView