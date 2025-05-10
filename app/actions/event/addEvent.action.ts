"use server";

import {
  authorizeUser,
  errResponse,
  successResponse,
  uploadBannerToCloudinary,
  uploadImageToCloudinary,
} from "@/Helpers/helpers";
import { connectToDatabase } from "@/lib/dbConnection";
import Event from "@/models/events.model";
import { EventValidationSchema } from "@/Validation/EventValidation";
import { revalidateTag } from "next/cache";

export async function AddEvent(formData: FormData) {
  console.log(formData);
  try {
    await connectToDatabase();
    const user = await authorizeUser();
    if (!user || "error" in user) return user;

    const eventsCount = await Event.countDocuments({
      userID: user.id,
    });

    if (eventsCount >= 5) {
      return await errResponse(
        "You have reached the maximum limit of 5 Events."
      );
    }

    const eventData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      shortDescription: formData.get("shortDescription") as string,
      status: formData.get("status") as string,
      category: formData.get("category") as string,
      dateTime: {
        start: formData.get("dateTime.start") as string,
        end: formData.get("dateTime.end") as string,
      },
      location: {
        venue: formData.get("location.venue") as string,
        address: formData.get("location.address") as string,
        city: formData.get("location.city") as string,
        country: formData.get("location.country") as string,
        onlineEvent: formData.get("location.onlineEvent") === "true",
        meetingLink: formData.get("location.meetingLink") as string,
      },
      eventBanner: formData.get("eventBanner") as File | null,
      currency: formData.get("currency") as string,
      isFree: formData.get("isFree") === "true",
      organizer: {
        name: formData.get("organizer.name") as string,
        email: formData.get("organizer.email") as string,
        phone: formData.get("organizer.phone") as string,
        bio: formData.get("organizer.bio") as string,
        website: formData.get("organizer.website") as string,
        socialMedia: JSON.parse(
          (formData.get("organizer.socialMedia") as string) || "{}"
        ),
        image: formData.get("organizerImage") as File | null,
      },
      registration: {
        status: formData.get("registration.status") as string,
        closeDate: formData.get("registration.closeDate") as string,
        externalLink: formData.get("registration.externalLink") as string,
      },
      termsConditions: formData.get("termsConditions") as string,
      refundPolicy: formData.get("refundPolicy") as string,
      ageRestriction: formData.get("ageRestriction") as string,
      ticketTypes: JSON.parse((formData.get("ticketTypes") as string) || "[]"),
      speakers: JSON.parse((formData.get("speakers") as string) || "[]"),
      sponsors: JSON.parse((formData.get("sponsors") as string) || "[]"),
      faqs: JSON.parse((formData.get("faqs") as string) || "[]"),
    };

    try {
      await EventValidationSchema.validate(eventData, { abortEarly: true });
    } catch (error: any) {
      return await errResponse(error.errors[0]);
    }

    const defaultBannerUrl = "";
    let bannerUrl = defaultBannerUrl;
    let bannerPublicId = "";

    if (
      eventData.eventBanner instanceof File &&
      eventData.eventBanner.size > 0
    ) {
      const uploadResult = await uploadBannerToCloudinary(
        eventData.eventBanner,
        user.userName,
        "Events"
      );
      if (uploadResult) {
        bannerUrl = uploadResult.imageUrl;
        bannerPublicId = uploadResult.publicId;
      }
    }

    let organizerImageUrl = "";
    let organizerImagePublicId = "";

    if (
      eventData.organizer.image instanceof File &&
      eventData.organizer.image.size > 0
    ) {
      const uploadResult = await uploadImageToCloudinary(
        eventData.organizer.image,
        user.userName,
        "Events/Organizers"
      );
      if (uploadResult) {
        organizerImageUrl = uploadResult.imageUrl;
        organizerImagePublicId = uploadResult.publicId;
      }
    }

    const newEvent = new Event({
      ...eventData,
      eventBanner: { url: bannerUrl, public_id: bannerPublicId || null },
      organizer: {
        ...eventData.organizer,
        image: organizerImageUrl
          ? { url: organizerImageUrl, public_id: organizerImagePublicId }
          : null,
      },
      userID: user.id,
      views: 0,
    });

    await newEvent.save();
    revalidateTag("user-dashboard-events");

    return await successResponse("Event added successfully");
  } catch (error) {
    return await errResponse("Failed to add event");
  }
}
