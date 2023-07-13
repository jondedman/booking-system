import React, { useState } from "react";
import PropTypes from "prop-types";

const EventComponent = ({ event }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const handleMouseEnter = () => {
		setShowTooltip(true);
	};

	const handleMouseLeave = () => {
		setShowTooltip(false);
	};

	const getTitleStyle = () => {
		if (showTooltip) {
			return { height: "20%" };
		}
		return null;
	};

	return (
		<div
			className="event-container"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="title" style={getTitleStyle()}>
				{event.title}
			</div>
			{showTooltip && <div className="tooltip">{event.tooltip}</div>}
		</div>
	);
};

EventComponent.propTypes = {
	event: PropTypes.object.isRequired,
};

export default EventComponent;
