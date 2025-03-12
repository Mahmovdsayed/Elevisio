"use client"

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
export function Providers({ children }: { children: React.ReactNode }) {

    const router = useRouter()
    const [loading, setLoading] = useState(true);
    return <>
        <HeroUIProvider navigate={router.push}>
            <ToastProvider
                placement='top-center'
            />
            {children}
        </HeroUIProvider>

    </>


}