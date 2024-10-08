import React, { useState, useRef, useEffect } from 'react';

const BratBox = () => {
    const [clickCount ,setClickCount] = useState(0);
    const [backgroundType, setBackgroundType] = useState('color');

        const colors = [
            '#2208fd', 
            '#f0ff00', 
            '#e27294', 
            '#846a32', 
            '#a3d1bf'  ]
        
        const images = [
           'Assets/bobby1.png', 
           'Assets/pic2.png', 
           'Assets/pic3.png', 
           'Assets/pic4.png']

        const videos = [
            'Assets/video.MP4', 
            'Assets/video2.MOV', 
            'Assets/video3.mp4'
            
        ]


};