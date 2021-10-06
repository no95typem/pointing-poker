import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { purify } from '../../../../shared/helpers/processors/purify';
import { RootState } from '../store';

interface QuoteData {
  data?: { content: string; author: string };
  time?: number;
  fetching: boolean;
}

const initialState: QuoteData = { fetching: false };

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setQuoteData(state, action: PayloadAction<QuoteData>) {
      Object.assign(state, action.payload);
    },
  },
});

export const fetchQuote = createAsyncThunk(
  'quotes/fetchQuote',
  async (args, thunkAPI) => {
    const quoute = (thunkAPI.getState() as RootState).quote;

    if (quoute.fetching) return;

    const time = Date.now();

    if (!quoute.time || time - quoute.time > 60_000) {
      thunkAPI.dispatch(
        quoteSlice.actions.setQuoteData({
          ...quoute,
          time: time,
          fetching: true,
        }),
      );

      fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(quote => {
          const data = purify(quote);

          thunkAPI.dispatch(
            quoteSlice.actions.setQuoteData({
              data,
              time: time,
              fetching: false,
            }),
          );
        })
        .catch(err => {
          thunkAPI.dispatch(
            quoteSlice.actions.setQuoteData({
              ...quoute,
              time: time,
              fetching: false,
            }),
          );
        });
    }
  },
);
