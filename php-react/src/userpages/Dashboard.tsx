import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

interface Complaint {
    id: number;
    name: string;
    email: string;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Complaint[]>([]);
    const name = localStorage.getItem("name");

    useEffect(() => {
        getStudents();
    }, []);

    const deleteUser = async (userId:number) => {
        try {
            const response = await axios.post(`http://localhost/api/deletestudent.php`, { id: userId }, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`  
                }
            });
    
            const responseData = response.data;
            
            if (responseData.success) {
                alert("User deleted successfully.");
               getStudents();
            } else if (responseData.error) {
                alert(responseData.error);
            }
        } catch (error) {
            console.error("Error deleting the user:", error);
            alert("Failed to delete the user.");
        }
    };
    
    const getStudents = async () => {
        try {
            const response = await axios.get(`http://localhost/api/getstudent.php`, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });

            const responseData = response.data;
           console.log(responseData.users);
                setData(responseData.users);
            
        } catch (error) {
            console.error('Error fetching the data:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-gray-400 rounded-lg text-white border-rounded p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                    
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="flex-grow p-6">
                <h2 className="text-2xl font-semibold mb-2">Admin Username: {name}</h2>
                <Link to={`/addstudent`}>
                    <button className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/5 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Add Student
                    </button>
                </Link>

                <section className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border mt-6">
                    <table className="w-full text-left table-auto min-w-max rounded-md overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 border border-gray-300">Student ID</th>
                                <th className="py-2 border border-gray-300">Student Name</th>
                                <th className="py-2 border border-gray-300">Student Email</th>
                                <th className="py-2 border border-gray-300">Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.id}</td>
                                    <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.name}</td>
                                    <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>{item.email}</td>
                                    <td className="py-2 border border-gray-300" style={{ padding: "8px" }}>
                                    <button onClick={() => deleteUser(item.id)} className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-green-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-900/5 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Delete Student
                    </button>
                                    </td>
                                </tr>
                            ))}                    </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
