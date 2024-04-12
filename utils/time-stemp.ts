export const timeStemp = (timestam: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const date = new Date(timestam);
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};
