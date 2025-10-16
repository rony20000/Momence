export const COUNTRY_FLAGS: Record<string, string> = {
  'Australia': '🇦🇺',
  'Brazil': '🇧🇷',
  'Bulgaria': '🇧🇬',
  'Canada': '🇨🇦',
  'China': '🇨🇳',
  'Denmark': '🇩🇰',
  'EMU': '🇪🇺',
  'Hungary': '🇭🇺',
  'Iceland': '🇮🇸',
  'India': '🇮🇳',
  'Indonesia': '🇮🇩',
  'Israel': '🇮🇱',
  'Japan': '🇯🇵',
  'Malaysia': '🇲🇾',
  'Mexico': '🇲🇽',
  'New Zealand': '🇳🇿',
  'Norway': '🇳🇴',
  'Philippines': '🇵🇭',
  'Poland': '🇵🇱',
  'Romania': '🇷🇴',
  'Singapore': '🇸🇬',
  'South Africa': '🇿🇦',
  'South Korea': '🇰🇷',
  'Sweden': '🇸🇪',
  'Switzerland': '🇨🇭',
  'Thailand': '🇹🇭',
  'Turkey': '🇹🇷',
  'United Kingdom': '🇬🇧',
  'USA': '🇺🇸',
} as const;

export const DEFAULT_FLAG = '🌍';

export const getFlagEmoji = (countryName: string): string => {
  return COUNTRY_FLAGS[countryName] || DEFAULT_FLAG;
};

