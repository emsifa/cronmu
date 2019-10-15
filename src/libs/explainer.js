import { isAny } from './utils';

const months = {
  "JAN": "Januari",
  "FEB": "Februari",
  "MAR": "Maret",
  "APR": "April",
  "MAY": "Mei",
  "JUN": "Juni",
  "JUL": "Juli",
  "AUG": "Agustus",
  "SEP": "September",
  "OCT": "Oktober",
  "NOV": "November",
  "DEC": "Desember",
};

const days = {
  "MON": "Senin",
  "TUE": "Selasa",
  "WED": "Rabu",
  "THU": "Kamis",
  "FRI": "Jum'at",
  "SAT": "Sabtu",
  "SUN": "Minggu",
};

const monthNums = Object.values(months).reduce((res, m, i) => {
  res[i + 1] = m;
  return res;
}, {});

const dayNums = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"];

const combine = (array) => {
  if (array.length == 1) {
    return array[0];
  }

  if (array.length == 2) {
    return `${array[0]} dan ${array[1]}`;
  }

  const last = array.pop();
  return `${array.join(', ')}, dan ${last}`;
};

const alias = (n, aliases = []) => aliases[n] || n;

const explainNumber = (data, [min, max], aliases = []) => {
  if (data.value.step) {
    return `kelipatan ${data.value.step} antara ${alias(data.value.number, aliases)} sampai dengan ${alias(max, aliases)}`;
  }
  return `${alias(data.value.number, aliases)}`;
};

const explainRange = (data, aliases = []) => {
  if (data.value.step) {
    return `kelipatan ${data.value.step} antara ${alias(data.value.from, aliases)} sampai dengan ${alias(data.value.to, aliases)}`;
  }
  return `${alias(data.value.from, aliases)} sampai dengan ${alias(data.value.to, aliases)}`;
};

const explainMonths = (data) => {
  return combine(data.value.map(m => months[m]));
};

const explainDays = (data) => {
  return combine(data.value.map(d => days[d]));
};

const explainGroup = (type, data, [min, max], aliases = []) => {
  if (isAny(data)) {
    return ``;
  }

  const texts = data.value.map(d => {
    switch (d.type) {
      case 'number': return explainNumber(d, [min, max], aliases);
      case 'range': return explainRange(d, aliases);
      case 'months': return explainMonths(d);
      case 'days': return explainDays(d,);
    }
  });

  return combine(texts);
};

const explainMinute = (minute) => explainGroup('menit', minute, [0, 59]);
const explainHour = (hour) => explainGroup('jam', hour, [0, 23]);
const explainDate = (date) => explainGroup('tanggal', date, [1, 31]);
const explainMonth = (month) => explainGroup('bulan', month, [1, 12], monthNums);
const explainDay = (day) => explainGroup('hari', day, [0, 7], dayNums);

export const explainArray = (schema) => {
  const minute = schema[0];
  const hour = schema[2];
  const date = schema[4];
  const month = schema[6];
  const day = schema[8];

  const isAnyMinute = isAny(minute);
  const isAnyHour = isAny(hour);
  const isAnyDate = isAny(date);
  const isAnyMonth = isAny(month);
  const isAnyDay = isAny(day);

  if (isAnyMinute && isAnyHour && isAnyDate && isAnyMonth && isAnyDay) {
    return [{type: 'all', text: 'Setiap menit'}];
  }

  const data = [
    { isAny: isAnyMinute, explain: explainMinute(minute), prefix: 'Setiap menit', type: 'minute' },
    { isAny: isAnyHour, explain: explainHour(hour), prefix: 'Pada jam', type: 'hour' },
    { isAny: isAnyDate, explain: explainDate(date), prefix: 'Di tanggal', type: 'date' },
    { isAny: isAnyDay, explain: explainDay(day), prefix: !isAnyDate ? 'Atau di hari' : 'Di hari', type: 'day' },
    { isAny: isAnyMonth, explain: explainMonth(month), prefix: 'Pada bulan', type: 'month' },
  ];

  return data.filter((d, i) => !d.isAny || i == 0).map(d => {
    return {
      type: d.type,
      text: `${d.prefix} ${d.explain}`.trim()
    };
  });
};

export const explain = (schema) => {
  return explainArray(schema).map(d => d.text).join('. ') + '.';
};