"use server";

import { authorizeUser, errResponse } from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Event from "@/models/events.model";
import { EventUpdateValidationSchema } from "@/Validation/updateEventValidation";
import { revalidateTag } from "next/cache";

export async function updateEvent(formData: FormData) {
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const eventID = formData.get("eventID");
    const event = await Event.findById(eventID);
    if (!event) return await errResponse("Event not found");

    if (event.userID.toString() !== user.id) {
      return await errResponse(
        "Unauthorized: You are not the owner of this event"
      );
    }

    const updatedEvent = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      shortDescription: formData.get("shortDescription") as string,
      status: formData.get("status") as string,
      category: formData.get("category") as string,
      currency: formData.get("currency") as string,
      ageRestriction: formData.get("ageRestriction") as string,
    };

    try {
      await EventUpdateValidationSchema.validate(updatedEvent, {
        abortEarly: true,
      });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }
    
    await Event.findByIdAndUpdate(eventID, updatedEvent, { new: true });
    revalidateTag("user-dashboard-events");

    return await errResponse("Event updated successfully");
  } catch (error) {
    return await errResponse("Something went wrong");
  }
}
