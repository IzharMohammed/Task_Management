import { CiBoxList } from "react-icons/ci"

type ViewType = "list" | "board";
type SetViewType = React.Dispatch<React.SetStateAction<ViewType>>;

type props = {
    view: ViewType;
    setView: SetViewType;
};

const List: React.FC<props> = ({ view, setView }) => {
    return (
        <div
            className={`flex gap-2 items-center ${view === "list" ? "font-semibold" : ""
                }`}
            onClick={() => setView("list")}
        >
            <div><CiBoxList /></div>
            <div>List</div>
        </div>
    )
}

export default List