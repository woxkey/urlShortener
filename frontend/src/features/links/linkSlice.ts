import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import ILink from '../../types/ILink';
import IState from '../../types/IState';
import axios from 'axios';
import ILinkDTO from '../../types/ILinkDTO';

const initialState: IState = {
  link: {
    originalUrl: '',
    shortUrl: '',
  } as ILink,
  loading: false,
};

export const getShortenLink = createAsyncThunk(
  'getShortenLink',
  async (link: ILinkDTO) => {
    try {
      const response = await axios.post('http://localhost:3000/links', link);
      return response.data;
    } catch (err: unknown) {
      const error = err as Error;
      return error.message;
    }
  }
);

export const linkSlice = createSlice({
  name: 'link',
  initialState,
  reducers: {
    handleOriginalUrl: (state, {payload}: PayloadAction<string>) => {
      state.link = {...state.link, originalUrl: payload};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShortenLink.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getShortenLink.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(
        getShortenLink.fulfilled,
        (state, {payload}: PayloadAction<ILink>) => {
          state.loading = false;
          state.link.shortUrl = payload.shortUrl;
        }
      );
  },
});

export default linkSlice.reducer;
export const {handleOriginalUrl} = linkSlice.actions;
