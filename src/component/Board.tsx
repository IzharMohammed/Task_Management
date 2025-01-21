import { CiViewBoard } from "react-icons/ci";

type ViewType = "list" | "board";
type SetViewType = React.Dispatch<React.SetStateAction<ViewType>>;

type Props = {
    view: ViewType; // Allow both "list" and "board"
    setView: SetViewType;
};

const Board: React.FC<Props> = ({ view, setView }) => {
    return (
        <div
            className={`flex gap-2 items-center ${view === "board" ? "font-semibold" : ""}`}
            onClick={() => setView("board")}
        >
            <div>
                <CiViewBoard />
            </div>
            <div>Board</div>
        </div>
    );
};

export default Board;
