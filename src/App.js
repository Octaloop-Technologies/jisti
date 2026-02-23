import React, { useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

function App() {
  const [showMeeting, setShowMeeting] = useState(true);

  return (
    <div style={{ 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      
      <h1 style={{ marginBottom: '20px' }}>
        Simple Jitsi Meeting
      </h1>

      {showMeeting && (
        <JitsiMeeting
          domain="meet.jit.si"
          roomName="public-meeting-123"
          userInfo={{
            displayName: 'Guest'
          }}
          configOverwrite={{
            prejoinPageEnabled: false,
            startWithAudioMuted: true,
            startWithVideoMuted: true,
            disableDeepLinking: true
          }}
          interfaceConfigOverwrite={{
            TOOLBAR_BUTTONS: [
              'microphone',
              'camera',
              'hangup',
              'chat',
              'tileview'
            ],
            HIDE_INVITE_BUTTON: true,
            DISABLE_INVITE_FUNCTIONS: true,
            HIDE_BREAKOUT_ROOMS: true,
            SHOW_PARTICIPANTS_PANE: false
          }}
          getIFrameRef={(node) => {
            node.style.height = '600px';
            node.style.width = '100%';
            node.style.border = 'none';
            node.style.borderRadius = '8px';
          }}
          onApiReady={(api) => {
            api.executeCommand('displayName', 'Guest');

            // ✅ Modern event (no redirect)
            api.on('readyToClose', () => {
              setShowMeeting(false);  // Just remove meeting from screen
            });
          }}
        />
      )}

      {!showMeeting && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f2f2f2',
          borderRadius: '8px'
        }}>
          <h2>Meeting Closed</h2>
        </div>
      )}

    </div>
  );
}

export default App;