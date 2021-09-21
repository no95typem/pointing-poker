export const loadFiles = (): Promise<FileList> => {
  return new Promise((res, rej) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.addEventListener('change', e => {
      if (input.files) res(input.files);
      else rej();
    });
  });
};
