import React, { useState } from "react";

const CreateTaskModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-4">
      {/* Add Task Button */}
      <button
        onClick={openModal}
        className="ml-3 px-4 py-2 bg-[#7B1984] w-[13rem] rounded-lg text-white hover:bg-#7B1984/80"
      >
        + ADD TASK
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Create Task</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task title"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                placeholder="Description"
                maxLength={300}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>

              <div className="space-y-2">
                <label className="block font-medium">Task Category*</label>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-300">
                    Work
                  </button>
                  <button className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-300">
                    Personal
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium">Due on*</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-medium">Task Status*</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option>Choose</option>
                  <option>To-Do</option>
                  <option>In-Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block font-medium">Attachment</label>
                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                  <input type="file" id="file" className="hidden" />
                  <label
                    htmlFor="file"
                    className="text-purple-500 cursor-pointer hover:underline"
                  >
                    Drop your files here or <span className="font-medium">Update</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTaskModal;
