import XLSX from 'xlsx';
import { deepObjToWorkbook } from './deep-obj-wb-converters';

export const saveObjToWb = (
  obj: Record<string, unknown>,
  opts: {
    fileName: string;
    bookType: XLSX.BookType;
  },
) => {
  const wb = deepObjToWorkbook({
    obj: obj,
    name: '',
    copy: true,
  });
  XLSX.writeFile(wb, opts.fileName, { bookType: opts.bookType });
};

export const saveArrayToWb = (
  arr: Record<string, unknown>[],
  opts: {
    sheetName: string;
    fileName: string;
    bookType: XLSX.BookType;
  },
) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(arr);
  XLSX.utils.book_append_sheet(wb, ws, opts.sheetName);
  XLSX.writeFile(wb, opts.fileName, { bookType: opts.bookType });
};
