'use client'
const ContainerLayout = ({ children }: { children: React.ReactNode }) => {
    return <>
        <main className="min-h-[100dvh] overflow-x-hidden">
            <div className="container mx-auto px-4 py-6">
                {children}
            </div>
        </main>
    </>;
};

export default ContainerLayout;