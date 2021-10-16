import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { errorNotif } from '../../../utils/helpers';

import { mediaInitialState } from './media.initial-state';
import { IMediaResponse, IMediaState } from './media.interface';
import { mediaServices } from './media.services';

export const mediaThunk = createAsyncThunk<IMediaResponse, File>('MEDIA/UPLOAD', async (payload: File, { dispatch }) => {
    try {
        const form = new FormData();
        form.append('image', payload);

        const { data, status } = await mediaServices.upload(form, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (event: ProgressEvent): void => {
                dispatch(updateProgress(Math.round((100 * event.loaded) / event.total)));
            },
        });
        if (status < 200 || status >= 300) throw new Error();
        return data;
    } catch (error) {
        errorNotif(error);
        throw new Error(error);
    }
});

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
        builder.addCase(mediaThunk.rejected, (state: IMediaState) => {
            state.status = 'error';
        });
    },
});

export const { updateProgress, resetUploads } = mediaSlice.actions;

export default mediaSlice.reducer;
