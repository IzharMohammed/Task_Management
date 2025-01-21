import Navbar from "../component/Navbar"
import { CiBoxList } from "react-icons/ci";
import { CiViewBoard } from "react-icons/ci";
function TaskListView() {
    return (
        <div className="bg-[#FFF9F9] w-full h-screen">
            <Navbar />
            <div className="flex justify-between px-8 pt-4">
                <div className="flex gap-4">
                    <div className="flex gap-2 items-center ">
                        <div><CiBoxList /></div>
                        <div>List</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div>
                            <CiViewBoard />
                        </div>
                        <div>Board</div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default TaskListView