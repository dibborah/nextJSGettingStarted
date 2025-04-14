import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Navbar = async () => {
    const session = await auth()
    console.log('session', session);
    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex items-center justify-between font-work-sans">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={144}
                        height={30}
                    />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {(session && session?.user) ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form
                            // New react 19 form
                              action={async () => {
                                // suing server actions w/i client component props
                                "use server";
                                await signOut({ redirectTo: "/"})
                              }}
                            >
                                <button className="cursor-pointer" type="submit">
                                    <span>Logout</span>
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form
                          action={async () => {
                            "use server";

                            await signIn('github')}
                          }
                        >
                            <button className="cursor-pointer" type="submit">
                              Login
                            </button>
                        </form>
                    )}
                </div>

            </nav>
        </header>
    )
}

export default Navbar;
