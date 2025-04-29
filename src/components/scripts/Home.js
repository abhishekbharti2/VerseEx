import '../styles/Home.css';
import React, { useEffect, useState } from 'react'

export default function Mission() {
    const [data, setData] = useState({})
    const [youtube, setYT] = useState({ "topic": "loading...", "video_link": "" })
    const [currshow, setCurr] = useState('')

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const response = await fetch("https://server-verseex.onrender.com/api/youtube");
                if (!response.ok) throw new Error("Failed to fetch missions");
                const item = await response.json();
                setData(item)
            } catch (error) {
                console.error("Error fetching missions:", error);
            }
        };
        fetchMissions();
    }, []);

    useEffect(() => {
        let i = 0;
        const inter = setInterval(() => {
            setYT(data.space_topics[i % (data.space_topics.length)])
            i++
        }, 3500);
        return () => { clearInterval(inter) }
    }, [data])

    return (
        <div className='verseex-home-container'>
            <div className='verseex-astronaut-container'>
                <img src='https://static.vecteezy.com/system/resources/previews/025/002/362/original/3d-astronaut-character-in-space-on-transparent-background-generative-ai-png.png' className='verseex-astronaut-img' alt='astronaut' />
            </div>
            <div className='verseex-content-container' >
                <h1 className='verseex-main-title'>VERSE EX</h1>
                <h1 className='verseex-subtitle'>EXPLORE THE UNIVERSE</h1>
                <p className='verseex-description'>Verse-EX is a learning platform Here you can learn Cosmology and research <br /> We provide latest information about space</p>
                <span className='verseex-yt-link'>{youtube.topic} <i htmlFor='verseex-hide-video' className='fa fa-youtube verseex-yt-icon' /></span>
                <label htmlFor='verseex-hide-video' className='verseex-watch-button' onClick={() => { setCurr(youtube.video_link) }} >Watch Video</label>
                <a href="/solar.html">3D Simulation</a>
            </div>
            <input type="checkbox" id="verseex-hide-video" className='verseex-video-checkbox' />
            <label className="verseex-video-container" htmlFor='verseex-hide-video' >
                <iframe src={currshow} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </label>
        </div>
    );
}