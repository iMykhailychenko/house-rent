import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { errorNotif } from '../../../utils/helpers/error-logger.helper';
import { ErrorState } from '../../interfaces/common';
import { formatSeverError } from '../../utils';

import { mediaInitialState } from './media.initial-state';
import { IMediaResponse, IMediaState } from './media.interface';
import { mediaService } from './media.service';

export const mediaThunk = createAsyncThunk<IMediaResponse, File>(
    'MEDIA/UPLOAD',
    async (payload: File, { dispatch, rejectWithValue }) => {
        try {
            const form = new FormData();
            form.append('image', payload);

            const { data, status } = await mediaService.upload(form, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (event: ProgressEvent): void => {
                    dispatch(updateProgress(Math.round((100 * event.loaded) / event.total)));
                },
            });
            if (status < 200 || status >= 300) throw new Error();
            return data;
        } catch (error) {
            errorNotif(error);
            return rejectWithValue(formatSeverError(error));
        }
    },
);

const mediaSlice = createSlice({
    name: 'MEDIA',
    initialState: mediaInitialState,
    reducers: {
        updateProgress(state: IMediaState, action: PayloadAction<number>) {
            state.progress = action.payload;
        },
        resetUploads(state: IMediaState) {
            state.status = 'idle';
            state.progress = 0;
            state.url = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(mediaThunk.pending, (state: IMediaState) => {
            state.status = 'loading';
        });
        builder.addCase(mediaThunk.fulfilled, (state: IMediaState, action: PayloadAction<IMediaResponse>) => {
            state.status = 'success';
            state.url = action.payload.url;
        });
        builder.addCase(mediaThunk.rejected, (state: IMediaState, action) => {
            state.status = 'error';
            state.error = action.payload as ErrorState;
        });
    },
});

export const { updateProgress, resetUploads } = mediaSlice.actions;

export default mediaSlice.reducer;
