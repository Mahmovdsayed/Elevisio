import { addToast } from "@heroui/react";

type ToastSeverity =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

const AddToast = (
  title: string,
  timeout: number,
  type: ToastSeverity = "default",
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
