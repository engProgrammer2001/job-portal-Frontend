import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/config";

const Modal = ({ jobId, closeModal }) => {
  const [formData, setFormData] = useState({
    applicantName: "",
    professionalTitle: "",
    applicantLocation: "",
    applicantNumber: "",
    applicantEmail: "",
    applicantMessage: "",
    category: "",
    status: "",
    applicantsImage: null,
    resume: null, // Only resume is mandatory to upload
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] })); // Store file
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const token = localStorage.getItem("token");
  //   console.log("token:", token);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all fields to FormData
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}application/apply-for-job/${jobId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      alert("Application submitted successfully!");
      closeModal();

      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Apply for the Job</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="applicantName"
            placeholder="Name"
            value={formData.applicantName}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="professionalTitle"
            placeholder="Professional Title"
            value={formData.professionalTitle}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="applicantLocation"
            placeholder="Location"
            value={formData.applicantLocation}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="tel"
            name="applicantNumber"
            placeholder="Contact Number"
            value={formData.applicantNumber}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="email"
            name="applicantEmail"
            placeholder="Email"
            value={formData.applicantEmail}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="category e.g. IT Accounting, Software Development, etc."
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="status"
            placeholder="Status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />

          <input
            type="text"
            name="applicantsImage"
            placeholder="applicantsImage (Optional)"
            value={formData.applicantsImage}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            name="applicantMessage"
            placeholder="Message"
            value={formData.applicantMessage}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          ></textarea>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            className="w-full mb-4"
            accept=".pdf"
            required
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
