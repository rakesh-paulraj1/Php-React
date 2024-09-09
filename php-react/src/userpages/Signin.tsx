import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SigninInput {
    email: string;
    password: string;
}

export const UnifiedSigninPage = () => {
    const [postInputs, setPostInputs] = useState<SigninInput>({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    async function handleSignin() {
        try {
            const response = await axios.post(`http://localhost/api/signin.php`, postInputs);
            
            const { token, user, } = response.data;
            console.log(response.data);
          
            localStorage.setItem("id",user.id)
            localStorage.setItem("token", token);
            localStorage.setItem("name", user.name);
localStorage.setItem("email", user.email);

           
            if (user.role === 'admin') {
                navigate("/admindashboard");
                alert("Admin Signin Successful");
            } else if (user.role === 'student') {
                navigate("/studentdashboard");
                alert("Student Signin Successful");
            } else {
                alert("Unknown role");
            }
        } catch (error) {
            console.error("Signin failed", error);
            alert("Signin failed");
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="h-[390px] w-[360px] bg-neutral-950 rounded-lg shadow-slate-800 shadow-[0_0_10px_2px_rgb(148,163,184)] flex flex-col items-center p-4">
                <div className="px-10">
                    <div className="font-bold text-3xl p-4 text-neutral-400">
                        SignIn
                    </div>
                </div>
                <LabelledInput
                    label="Email"
                    type="text"
                    placeholder="Your email"
                    onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })}
                />
                <LabelledInput
                    label="Password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
                />
                <button
                    onClick={handleSignin}
                    type="button"

                    className="mt-8 h-9 w-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 my-8"
                >SignIn
                </button>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-white font-semibold pt-4">{label}</label>
            <input
                onChange={onChange}
                type={type || "text"}
                id="input"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
