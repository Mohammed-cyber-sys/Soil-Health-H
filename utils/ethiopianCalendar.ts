
import { Language } from '../types';

export const getEthiopianDateString = (lang: Language): string => {
  const now = new Date();
  
  // Ethiopian calendar is ~7-8 years behind Gregorian
  // We approximate the day/month logic for UI purposes
  const ethYear = now.getFullYear() - 8;
  const day = now.getDate();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Ethiopian month names
  const monthsAm = ["መስከረም", "ጥቅምት", "ህዳር", "ታህሳስ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"];
  const monthsOr = ["Fulbaana", "Onkololeessa", "Sadaasa", "Muddee", "Amajjii", "Gurraandhala", "Bitootessa", "Eebila", "Caamsaa", "Waxabajjii", "Adooleessa", "Hagayya", "Qaammee"];
  
  // Offset to match Meskerem (Sept) start
  const monthIdx = (now.getMonth() + 4) % 13; 
  const month = lang === 'amharic' ? monthsAm[monthIdx] : monthsOr[monthIdx];
  
  return lang === 'amharic' 
    ? `${month} ${day}, ${ethYear} ዓ.ም | ሰዓት፡ ${timeStr}`
    : `${month} ${day}, ${ethYear} | Yeroo: ${timeStr}`;
};
