import React from "react";

const GoogleButton: React.FC = () => {
    return (
        <button className="flex items-center justify-center gap-2 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors w-[363.72px] h-[59.65px]">
            <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt="Google Logo"
                className="w-5 h-5"
            />
            <span>Continue with Google</span>
        </button>
    );
};

export default GoogleButton;
