import axios from "axios";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useAuth } from "../hooks/useAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase-config";
const CreateTaskModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const context = useAuth();


  const { register, handleSubmit, formState: { errors } } = useForm();

  const [user] = useAuthState(auth);


  const onSubmit = async (data: any) => {
    try {
      await axios.post('http://localhost:5000/api/v1/tasks',
        {
          title: data.title,
          description: data.description,
          task_category: data.task_category,
          due_date: data.due_date,
          task_status: data.task_status,
          userId: user?.uid,
        },
        {
          headers: {
            'Authorization': `Bearer ${context.authData.accessToken}`, // Properly set the Authorization header
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.error('Error in Axios POST request:', error);
    }
  };

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
              <form onSubmit={handleSubmit(onSubmit)}>

                <input
                  type="text"
                  placeholder="Task title"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  {...register("title", { required: true })} />

                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  {...register("description", { required: true })} />

                <select {...register("task_category", { required: true })}>
                  <option value="Work">Work</option>
                  <option value=" Personal"> Personal</option>
                </select>

                <input type="date" placeholder="dueDate" {...register("due_date", { required: true })} />

                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  {...register("task_status", { required: true })}>
                  <option value="To-Do">To-Do</option>
                  <option value=" In-Progress"> In-Progress</option>
                  <option value=" Completed"> Completed</option>
                </select>

                {/* Modal Footer */}
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTaskModal;
