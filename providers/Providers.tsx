
"use client"

// import { SmoothCursor } from '@/components/Ui/SmoothCursor';
import { usePreventZoom } from '@/hooks/usePreventZoom';
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
export function Providers({ children }: { children: React.ReactNode }) {
    usePreventZoom();

    const router = useRouter()
    const [loading, setLoading] = useState(true);
    return <>
        <HeroUIProvider navigate={router.push}>
            {/* <SmoothCursor /> */}

            <ToastProvider
                placement='top-center'
            />
            {children}
        </HeroUIProvider>

    </>


}