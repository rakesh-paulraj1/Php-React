// Define the type for LabelledInput props if not defined
interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

interface UserInput {
    name: string;
    password: string;
    email: string;
   
}
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { useState } from "react";

const AddUser = () => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<UserInput>({
        name: '',
        password: '',
        email: '',
      
    });

    const addUser = async () => {
        try {
            if (!postInputs.name || !postInputs.password || !postInputs.email) {
                alert("Please fill in all required fields.");
                return;
            }

            
            const response = await axios.post(`http://localhost/api/insertstudent.php`, postInputs, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                },
            
            });
            console.log(postInputs)
            console.log(response);
            navigate("/admindashboard")

        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while creating the user.");
        }
    };

    return (
        <div>
            <div className="font-bold text-3xl p-4 text-black-400">
                Enter Student details
            </div>

            <LabelledInput
                label="Username"
                type="text"
                placeholder="Your username"
                onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    });
                }}
            />

            <LabelledInput
                label="Password"
                type="password"
                placeholder="User password"
                onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    });
                }}
            />

            
           
                <LabelledInput
                    label="Email"
                    type="text"
                    placeholder="User email"
                    onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            email: e.target.value
                        });
                    }}
                />

               
         

            <button
                onClick={addUser}
                type="button"
                className="select-none w-full mt-8 rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
                Add User
            </button>
        </div>
    );
};

export function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div className="mb-4 mt-4">
            <label className="font-bold text-black-700">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                id={label.toLowerCase().replace(" ", "_")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}

export default AddUser;
