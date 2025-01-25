import { SecondaryDiv } from '@src/ui/SecondaryDiv';
import { useState, useEffect } from 'react';

export default function Docs() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, []);

    return (
        <SecondaryDiv className="relative w-full h-full  shadow-md">
            {
                !isOnline && (
                    <div className="w-full h-full flex items-center justify-center bg-red-100">
                        <span className="text-red-600">Network is unavailable. Please check your connection.</span>
                    </div>
                )
            }
            {
                isOnline && (
                    <webview
                        src="https://alemonjs.com/"
                        className="w-full h-full"
                        aria-label="Documentation Viewer"
                    />
                )
            }
        </SecondaryDiv>
    );
}