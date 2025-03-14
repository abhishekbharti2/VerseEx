import '../styles/Home.css';
import React, { useEffect, useState } from 'react'
import YtLinks from '../../DataSet/YtLinks.json';

export default function Mission() {

    const [ytLink, setYT] = useState('https://youtube.com/embed/YSnbDp44GDs');
    const [ytTitle, setYttitle] = useState('Formation of Universe')
    const [ytLi, setYtLink] = useState(null)

    useEffect(() => {
        let i = 1;
        const inter = setInterval(() => {
          setYttitle(YtLinks.space_topics[i%10].topic)
          setYT(YtLinks.space_topics[i%10].video_link)
          i++
        }, 3500);
        return () => { clearInterval(inter) }
    }, [])
 
    return (
        <div id='home-container'>
            <div id='home-img'>
                <img src='https://static.vecteezy.com/system/resources/previews/025/002/362/original/3d-astronaut-character-in-space-on-transparent-background-generative-ai-png.png' className='astronaut-img' alt='' />
            </div>
            <div id='home-heading' >
                <h1>VERSE EX</h1>
                <h1>EXPLORE THE UNIVERSE</h1>
                <p>Verse-EX is a learning platform Here you can learn Cosmology and research <br /> We provide latest information about sapce</p>
                <span className='yt-links'>{ytTitle} <i htmlFor='Hide-Video'  className='fa fa-youtube' /></span>
                <label htmlFor='Hide-Video' className='head-button' onClick={() => {setYtLink(ytLink)}} >Watch Video</label>
            </div>
            <input type="checkbox" id="Hide-Video" />
            <label className="video-cont" htmlFor='Hide-Video' >
                <iframe src={ytLi} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </label>
        </div>
    );
}   
