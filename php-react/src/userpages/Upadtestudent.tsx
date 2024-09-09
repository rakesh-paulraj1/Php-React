interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    name:string,
    value:string
}
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Updatestudent = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState({
        name: '',
        email: ''
    });

  
    useEffect(() => {
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');

        if (storedName && storedEmail) {
            console.log('Stored Name:', storedName);
            console.log('Stored Email:', storedEmail);
            setPostInputs({
                name: storedName,
                email: storedEmail
            });
        }
    }, []);

    
    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setPostInputs({
            ...postInputs,
            [name]: value
        });
    };

   
    const updateDetails =  async () => {
        try {
            const response = await axios.post('http://localhost/api/updatestudent.php', {
                id: localStorage.getItem('id'), 
                name: postInputs.name,
                email: postInputs.email,
            });
    
            if (response.data.success) {
                localStorage.setItem('name', postInputs.name);
                localStorage.setItem('email', postInputs.email);
                alert('Student details updated successfully.');
                navigate('/studentdashboard');
            } else {
                alert('Failed to update student details.');
            }
        } catch (error) {
            console.error('Error updating details:', error);
        }
       
    };

    return (
        <div className="p-4">

             <div className="flex items-center p-4"> 
                <button
                    onClick={() => navigate('/studentdashboard')} 
                    type="button"
                    className="mr-4 rounded-lg bg-gray-500 py-2 px-4 text-center font-sans text-xs font-bold uppercase text-white shadow-md hover:bg-gray-600 transition-all"
                >
                    Back
                </button>

                <div className="font-bold text-3xl text-black-400">
                    Enter Student details
                </div>
            </div>            
            <LabelledInput
                label="Username"
                type="text"
                name="name"
                value={postInputs.name}
                placeholder="Your username"
                onChange={handleInputChange}
            />

            <LabelledInput
                label="Email"
                type="text"
                name="email"
                value={postInputs.email}
                placeholder="Your email"
                onChange={handleInputChange}
            />

            <button
                onClick={updateDetails}
                type="button"
                className="mr-4 rounded-lg bg-gray-500 py-2 px-4 text-center font-sans text-xs font-bold uppercase text-white shadow-md hover:bg-gray-600 transition-all"
                >
                Update Details
            </button>
        </div>
    );
};


export function LabelledInput({ label, placeholder, onChange, type, name, value }:LabelledInputType) {
    return (
        <div className="mb-4">
            <label className="font-bold text-black-700">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                name={name}
                value={value}
                id={label.toLowerCase().replace(" ", "_")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

export default Updatestudent;
