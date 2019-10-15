/**
 * Check if type/group has/is type any
 *
 * @param {object} data
 */
export const isAny = (data) => {
  switch (data.type) {
    case 'group': return data.value.find(d => d.type == 'any') ? true : false;
    case 'any': return true;
    default: return false;
  }
};