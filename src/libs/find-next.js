// @TODO: entah kenapa ditest pakai Jest ga bisa import 1-1
// (eg: import addMonths from 'date-fns/date_months')
// Kalau gini kayaknya nanti dia bundlenya lebih gede.
import {
  addMonths,
  addDays,
  addHours,
  addMinutes,
  setDate,
  setMinutes,
  setHours,
} from 'date-fns';

import uniq from 'lodash/uniq';
import { isAny } from './utils';

const months = {
  "JAN": 1,
  "FEB": 2,
  "MAR": 3,
  "APR": 4,
  "MAY": 5,
  "JUN": 6,
  "JUL": 7,
  "AUG": 8,
  "SEP": 9,
  "OCT": 10,
  "NOV": 11,
  "DEC": 12,
};

const days = {
  "SUN": 0,
  "MON": 1,
  "TUE": 2,
  "WED": 3,
  "THU": 4,
  "FRI": 5,
  "SAT": 6,
};

const listOfType = (data, type) => {
  if (data.type == 'group') {
    return data.value.filter(d => d.type === type);
  }
  return data.type === type ? [data] : [];
};

const monthNumbers = (data) => data.value.map(m => months[m]);
const dayNumbers = (data) => data.value.map(d => days[d]);

/**
 * Check if number match given step
 *
 * @param {Number} number
 * @param {Number} from
 * @param {Number} step
 */
export const matchStep = (number, from, step) => {
  return number === from || ((number > from) && (number - from) % step === 0);
};

/**
 * Check if number data match to given num
 *
 * @param {object} data
 * @param {Number} num
 */
export const matchNumber = (data, num) => {
  if (data.value.step) {
    return matchStep(num, data.value.number, data.value.step);
  }
  return data.value.number === num;
};

/**
 * Check if range data match given num
 *
 * @param {object} data
 * @param {Number} num
 */
export const matchRange = (data, num) => {
  if (num < data.value.from || num > data.value.to) {
    return false;
  }

  if (data.value.step) {
    return matchStep(num, data.value.from, data.value.step);
  }

  return true;
};

/**
 * Get matched numbers within a range from given data
 *
 * @param {object} data
 * @param {[Number, Number]} range
 */
export const getCommonTypeMatches = (data, [min, max]) => {
  const matches = [];
  for (let num = min; num <= max; num++) {
    if (isAny(data)
      || listOfType(data, 'number').find(d => matchNumber(d, num))
      || listOfType(data, 'range').find(d => matchRange(d, num))
    ) {
      matches.push(num);
    }
  }
  return matches;
};

export const getMatchMinutes = (data) => getCommonTypeMatches(data, [0, 59]);
export const getMatchHours = (data) => getCommonTypeMatches(data, [0, 23]);
export const getMatchDates = (data) => getCommonTypeMatches(data, [1, 31]);

export const getMatchMonths = (data) => [
  ...getCommonTypeMatches(data, [1, 12]),
  ...listOfType(data, 'months').reduce((res, d) => [...res, ...monthNumbers(d)], [])
];

export const getMatchDays = (data) => [
  ...getCommonTypeMatches(data, [0, 7]),
  ...listOfType(data, 'days').reduce((res, d) => [...res, ...dayNumbers(d)], [])
];

/**
 * Generate next count times match
 *
 * @param {object} schema
 * @param {Date} date
 * @param {Number} count
 */
export const findNext = (schema, date = new Date(), count = 10) => {
  const minuteData = schema[0];
  const hourData = schema[2];
  const dateData = schema[4];
  const monthData = schema[6];
  const dayData = schema[8];

  const minutes = uniq(getMatchMinutes(minuteData));
  const hours = uniq(getMatchHours(hourData));
  const dates = uniq(getMatchDates(dateData));
  const days = uniq(getMatchDays(dayData));
  const months = uniq(getMatchMonths(monthData));

  const results = [];
  while (results.length < count) {
    const monthNum = date.getMonth() + 1;
    const dateNum = date.getDate();
    const dayNum = date.getDay();
    const hourNum = date.getHours();
    const minNum = date.getMinutes();

    if (months.indexOf(monthNum) < 0) {
      date = addMonths(setDate(setHours(setMinutes(date, 0), 0), 1), 1);
      continue;
    }

    if (
      // Kalau datenya all, dan daysnya nggak all, cek daysnya
      (dates.length === 31 && days.length < 8 && days.indexOf(dayNum) < 0)
      // Kalau daysnya all, dan datenya nggak all, cek datenya
      || (days.length === 8 && dates.length < 31 && dates.indexOf(dateNum) < 0)
      // Kalau daysnya nggak all, dan datenya nggak all, cek salah satunya
      || (
        days.length < 8
        && dates.length < 31
        && dates.indexOf(dateNum) < 0
        && days.indexOf(dayNum) < 0
      )
    ) {
      date = addDays(setHours(setMinutes(date, 0), 0), 1);
      continue;
    }

    if (hours.indexOf(hourNum) < 0) {
      date = addHours(setMinutes(date, 0), 1);
      continue;
    }

    if (minutes.indexOf(minNum) < 0) {
      date = addMinutes(date, 1);
      continue;
    }

    results.push(new Date(date));
    date = addMinutes(date, 1);
  }

  return results;
};