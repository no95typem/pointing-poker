import XLSX from 'xlsx';
import { deepObjToWorkbook } from './deep-obj-wb-converters';

export const saveObjToWb = (obj: Record<string, unknown>, fileName: string) => {
  const wb = deepObjToWorkbook({
    obj: obj,
    name: '',
    copy: true,
  });
  XLSX.writeFile(wb, fileName, { bookType: 'xlsx' }); // ! TODO (no95typem)
};
