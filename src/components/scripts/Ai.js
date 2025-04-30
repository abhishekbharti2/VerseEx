import React, { useState, useEffect, useMemo } from 'react';
import '../styles/Ai.css';

const MissionDetails = ({ topicName }) => {
  const [missionData, setMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState('> System ready. Press [GENERATE ANALYSIS] to begin');
  const [analysisGenerated, setAnalysisGenerated] = useState(false);

  const missionDatabase = useMemo(() => [
    {
        "id": "ISRO004",
        "name": "PSLV-C37",
        "agency": "ISRO",
        "information": "Launched 104 satellites into space on a single rocket in February 2017, a record for the most satellites launched in one go.",
        "result": "Successful - All satellites were successfully deployed into their intended orbits.",
        "image": "https://img-cdn.thepublive.com/fit-in/1200x675/newsnation-english/media/post_attachments/images/2017/02/14/202885716-ISROsatellitelaunch.jpg",
        "details": "The PSLV-C37 mission was a significant milestone for the Indian Space Research Organisation (ISRO)...",
        "start": "2017-02-15",
        "end": "2017-02-15",
        "keyPoints": [
          "Record-breaking launch of 104 satellites",
          "Precise deployment of all satellites",
          "Demonstrated ISRO's multi-satellite launch capability"
        ],
        "precautions": [
          "Meticulous planning of deployment sequence",
          "Rigorous testing of separation mechanisms",
          "Careful payload integration"
        ]
      }
  ], []);

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        setLoading(true);
        const foundMission = missionDatabase.find(mission => 
          mission.name.toLowerCase().includes(topicName.toLowerCase()) ||
          mission.id.toLowerCase().includes(topicName.toLowerCase())
        );
        
        if (foundMission) {
          setMissionData(foundMission);
        } else {
          setError(`> ERROR: No mission found matching "${topicName}"`);
        }
      } catch (err) {
        setError('> SYSTEM ERROR: Failed to load mission data');
      } finally {
        setLoading(false);
      }
    };

    fetchMissionData();
  }, [topicName, missionDatabase]);

  const generateMissionAnalysis = () => {
    if (!missionData || isTyping) return;
    
    setIsTyping(true);
    setAnalysisGenerated(true);
    setDisplayText('> Initializing analysis...\n\n');
    
    const fullText = `> ANALYZING: ${missionData.name.toUpperCase()}\n\n` +
      `> STATUS: ${missionData.result}\n\n` +
      `> KEY ACHIEVEMENTS:\n${missionData.keyPoints?.map(p => ` • ${p}`).join('\n') || ' • Data unavailable'}\n\n` +
      `> PRECAUTIONS:\n${missionData.precautions?.map(p => ` • ${p}`).join('\n') || ' • Data unavailable'}\n\n` +
      (missionData.result.toLowerCase().includes('fail') ? 
        `> FAILURE ANALYSIS:\n${missionData.failureReasons?.map(f => ` • ${f}`).join('\n') || ' • Reason undetermined'}\n\n` : '') +
      `> SUMMARY:\n` +
      ` The ${missionData.name} mission ${missionData.result.toLowerCase().includes('success') ? 
        'was successful' : 'encountered failures'}.\n` +
      ` This ${missionData.agency} operation has contributed to ${missionData.name.includes('Moon') ? 'lunar' : 
        missionData.name.includes('Mars') ? 'Martian' : 'space'} exploration knowledge.\n\n` +
      `> ANALYSIS COMPLETE [${new Date().toLocaleTimeString()}]`;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  };

  if (loading) return <div className="terminal loading">> Loading mission database...</div>;
  if (error) return <div className="terminal error">{error}</div>;
  if (!missionData) return <div className="terminal not-found">> No mission data available</div>;

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="control close"></span>
          <span className="control minimize"></span>
          <span className="control expand"></span>
        </div>
        <div className="terminal-title">AI MISSION ANALYSIS TERMINAL</div>
      </div>
      <div className="terminal-content">
        <div className="typing-output">
          {displayText.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
          {isTyping && <span className="spinning-cursor">✦</span>}
        </div>
      </div>
      <button
        onClick={generateMissionAnalysis}
        disabled={isTyping}
        className={`terminal-btn ${isTyping ? 'disabled' : ''}`}
      >
        {analysisGenerated ? 'RE-RUN ANALYSIS' : 'GENERATE ANALYSIS'}
      </button>
    </div>
  );
};

export default MissionDetails;