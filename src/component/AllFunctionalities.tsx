const AllFunctionalities: React.FC = () => {
    return (
        <div className="flex justify-between mb-4 mt-4">
            <div className="flex items-center gap-3">
                <div>Filter by:</div>
                <div>
                    <details className="dropdown inline-block">
                        <summary className="btn m-1 border border-gray-500 cursor-pointer">Categories</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-40  bg-[#7B198426] p-2 shadow">
                            <li><a>work</a></li>
                            <li><a>personal</a></li>
                        </ul>
                    </details>
                </div>
                <div>
                    <details className="dropdown inline-block">
                        <summary className="btn m-1 cursor-pointer">Due date:</summary>
                        <ul className="menu bg-[#7B198426] dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li><a>Item 2</a></li>
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
                    <button
                        type="submit"
                        className="ml-3 px-4 py-2 bg-[#7B1984] w-[13rem] rounded-lg text-white hover:bg-#7B1984/80"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AllFunctionalities