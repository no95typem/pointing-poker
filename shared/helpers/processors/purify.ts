import DOMPurify from 'dompurify';

// ! TODO (no95typem)  - not working on the server

export const purifyInNode = <T>(thing: T): T => thing;

export const purifyInBrowser = <T>(thing: T): T => {
  if (typeof thing === 'string' || thing instanceof Node)
    return DOMPurify.sanitize(thing) as unknown as T;

  if (typeof thing === 'object' && thing !== null) {
    const record = thing as Record<string, unknown>;
    Object.entries(record).forEach(entry => {
      record[entry[0]] = purifyInBrowser(entry[1]);
    });
  }

  return thing;
};

let browser = undefined;

try {
  browser = !!window?.window;
} catch {
  browser = false;
}

export const purify = browser ? purifyInBrowser : purifyInNode;
