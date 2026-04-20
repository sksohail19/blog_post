"use client";

import Link from "next/link";
import { useState } from "react";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
            <nav className="flex justify-between items-center p-4">
                <Link href="/" className="text-3xl italic bold">My Blog</Link>
                <ul className="hidden md:flex gap-4 items-center">
                    <li className="font-medium mx-4 cursor-pointer"><Link href="/posts">Posts</Link></li>
                    <li className="font-medium mx-4 cursor-pointer"><Link href="/categories">Categories</Link></li>
                    <li className="font-medium mx-4"><button className="cursor-pointer">Sign In</button></li>
                    <li className="font-medium mx-4"><button className="cursor-pointer bg-[#456fe8] text-white px-4 py-2 rounded-md">Get Started</button></li>
                </ul>

                <button
                    className="md:hidden text-2xl cursor-pointer flex flex-col gap-1"
                    onClick={() => {
                        setIsMenuOpen(!isMenuOpen);
                    }}
                >
                    <span className="w-6 h-0.5 bg-black"></span>
                    <span className="w-6 h-0.5 bg-black"></span>
                    <span className="w-6 h-0.5 bg-black"></span>
                </button>

                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden">
                        <ul className="flex flex-col items-center gap-4 py-4">
                            <li className="font-medium">
                                <Link href="/posts" onClick={() => setIsMenuOpen(false)}>
                                    Posts
                                </Link>
                            </li>
                            <li className="font-medium">
                                <Link href="/categories" onClick={() => setIsMenuOpen(false)}>
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <button className="cursor-pointer">Sign In</button>
                            </li>
                            <li>
                                <button className="bg-[#456fe8] text-white px-4 py-2 rounded-md">
                                    Get Started
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </>
    )
}