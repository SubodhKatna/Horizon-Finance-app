/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from 'clsx';
import qs from 'query-string';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    year: 'numeric', // numeric year (e.g., '2023')
    month: '2-digit', // abbreviated month name (e.g., 'Oct')
    day: '2-digit', // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    'en-US',
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, '');
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case 'depository':
      return {
        bg: 'bg-blue-25',
        lightBg: 'bg-blue-100',
        title: 'text-blue-900',
        subText: 'text-blue-700',
      };

    case 'credit':
      return {
        bg: 'bg-success-25',
        lightBg: 'bg-success-100',
        title: 'text-success-900',
        subText: 'text-success-700',
      };

    default:
      return {
        bg: 'bg-green-25',
        lightBg: 'bg-green-100',
        title: 'text-green-900',
        subText: 'text-green-700',
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split('/');

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? 'Processing' : 'Success';
};

export const authFormSchema = (type: string) => z.object({
  // 🪪 Sign-Up Only Fields
  firstName:
    type === 'sign-in'
      ? z.string().optional()
      : z
        .string({ required_error: 'First name is required' })
        .min(2, { message: 'First name must be at least 2 characters' })
        .max(50, { message: 'First name cannot exceed 50 characters' })
        .regex(/^[A-Za-z\s'-]+$/, {
          message:
            'First name may only contain letters, spaces, apostrophes, and hyphens',
        })
        .trim(),

  lastName:
    type === 'sign-in'
      ? z.string().optional()
      : z
        .string({ required_error: 'Last name is required' })
        .min(2, { message: 'Last name must be at least 2 characters' })
        .max(50, { message: 'Last name cannot exceed 50 characters' })
        .regex(/^[A-Za-z\s'-]+$/, {
          message:
            'Last name may only contain letters, spaces, apostrophes, and hyphens',
        })
        .trim(),

  address1:
    type === 'sign-in'
      ? z.string().optional()
      : z
        .string({ required_error: 'Address is required' })
        .min(5, { message: 'Address must be at least 5 characters' })
        .max(100, { message: 'Address cannot exceed 100 characters' })
        .trim(),

  city:
    type === 'sign-in'
      ? z.string().optional()
      : z
        .string({ required_error: 'City is required' })
        .min(2, { message: 'City name must be at least 2 characters' })
        .max(50, { message: 'City name cannot exceed 50 characters' })
        .regex(/^[A-Za-z\s'-]+$/, {
          message:
            'City name may only contain letters, spaces, apostrophes, and hyphens',
        })
        .trim(),

  state:
    type === 'sign-in'
      ? z.string().optional()
      : z
        .string({ required_error: 'State code is required' })
        .length(2, {
          message: 'State code must be exactly 2 letters (e.g., CA, NY)',
        })
        .regex(/^[A-Za-z]{2}$/, {
          message: 'State code must only contain letters',
        })
        .transform((val) => val.toUpperCase()),

  postalCode:
    type === 'sign-in'
      ? z.string().optional()
      : z
        .string({ required_error: 'Postal code is required' })
        .regex(/^\d{4,6}$/, {
          message: 'Postal code must be between 4 and 6 digits',
        })
        .trim(),

  dateOfBirth:
    type === 'sign-in' // Assuming you have a sign-in/sign-up switch
      ? z.string().optional()
      : z
        .string({ required_error: 'Date of birth is required' })

        // 1. Checks that the format is exactly DD-MM-YYYY
        .regex(/^\d{2}-\d{2}-\d{4}$/, {
          message: 'Date must be in DD-MM-YYYY format',
        })

        // 2. Checks if the date is a real calendar date (e.g., rejects "31-02-2024")
        .refine(
          (dateStr) => {
            const [day, month, year] = dateStr.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            return (
              date.getFullYear() === year &&
              date.getMonth() === month - 1 &&
              date.getDate() === day
            );
          },
          { message: 'Please enter a valid date.' }
        ),

  // 📧 Common Fields (Both)
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' })
    .max(100, { message: 'Email cannot exceed 100 characters' })
    .trim(),

  password: z
    .string({ required_error: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .max(64, { message: 'Password cannot exceed 64 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter (A–Z)',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter (a–z)',
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least one number (0–9)',
    })
    .regex(/[@$!%*?&]/, {
      message:
        'Password must include at least one special character (@, $, !, %, *, ?, &)',
    })
    .trim(),
});

