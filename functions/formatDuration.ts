/**
 * The function `getTimeSince` calculates the time elapsed since a given date and returns a formatted
 * string indicating the duration in years, days, hours, minutes, or seconds.
 * @param {string | Date | undefined} createdAt - The `getTimeSince` function calculates the time
 * elapsed since a given date or timestamp. If the `createdAt` parameter is not provided or is invalid,
 * it returns an appropriate message. The function then calculates the time difference in seconds and
 * converts it to years, days, hours, minutes, or seconds based
 * @returns The `getTimeSince` function returns a string indicating the time elapsed since the provided
 * `createdAt` date. The returned string will be in the format "Member since: X
 * [years/days/hours/minutes/seconds] ago" depending on the time difference between the `createdAt`
 * date and the current date. If `createdAt` is not provided or is invalid, appropriate error messages
 * are returned.
 */
const getTimeSince = (createdAt: string | Date | undefined) => {
  if (!createdAt) return "Member since: Unknown";

  const createdDate = new Date(createdAt);
  if (isNaN(createdDate.getTime())) return "Member since: Invalid Date";

  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000
  );

  const years = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));
  if (years > 0) return `Member since: ${years} years ago`;

  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  if (days > 0) return `Member since: ${days} days ago`;

  const hours = Math.floor(diffInSeconds / (60 * 60));
  if (hours > 0) return `Member since: ${hours} hours ago`;

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes > 0) return `Member since: ${minutes} minutes ago`;

  return `Member since: ${diffInSeconds} seconds ago`;
};

export { getTimeSince };
