import { CiLogout } from "react-icons/ci";
import { MdOutlineEventNote } from "react-icons/md";

const Navbar: React.FC = () => {
    return (
        <div className="flex items-center justify-between px-8 pt-8">
            <div className="flex">
                <div className="flex items-center">
                    <MdOutlineEventNote size={"25px"} />
                </div>
                <div className="h1 h-[37px] text-2xl w-[131px]">Task buddy</div>
            </div>
            <div className="flex gap-4">
                <div>profileImage</div>
                <details className="dropdown relative">
                    <summary className="btn m-1 w-[7rem] cursor-pointer">username</summary>
                    <ul className="dropdown-content absolute top-full left-0 bg-white shadow-lg rounded-md mt-2">
                        <div
                            className="flex w-[7rem] pl-4 h-[2.5rem] rounded-lg bg-[#f1d2d2] gap-2 items-center cursor-pointer"
                        >
                            <div><CiLogout /></div>
                            <div>Logout</div>
                        </div>
                    </ul>
                </details>
            </div>
        </div>
    );
};

export default Navbar;
