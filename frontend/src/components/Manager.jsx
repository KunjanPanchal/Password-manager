import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [username, setUsername] = useState("");
    const [userId,setUserId]=useState("");
    const ref = useRef();
    const passRef = useRef();

    const [form, setForm] = useState({
        site: "",
        username: "",
        password: ""
    });

    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
        const storedName = localStorage.getItem("username");
        if (storedName) setUsername(storedName);
        getPasswords();
    }, [userId]);

    const getPasswords = async () => {
        try {
            let res = await fetch(`http://localhost:4000/${userId}`);
            let data = await res.json();
            console.log(data)
            setPasswordArray(data || []);
        } catch (err) {
            console.error("Failed to fetch passwords", err);
        }
    };

    const savePass = async () => {
        await fetch(`http://localhost:4000/${userId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id : form.id}),
                });
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPass = { ...form, id: uuidv4(), userId }; // ✅ include userId
            setPasswordArray([...passwordArray, newPass]);

            try {
                await fetch(`http://localhost:4000/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newPass),
                });
                toast('Password saved!', { position: "top-right", theme: "dark", transition: Bounce });
                setForm({ site: "", username: "", password: "" });
            } catch (err) {
                console.error("Error saving password:", err);
            }
        } else {
            toast('Error: Password not saved!', { position: "top-right", theme: "dark", transition: Bounce });
        }
    };

    const deletePaas = async (id) => {
        if (confirm("Do you want to delete this password?")) {
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            try {
                await fetch(`http://localhost:4000/${userId}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });
                toast('Password deleted!', { position: "top-right", theme: "dark", transition: Bounce });
            } catch (err) {
                console.error("Error deleting password:", err);
            }
        }
    };

    const editPass = (id) => {
        const passToEdit = passwordArray.find(item => item.id === id);
        setForm(passToEdit);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const showPass = () => {
        if (ref.current.src.includes("hide.png")) {
            passRef.current.type = "text";
            ref.current.src = "eye.png";
        } else {
            passRef.current.type = "password";
            ref.current.src = "hide.png";
        }
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('🦄 Copied to Clipboard!', { position: "top-right", theme: "light", transition: Bounce });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/login";
    };
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="relative min-h-screen bg-slate-900 text-white px-4">
                {/* Background grid and glow */}
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:6rem_4rem]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#1fb6ff1a,transparent)]"></div>
                </div>
                <nav className="bg-green-800 text-white px-8 py-3 flex justify-between items-center">
                    <div className="text-xl font-bold">
                        &lt;Pass<span className="text-green-300">Op</span>/&gt;
                    </div>
                    <div className="flex gap-6 items-center">
                        <span className="font-medium">Welcome, {username}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-green-800 px-4 py-1 rounded-lg hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
                {/* Header */}
                <div className="container mx-auto pt-10 text-center">
                    <h1 className="logo font-bold text-4xl mb-1">
                        <span className="text-green-400">&lt;</span>
                        <span>Pass</span>
                        <span className="text-green-400">Op</span>
                        <span className="text-green-400">/&gt;</span>
                    </h1>
                    <p className="text-green-400">Your own Password manager</p>
                </div>

                {/* Form Section */}
                <div className="container mx-auto mt-12 max-w-4xl flex flex-col gap-6 items-center px-4 md:px-10">
                    <input
                        onChange={handleChange}
                        name="site"
                        value={form.site}
                        placeholder="Enter Website URL"
                        type="text"
                        className="w-full px-4 py-2 rounded-xl border-2 border-green-400 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <div className="flex flex-col md:flex-row gap-4 w-full">
                        <input
                            onChange={handleChange}
                            name="username"
                            value={form.username}
                            placeholder="Enter Username"
                            type="text"
                            className="w-full px-4 py-2 rounded-xl border-2 border-green-400 bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <div className="relative w-full">
                            <input
                                ref={passRef}
                                onChange={handleChange}
                                name="password"
                                value={form.password}
                                placeholder="Enter Password"
                                type="password"
                                className="w-full px-4 py-2 rounded-xl border-2 border-green-400 bg-slate-800 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer"
                                onClick={showPass}
                            >
                                <img ref={ref} width={20} src="hide.png" alt="hide" />
                            </span>
                        </div>
                    </div>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-medium rounded-xl transition"
                        onClick={savePass}
                    >
                        <lord-icon src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover" />
                        <span>Save</span>
                    </button>
                </div>

                {/* Password Table */}
                <div className="container mx-auto mt-16 max-w-6xl px-4 md:px-10">
                    <h2 className="text-2xl font-semibold mb-4">Your Passwords</h2>

                    {passwordArray.length === 0 ? (
                        <div className="text-slate-400">No Passwords to Show</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border border-slate-700 rounded-xl overflow-hidden">
                                <thead className="bg-green-600 text-black">
                                    <tr>
                                        <th className="py-2 px-3">Site</th>
                                        <th className="py-2 px-3">Username</th>
                                        <th className="py-2 px-3">Password</th>
                                        <th className="py-2 px-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-slate-800 text-white divide-y divide-slate-700">
                                    {passwordArray.map((item, index) => (
                                        <tr key={index} className="text-center">
                                            {/* Site */}
                                            <td className="py-2 px-3">
                                                <div className="flex justify-center items-center gap-2">
                                                    <a
                                                        href={item.site}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-400 hover:underline"
                                                    >
                                                        {item.site}
                                                    </a>
                                                    <div
                                                        className="cursor-pointer"
                                                        onClick={() => copyText(item.site)}
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/cfkiwvcc.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px" }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Username */}
                                            <td className="py-2 px-3">
                                                <div className="flex justify-center items-center gap-2">
                                                    {item.username}
                                                    <div
                                                        className="cursor-pointer"
                                                        onClick={() => copyText(item.username)}
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/cfkiwvcc.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px" }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Password */}
                                            <td className="py-2 px-3">
                                                <div className="flex justify-center items-center gap-2">
                                                    {item.password}
                                                    <div
                                                        className="cursor-pointer"
                                                        onClick={() => copyText(item.password)}
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/cfkiwvcc.json"
                                                            trigger="hover"
                                                            style={{ width: "20px", height: "20px" }}
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-2 px-3">
                                                <div className="flex justify-center gap-3">
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() => editPass(item.id)}
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/eqaxvzkf.json"
                                                            trigger="hover"
                                                            style={{ width: "24px", height: "24px" }}
                                                        />
                                                    </span>
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() => deletePaas(item.id)}
                                                    >
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/vgpkjbvw.json"
                                                            trigger="hover"
                                                            style={{ width: "24px", height: "24px" }}
                                                        />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>


        </>
    )
}

export default Manager
