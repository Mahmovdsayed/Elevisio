export function formatDate(
  dateString: string,
  format: "date" | "time-ago" = "date"
): string {
  const date = new Date(dateString);
  const now = new Date();

  if (format === "date") {
    return formatToReadableDate(date);
  } else {
    return formatToTimeAgo(date, now);
  }
}

function formatToReadableDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function formatToTimeAgo(date: Date, now: Date): string {
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);

    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }

  return "just now";
}
