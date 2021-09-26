import XLSX from 'xlsx';

export const readWbFromFile = (file: File) => {
  return new Promise<XLSX.WorkBook>((res, rej) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const result = e.target?.result;

      if (result instanceof ArrayBuffer) {
        var data = new Uint8Array(result);
        try {
          const workbook = XLSX.read(data, { type: 'array' });
          res(workbook);
        } catch (err) {
          rej(err);
        }
      }
    };

    reader.onerror = err => rej(err);
    reader.onabort = e => rej(e);

    reader.readAsArrayBuffer(file);
  });
};
