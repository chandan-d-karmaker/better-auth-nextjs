'use client'
import React from 'react';

import { useState } from "react";
import { Link, Button, ProgressCircle } from "@heroui/react";
import { signOut, useSession } from '@/lib/auth-client';

const Navbar = () => {

    const { data, isPending } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (isPending) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <ProgressCircle aria-label="Loading" size="lg" value={80}>
                    <ProgressCircle.Track>
                        <ProgressCircle.TrackCircle />
                        <ProgressCircle.FillCircle />
                    </ProgressCircle.Track>
                </ProgressCircle>
            </div>
        )
    }

    console.log("Session user: ", data);
    const user = data?.user;

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className="sr-only">Menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                    <Link href='/'>
                        <div>Logo</div>
                    </Link>
                </div>
                <div>{user ? <>Welcome {user.name}</> : <></>}</div>
                <ul className="hidden items-center gap-4 md:flex">
                    {user ? <li> <Link href='/' onClick={()=> signOut() }>Sign Out</Link></li> : <>
                        <li>
                            <Link href="/auth/signup">SignUp</Link>
                        </li>
                        <li>
                            <Link href="/auth/login">LogIN</Link>
                        </li>

                    </>}

                </ul>
            </header>
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4">
                        <li>
                            <Link href="/auth/signup" className="block py-2">
                                Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link href="/auth/login" className="block py-2">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;