const videoService = require('../servicios/video');
const path = require('path');

function getVideos(req, res) {
	videoService.getAll()
		.then(data => res.send(data));
};

function getVideo(req, res) {
	videoService.getById(req.params.id)
		.then(data => res.send(data));
}

function addVideo(req, res){
	videoService.addVideo({
		name: req.params.name,
		video: req.params.name + path.extname(req.file.originalname)
    })
    .then(data => res.send(data));
};

function addVideoURL(req, res){
	videoService.addVideo({
        name: req.body.name,
        url: req.body.url,
    })
    .then(data => res.send(data));
};

function updateVideo(req, res) {
	videoService.updateVideo({
			id: req.body.id,
			name: req.body.name,
			url: req.body.url,
		})
		.then(data => res.send(data));
};

function deleteVideo(req, res) {
	res.send(videoService.deleteVideo({
		id: req.params.id
	}));
};


module.exports = {
	getVideos,
	getVideo,
	addVideo,
	updateVideo,
    deleteVideo,
    addVideoURL
}