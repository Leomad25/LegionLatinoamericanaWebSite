const videos = document.querySelectorAll('video');
for (i=0; i<videos.length; i++) {
    videos[i].disablePictureInPicture = true;
}