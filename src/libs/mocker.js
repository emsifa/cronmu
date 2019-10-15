export const mockType = (type, value, text) => ({type, value, text});
export const mockAny = () => mockType('any', true, '*');
export const mockWhitespace = (ws = " ") => mockType("ws", ws, ws);
export const mockNumber = (number, step = null) => mockType("number", { number, step }, `${number}${step? '/' + step : ''}`);
export const mockRange = (from, to, step = null) => mockType("range", { from, to, step }, `${from}-${to}${step? '/' + step : ''}`);
export const makeText = (data) => Array.isArray(data) ? data.map(d => d.text).join(',') : (data ? data.text : "");
export const mockGroup = (data) => {
  return mockType("group", !data ? [mockAny()] : Array.isArray(data) ? data : [data], makeText(data))
};

export const mockSchema = ({minute = null, hour = null, date = null, month = null, day = null} = {}) => {
  return [
    mockGroup(minute),
    mockWhitespace(),
    mockGroup(hour),
    mockWhitespace(),
    mockGroup(date),
    mockWhitespace(),
    mockGroup(month),
    mockWhitespace(),
    mockGroup(day),
  ];
};