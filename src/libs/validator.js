const availableMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const availableDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const typeIn = (data, types) => types.indexOf(data.type) > -1;

const numberAndRangeMustBetween = (type, data, [min, max]) => {
  const errorMessage = `Angka ${type.toLowerCase()} harus diantara ${min}-${max}`;
  switch (data.type) {
    case 'group':
      return data.value
        .filter(val => typeIn(val, ['number', 'range']))
        .map(val => numberAndRangeMustBetween(type, val, [min, max]))
        .find(val => val);
    case 'number':
      return (data.value.number < min || data.value.number > max) ? errorMessage : null;
    case 'range':
      return (
        (data.value.from < min || data.value.from > max)
        || (data.value.to < min || data.value.to > max)
      ) ? errorMessage : null;
  }
};

const rangeMustBeLowerToHigher = (type, data) => {
  switch (data.type) {
    case 'group':
      return data.value
        .filter(val => typeIn(val, ['range']))
        .map(val => rangeMustBeLowerToHigher(type, val))
        .find(val => val);
    case 'range':
      return data.value.from > data.value.to ? `Rentang ${type.toLowerCase()} harus dari angka kecil ke angka besar` : null;
  }
};

const shouldUsesCorrectAlternativeMonths = (data) => {
  switch (data.type) {
    case 'group':
      return data.value
        .filter(val => typeIn(val, ['months']))
        .map(val => shouldUsesCorrectAlternativeMonths(val))
        .find(val => val);
    case 'months':
      const month = data.value.find(month => availableMonths.indexOf(month) < 0)
      return month ? `'${month}' tidak terdaftar pada nama bulan yang diizinkan.` : null;
  }
};

const shouldUsesCorrectAlternativeDays = (data) => {
  switch (data.type) {
    case 'group':
      return data.value
        .filter(val => typeIn(val, ['days']))
        .map(val => shouldUsesCorrectAlternativeDays(val))
        .find(val => val);
    case 'months':
      const day = data.value.find(day => availableDays.indexOf(day) < 0)
      return day ? `'${day}' tidak terdaftar pada nama hari yang diizinkan.` : null;
  }
};

const findCommonError = (type, data, rangeAndNumberBetween) => {
  return numberAndRangeMustBetween(type, data, rangeAndNumberBetween) || rangeMustBeLowerToHigher(type, data) || null;
};

const validateMinute = (data) => {
  return findCommonError('Menit', data, [0, 59]);
};

const validateHour = (data) => {
  return findCommonError('Jam', data, [0, 23]);
};

const validateDate = (data) => {
  return findCommonError('Tanggal', data, [1, 31]);
};

const validateMonth = (data) => {
  return findCommonError('Bulan', data, [1, 12]) || shouldUsesCorrectAlternativeMonths(data) || null;
};

const validateDay = (data) => {
  return findCommonError('Hari', data, [0, 7]) || shouldUsesCorrectAlternativeDays(data) || null;
};

const invalid = (message, position) => ({ message, position });

export const validate = (parsed) => {
  if (!Array.isArray(parsed)) {
    throw new Error("Query tidak valid");
  }

  if (parsed.length != 9) {
    return invalid(`Query harus terdiri dari 5 segment yang dipisahkan oleh spasi.`);
  }

  const minute = parsed[0];
  const hour = parsed[2];
  const date = parsed[4];
  const month = parsed[6];
  const day = parsed[8];

  const errorMinute = validateMinute(minute);
  const errorHour = validateHour(hour);
  const errorDate = validateDate(date);
  const errorMonth = validateMonth(month);
  const errorDay = validateDay(day);

  if (errorMinute) return errorMinute;
  if (errorHour) return errorHour;
  if (errorDate) return errorDate;
  if (errorMonth) return errorMonth;
  if (errorDay) return errorDay;

  return null;
};