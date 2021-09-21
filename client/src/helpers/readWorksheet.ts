import XLSX from 'xlsx';

export const readWbFromFile = (file: File) => {
  return new Promise<XLSX.WorkBook>((res, rej) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const result = e.target?.result;

      if (result instanceof ArrayBuffer) {
        var data = new Uint8Array(result);
        console.log(data);
        const workbook = XLSX.read(data, { type: 'array' });
        res(workbook);
        // console.log(workbook);
        // const ws = workbook.Sheets[workbook.SheetNames[0]];
        // console.log(ws);
        // const json = XLSX.utils.sheet_to_json(ws);
        // console.log(json);
      }
    };

    reader.onerror = err => rej(err);
    reader.onabort = e => rej(e);

    reader.readAsArrayBuffer(file);
  });
};
