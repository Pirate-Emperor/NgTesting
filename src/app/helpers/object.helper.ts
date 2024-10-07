export function isEmpty<T>(data: T | T[]): boolean {
  if (data === null || data === undefined) {
    return true;
  } else if (typeof data === 'string') {
    return data.trim().length === 0;
  } else if (Array.isArray(data)) {
    return data.length === 0;
  }

  return false;
}
