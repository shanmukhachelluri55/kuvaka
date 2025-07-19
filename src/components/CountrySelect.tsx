import React, { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Country } from '../types';
import { fetchCountries, getDialCode } from '../lib/countries';

interface CountrySelectProps {
  selectedCountry: Country | null;
  onCountryChange: (country: Country) => void;
}

export function CountrySelect({ selectedCountry, onCountryChange }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries().then((data) => {
      setCountries(data);
      setLoading(false);
      if (!selectedCountry && data.length > 0) {
        // Default to US
        const usa = data.find(c => c.cca2 === 'US') || data[0];
        onCountryChange(usa);
      }
    });
  }, [selectedCountry, onCountryChange]);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getDialCode(country).includes(searchQuery)
  );

  if (loading) {
    return (
      <div className="w-20 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {selectedCountry && (
          <>
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium">
              {getDialCode(selectedCountry)}
            </span>
          </>
        )}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-hidden">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.cca2}
                onClick={() => {
                  onCountryChange(country);
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <span className="text-lg">{country.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {country.name.common}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {getDialCode(country)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}