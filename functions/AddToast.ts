/**
 * The AddToast function in TypeScript adds a toast notification with specified title, timeout, type,
 * and optional description.
 * @param {string} title - The `title` parameter is a string that represents the title of the toast
 * message that will be displayed to the user.
 * @param {number} timeout - The `timeout` parameter in the `AddToast` function represents the duration
 * in milliseconds for which the toast message will be displayed before automatically dismissing
 * itself.
 * @param {colors} [type=default] - The `type` parameter in the `AddToast` function is used to specify
 * the color variant of the toast message. It is of type `colors`, which is imported from
 * `@/types/colors.types`. The default value for `type` is set to "default" if no value is provided
 * @param {string} [description] - The `AddToast` function takes the following parameters:
 */


import { colors } from "@/types/colors.types";
import { addToast } from "@heroui/react";

const AddToast = (
  title: string,
  timeout: number,
  type: colors = "default",
  description?: string
) => {
  addToast({
    color: "foreground",
    variant: "solid",
    title,
    description,
    timeout,
    severity: type,
    shadow: "none",
    size: "sm",
    radius: "sm",
    shouldShowTimeoutProgress: true,
  });
};

export { AddToast };
