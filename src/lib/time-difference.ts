export function msToTime(input: number, take = 1) {
  let elapsed = input;
  const UNITS = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };
  const rtf = new Intl.RelativeTimeFormat();
  const arr = [] as string[];

  for (let u in UNITS) {
    const key = u as keyof typeof UNITS;
    if (Math.abs(elapsed) > UNITS[key] || u == 'second') {
      const count = Math.floor(elapsed / UNITS[key]);
      const val = rtf.format(count, key);
      arr.push(val);
      elapsed = elapsed % UNITS[key];
    }
  }

  return arr.splice(0, take).join(' ');
}

export const timeRemain = (difference: number, take: number = 1) => {
  const stamp = msToTime(difference, take) || '';
  return stamp.replace(/\b((in)|(ago))\b/g, '');
};
