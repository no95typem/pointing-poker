/* eslint max-params: ["warn", 3] */
import XLSX from 'xlsx';

export const deepObjToWorkbook = (
  obj: Record<string, unknown>,
  name: string,
  inWb?: XLSX.WorkBook,
): XLSX.WorkBook => {
  const wb = inWb ?? XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet([obj]);
  XLSX.utils.book_append_sheet(wb, ws, name);

  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === 'object' && val !== null) {
      deepObjToWorkbook(
        val as Record<string, unknown>,
        `${name}#${key}`,
        inWb ?? wb,
      );
    }
  });

  return wb;
};

const setValByKey = (
  reversedKeys: string[],
  obj: Record<string, unknown>,
  val: unknown,
): void => {
  const indexOfLast = reversedKeys.length - 1;
  const key = reversedKeys[indexOfLast] as string;

  // console.log(key);

  if (reversedKeys.length === 1) {
    obj[key] = val;
  } else if (key) {
    if (key in obj) {
      if (typeof obj[key] !== 'object' || obj[key] === null) {
        throw new Error('');
      } else {
        obj[key] = {};
      }
    }

    setValByKey(
      reversedKeys.slice(0, indexOfLast),
      obj[key] as Record<string, unknown>,
      val,
    );
  }
};

export const workbookToDeepObj = (wb: XLSX.WorkBook) => {
  const deepObj = {};

  wb.SheetNames.forEach(name => {
    const ws = wb.Sheets[name];
    const arr = XLSX.utils.sheet_to_json(ws, { defval: null });
    arr.forEach(el => {
      try {
        const obj =
          typeof el === 'string'
            ? JSON.parse(el)
            : typeof el === 'object' && el !== null
            ? el
            : undefined;
        console.log(el);

        if (obj) {
          const reversedKeys = name
            .split('#')
            .filter(str => str !== '')
            .reverse();
          setValByKey(reversedKeys, deepObj, obj);
        }
      } catch {}
    });
  });

  return deepObj;
};
