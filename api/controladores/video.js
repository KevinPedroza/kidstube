const videoService = require('../servicios/video');

function getVideos(req, res) {
	videoService.getAll()
		.then(data => res.send(data));
};

function getVideo(req, res) {
	videoService.getById(req.params.id)
		.then(data => res.send(data));
}

function addVideoURL(req, res) {
	videoService.addVideo({
			nombre: req.body.nombre,
			url: req.body.url,
		})
		.then(data => res.send(data));
};

function addVideo(req, res){
	videoService.addVideo({
        nombre: req.body.nombre,
        url: req.body.url,
    })
    .then(data => res.send(data));
};

function updateVideo(req, res) {
	videoService.updateVideo({
			id: req.body.id,
			nombre: req.body.nombre,
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