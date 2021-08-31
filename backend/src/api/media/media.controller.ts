import errorWrapper from '../../utils/errorWrapper';

export const uploadMediaController = errorWrapper(async (req, res) => {
    res.send({ url: req.file.filename });
});

export const getMediaController = errorWrapper(async (req, res) => {
    res.sendFile(req.params.fileName, { root: 'uploads' });
});
