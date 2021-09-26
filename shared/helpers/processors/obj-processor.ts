let browser: boolean;

try {
  browser = !!window?.window;
} catch {
  browser = false;
}

class ObjProcessor {
  readonly deepFreeze = <T>(obj: T): T => {
    if (typeof obj === 'object' && obj !== null) {
      const record = obj as Record<string, unknown>;
      Object.keys(record).forEach(prop => {
        if (
          typeof record[prop] === 'object' &&
          !Object.isFrozen(record[prop])
        ) {
          this.deepFreeze(record[prop]);
        }
      });

      return Object.freeze(obj);
    }
    throw new Error('not object');
  };

  readonly deepCloneForWebworker = <T>(target: T): T => {
    if (Array.isArray(target)) {
      const clone = [] as unknown[];
      (target as unknown[]).forEach(v => {
        clone.push(v);
      });

      return clone.map((n: unknown) =>
        this.deepCloneForWebworker(n),
      ) as unknown as T;
    }

    if (typeof target === 'object' && target !== null) {
      const clone = {
        ...(target as unknown as { [key: string]: unknown }),
      } as {
        [key: string]: unknown;
      };
      Object.keys(clone).forEach(k => {
        clone[k] = this.deepCloneForWebworker(clone[k]);
      });
      Object.setPrototypeOf(clone, Object.getPrototypeOf(target));

      return clone as unknown as T;
    }

    return target;
  };

  readonly deepClone = !browser
    ? this.deepCloneForWebworker
    : <T>(target: T): T => {
        if (Array.isArray(target)) {
          const clone = [] as unknown[];
          (target as unknown[]).forEach(v => {
            clone.push(v);
          });

          return clone.map((n: unknown) => this.deepClone(n)) as unknown as T;
        }

        if (typeof target === 'object' && target !== null) {
          if (target instanceof HTMLElement)
            return target.cloneNode(true) as unknown as T;

          if (target instanceof Blob) return target.slice() as unknown as T;
          const clone = {
            ...(target as unknown as { [key: string]: unknown }),
          } as {
            [key: string]: unknown;
          };
          Object.keys(clone).forEach(k => {
            clone[k] = this.deepClone(clone[k]);
          });
          Object.setPrototypeOf(clone, Object.getPrototypeOf(target));

          return clone as unknown as T;
        }

        return target;
      };

  readonly deepMerge = (
    target: Record<string, unknown>,
    source: Record<string, unknown>,
  ) => {
    Object.keys(source).forEach(key => {
      if (
        !(key in target) ||
        (source[key] !== null &&
          source[key] !== undefined &&
          target[key] === null) ||
        target[key] === undefined
      ) {
        // console.log(`deep clone: ${key}`);
        target[key] = this.deepClone(source[key]);
      } else if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        typeof target[key] === 'object' &&
        target[key]
      ) {
        // console.log(`deep merge with key: ${key}`);
        this.deepMerge(
          target[key] as Record<string, unknown>,
          source[key] as Record<string, unknown>,
        );
      }
    });
  };
}

const OBJ_PROCESSOR = new ObjProcessor();
OBJ_PROCESSOR.deepFreeze(OBJ_PROCESSOR);
export { OBJ_PROCESSOR };
