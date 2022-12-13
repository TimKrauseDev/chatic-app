import React from 'react';

import Image from 'react-bootstrap/Image';

import chatImg from 'images/international-chat.svg';

const Home = () => {
	return (
		<section className="homepage-wrapper">
			<h1>Welcome to Chatic</h1>
	        	<Image 
					alt="international chat" 
					src={chatImg}
				/>
		</section>
	);

}

export default Home;