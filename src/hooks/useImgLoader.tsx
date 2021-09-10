export const useLoadImg = () => {
  return () => {
    return new Promise<string>((res, rej) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.click();
      input.addEventListener('change', e => {
        const file = input.files?.[0];

        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const src = reader.result;

            if (typeof src === 'string') res(src);
            else rej();
          };
          reader.readAsDataURL(file);
        } else rej();
      });
    });
  };
};
