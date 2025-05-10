'use client'

import { Skill } from "@/types/skills.types";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@heroui/table";
import { Button, Pagination } from "@heroui/react";
import { useState, useEffect } from "react";
import UpdateSkills from "../Dashboard/skills/UpdateSkills";
import DeleteSkills from "../Dashboard/skills/DeleteSkills";

interface IProps {
    skills: Skill[];
}

const SkillsCardDashboard = ({ skills }: IProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedSkills, setPaginatedSkills] = useState<Skill[]>([]);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(skills.length / itemsPerPage);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedSkills(skills.slice(startIndex, endIndex));
    }, [currentPage, skills]);

    return (
        <div className="space-y-6">
            <Table
                isStriped
                // removeWrapper
                shadow="sm"
                classNames={{
                    wrapper: " dark:bg-default-50",
                }}
                color="primary"
                aria-label="Skills Table"
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>CATEGORY</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {paginatedSkills.map((skill) => (
                        <TableRow key={skill._id}>
                            <TableCell className="font-medium">{skill.name}</TableCell>
                            <TableCell className="capitalize">{skill.category}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <UpdateSkills data={skill} id={skill._id} />
                                    <DeleteSkills skillID={skill._id} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {skills.length > 0 && (
                <div className="flex items-center justify-center">
                    <Pagination
                        total={totalPages}
                        initialPage={1}
                        page={currentPage}
                        onChange={setCurrentPage}
                        showControls
                        size="sm"
                        variant="flat"
                        color="primary"
                    />
                </div>
            )}
        </div>
    );
};

export default SkillsCardDashboard;