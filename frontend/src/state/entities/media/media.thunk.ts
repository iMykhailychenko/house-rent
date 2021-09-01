import { createAsyncThunk } from '@reduxjs/toolkit';

import { mediaServices } from './media.services';

export const mediaThunk = createAsyncThunk<void, File>('MEDIA/UPLOAD', async (payload: File) => {
    const form = new FormData();
    form.append('image', payload);
    const { data, status } = await mediaServices.upload(form);
    if (status < 200 || status >= 300) throw new Error();
});
