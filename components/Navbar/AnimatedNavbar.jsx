"use client";

import React, { useEffect, useRef, useState } from "react";
import Search from "./search/Search";
import ShopingCart from "./shopingCart/ShopingCart";
import UserAccount from "./userAccount/UserAccount";
import { SiteLogo } from ".";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function AnimatedNavbar({ carts }) {
    const path = usePathname();
    const paths = [
        "/login",
        "/login/register",
        "/customer-dashboard",
        "/dashboard",
    ];

    const hiddenPath = paths.some((item) => path.startsWith(item));

    return (
        <main className={hiddenPath ? "hidden" : "max-w-screen-xl mx-auto"}>
            <div className='relative w-full flex items-center justify-between mt-2'>
                <MobileNav />
                <SiteLogo />
                <nav>
                    <a href='/products'>Products</a>
                </nav>
                <section className='flex items-center gap-4'>
                    <Search />

                    <ShopingCart carts={carts} />

                    <UserAccount />

                    {/* <ThemeButton /> */}
                </section>
            </div>
        </main>
    );
}

function MobileNav() {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const downRef = useRef(null);
    const { status, data } = useSession();
    const admin = data?.user?.role;

    useEffect(() => {
        const closeMenu = (e) => {
            if (downRef.current && !downRef.current.contains(e.target)) {
                setActive(false);
            }
        };
        document.addEventListener("mousedown", closeMenu);
        return () => document.removeEventListener("mousedown", closeMenu);
    }, []);

    const handleLinkClick = () => {
        setActive(false); // Close the menu when a link is clicked
    };

    return (
        <div className='lg:hidden relative'>
            {/* Menu Toggle Button */}
            <button onClick={() => setActive(!active)} className='pl-2'>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    width='24'
                    height='24'
                >
                    <path
                        d='M4 6h16M4 12h16M4 18h16'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                    />
                </svg>
            </button>

            {/* Sliding Menu */}
            <div
                ref={downRef}
                className={`absolute top-0 z-10 h-screen w-[70vw] bg-white rounded-r-xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl transition-transform transform ${
                    active ? "translate-x-0" : "-translate-x-full"
                } duration-300 ease-in-out`}
            >
                <main className='relative h-full'>
                    {/* Close Button */}
                    <div className='absolute top-3 right-3 z-10'>
                        <button onClick={() => setActive((prev) => !prev)}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                width='24'
                                height='24'
                            >
                                <path
                                    d='M6 18L18 6M6 6l12 12'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Links */}
                    <div className='flex flex-col gap-4 p-10'>
                        <Link
                            href='/'
                            onClick={handleLinkClick}
                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                width='24'
                                height='24'
                            >
                                <path
                                    d='M3 9l9-6 9 6v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>

                            <span>Home</span>
                        </Link>

                        <Link
                            href='/products'
                            onClick={handleLinkClick}
                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                width='24'
                                height='24'
                            >
                                <path
                                    d='M6 6h15l1 12H7L6 6z'
                                    stroke='currentColor'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                                <circle
                                    cx='10'
                                    cy='20'
                                    r='2'
                                    stroke='currentColor'
                                    stroke-width='2'
                                />
                                <circle
                                    cx='18'
                                    cy='20'
                                    r='2'
                                    stroke='currentColor'
                                    stroke-width='2'
                                />
                            </svg>

                            <span>Products</span>
                        </Link>

                        {/* Account Section */}
                        <div>
                            <div
                                onClick={() => setOpen(!open)}
                                className='flex items-center justify-between cursor-pointer hover:text-blue-600 transition-transform transform hover:scale-105'
                            >
                                <button className='flex items-center gap-2'>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        width='24'
                                        height='24'
                                    >
                                        <path
                                            d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
                                            stroke='currentColor'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                    </svg>

                                    <span>Account</span>
                                </button>
                                {open ? (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        width='24'
                                        height='24'
                                    >
                                        <path
                                            d='M19 15l-7-7-7 7'
                                            stroke='currentColor'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 24 24'
                                        width='24'
                                        height='24'
                                    >
                                        <path
                                            d='M19 9l-7 7-7-7'
                                            stroke='currentColor'
                                            stroke-width='2'
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                        />
                                    </svg>
                                )}
                            </div>

                            {/* Account Dropdown */}
                            <div
                                className={`ml-4 mt-3 transition-all duration-300 ${
                                    open
                                        ? "max-h-40 opacity-100"
                                        : "max-h-0 opacity-0"
                                } overflow-hidden`}
                            >
                                {status === "authenticated" ? (
                                    <div className='flex flex-col space-y-2'>
                                        {admin === "admin" && (
                                            <Link
                                                href='/dashboard'
                                                onClick={handleLinkClick}
                                                className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    viewBox='0 0 24 24'
                                                    width='24'
                                                    height='24'
                                                >
                                                    <path
                                                        d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
                                                        stroke='currentColor'
                                                        stroke-width='2'
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                    />
                                                </svg>

                                                <span>Dashboard</span>
                                            </Link>
                                        )}
                                        <Link
                                            href='/customer-dashboard/user-profile'
                                            onClick={handleLinkClick}
                                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 24 24'
                                                width='24'
                                                height='24'
                                            >
                                                <path
                                                    d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
                                                    stroke='currentColor'
                                                    stroke-width='2'
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                />
                                            </svg>

                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            href='/customer-dashboard/cart'
                                            onClick={handleLinkClick}
                                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 24 24'
                                                width='24'
                                                height='24'
                                            >
                                                <path
                                                    d='M6 6h15l1 12H7L6 6z'
                                                    stroke='currentColor'
                                                    stroke-width='2'
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                />
                                                <circle
                                                    cx='10'
                                                    cy='20'
                                                    r='2'
                                                    stroke='currentColor'
                                                    stroke-width='2'
                                                />
                                                <circle
                                                    cx='18'
                                                    cy='20'
                                                    r='2'
                                                    stroke='currentColor'
                                                    stroke-width='2'
                                                />
                                            </svg>

                                            <span>Cart</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                signOut();
                                                handleLinkClick();
                                            }}
                                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 24 24'
                                                width='24'
                                                height='24'
                                            >
                                                <path
                                                    d='M13 3l7 7-7 7M21 10H9M3 17v-2h6v2H3z'
                                                    stroke='currentColor'
                                                    stroke-width='2'
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                />
                                            </svg>

                                            <span>Logout</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-3'>
                                        <Link
                                            href='/login'
                                            onClick={handleLinkClick}
                                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 24 24'
                                                width='24'
                                                height='24'
                                            >
                                                <path
                                                    d='M13 17l-7-7 7-7M3 10h18'
                                                    stroke='currentColor'
                                                    stroke-width='2'
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                />
                                            </svg>

                                            <span>Login</span>
                                        </Link>
                                        <Link
                                            href='/login/register'
                                            onClick={handleLinkClick}
                                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 24 24'
                                                width='24'
                                                height='24'
                                            >
                                                <path
                                                    d='M13 3v8h8M17 7h6M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z'
                                                    stroke='currentColor'
                                                    stroke-width='2'
                                                    stroke-linecap='round'
                                                    stroke-linejoin='round'
                                                />
                                            </svg>

                                            <span>Register</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
