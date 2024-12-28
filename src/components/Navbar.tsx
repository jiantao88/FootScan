'use client';
import { lightTheme, useActiveAccount } from "thirdweb/react";
import Link from "next/link";
import { useState } from "react";
import { FaMoon, FaSun } from 'react-icons/fa';
import { client } from "@/app/client";
import { ConnectButton } from './ConnectButton';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitch from './LanguageSwitch';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const account = useActiveAccount();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const { t } = useTranslation();

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
                            <span className="text-gray-600 hover:text-orange-500 transition-colors">
                                {t('common.home')}
                            </span>
                        </Link>
                        <Link href="/explore">
                            <span className="text-gray-600 hover:text-orange-500 transition-colors">
                                {t('common.scan')}
                            </span>
                        </Link>
                        <Link href="/community">
                            <span className="text-gray-600 hover:text-orange-500 transition-colors">
                                {t('common.community')}
                            </span>
                        </Link>
                        {account && (
                            <Link href={`/dashboard/${account.address}`}>
                                <span className="text-gray-600 hover:text-orange-500 transition-colors">{t('common.dashboard')}</span>
                            </Link>
                        )}
                    </div>

                    {/* Right side buttons */}
                    <div className="flex items-center space-x-4">
                        <LanguageSwitch />
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                        </button>
                        <ConnectButton theme={customTheme} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
