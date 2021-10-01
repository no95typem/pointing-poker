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
  XLSX.writeFile(wb, opts.fileName, { bookType: opts.bookType }); // ! TODO (no95typem)
};
