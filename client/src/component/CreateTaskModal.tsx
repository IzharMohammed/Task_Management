import React, { useState } from "react";
import { useForm } from 'react-hook-form';
const CreateTaskModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [allValues, setAllValues] = useState({
    title: '',
    description: '',
  })

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);


  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => setIsModalOpen(false);

  const changeHandler = (e: { target: { name: any; value: any; }; }) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }



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
            {/* <div className="space-y-4">
              <input
                type="text"
                placeholder="Task title"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={changeHandler}
              />
              <textarea
                placeholder="Description"
                maxLength={300}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={changeHandler}
              ></textarea>

              <div className="space-y-2">
                <label className="block font-medium">Task Category*</label>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 cursor-pointer rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-300">
                    Work
                  </button>
                  <button className="px-4 py-2 rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200 border border-gray-300">
                    Personal
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium">Due on</label>
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

              

            </div> */}
            <div className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)}>

                <input
                  type="text"
                  placeholder="Task title"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  {...register} />

                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  {...register("Description", { required: true })} />

                <select {...register("Task Category*", { required: true })}>
                  <option value="Work">Work</option>
                  <option value=" Personal"> Personal</option>
                </select>

                <input type="date" placeholder="Due on " {...register("Due on ", { required: true })} />

                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  {...register("Task Status*", { required: true })}>
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
