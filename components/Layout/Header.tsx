'use client'

interface IProps {
    user: any
}

import React, { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
    DropdownItem,
    Badge,
} from "@heroui/react";
import { content, metadata } from "@/content/Content";
import { FaBell } from "react-icons/fa";
import { navigationItems } from "@/static/constant";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LogoutFunc } from "@/functions/LogOut";
const Header = ({ user }: IProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);
    return <>
        <Navbar isMenuOpen={isMenuOpen} isBlurred isBordered className="" position="sticky" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden "
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">ELEVISIO</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
            </NavbarContent>
            <NavbarContent className="items-center" justify="end">
                {/* <Badge size="sm" color="primary" className="border-none" variant="solid" content="9+" shape="circle">
                    <Button aria-label="Notifications" title="Notifications" isIconOnly color="primary" variant="flat" size="md" radius="sm">
                        <FaBell />
                    </Button>
                </Badge> */}
                <Dropdown shadow="none" backdrop="blur" placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="primary"
                            name={user?.userName}
                            size="sm"
                            src={user?.image?.url}
                        />
                    </DropdownTrigger>
                    <DropdownMenu color="primary" aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{user?.email}</p>
                        </DropdownItem>
                        <DropdownItem isReadOnly key="settings">My Settings</DropdownItem>
                        <DropdownItem onPress={LogoutFunc} key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
            <NavbarMenu className="bg-white/40 dark:bg-black/40">
                {navigationItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.1, delay: index * 0.05, type: "spring", stiffness: 150 }}
                        >
                            <Link
                                className="w-full text-xl uppercase font-bold"
                                showAnchorIcon={item.name !== "Logout"}
                                color={item.name === "Logout" ? "danger" : pathname === item.href ? "primary" : "foreground"}
                                href={item.href}
                                size="lg"
                                onPress={() => setIsMenuOpen(false)}
                                onClick={item.name === "Logout" ? LogoutFunc : undefined}
                            >
                                <span><item.icon className="text-3xl me-2" /></span>
                                {item.name}
                            </Link>
                        </motion.div>

                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    </>;
};

export default Header;