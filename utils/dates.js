const { DateTime } = require('luxon');

// Format Unix timestamps to readable date
const formatDate = (timestamp) => {
  const dt = DateTime.fromJSDate(timestamp);

  return dt.toLocaleString(DateTime.DATETIME_FULL);
};

module.exports = { formatDate };