
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");

    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Bar */}
            <div className="bg-blue-400 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    <button
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => {
                            localStorage.removeItem("name");
                            localStorage.removeItem("id");
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-6">
                <h2 className="text-2xl font-semibold mb-2">Username: {name}</h2>
                <h3 className="text-xl text-gray-700">User ID: {id}</h3>
            </div>
        </div>
    );
};

export default Dashboard;
