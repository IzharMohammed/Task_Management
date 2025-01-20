import { MdOutlineEventNote } from "react-icons/md";
import GoogleButton from "./component/GoogleButton";
import TaskListView from "./component/TaskListView";

function App() {
  return (
    <div className="bg-[#FFF9F9] w-full h-screen">
      <div className="flex">
        <div className="flex flex-col w-1/2 pl-20 pt-56 gap-4 h-[167.31px] ">
          <div className="flex">
            <div className="flex items-center">
              <MdOutlineEventNote size={'25px'} />
            </div>
            <div className="h1 h-[37px] text-2xl w-[131px]">Task buddy</div>
          </div>
          <div className="w-[294.61px] h-[32px] ">Streamline your workflow and track progress effortlessly and with our all-in-one task management app</div>
          <div className="mt-8">
            <GoogleButton />
          </div>
        </div>
        <div className="relative  w-3/5  rounded-lg border-black">
          <TaskListView />
        </div>
      </div>
    </div>
  )
}

export default App