'use client'

import { formatDate } from "@/functions/formatDate";
import { EventData } from "@/types/event.types";
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@heroui/react";
import UpdateEvent from "../Dashboard/events/UpdateEvent";
import DeleteEvent from "../Dashboard/events/DeleteEvent";

interface IProps {
    event: EventData
}

const EventCardDashboard = ({ event }: IProps) => {
    return (
        <Card shadow="sm" className="bg-gray-100 dark:bg-default-100">
            <CardHeader className="flex-col flex items-start justify-start gap-1">
                <Image
                    src={event.eventBanner.url}
                    alt={event.name}
                    className="w-3/4 m-auto object-cover object-center"
                    isBlurred
                />
            </CardHeader>

            <CardBody className="space-y-4">
                <div>
                    <h3 className="text-base md:text-lg font-semibold">{event.name}</h3>
                    <p className="text-xs md:text-sm text-default-600 mt-1">{event.shortDescription}</p>
                </div>

                <Divider />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <h4 className="text-sm font-medium mb-1">Event Details</h4>
                        <ul className="text-xs space-y-1">
                            <li><span className="font-medium">Category:</span> {event.category}</li>
                            <li><span className="font-medium">Status:</span> {event.status}</li>
                            <li><span className="font-medium">Location:</span> {event.location.venue}</li>
                            <li><span className="font-medium">Start:</span> {formatDate(event.dateTime.start, "date")}</li>
                            <li><span className="font-medium">End:</span> {formatDate(event.dateTime.end, "date")}</li>
                            <li><span className="font-medium">Free Event:</span> {event.isFree ? 'Yes' : 'No'}</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium mb-1">Organizer Info</h4>
                        <ul className="text-xs space-y-1">
                            <li><span className="font-medium">Name:</span> {event.organizer.name}</li>
                            <li><span className="font-medium">Email:</span> {event.organizer.email}</li>
                            <li><span className="font-medium">Phone:</span> {event.organizer.phone}</li>
                        </ul>
                    </div>
                </div>

                {event.ticketTypes.length > 0 && (
                    <>
                        <Divider />
                        <div>
                            <h4 className="text-sm font-medium mb-1">Ticket Information</h4>
                            <ul className="text-xs space-y-2">
                                {event.ticketTypes.map((ticket, index) => (
                                    <li key={index}>
                                        <span className="font-medium">{ticket.name}:</span> {ticket.price} {event.currency}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <Divider />
                <div>
                    <h4 className="text-sm font-medium mb-1">Registration</h4>
                    <ul className="text-xs space-y-1">
                        <li><span className="font-medium">Status:</span> {event.registration.status}</li>
                        <li><span className="font-medium">Closes:</span> {formatDate(event.registration.closeDate, "date")}</li>
                        {event.registration.externalLink && (
                            <li>
                                <span className="font-medium">Link:</span>
                                <a href={event.registration.externalLink} target="_blank" rel="noopener noreferrer" className="text-primary-500 ml-1">
                                    Register Here
                                </a>
                            </li>
                        )}
                    </ul>
                </div>

                <Divider />
                <div className="space-y-2">
                    <h4 className="text-sm font-medium">Policies</h4>
                    <div className="text-xs">
                        <p className="font-medium">Terms & Conditions:</p>
                        <p className="text-default-600 mt-1">{event.termsConditions}</p>
                    </div>
                    <div className="text-xs">
                        <p className="font-medium">Refund Policy:</p>
                        <p className="text-default-600 mt-1">{event.refundPolicy}</p>
                    </div>
                    <div className="text-xs">
                        <p className="font-medium">Age Restriction:</p>
                        <p className="text-default-600 mt-1">{event.ageRestriction}</p>
                    </div>
                </div>

                {(event.speakers.length > 0 || event.sponsors.length > 0) && (
                    <>
                        <Divider />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {event.speakers.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Speakers ({event.speakers.length})</h4>
                                    <ul className="text-xs space-y-1">
                                        {event.speakers.map((speaker, index) => (
                                            <li key={index}>
                                                {speaker.name} - {speaker.bio.substring(0, 50)}...
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {event.sponsors.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Sponsors ({event.sponsors.length})</h4>
                                    <ul className="text-xs space-y-1">
                                        {event.sponsors.map((sponsor, index) => (
                                            <li key={index}>
                                                {sponsor.name} ({sponsor.tier})
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {event.faqs.length > 0 && (
                    <>
                        <Divider />
                        <div>
                            <h4 className="text-sm font-medium mb-1">FAQs ({event.faqs.length})</h4>
                            <ul className="text-xs space-y-3">
                                {event.faqs.map((faq, index) => (
                                    <li key={index}>
                                        <p className="font-medium">Q: {faq.question}</p>
                                        <p className="text-default-600 mt-1">A: {faq.answer}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
                <div className="flex flex-col items-end justify-end">
                    <p className="text-xs text-default-500">
                        Created : {formatDate(event.createdAt, "time-ago")}
                    </p>
                    <p className="text-xs text-default-500">
                        Updated : {formatDate(event.updatedAt, "time-ago")}
                    </p>
                </div>
            </CardBody>

            <CardFooter>
                <div className="flex items-center justify-between gap-2 w-full">
                    <UpdateEvent id={event._id} data={event} />
                    <DeleteEvent eventID={event._id} />
                </div>

            </CardFooter>
        </Card>
    );
};

export default EventCardDashboard;