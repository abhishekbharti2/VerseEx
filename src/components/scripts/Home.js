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
        <div id='home-container'>
            <div id='home-img'>
                <img src='https://static.vecteezy.com/system/resources/previews/025/002/362/original/3d-astronaut-character-in-space-on-transparent-background-generative-ai-png.png' className='astronaut-img' alt='' />
            </div>
            <div id='home-heading' >
                <h1>VERSE EX</h1>
                <h1>EXPLORE THE UNIVERSE</h1>
                <p>Verse-EX is a learning platform Here you can learn Cosmology and research <br /> We provide latest information about sapce</p>
                <span className='yt-links'>{youtube.topic} <i htmlFor='Hide-Video' className='fa fa-youtube' /></span>
                <label htmlFor='Hide-Video' className='head-button' onClick={() => { setCurr(youtube.video_link) }} >Watch Video</label>
            </div>
            <input type="checkbox" id="Hide-Video" />
            <label className="video-cont" htmlFor='Hide-Video' >
                <iframe src={currshow} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </label>
        </div>
    );
}   
