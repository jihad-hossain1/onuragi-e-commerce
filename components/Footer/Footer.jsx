"use client";

import React from "react";
import Container from "../ui/container";
import { SiteLogo } from "../Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
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
            <div className='bg-gray-100 dark:bg-gray-800 border-t border-gray-300 py-10'>
                <Container>
                    <div className='grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-4'>
                        <section>
                            <SiteLogo />
                            <div className='flex flex-col gap-4 text-start mt-8'>
                                <h4 className='text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300'>
                                    Bogura - 5800 , Bangladesh.
                                </h4>
                                <h4 className='text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300'>
                                    (+880)-1774437263
                                </h4>
                                <p className='text-gray-600 dark:text-gray-400'>
                                    onuragiinof@gmail.com
                                </p>
                                <div className='flex gap-4 mt-4'>
                                    <a
                                        href='https://facebook.com'
                                        className='text-gray-600 dark:text-gray-300 transition-transform transform hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400'
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                            width='24'
                                            height='24'
                                        >
                                            <path
                                                d='M12 2.04c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.56 2 12.04C2 6.52 6.48 2.04 12 2.04zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm-1-12h2v4h-2V8.04zm1-2.54c-.83 0-1.51.68-1.51 1.51s.68 1.51 1.51 1.51 1.51-.68 1.51-1.51-.68-1.51-1.51-1.51z'
                                                stroke='currentColor'
                                                stroke-width='2'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href='https://whatsapp.com'
                                        className='text-gray-600 dark:text-gray-300 transition-transform transform hover:scale-110 hover:text-green-500'
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                            width='24'
                                            height='24'
                                        >
                                            <path
                                                d='M12 2.04c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.56 2 12.04C2 6.52 6.48 2.04 12 2.04zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z'
                                                stroke='currentColor'
                                                stroke-width='2'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                            />
                                            <path
                                                d='M9.21 15.59l-1.42-1.41c-.39-.39-.39-1.03 0-1.42l4.95-4.95c.39-.39 1.03-.39 1.42 0l1.42 1.41c.39.39.39 1.03 0 1.42l-4.95 4.95c-.39.39-1.03.39-1.42 0z'
                                                stroke='currentColor'
                                                stroke-width='2'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href='https://instagram.com'
                                        className='text-gray-600 dark:text-gray-300 transition-transform transform hover:scale-110 hover:text-pink-500'
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                            width='24'
                                            height='24'
                                        >
                                            <path
                                                d='M12 2.04c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.56 2 12.04C2 6.52 6.48 2.04 12 2.04zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z'
                                                stroke='currentColor'
                                                stroke-width='2'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                            />
                                            <path
                                                d='M9.1 9.1c-.45-.45-.9-.75-1.4-.95a3.28 3.28 0 0 0-2.7-.15c-.64.26-1.17.7-1.51 1.3a3.24 3.24 0 0 0-.15 2.7c.26.64.7 1.18 1.3 1.51a3.28 3.28 0 0 0 2.7-.15c.64-.26 1.18-.7 1.51-1.3a3.24 3.24 0 0 0 .15-2.7zM12 7.54c.82 0 1.5.68 1.5 1.5s-.68 1.5-1.5 1.5-1.5-.68-1.5-1.5.68-1.5 1.5-1.5z'
                                                stroke='currentColor'
                                                stroke-width='2'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                            />
                                        </svg>
                                    </a>
                                    <a
                                        href='https://twitter.com'
                                        className='text-gray-600 dark:text-gray-300 transition-transform transform hover:scale-110 hover:text-blue-400'
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                            width='24'
                                            height='24'
                                        >
                                            <path
                                                d='M12 2.04c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.56 2 12.04C2 6.52 6.48 2.04 12 2.04zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8z'
                                                stroke='currentColor'
                                                stroke-width='2'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                            />
                                            <path
                                                d='M17 8c-1.27.62-2.61.95-4.03.95 1.5-.89 2.68-2.34 3.22-4.05-1.41.83-2.96 1.43-4.58 1.75a4.6 4.6 0 0 0-7.91 4.23C7.35 10.21 4.1 8.25 2 5.2c-1.53 2.63-.79 6.06 1.94 7.77-1.37-.04-2.67-.42-3.8-1.04 0 1.91 1.36 3.53 3.16 3.9-1.04.28-2.19.35-3.34-.03 1.14 3.57 4.44 5.91 8.01 5.93 4.65 0 8.44-3.68 8.44-8.23-.01-.12-.01-.23-.02-.35A5.82 5.82 0 0 0 17 8z'
                                                stroke='currentColor'
                                                stroke-width='2'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </section>
                        <section>
                            <h4 className='font-semibold text-xl text-gray-800 dark:text-gray-100'>
                                Useful Links
                            </h4>
                            <div className='flex flex-col gap-4 text-start mt-4'>
                                <Link
                                    href={"#"}
                                    className='hover:text-pink-500 transition-colors hover:underline'
                                >
                                    Delivery Information
                                </Link>
                                <Link
                                    href={"#"}
                                    className='hover:text-pink-500 transition-colors hover:underline'
                                >
                                    Terms & Condition
                                </Link>
                                <Link
                                    href={"#"}
                                    className='hover:text-pink-500 transition-colors hover:underline'
                                >
                                    Customer Service
                                </Link>
                                <Link
                                    href={"#"}
                                    className='hover:text-pink-500 transition-colors hover:underline'
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href={"#"}
                                    className='hover:text-pink-500 transition-colors hover:underline'
                                >
                                    Search Terms
                                </Link>
                            </div>
                        </section>
                        <section>
                            <h4 className='font-semibold text-xl text-gray-800 dark:text-gray-100'>
                                Get in Touch
                            </h4>
                            <div className='flex flex-col gap-4 text-start mt-4'>
                                <h4 className='flex justify-between gap-3'>
                                    <span>Whatsapp</span>
                                    <span className='text-left'>
                                        +880 1774437263
                                    </span>
                                </h4>
                                <h4 className='flex justify-between gap-3'>
                                    <span>Real Live Support</span>
                                    <span className='text-left'>
                                        Bogura, Bangladesh
                                    </span>
                                </h4>
                                <h4 className='flex justify-between gap-3'>
                                    <span>Monday - Friday</span>
                                    <span className='text-left'>
                                        08:00 - 20:00
                                    </span>
                                </h4>
                            </div>
                        </section>
                        <section>
                            <h4 className='font-semibold text-xl text-gray-800 dark:text-gray-100'>
                                Newsletter Signup
                            </h4>
                            <div className='flex flex-col gap-4 text-start mt-4'>
                                <h4>
                                    Subscribe to our newsletters now <br />
                                    and stay up-to-date with new collections.
                                </h4>
                                <div className='relative'>
                                    <input
                                        type='email'
                                        name='email'
                                        placeholder='Your email address'
                                        className='p-2 border border-gray-200 rounded-lg focus:outline-none w-full transition-shadow shadow-sm hover:shadow-md'
                                    />
                                    <button className='absolute right-0 top-0 mt-1 mr-1 bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition-colors hover:scale-105'>
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </Container>
            </div>
            <Container>
                <div className='flex flex-col md:flex-row justify-between items-center py-4 px-4 border-t border-gray-300 dark:border-gray-600'>
                    <h4 className='text-gray-700 dark:text-gray-300'>
                        © 2024 Web.Dev{" "}
                        <span className='font-semibold'>Jihad</span> - All
                        Rights Reserved!
                    </h4>
                    <ul className='flex flex-wrap items-center gap-6 mt-4 md:mt-0'>
                        <li className='hover:text-pink-500 transition-colors hover:underline'>
                            Accessibility
                        </li>
                        <li className='hover:text-pink-500 transition-colors hover:underline'>
                            About Us
                        </li>
                        <li className='hover:text-pink-500 transition-colors hover:underline'>
                            Contact
                        </li>
                        <li className='hover:text-pink-500 transition-colors hover:underline'>
                            Blog
                        </li>
                    </ul>
                </div>
            </Container>
        </main>
    );
};

export default Footer;
