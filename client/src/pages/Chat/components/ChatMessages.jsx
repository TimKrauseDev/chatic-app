import { format } from 'date-fns';
import SVG from 'react-inlinesvg';
import { useQuery } from '@tanstack/react-query';

import Button from 'react-bootstrap/Button';

import AvatarBlank from 'images/svgs/AvatarBlank';
import EditIcon from 'images/svgs/EditIcon';

import userAPI from 'utils/apis/userAPI';
import { useAuth } from 'utils/hooks/useAuth';

const DisplayCurrentUserChatMessages = ({messages, time, setEditMessageIsActive, setEditMessage}) => {
	return (
		<div>
			{ messages.map( message => {
			
				return (
				        <div key={message.id} className="message-item user" >
		            		<Button 
		            			variant="my-2"
		            			tabIndex={0}
		            			onClick={() => {
		            				setEditMessageIsActive(true);
		            				setEditMessage(message)
		            			}}
		            		>
					        	<EditIcon />
		        			</Button>
							<p className="small p-2 mb-1 text-dark rounded-3 bg bg-opacity-25 ms-4 bg-success">{message.content}</p>
				        </div>
		        );
			}) }
        	<p className="smaller ms-4 justify-content-end mb-3 rounded-3 text-muted d-flex">{format(time, 'HH:mm')}</p>
	  	</div>  
	);	
}

const DisplayNonCurrentUserChatMessages = ({messages, time }) => {
	return (
		<div>
			{ messages.map( message => {
			
				return (
			        <div key={message.id} className="message-item">
						<p className="small p-2 mb-1 text-dark rounded-3 bg bg-opacity-25 me-4 bg-secondary">{message.content}</p>
			        </div>
		        );
			}) }
        	<p className="smaller me-4 justify-content-start mb-3 rounded-3 text-muted d-flex">{format(time, 'HH:mm')}</p>
	  	</div>  
	);	
}


const ChatMessages = ({ messages, setEditMessageIsActive, setEditMessage }) => {
	const { user } = useAuth();
	const isCurrentUser = messages.userId === user;
	const roomAvatarIdToSvgMap = useQuery(['roomUsers'], userAPI.fetchAvatarMap);
	const avatarSvg = roomAvatarIdToSvgMap.data?.get(messages.userId);

	if (isCurrentUser) return (
		<div className="d-flex flex-row justify-content-end mb-4 pt-1">
			<DisplayCurrentUserChatMessages 
				messages={messages.messages}
				time={messages.createdAt}
				setEditMessageIsActive={setEditMessageIsActive}
				setEditMessage={setEditMessage}
			/>
	      	<div className="ms-2">
        		{avatarSvg && <SVG src={avatarSvg} width={45} height={45}/>}
        		{!avatarSvg && <AvatarBlank width={45} height={45}/>}
	      	</div>
		</div>	
    );

	return (
		<div className="d-flex flex-row justify-content-start mb-4 pt-1">
	      	<div className="me-2">
        		{avatarSvg && <SVG src={avatarSvg} width={45} height={45}/>}
        		{!avatarSvg && <AvatarBlank width={45} height={45}/>}
	      	</div>

			<DisplayNonCurrentUserChatMessages 
				messages={messages.messages}
				time={messages.createdAt}
			/>
		</div>	
    );
	
    
}

export default ChatMessages;