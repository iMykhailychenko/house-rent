import errorWrapper from '../../utils/errorWrapper';

export const uploadMediaController = errorWrapper(async (req, res) => {
    res.send({ url: process.env.BASE_URL + '/media/' + req.file.filename });
});

export const getMediaController = errorWrapper(async (req, res) => {
    res.sendFile(req.params.fileName, { root: 'uploads' });
});
