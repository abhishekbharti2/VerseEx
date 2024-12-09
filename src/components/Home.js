import './Home.css';
import React from 'react'
import myVideo from '../DataSet/vid-3.mp4';
export default function Mission() {
    return (
        <div id='home-container'>
            <video autoPlay muted loop>
                <source src={myVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div id='home-img'>
                <img src='https://static.vecteezy.com/system/resources/previews/025/002/362/original/3d-astronaut-character-in-space-on-transparent-background-generative-ai-png.png' className='astronaut-img' alt='' />
            </div>
            <div id='home-heading' >
                <h1>VERSE EX</h1>
                <h1>EXPLORE THE UNIVERSE</h1>
                <p>Verse-EX is a learning platform Here you can learn Cosmology and research <br /> We provide latest information about sapce</p>
                <label htmlFor='Hide-Video' className='head-button' >Let's Explore</label>
                <strong className='keyword'>Verse-EX: Space Exploration</strong>
            </div>
            <input type="checkbox" id="Hide-Video" />
            <label className="video-cont" htmlFor='Hide-Video' >
                {/* <label htmlFor="Hide-Video">&#10006;</label> */}
                <iframe src="https://www.youtube.com/embed/5mDn2oq9OV8?si=VNT6V-qcjvN1F2_f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </label>
        </div>
    );
}   