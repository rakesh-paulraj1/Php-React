
import { useNavigate } from 'react-router-dom';
const Studentdashboard = () => {
    const navigate = useNavigate();
    const name = localStorage.getItem("name");
    const role=localStorage.getItem("role");
    
    return (
        <div className="flex flex-col min-h-screen">
            
            <div className="bg-gray-400 rounded-lg text-white border-rounded p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <button
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => {
                            localStorage.removeItem("name");

                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

           
            <div className="flex-grow p-6">
                <h2 className="text-2xl font-semibold mb-2">Student Role: {role}</h2>
                <div className='text-2xl font-semibold mb-2'>Student Name :{name}</div>
            </div>
        </div>
    );
}

export default Studentdashboard