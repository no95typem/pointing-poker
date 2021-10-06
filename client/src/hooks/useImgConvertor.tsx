import React, { useRef } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

const loadImgFromSrc = (src: string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((res, rej) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      res(img);
    };
    img.onerror = () => {
      rej(new Error(`can't load img`));
    };
  });
};

const getBlobPromise = (canvas: HTMLCanvasElement): Promise<Blob | null> => {
  return new Promise(res => {
    canvas.toBlob(res);
  });
};

const getBase64 = (canvas: HTMLCanvasElement): Promise<string | null> => {
  return new Promise(res => {
    getBlobPromise(canvas).then(blob => {
      if (!blob) res(null);
      else {
        const reader = new FileReader();
        reader.onloadend = () => res(reader.result as string);
        reader.onerror = () => res(null);
        reader.onabort = () => res(null);
        reader.readAsDataURL(blob);
      }
    });
  });
};

const calcSquareDrawParams = (
  img: HTMLImageElement,
  { w, h }: { w?: number; h?: number },
): [number, number, number, number] => {
  let sx: number;
  let sy: number;
  let sWidth: number;
  let sHeight: number;

  const ratio = img.width / img.height;
  const reqRatio = w && h ? w / h : 1;

  if (ratio >= reqRatio) {
    sHeight = img.height;
    sWidth = (img.width * reqRatio) / ratio;
    sx = (img.width - sWidth) / 2;
    sy = 0;
  } else {
    sWidth = img.width;
    sHeight = (img.height * ratio) / reqRatio;
    sx = 0;
    sy = (img.height - sHeight) / 2;
  }

  return [sx, sy, sWidth, sHeight];
};

const drawImgToCanvasWithCutting = (
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
) => {
  const [sx, sy, sWidth, sHeight] = calcSquareDrawParams(img, {
    w: canvas.width,
    h: canvas.height,
  });
  // console.log(sx, sy, sWidth, sHeight, canvas.height, canvas.width);
  canvas
    .getContext('2d')
    ?.drawImage(
      img,
      sx,
      sy,
      sWidth,
      sHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
};

export interface GetCuttedBase64FromImgSrc {
  src: string;
  w: number;
  h: number;
  scale?: number;
}

const convert = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement>,
  opts: GetCuttedBase64FromImgSrc,
) => {
  return new Promise<string>((res, rej) => {
    loadImgFromSrc(opts.src)
      .then(img => {
        // waiting for rendering in the dom if the image was loaded very fast
        setTimeout(() => {
          const canvas = canvasRef.current;

          if (opts.scale) {
            canvas.width = img.width * opts.scale;
            canvas.height = img.height * opts.scale;
            canvas
              .getContext('2d')
              ?.drawImage(img, 0, 0, canvas.width, canvas.height);
          } else {
            canvas.width = opts.w;
            canvas.height = opts.h;
            drawImgToCanvasWithCutting(img, canvas);
          }

          getBase64(canvas).then(base64 => {
            if (typeof base64 === 'string') res(base64);
            else rej('convertation to a base64 string failed');
          });
        });
      })
      .catch(err => rej(err));
  });
};

export const useImgConvertor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const div = document.createElement('div');
    ReactDOM.render(
      ReactDOM.createPortal(<canvas ref={canvasRef} />, div),
      div,
    );

    return () => {
      ReactDOM.render(<></>, div);
    };
  });

  return convert.bind(null, canvasRef);
};
