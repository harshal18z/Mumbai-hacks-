import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
    const navigate = useNavigate();

    // Load stored profile or empty fields
    const [form, setForm] = useState(() => {
        const saved = localStorage.getItem("userProfile");
        return saved
            ? JSON.parse(saved)
            : { username: "", password: "", occupation: "" };
    });

    const save = (e) => {
        e.preventDefault();
        localStorage.setItem("userProfile", JSON.stringify(form));
        alert("Profile Saved ✅");
        window.location.reload(); // force app to re-evaluate routing
    };


    return (
        <div className="p-6 min-h-screen flex justify-center items-start"
            style={{ backgroundColor: "#F0F7EC" }}
        >
            <form
                onSubmit={save}
                className="bg-[#F5F9E6] border border-[#A8D5BA] shadow p-8 rounded-xl w-full max-w-lg space-y-4"
            >
                <h1 className="text-3xl font-bold text-[#3E7C59] text-center">
                    Welcome to PaisaPath 💸
                </h1>
                <p className="text-sm text-center text-[#556B5A] mb-4">
                    Let's quickly set up your profile.
                </p>

                <div>
                    <label className="text-sm text-[#556B5A]">Username</label>
                    <input
                        type="text"
                        required
                        className="w-full mt-1 p-2 border rounded"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                </div>

                <div>
                    <label className="text-sm text-[#556B5A]">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full mt-1 p-2 border rounded"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>

                <div>
                    <label className="text-sm text-[#556B5A]">Occupation</label>
                    <select
                        required
                        className="w-full mt-1 p-2 border rounded"
                        value={form.occupation}
                        onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                    >
                        <option value="">Select occupation...</option>
                        <option value="Student">Student</option>
                        <option value="Employee">Employee</option>
                        <option value="Business">Business</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button className="w-full px-4 py-2 bg-[#A8D5BA] text-[#3E7C59] rounded hover:bg-[#8FCFA0] transition">
                    Save & Continue ➜
                </button>
            </form>
        </div>
    );
}
