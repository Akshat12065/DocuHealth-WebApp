import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
  // ✅ fix here

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        aadharnumber: ""
    });

    const [qrval, setQrval] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/submit', formData);
            console.log(response.data);
            setQrval(response.data);
            navigate('/');   // ✅ redirect to home (change path if needed)
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen w-full bg-neutral-800">
            <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full border-2 flex justify-center border-green-700 shadow-green-700 m-4">
                <div className="w-2/3">
                    <h2 className="text-3xl text-green-700 font-bold mb-6 text-center">
                        Patient Registration
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border bg-gray-300 border-gray-300 rounded"
                            required
                        />
                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={formData.age}
                            onChange={handleChange}
                            className="w-full p-2 border bg-gray-300 border-gray-300 rounded"
                            required
                        />
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full p-2 border bg-gray-300 border-gray-300 rounded"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Contact Number"
                            value={formData.contact}
                            onChange={handleChange}
                            className="w-full p-2 border bg-gray-300 border-gray-300 rounded"
                            required
                        />
                        <textarea
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 border bg-gray-300 border-gray-300 rounded"
                            required
                        />
                        <textarea
                            name="aadharnumber"
                            placeholder="Aadhar Number"
                            value={formData.aadharnumber}
                            onChange={handleChange}
                            className="w-full p-2 border bg-gray-300 border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            className="w-full bg-green-700 text-white py-2 rounded hover:bg-black hover:border-green-700"
                        >
                            Register Patient
                        </button>
                    </form>
                </div>
                <div className="m-4 w-1/3 flex items-center justify-center max-[820px]:hidden">
                    <img className="w-full" src="../../Resources/doctor_logo_2.png" alt="Doctor Logo" />
                </div>
            </div>
        </div>
    )
}

export default Register
