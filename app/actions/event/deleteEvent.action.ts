"use server";

import {
  authorizeUser,
  deleteImageFromCloudinary,
  errResponse,
  successResponse,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Event from "@/models/events.model";
import { deleteSchema } from "@/Validation/workValidations";
import { revalidateTag } from "next/cache";

export async function deleteEvent(ID: string) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    try {
      await deleteSchema.validate({ ID }, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const event = await Event.findById(ID);
    if (!event) return await errResponse("Event not found");

    if (event.userID.toString() !== user.id) {
      return await errResponse("You are not authorized to delete this event");
    }

    if (event.eventBanner?.public_id) {
      await deleteImageFromCloudinary(event.eventBanner.public_id);
    }
    if (event.organizer?.image?.public_id) {
      await deleteImageFromCloudinary(event.organizer?.image?.public_id);
    }
    await Event.findByIdAndDelete(ID);
    revalidateTag("user-dashboard-events");
    return await successResponse("Event deleted successfully");
  } catch (error) {
    return await errResponse("Failed to add event");
  }
}
