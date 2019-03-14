const Video = require('../modelos').Videos;

const getAll = () => Video.findAll();
const getById = id => Video.findById(id);
const addVideo = video => Video.create(video);
const updateVideo = video => Video.update(video, {
    where: {
        id: video.id
    }
});

const deleteVideo = video => {
    Video.findById(video.id).then((result) => {
        console.log(result);
        return Video.destroy({
                where: {
                    id: video.id
                }
            })
            .then((u) => {
                return result
            });

    });

}

module.exports = {
    getAll,
    getById,
    addVideo,
    updateVideo,
    deleteVideo
};