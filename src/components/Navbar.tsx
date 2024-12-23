'use client';
import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";
import Link from "next/link";
import { useState } from "react";
import { FaMoon, FaSun } from 'react-icons/fa';
import { client } from "@/app/client";

const Navbar = () => {
    const account = useActiveAccount();
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Custom theme for the ConnectButton
    const customTheme = {
        ...lightTheme,
        colors: {
            ...lightTheme.colors,
            accentText: "#f97316",
            accentButtonBg: "#f97316",
        },
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="text-2xl font-bold text-orange-500">FOODSCAN</span>
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <Link href="/">
                            <span className="text-gray-600 hover:text-orange-500 transition-colors">首页</span>
                        </Link>
                        <Link href="/explore">
                            <span className="text-gray-600 hover:text-orange-500 transition-colors">探索</span>
                        </Link>
                        <Link href="/community">
                            <span className="text-gray-600 hover:text-orange-500 transition-colors">社区</span>
                        </Link>
                        {account && (
                            <Link href={`/dashboard/${account.address}`}>
                                <span className="text-gray-600 hover:text-orange-500 transition-colors">个人中心</span>
                            </Link>
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
                        >
                            {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                        </button>

                        {/* Connect Wallet Button */}
                        <ConnectButton
                            client={client}
                            theme={customTheme}
                            detailsButton={{
                                style: {
                                    maxHeight: "40px",
                                }
                            }}
                        />

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
                        >
                            <span className="sr-only">打开菜单</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
