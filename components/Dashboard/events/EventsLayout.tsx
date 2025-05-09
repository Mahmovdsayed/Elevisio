'use client'

import EventCardDashboard from "@/components/Ui/EventCardDashboard";
import { EventData } from "@/types/event.types";
import { Divider } from "@heroui/react";
import { motion } from "framer-motion";

interface IProps {
    eventData: any
}
const EventsLayout = ({ eventData }: IProps) => {
    return <>
        <Divider className="mt-4" />
        {eventData?.eventCount > 0 ?
            <div className="mt-4">
                <motion.h4
                    initial={{ opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="text-xs md:text-sm font-medium">
                    Total Event Count: <span className="font-bold">{eventData?.eventCount}</span>
                </motion.h4>
            </div>
            :
            ""
        }

        <div className="my-4 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
                {eventData?.event?.map((event: EventData, index: number) =>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.10 * index, ease: "easeInOut", type: "spring", stiffness: 100 }}
                        key={event._id}>
                        <EventCardDashboard event={event} />
                    </motion.div>
                )}
            </div>
        </div>
    </>;
};

export default EventsLayout;