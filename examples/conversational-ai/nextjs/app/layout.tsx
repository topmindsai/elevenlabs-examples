import type {Metadata} from "next";
import "./globals.css";
import {BackgroundWave} from "@/components/background-wave";
import Link from "next/link";
import {ElevenLabsLogo, GithubLogo} from "@/components/logos";

export const metadata: Metadata = {
    title: "ConvAI",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={"h-full w-full"}>
        <body className={`antialiased w-full h-full lex flex-col`}>
        <div className="flex flex-col flex-grow w-full items-center justify-center sm:px-4">
            <nav
                className={
                    "sm:fixed w-full top-0 left-0 py-4 px-8"
                }
            >
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <div className="flex items-center">
                        <Link href={"/"} prefetch={true}>
                            <ElevenLabsLogo
                                className={"h-[15px] w-auto hover:text-gray-500 mr-8"}
                            />
                        </Link>
                        
                        <div className="hidden sm:flex space-x-6">
                            <Link
                                href="/widget-demo"
                                className="text-sm font-medium hover:text-gray-500"
                            >
                                Widget Demo
                            </Link>
                            <Link
                                href="/live-demo"
                                className="text-sm font-medium hover:text-gray-500"
                            >
                                Live Demo
                            </Link>
                            <Link
                                href="/iframe-demo"
                                className="text-sm font-medium hover:text-gray-500"
                            >
                                Iframe Demo
                            </Link>
                            <Link
                                href="/modern-widget"
                                className="text-sm font-medium hover:text-gray-500"
                            >
                                Modern Widget
                            </Link>
                            <Link
                                href="/modern-demo"
                                className="text-sm font-medium hover:text-gray-500 bg-blue-100 px-3 py-1 rounded-full"
                            >
                                Modern Demo
                            </Link>
                            <Link
                                href="/test-conversation"
                                className="text-sm font-medium hover:text-gray-500"
                            >
                                Test
                            </Link>
                        </div>
                    </div>

                    <div className={"flex gap-4 justify-end"}>
                        <Link
                            href="https://github.com/jonatanvm/convai-demo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={"py-0.5"}
                            aria-label="View source on GitHub"
                        >
                            <GithubLogo
                                className={"w-5 h-5 hover:text-gray-500 text-[#24292f]"}
                            />
                        </Link>
                    </div>
                </div>
            </nav>
            {children}
            <BackgroundWave/>
        </div>
        </body>
        </html>
    );
}
