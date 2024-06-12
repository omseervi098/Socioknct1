export const parseDate = (date) => {
  const newDate = new Date(date);
  const localDate = new Date(newDate.toLocaleString());
  const currentDate = new Date();
  const diff = currentDate - newDate;
  const seconds = diff / 1000;
  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  }
  if (seconds < 60 * 60) {
    return `${Math.floor(seconds / 60)} minutes ago`;
  }
  if (seconds < 60 * 60 * 24) {
    return `${Math.floor(seconds / 60 / 60)} hours ago`;
  }
  if (seconds < 60 * 60 * 24 * 30) {
    return `${Math.floor(seconds / 60 / 60 / 24)} days ago`;
  }
  if (seconds < 60 * 60 * 24 * 30 * 12) {
    return `${Math.floor(seconds / 60 / 60 / 24 / 30)} months ago`;
  }
  return `${Math.floor(seconds / 60 / 60 / 24 / 30 / 12)} years ago`;
};
