const videoService = require('../servicios/video');
const path = require('path');
var fs = require('fs');

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

function updateVideoURL(req, res) {
	videoService.updateVideo({
			id: req.body.id,
			name: req.body.name,
			url: req.body.url,
		})
		.then(data => res.send(data));
};

function updateVideoName(req, res) {
	videoService.updateVideo({
			id: req.body.id,
			name: req.body.name,
		})
		.then(data => res.send(data));
};

function updateVideoNameVideo(req, res) {
	fs.unlink("./public/videos/" + req.params.video, function (err) {
		if (err) throw err;
		console.log('File deleted!');
	}); 
	videoService.updateVideo({
			id: req.params.id,
			name: req.params.name,
			video: req.params.name + path.extname(req.file.originalname)
		})
		.then(data => res.send(data));
};

function deleteVideo(req, res) {
	res.send(videoService.deleteVideo({
		id: req.params.id
	}));
	fs.unlink("./public/videos/" + req.params.video, function (err) {
		if (err) throw err;
		console.log('File deleted!');
	}); 
};

function deleteVideoURL(req, res) {
	res.send(videoService.deleteVideo({
		id: req.params.id
	}));
};


module.exports = {
	getVideos,
	getVideo,
	addVideo,
	updateVideoURL,
    deleteVideo,
	addVideoURL,
	deleteVideoURL,
	updateVideoName,
	updateVideoNameVideo
}