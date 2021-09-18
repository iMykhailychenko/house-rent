import errorWrapper from '../../utils/errorWrapper';

export const uploadMediaController = errorWrapper(async (req, res) => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:8000';
    res.send({ url: baseUrl + '/media/' + req.file?.filename });
});

export const getMediaController = errorWrapper(async (req, res) => {
    res.sendFile(req.params.fileName, { root: 'uploads' });
});
