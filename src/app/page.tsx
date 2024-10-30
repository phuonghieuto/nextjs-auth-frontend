"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/api/api';
import { getToken, removeToken } from '@/auth/auth';
import { User } from '@/type/user.type';

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const token = getToken();
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const userData = await getUser(token);
                setUser(userData);
            } catch (error) {
                removeToken();
                router.push('/login');
            }
        };

        fetchUser().then();
    }, [router]);

    const handleLogout = () => {
        removeToken();
        router.push('/login');
    };

    if (!user) {
        return <span className="loading loading-dots loading-lg"></span>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-blue-600">
                Welcome, {user.name}!
            </h1>
            <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}