'use client'

import NotesCard from "@/components/Ui/NotesCard";
import { Note } from "@/types/note.types";
import { Chip, Tab, Tabs } from "@heroui/react";
import { motion } from "framer-motion";

interface IProps {
    noteData: any
}

const NotesLayout = ({ noteData }: IProps) => {
    const allNotes = noteData?.note || [];

    const tasks = allNotes.filter((item: any) => item.type === "task");
    const notes = allNotes.filter((item: any) => item.type === "note");
    const todos = allNotes.filter((item: any) => item.type === "todo");
    return <>
        <div className="my-4">
            <Tabs aria-label="Options" color="default" size="sm" variant="underlined" radius="md">
                <Tab key="notes" title={
                    <div className="flex items-center pb-1 space-x-2">

                        <span>Note</span>
                        <Chip radius="full" size="sm" variant="flat" color="primary">
                            {notes?.length}
                        </Chip>
                    </div>
                }>
                    <div className="grid grid-cols-1 lg:grid-cols-2  gap-2">

                        {notes?.map((note: Note, index: number) =>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4"
                                transition={{
                                    duration: 0.5,
                                    delay: 0.10 * index,
                                    ease: "easeInOut",
                                    type: "spring",
                                    stiffness: 100
                                }}
                                key={note._id}
                            >
                                <NotesCard type="note" data={note} />
                            </motion.div>
                        )}
                    </div>
                </Tab>
                <Tab key="tasks" title={
                    <div className="flex items-center pb-1 space-x-2">

                        <span>Tasks</span>
                        <Chip radius="full" size="sm" variant="flat" color="primary">
                            {tasks?.length}
                        </Chip>
                    </div>
                }>
                    <div className="grid grid-cols-1 lg:grid-cols-2  gap-2">

                        {tasks?.map((task: Note, index: number) =>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4"
                                transition={{
                                    duration: 0.5,
                                    delay: 0.10 * index,
                                    ease: "easeInOut",
                                    type: "spring",
                                    stiffness: 100
                                }}
                                key={task._id}
                            >
                                <NotesCard type="task" data={task} />
                            </motion.div>
                        )}
                    </div>
                </Tab>
                <Tab key="todos" title={
                    <div className="flex items-center pb-1 space-x-2">

                        <span>Todos</span>
                        <Chip radius="full" size="sm" variant="flat" color="primary">
                            {todos?.length}
                        </Chip>
                    </div>
                }>
                    <div className="grid grid-cols-1 lg:grid-cols-2  gap-2">
                        {todos?.map((todos: Note, index: number) =>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4"
                                transition={{
                                    duration: 0.5,
                                    delay: 0.10 * index,
                                    ease: "easeInOut",
                                    type: "spring",
                                    stiffness: 100
                                }}
                                key={todos._id}
                            >
                                <NotesCard type="todo" data={todos} />
                            </motion.div>
                        )}
                    </div>

                </Tab>
            </Tabs>
        </div>
    </>;
};

export default NotesLayout;