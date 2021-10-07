/* eslint max-params: ["warn", 3] */
import XLSX from 'xlsx';
import { OBJ_PROCESSOR } from '../../../shared/helpers/processors/obj-processor';

interface IDeepObjToWorkbookArgs {
  obj: Record<string, unknown>;
  name: string;
  inWb?: XLSX.WorkBook;
  flag?: 'isArray';
  copy: boolean;
}

export const calcSheetName = (name: string): string => {
  return name.slice(-31).slice(Math.max(name.indexOf('#'), 0)); // 31 - max for sheet
};

export const deepObjToWorkbook = (
  args: IDeepObjToWorkbookArgs,
): XLSX.WorkBook => {
  const { obj, name, inWb, flag, copy } = args;

  const target: Record<string, unknown> = {};
  Object.assign(target, copy ? OBJ_PROCESSOR.deepClone(obj) : obj); // assign for [] -> {}
  const wb = inWb ?? XLSX.utils.book_new();

  target[`__XLSX_KEYPATH__`] = name;

  if (flag) target[flag] = true;

  const ws = XLSX.utils.json_to_sheet([target]);

  delete target[`__XLSX_KEYPATH__`];

  if (flag) delete target[flag];

  XLSX.utils.book_append_sheet(wb, ws, calcSheetName(name));

  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === 'object' && val !== null) {
      deepObjToWorkbook({
        obj: val as Record<string, unknown>,
        name: `${name}#${key}`,
        inWb: inWb ?? wb,
        flag: Array.isArray(val) ? 'isArray' : undefined,
        copy: false,
      });
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

  if (reversedKeys.length === 1) {
    obj[key] = val;
  } else {
    if (key in obj && obj[key] !== null) {
      if (typeof obj[key] !== 'object') {
        throw new Error('');
      }
    } else {
      obj[key] = {};
    }

    setValByKey(
      reversedKeys.slice(0, indexOfLast),
      obj[key] as Record<string, unknown>,
      val,
    );
  }
};

export const readTypes = (
  obj: Record<string, unknown>,
): Record<string, unknown> | unknown[] => {
  const copy = OBJ_PROCESSOR.deepClone(obj);
  const isArray = 'isArray' in copy;

  if (isArray) delete copy['isArray'];

  Object.entries(copy).forEach(([key, val]) => {
    if (typeof val === 'object' && val !== null) {
      copy[key] = readTypes(val as Record<string, unknown>);
    }
  });

  if (isArray) return Array.from(Object.values(copy));
  else return copy;
};

export const workbookToDeepObj = (wb: XLSX.WorkBook) => {
  const deepObj = {};

  wb.SheetNames.forEach((name, sheetIndex) => {
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

        if (!(`__XLSX_KEYPATH__` in obj)) return;

        const __XLSX_KEYPATH__ = obj[`__XLSX_KEYPATH__`];

        if (obj && typeof __XLSX_KEYPATH__ === 'string') {
          if (sheetIndex === 0) Object.assign(deepObj, obj);
          else {
            const reversedKeys = __XLSX_KEYPATH__
              .split('#')
              .filter(str => str !== '')
              .reverse();

            setValByKey(reversedKeys, deepObj, obj);
          }
        }

        delete obj['__XLSX_KEYPATH__'];
      } catch {}
    });
  });

  return readTypes(deepObj);
};
