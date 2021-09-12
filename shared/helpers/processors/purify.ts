import DOMPurify from 'dompurify';

export const purify = <T>(thing: T): T => {
  if (typeof thing === 'string' || thing instanceof Node)
    return DOMPurify.sanitize(thing) as unknown as T;

  if (typeof thing === 'object' && thing !== null) {
    const record = thing as Record<string, unknown>;
    Object.entries(record).forEach(entry => {
      record[entry[0]] = purify(entry[1]);
    });
  }

  return thing;
};
