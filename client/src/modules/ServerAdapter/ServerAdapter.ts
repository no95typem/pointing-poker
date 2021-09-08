// import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';
import { setWSStatus } from '../../redux/slices/connect';
import { store } from '../../redux/store';

class ServerAdapter {
  private apiUrl = 'ws://localhost:9000';

  private ws: WebSocket | undefined;

  connect(): Promise<boolean> {
    return new Promise(res => {
      if (this.ws) {
        // ? TODO (no95typem)
        // ? disconnect from a previous server
        // but for now:
        res(true);

        return;
      }
      store.dispatch(setWSStatus('connecting'));
      setTimeout(() => {
        try {
          this.ws = new WebSocket(this.apiUrl);
          this.ws.addEventListener('open', () => {
            console.log('open ws');
            store.dispatch(setWSStatus('alive'));
            res(true);
          });
          this.ws.addEventListener('error', e => {
            console.log(e);
            store.dispatch(setWSStatus('dead'));
            this.ws = undefined;
            res(false);
          });
        } catch (err) {
          res(false);
          console.log(err);
          store.dispatch(setWSStatus('dead'));
          this.ws = undefined;
        }
      }, 2000);
    });
  }
}

// export const SERVER_ADAPTER = OBJ_PROCESSOR.deepFreeze(new ServerAdapter());
export const SERVER_ADAPTER = new ServerAdapter();
