import { loadFiles } from './loadFiles';

export const loadImg = () => {
  return new Promise<string>((res, rej) => {
    loadFiles()
      .then(fileList => {
        const file = fileList[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = () => {
            const src = reader.result;

            if (typeof src === 'string') res(src);
            else rej();
          };
          reader.onerror = err => rej(err);
          reader.onabort = e => rej(e);

          reader.readAsDataURL(file);
        } else rej();
      })
      .catch(err => rej(err));
  });
};
