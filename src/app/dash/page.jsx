"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Dash = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [formSubmissions, setFormSubmissions] = useState([]);
    const fetchFormSubmissions = async () => {
        try {
            const response = await fetch('/api/formSubmission');
            const data = await response.json();

            if (response.ok) {
                setFormSubmissions(data);
            } else {
                console.error('Error fetching form submissions:', data);
            }
        } catch (error) {
            console.error('Error fetching form submissions:', error);
        }
    };

    if (session?.user?.role === "USER") {
        fetchFormSubmissions()
        return (
            <div>
                <h1>Welcome Admin</h1>
                <h2>Contact Form Submissions:</h2>
                <ul>
                    {formSubmissions?.map((submission) => (
                        <li key={submission.id}>
                            <pre>{JSON.stringify(submission, null, 2)}</pre>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    if (session?.user?.role === "USER") {
        return (
            <div>
                <h1>You are not an Admin. You can&apos;t write posts</h1>
            </div>
        )
    }
};

export default Dash;