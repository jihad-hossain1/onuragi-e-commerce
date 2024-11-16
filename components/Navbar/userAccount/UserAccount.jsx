"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserAccount = () => {
    const { status, data } = useSession();

    const admin = data?.user?.role;

    return (
        <React.Fragment>
            <div className='lg:block hidden'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            width='24'
                            height='24'
                        >
                            <path
                                d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zM12 15c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 17c-2.67 0-5-1.34-5-3s2.33-3 5-3 5 1.34 5 3-2.33 3-5 3z'
                                stroke='currentColor'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                            />
                        </svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        {status === "authenticated" ? (
                            <div className='flex flex-col space-y-2'>
                                {admin == "admin" && (
                                    <Link href={"/dashboard"}>
                                        <DropdownMenuItem>
                                            Dashboard
                                        </DropdownMenuItem>
                                    </Link>
                                )}
                                <Link href={"/customer-dashboard/user-profile"}>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                </Link>
                                <Link href={"/customer-dashboard/cart"}>
                                    <DropdownMenuItem>Carts</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem onClick={() => signOut()}>
                                    <button>Logout</button>
                                </DropdownMenuItem>
                            </div>
                        ) : (
                            <>
                                <DropdownMenuItem>
                                    <a href='/login'>Login</a>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <a href='/login/register'>Register</a>
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </React.Fragment>
    );
};

export default UserAccount;
