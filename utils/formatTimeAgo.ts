export default (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000; // 365 * 24 * 60 * 60

  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  if (interval >= 1) {
    return `1 year ago`;
  }

  interval = seconds / 2592000; // 30 * 24 * 60 * 60
  if (interval > 1) {
    return `${Math.floor(interval)} months ago`;
  }

  interval = seconds / 86400; // 24 * 60 * 60
  if (interval > 1) {
    return `${Math.floor(interval)} days ago`;
  }
  if (interval >= 1) {
    return `1 day ago`;
  }

  interval = seconds / 3600; // 60 * 60
  if (interval > 1) {
    return `${Math.floor(interval)} hours ago`;
  }
  if (interval >= 1) {
    return `1 hour ago`;
  }

  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes ago`;
  }
  if (interval >= 1) {
    return `1 minute ago`;
  }

  return 'just now';
};
