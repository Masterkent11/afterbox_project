// dateUtils.ts

export const convertToMMDDYY = (dateString: string): string => {
  const dateObj = new Date(dateString);
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // months are 0-based in JS
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = String(dateObj.getFullYear()).slice(-2); // get the last two digits of the year
  return `${month}/${day}/${year}`;
};
