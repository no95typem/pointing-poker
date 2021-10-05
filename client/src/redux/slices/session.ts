import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ISessionStateClient,
  SessionState,
} from '../../../../shared/types/session/state/session-state';

import { SESSION_CLIENT_INIT_STATE } from '../../../../shared/initStates';
import { Synchronized } from '../../../../shared/types/syncable';
import { purify } from '../../../../shared/helpers/processors/purify';
import { SERVER_ADAPTER } from '../../modules/ServerAdapter/serverAdapter';
import { RootState } from '../store';
import { OBJ_PROCESSOR } from '../../../../shared/helpers/processors/obj-processor';
import { readWbFromFile } from '../../helpers/readWorksheet';
import { workbookToDeepObj } from '../../helpers/deep-obj-wb-converters';
import { SESSION_STAGES } from '../../../../shared/types/session/state/stages';
import { notifSlice } from './notifications';
import { loadFiles } from '../../helpers/loadFiles';
import { importIssuesFromWorkbook } from '../../helpers/read-issues-from-wb';
import { calcNextIssueId } from '../../helpers/calcNextIssueId';
import { saveObjToWb } from '../../helpers/saveState';

const initialState = SESSION_CLIENT_INIT_STATE;

export const setSynced = <T>(thing: T, synced: boolean): T => {
  if (typeof thing === 'object' && thing !== null) {
    Object.entries(thing).forEach(entry => {
      (thing as Record<string, unknown>)[entry[0]] = setSynced(
        entry[1],
        synced,
      );
    });

    if ('isSynced' in thing)
      (thing as unknown as Synchronized).isSynced = synced;
  }

  return thing;
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    dang_updSessStateFromClient(
      state,
      action: PayloadAction<Partial<ISessionStateClient>>,
    ) {
      Object.assign(state, action.payload);
    },
    dang_updSessStateFromServer(
      state,
      action: PayloadAction<Partial<ISessionStateClient>>,
    ) {
      const purified = purify(action.payload);

      const synced = setSynced(purified, true);

      Object.assign(state, synced);
    },
    dang_reset(state) {
      Object.keys(state).forEach(key => {
        delete (state as Record<string, unknown>)[key];
      });
      Object.assign(state, initialState);
    },
    markChatMsgsReaded(state) {
      const chat = OBJ_PROCESSOR.deepClone(state.chat);
      Object.values(chat.msgs).forEach(msg => msg.isViewed = true);
      Object.assign(state, { chat });
    }
  },
});

export const tryLoadSessionFromFile = createAsyncThunk(
  'session/tryLoadSessionFromFile',
  async (file: File, thunkAPI) => {
    readWbFromFile(file)
      .then(wb => {
        const deepObj = workbookToDeepObj(wb) as unknown as SessionState;
        thunkAPI.dispatch(sessionSlice.actions.dang_reset());
        deepObj.stage = SESSION_STAGES.STATS;

        OBJ_PROCESSOR.deepMerge(
          deepObj as unknown as Record<string, unknown>,
          initialState as unknown as Record<string, unknown>,
        );

        if (!('sessionId' in deepObj)) throw new Error('sessionId is missing');

        if (typeof deepObj.sessionId !== 'string')
          throw new Error('sessionId is not string');

        if (deepObj.sessionId === '') throw new Error('sessionId is missing');

        thunkAPI.dispatch(
          sessionSlice.actions.dang_updSessStateFromClient(deepObj),
        );
      })
      .catch((err: Error) => {
        console.log(err);
        setTimeout(() => {
          thunkAPI.dispatch(
            notifSlice.actions.addNotifRec({
              status: 'error',
              text: `Uploaded file is corrupted: ${err.message}`,
              needToShow: true,
            }),
          );
        }, 100);
      });
  },
);

export const tryImportIssues = createAsyncThunk(
  'session/tryImportIssues',
  async (args, thunkAPI) => {
    const sessionId = (thunkAPI.getState() as RootState).session.sessionId;

    if (!sessionId) return;

    loadFiles().then(fileList => {
      if (fileList[0]) {
        readWbFromFile(fileList[0])
          .then(wb => {
            const issues = importIssuesFromWorkbook(wb);

            if (issues.length === 0) {
              thunkAPI.dispatch(
                notifSlice.actions.addNotifRec({
                  status: 'warning',
                  text: `Can't find issues in the imported file`,
                  needToShow: true,
                }),
              );
            } else {
              const state = thunkAPI.getState() as RootState;

              if (sessionId !== state.session.sessionId) return;

              let startId = calcNextIssueId(state.session.issues.list);

              issues.forEach(iss => {
                iss.id = startId;
                startId++;
              });

              const sessionIssues = OBJ_PROCESSOR.deepClone(
                state.session.issues,
              );

              const newIssuesList = [...sessionIssues.list, ...issues];
              const newIssues = {
                ...sessionIssues,
                list: newIssuesList,
                isSynced: false,
              };

              SERVER_ADAPTER.updSessState({ issues: newIssues });

              thunkAPI.dispatch(
                notifSlice.actions.addNotifRec({
                  status: 'success',
                  text: `Issues import complete!`,
                  needToShow: false,
                }),
              );
            }
          })
          .catch(err => {
            thunkAPI.dispatch(
              notifSlice.actions.addNotifRec({
                status: 'error',
                text: `Can't import issues: ${err.message}`,
                needToShow: true,
              }),
            );
          });
      }
    });
  },
);

export interface ISaveArgs {
  filename?: string;
  ext?: 'xlsx' | 'csv';
}

export const trySaveSessionToFile = createAsyncThunk(
  'session/trySaveSessionToFile',
  async ({ filename, ext }: ISaveArgs, thunkAPI) => {
    try {
      const session = (thunkAPI.getState() as RootState).session;
      const name = filename
        ? `${filename}.${ext}`
        : `pp-${session.name.value}.${ext}`;

      saveObjToWb(session as unknown as Record<string, unknown>, {
        fileName: name,
        bookType: ext || 'xlsx',
      });
    } catch {
      // TODO
    }
  },
);
