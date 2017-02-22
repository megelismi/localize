import React from 'react'; 
import { hashHistory } from 'react-router';
import Video from 'react-html5video';
import ReactPlayer from 'react-player';
import DriveIn from 'react-drive-in';

class LandingPage extends React.Component {
	render () {
		 let playlist = [
        [
            'https://res.cloudinary.com/megelismi/video/upload/v1487715834/Pad-Thai_ilphlo.mp4',
        ],
        [
            'http://res.cloudinary.com/megelismi/video/upload/v1487717643/559551522_djptrh.mp4',
        ]
    ];

    let onTimeFrequency = 50;

		return (
			<div>
				<button onClick={() => {hashHistory.push('/map/portland')}}>get started with Portland, Maine</button>
				 <DriveIn
        showPlaylist={playlist}
        onTimeFrequency = {onTimeFrequency}
        />
			</div>
		)
	}
}

export default LandingPage;

//http://res.cloudinary.com/megelismi/video/upload/v1487717320/Healthy-Life_gehvzt.mp4 

	//<ReactPlayer url='../../assets/videos/Pad-Thai/WEBM/Pad-Thai.webm' playing />

			// <Video autoPlay loop muted
   //          onCanPlayThrough={() => {
   //              console.log('stuff')
   //          }}>
   //          <source src="http://res.cloudinary.com/megelismi/video/upload/v1487715834/Pad-Thai_ilphlo.mp4" type="video/mp4" />
   //      </Video>

   //<ReactPlayer loop={true} url='http://res.cloudinary.com/megelismi/video/upload/v1487715834/Pad-Thai_ilphlo.mp4' playing />