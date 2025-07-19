import { Country } from '../types';

export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag');
    const countries = await response.json();
    
    return countries
      .filter((country: Country) => country.idd?.root && country.idd?.suffixes?.[0])
      .sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return [];
  }
}

export function getDialCode(country: Country): string {
  return `${country.idd.root}${country.idd.suffixes[0]}`;
}