import { User } from '@/type/user.type';
import apiClient from './apiConfig';

interface State<T> {
    status: 'OK' | 'ERROR' | 'UNAUTHORIZED';
    value: T | null;
    error: string | null;
}

export async function registerUser(email: string, name: string, password: string): Promise<User> {
    try {
        const response = await apiClient.post<State<User>>('/user/register', { email, name, password });
        const data = response.data;

        if (data.status === 'OK' && data.value) {
            return data.value;
        } else {
            throw new Error(data.error || 'Failed to register user');
        }
    } catch (error:any) {
        throw new Error(error.message);
    }
}

export async function loginUser(email: string, password: string): Promise<User> {
    try {
        const response = await apiClient.post<State<User>>('/users/login', { email, password });
        const data = response.data;

        if (data.status === 'OK' && data.value) {
            return data.value;
        } else {
            throw new Error(data.error || 'Failed to login user');
        }
    } catch (error: any) {
        // console.error('Login error:', error.message);
        throw new Error(error.message);
    }
}

export async function getUser(token: string): Promise<User> {
    try {
        const response = await apiClient.get<State<User>>('/user', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = response.data;

        if (data.status === 'OK' && data.value) {
            return data.value;
        } else {
            throw new Error(data.error || 'Failed to fetch user');
        }
    } catch (error: any) {
        // console.error('Fetch user error:', error.message);
        throw new Error(error.message);
    }
}