"use client";

import React, { useEffect, useRef, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { cn } from "@/utils/cn";
import Search from "./search/Search";
import ShopingCart from "./shopingCart/ShopingCart";
import UserAccount from "./userAccount/UserAccount";
import { SiteLogo } from ".";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
    RxHamburgerMenu,
    RxCross1,
    RxChevronDown,
    RxChevronUp,
} from "react-icons/rx";
import {
    FaHome,
    FaShoppingCart,
    FaUserCircle,
    FaUserAlt,
    FaSignOutAlt,
    FaSignInAlt,
    FaUserPlus,
} from "react-icons/fa";

export function AnimatedNavbar({ products, carts }) {
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
                <Navbar products={products} className='top-2' />
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
                <RxHamburgerMenu size={22} />
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
                            <RxCross1 size={22} />
                        </button>
                    </div>

                    {/* Menu Links */}
                    <div className='flex flex-col gap-4 p-10'>
                        <Link
                            href='/'
                            onClick={handleLinkClick}
                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                        >
                            <FaHome size={20} />
                            <span>Home</span>
                        </Link>

                        <Link
                            href='/products'
                            onClick={handleLinkClick}
                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                        >
                            <FaShoppingCart size={20} />
                            <span>Products</span>
                        </Link>

                        {/* Account Section */}
                        <div>
                            <div
                                onClick={() => setOpen(!open)}
                                className='flex items-center justify-between cursor-pointer hover:text-blue-600 transition-transform transform hover:scale-105'
                            >
                                <button className='flex items-center gap-2'>
                                    <FaUserCircle size={20} />
                                    <span>Account</span>
                                </button>
                                {open ? <RxChevronUp /> : <RxChevronDown />}
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
                                                <FaUserAlt size={18} />
                                                <span>Dashboard</span>
                                            </Link>
                                        )}
                                        <Link
                                            href='/customer-dashboard/user-profile'
                                            onClick={handleLinkClick}
                                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                                        >
                                            <FaUserAlt size={18} />
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            href='/customer-dashboard/cart'
                                            onClick={handleLinkClick}
                                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                                        >
                                            <FaShoppingCart size={18} />
                                            <span>Cart</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                signOut();
                                                handleLinkClick();
                                            }}
                                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                                        >
                                            <FaSignOutAlt size={18} />
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
                                            <FaSignInAlt size={18} />
                                            <span>Login</span>
                                        </Link>
                                        <Link
                                            href='/login/register'
                                            onClick={handleLinkClick}
                                            className='flex items-center gap-2 hover:text-blue-600 transition-transform transform hover:scale-105'
                                        >
                                            <FaUserPlus size={18} />
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

function Navbar({ className, products }) {
    const [active, setActive] = useState(null);
    return (
        <div className={cn("max-w-xl mx-auto z-10 lg:block hidden", className)}>
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item='SHOP'>
                    <div className='flex flex-col space-y-4 text-sm'>
                        <HoveredLink href='/'>Handicraft</HoveredLink>
                        <HoveredLink href='/'>Baby Dress</HoveredLink>
                        <HoveredLink href='/'>Women</HoveredLink>
                        <HoveredLink href='/'>Men</HoveredLink>
                    </div>
                </MenuItem>
                <Link href='/products'>
                    <MenuItem
                        setActive={setActive}
                        active={active}
                        item='PRODUCTS'
                    >
                        <div className='text-sm grid grid-cols-2 gap-10 p-4'>
                            {products?.map((product) => (
                                <ProductItem
                                    key={product._id}
                                    title={product?.name}
                                    href={`/products/${product?.slug}=${product?._id}`}
                                    src={product?.image}
                                    description={product?.name}
                                />
                            ))}
                        </div>
                    </MenuItem>
                </Link>
                <MenuItem setActive={setActive} active={active} item='BUY'>
                    <div className='flex flex-col space-y-4 text-sm'>
                        <HoveredLink href='/products/category'>
                            Three Pices
                        </HoveredLink>
                        <HoveredLink href='/products/category'>
                            Mura
                        </HoveredLink>
                        <HoveredLink href='/products/category'>
                            Papos
                        </HoveredLink>
                        <HoveredLink href='/products/category'>
                            Handicraft
                        </HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}
