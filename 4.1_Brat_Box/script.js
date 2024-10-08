const bratbox = document.getElementById('bratbox');
let clickCount = 0;
let backgroundType = 'color';

const colors = ['#2208fd', '#f0ff00', '#e27294', '#846a32', '#a3d1bf'];
const images = ['Assets/bobby1.png', 'Assets/pic2.png', 'Assets/pic3.png', 'Assets/pic4.png'];
const videos = ['Assets/video.MP4', 'Assets/video3.mp4'];

function handleClick() {
    clickCount++;
    switch(backgroundType) {
        case 'color': 
            backgroundType = 'image';
            bratbox.style.backgroundImage = `url(${images[clickCount % images.length]})`;
            bratbox.style.backgroundColor = '';
            break;
        case 'image': 
            backgroundType = 'video';
            bratbox.innerHTML = `<video autoplay loop muted><source src="${videos[clickCount % videos.length]}" type="video/mp4"></video>bratbox`;
            bratbox.style.backgroundImage = '';
            break;
        case 'video':
            backgroundType = 'color';
            bratbox.innerHTML = 'bratbox';
            bratbox.style.backgroundColor = colors[clickCount % colors.length];
            break;
    }
}

bratbox.addEventListener('click', handleClick);