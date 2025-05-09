'use client';

import { formatDate } from "@/functions/formatDate";
import { Note } from "@/types/note.types";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import UpdateNote from "../Dashboard/notes/UpdateNote";
import DeleteNote from "../Dashboard/notes/DeleteNote";

interface IProps {
    data: Note;
    type: "task" | "note" | "todo";
}

const NotesCard = ({ data, type }: IProps) => {
    return (
        <Card shadow="none" className="bg-gray-100 dark:bg-default-100">
            <CardHeader className="flex-col items-start" >
                <h4 className="text-lg font-bold text-default-800">{data.title}</h4>
                <div className="text-sm text-default-500">
                    {(type === "task" || type === "todo") && (
                        <>
                            <div className="text-xs">
                                <span className="font-medium">Completed:</span>{" "}
                                <span className={data.isCompleted ? "text-green-600" : "text-red-500"}>
                                    {data.isCompleted ? "Yes" : "No"}
                                </span>
                            </div>
                            <div className="text-xs">
                                <span className="font-medium">Priority:</span> {data.priority}
                            </div>
                        </>
                    )}
                </div>
            </CardHeader>



            <Divider />

            <CardBody>
                <p className="text-sm font-medium text-default-700">{data.content}</p>
            </CardBody>

            <CardFooter className="flex-col" >
                <p className="w-full text-xs text-default-400 mb-2">Last updated: {formatDate(data.updatedAt, "time-ago")}</p>
                <div className="flex items-center justify-between gap-2 w-full">
                    <UpdateNote id={data._id} data={data} />
                    <DeleteNote noteID={data._id} />

                </div>
            </CardFooter>
        </Card>
    );
};

export default NotesCard;
