export default function formatDate(inputDate: string): string {
  // Define month names in abbreviated form
  const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  // Parse the input date string into a Date object
  const date = new Date(inputDate);

  // Extract the year, month, and day from the Date object
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()]; // getMonth() returns month index (0-11)
  const day = date.getDate();

  // Format the date as "MMM. D, YYYY"
  return `${month} ${day}, ${year}`;
}
