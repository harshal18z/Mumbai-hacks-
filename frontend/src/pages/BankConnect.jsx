import React, { useState } from "react";
import { ShieldCheck, CreditCard, Link, Lock } from "lucide-react";

export default function BankConnect() {
    const [showModal, setShowModal] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);

    // Banks shown in selection grid
    const banks = ["HDFC", "SBI", "ICICI", "Axis", "Kotak"];

    // Sample transactions added after “successful login”
    const sampleTransactions = [
        {
            id: Date.now() + 1,
            date: new Date().toISOString(),
            merchant: "Zomato",
            amount: 350,
            category: "Food",
            type: "Expense",
        },
        {
            id: Date.now() + 2,
            date: new Date().toISOString(),
            merchant: "Uber",
            amount: 120,
            category: "Transport",
            type: "Expense",
        },
        {
            id: Date.now() + 3,
            date: new Date().toISOString(),
            merchant: "Salary",
            amount: 28000,
            category: "Income",
            type: "Income",
        },
    ];

    const handleImport = () => {
        const existing = JSON.parse(localStorage.getItem("transactions")) || [];
        localStorage.setItem(
            "transactions",
            JSON.stringify([...existing, ...sampleTransactions])
        );
        setShowModal(false);
        window.location.href = "/transactions"; // ✅ redirect to transactions page
    };

    return (
        <div className="p-8 min-h-screen" style={{ background: "#F0F7EC" }}>
            <h1 className="text-3xl font-bold text-[#3E7C59] mb-2">Connect Bank Account</h1>
            <p className="text-[#556B5A] mb-8">
                Securely sync your bank transactions to automate your budgeting & insights.
            </p>

            {/* Security assurance card */}
            <div className="bg-white p-5 border border-[#A8D5BA] rounded-xl shadow flex items-start gap-4 mb-8 max-w-2xl">
                <ShieldCheck className="text-[#3E7C59]" size={38} />
                <div>
                    <h2 className="font-semibold text-[#14532D]">Bank-Level Encryption</h2>
                    <p className="text-sm text-[#6B7F6A]">
                        We never store your credentials. Your connection is encrypted end-to-end.
                    </p>
                </div>
            </div>

            {/* Supported Banks */}
            <h2 className="text-xl font-semibold text-[#14532D] mb-3">Supported Banks</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-14 max-w-4xl">

                {banks.map((bank) => (
                    <div
                        key={bank}
                        className="bg-white border border-[#A8D5BA] rounded-2xl px-6 py-6 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition cursor-pointer flex flex-col items-center gap-3"
                    >

                        <CreditCard className="text-[#3E7C59] mb-2" size={28} />
                        <p className="text-sm text-[#14532D] font-semibold">{bank}</p>
                    </div>
                ))}
            </div>

            {/* How It Works */}
            <h2 className="text-xl font-semibold text-[#14532D] mb-3">How It Works</h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mb-12">
                <div className="bg-white p-4 border border-[#A8D5BA] rounded-xl shadow text-center">
                    <Link className="mx-auto text-[#3E7C59]" size={30} />
                    <p className="mt-2 font-semibold text-[#14532D]">1. Connect</p>
                    <p className="text-sm text-[#6B7F6A]">Select and authenticate your bank.</p>
                </div>
                <div className="bg-white p-4 border border-[#A8D5BA] rounded-xl shadow text-center">
                    <Lock className="mx-auto text-[#3E7C59]" size={30} />
                    <p className="mt-2 font-semibold text-[#14532D]">2. Secure Login</p>
                    <p className="text-sm text-[#6B7F6A]">We never store your credentials.</p>
                </div>
                <div className="bg-white p-4 border border-[#A8D5BA] rounded-xl shadow text-center">
                    <CreditCard className="mx-auto text-[#3E7C59]" size={30} />
                    <p className="mt-2 font-semibold text-[#14532D]">3. Sync Transactions</p>
                    <p className="text-sm text-[#6B7F6A]">Your dashboard updates automatically.</p>
                </div>
            </div>

            {/* Connect Button */}
            <button
                onClick={() => setShowModal(true)}
                className="bg-[#3E7C59] hover:bg-[#2E6A48] text-white px-6 py-3 rounded-xl shadow-md"
            >
                Connect Bank
            </button>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center px-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full border border-[#A8D5BA]">

                        {!selectedBank ? (
                            <>
                                <h2 className="text-xl font-bold text-[#14532D] mb-4">Select Your Bank</h2>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    {banks.map((bank) => (
                                        <button
                                            key={bank}
                                            onClick={() => setSelectedBank(bank)}
                                            className="border p-3 rounded-lg hover:bg-[#F5F9E6] border-[#A8D5BA] text-[#14532D] transition"
                                        >
                                            {bank}
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => setShowModal(false)} className="text-sm text-[#6B7F6A]">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-bold text-[#14532D] mb-2">
                                    Secure Login to {selectedBank}
                                </h2>
                                <p className="text-sm text-[#6B7F6A] mb-4">
                                    (Simulation only — no password required)
                                </p>

                                <button
                                    onClick={handleImport}
                                    className="bg-[#3E7C59] hover:bg-[#2E6A48] w-full text-white py-3 rounded-lg shadow-md"
                                >
                                    Simulate Successful Login ✅
                                </button>

                                <button
                                    onClick={() => setSelectedBank(null)}
                                    className="mt-3 text-sm text-[#6B7F6A] block mx-auto"
                                >
                                    Back
                                </button>
                            </>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
}
