// displaying chosen timeframe
export const datediff = (startDay, end) => {
  const d1 = new Date(startDay);
  const d2 = new Date(end);
  const yd = d1.getYear();
  const yn = d2.getYear();
  let years = yn - yd;
  const md = d1.getMonth();
  const mn = d2.getMonth();
  let months = mn - md;
  if (months < 0) {
    years -= 1;
    months = 12 - md + mn;
  }
  const dd = d1.getDate();
  const dn = d2.getDate();
  let days = dn - dd;
  if (days < 0) {
    months -= 1;
    // figure out how many days there are in the last month
    d2.setMonth(mn, 0);
    days = d2.getDate() - dd + dn;
  }
  const weeks = Math.floor(days / 7);
  days %= 7;
  if (years > 0)
    return `${years} ${years === 1 ? 'year' : 'years'}${
      months > 0 ? ` and ${months} ${months === 1 ? 'month' : 'months'}` : ''
    }`;
  if (months > 0)
    return `${months} ${months === 1 ? 'month' : 'months'}${
      weeks > 0 ? ` and ${weeks} ${weeks === 1 ? 'week' : 'weeks'}` : ''
    }`;
  if (weeks > 0)
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ${
      days > 0 ? ` and ${days} ${days === 1 ? 'day' : 'days'}` : ''
    }`;
  return `${days} days`;
};
