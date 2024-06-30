import dayjs from "dayjs";

/**
 * Check if a variable is not null, undefined, empty string, empty array, empty object, or has a falsy value.
 * @template T
 * @param {(T | null | undefined)} value - The value to check.
 * @returns {value is T} - Returns true if the value is not null, undefined, empty string, empty array, empty object, or has a falsy value, otherwise returns false.
 */
export function isExists<T>(value: T | null | undefined): value is T {
  if (value === undefined || value === null) return false;

  switch (typeof value) {
    case "string":
      return value.trim().length > 0;
    case "object":
      return Array.isArray(value)
        ? value.length > 0
        : Object.keys(value).length > 0;
    case "boolean":
      return true;
    case "number":
      return !isNaN(value);
  }
  return false;
}

// This function checks if the given input is an array
export function isArray<T>(input: any): input is T[] {
  return Array.isArray(input);
}

// This function increments or decrements the state based on the action type passed
export function pageReducer(
  state: number,
  action: {
    type: string;
    page?: number;
  },
): number {
  switch (action.type) {
    case "increment":
      return state + 1; // increases state by 1
    case "decrement":
      return state - 1; // decreases state by 1
    case "set":
      return isExists(action.page) ? action.page : state;
    default:
      throw new Error(); // throws an error if action type is neither "increment" nor "decrement"
  }
}

/**
 * Generates an array representing the pagination buttons to display.
 *
 * The logic ensures that:
 * - The first and last pages are always present in the output.
 * - Pages close to the current page (defined by a delta) are always present in the output.
 * - Ellipses (`...`) are added to indicate omitted pages, if there are any.
 *
 * @param currentPage - The current active page.
 * @param totalPages - Total number of available pages.
 * @returns An array of numbers and/or ellipses strings to represent pagination buttons.
 */
export function paginationRange(
  currentPage: number,
  totalPages: number,
): Array<string | number> {
  // If there's only 1 page, just return that.
  if (totalPages <= 1) {
    return [1];
  }

  const delta = 2; // Define how many adjacent page numbers should be shown.
  const range = [];

  // Loop to push adjacent page numbers (based on delta).
  for (
    let i = Math.max(1, currentPage - delta);
    i <= Math.min(totalPages, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  // If the pages before the current page are more than 2 away, add an ellipsis at the beginning.
  if (currentPage - delta > 2) {
    range.unshift("...");
  }

  // If the pages after the current page are more than 1 away from the total, add an ellipsis at the end.
  if (currentPage + delta < totalPages - 1) {
    range.push("...");
  }

  // Ensure the first page is always present.
  if (!range.includes(1)) {
    range.unshift(1);
  }

  // Ensure the last page is always present, unless there's only one page.
  if (!range.includes(totalPages) && totalPages !== 1) {
    range.push(totalPages);
  }

  return range;
}

export function mapDataToUI(data: any, callback: (item: any) => any): any {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  return data?.map(callback);
}

export function parseExpirationDate(input: string): string | null {
  // Normalize input
  input = input.replace(/\s/g, "");

  // Check if input is empty
  if (!isExists(input)) {
    return null;
  }

  // Regexes for supported formats
  const regexes = [
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^\d{4}-\d{2}$/, // YYYY-MM
    /^\d{2}-\d{2}-\d{4}$/, // DD-MM-YYYY
    /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
    /^\d{4}\/\d{2}$/, // YYYY/MM
    /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
    /^\d{8}$/, // YYYYMMDD or DDMMYYYY
    /^\d{6}$/, // MMYYYY or YYYMM
  ];

  // Config
  const MIN_YEAR = dayjs().year();
  const MAX_YEAR = 2090;
  const MIN_MONTH = dayjs().month() + 1;

  // Check format
  const format = regexes.find((f) => f.test(input));
  const isValidFormat = format?.test(input);

  if (!isExists(isValidFormat)) {
    return null;
  }

  // Extract parts
  let year, month, day;
  // Parse date parts
  if (format === regexes[0] || format === regexes[2]) {
    // YYYY-MM-DD, DD-MM-YYYY
    [year, month, day] = input.split(/[/-]/);
  } else if (format === regexes[1] || format === regexes[4]) {
    // YYYY-MM, YYYY/MM
    [year, month] = input.split(/[/-]/);
    day = getLastDayOfMonth(year, month);
  } else if (format === regexes[3] || format === regexes[5]) {
    // YYYY/MM/DD, DD/MM/YYYY
    [day, month, year] = input.split(/[/-]/);
  } else if (format === regexes[6]) {
    // 8 digit - YYYYMMDD or DDMMYYYY
    if (parseInt(input.slice(4, 6)) <= 12 && parseInt(input.slice(4, 6)) >= 1) {
      // YYYYMMDD
      year = input.slice(0, 4);
      month = input.slice(4, 6);
      day = input.slice(6, 8);
    }

    if (parseInt(input.slice(0, 2)) <= 31 && parseInt(input.slice(0, 2)) >= 1) {
      // DDMMYYYY
      day = input.slice(0, 2);
      month = input.slice(2, 4);
      year = input.slice(4, 8);
    }
  } else if (format === regexes[7]) {
    // 6 digit - YYYYMM or MMYYYY
    if (
      parseInt(input.slice(0, 2)) === 20 &&
      parseInt(input.slice(2, 4)) <= 90 &&
      parseInt(input.slice(4, 6)) <= 12 &&
      parseInt(input.slice(4, 6)) >= 1
    ) {
      // YYYYMM
      year = input.slice(0, 4);
      month = input.slice(4, 6);
      day = getLastDayOfMonth(year, month);
    }

    if (
      parseInt(input.slice(2, 4)) === 20 &&
      parseInt(input.slice(4, 6)) <= 90 &&
      parseInt(input.slice(0, 2)) <= 12 &&
      parseInt(input.slice(0, 2)) >= 1
    ) {
      // MMYYYY
      month = input.slice(2, 4);
      year = input.slice(0, 2);
      day = getLastDayOfMonth(year, month);
    }
  }

  // Validate
  year = Number(year);
  month = Number(month);
  day = Number(day) ?? 1;

  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return null;
  }

  if (year < MIN_YEAR || year > MAX_YEAR) {
    return null;
  }

  if (year === MIN_YEAR && month < MIN_MONTH) {
    return null;
  }

  if (month < 1 || month > 12) {
    return null;
  }

  if (day < 1 || day > 31) {
    return null;
  }

  const lastDay = getLastDayOfMonth(String(year), String(month));
  if (day < 1 || day > lastDay) {
    return null;
  }

  // Return in YYYY-MM-DD format
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

function getLastDayOfMonth(year: string, month: string): number {
  return dayjs(`${String(year)}-${String(month)}-01`)
    .endOf("month")
    .date();
}
