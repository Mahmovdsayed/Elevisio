'use client'

import { LogoutFunc } from "@/functions/LogOut";
import { navigationItems } from "@/static/constant";
import { Button, Divider, Link } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";

const SideBar = () => {
    const pathname = usePathname();

    const router = useRouter();

    const handleLogout = async () => {
        await LogoutFunc()
        router.push("/login");
    };

    return (
        <div className="hidden lg:flex flex-col gap-2 p-4 h-full bg-white dark:bg-black">
            <div className="flex items-center gap-2 px-2 py-4">
                <span className="font-bold text-xl">Dashboard</span>
            </div>
            <Divider />
            <div className="flex flex-col gap-3 mt-3">
                {navigationItems.map((item) => {
                    const isLogout = item.name === "Logout";
                    return (
                        <Button
                            key={item.name}
                            size="md"
                            variant={isLogout ? "flat" : pathname === item.href ? "flat" : "bordered"}
                            startContent={<item.icon size={14} />}
                            className="w-full font-medium"
                            color={isLogout ? "danger" : pathname === item.href ? "primary" : "default"}
                            as={isLogout ? "button" : Link}
                            href={isLogout ? undefined : item.href}
                            onPress={isLogout ? handleLogout : undefined}
                        >
                            {item.name}
                        </Button>
                    );
                })}
            </div>
        </div >
    );
};

export default SideBar;
