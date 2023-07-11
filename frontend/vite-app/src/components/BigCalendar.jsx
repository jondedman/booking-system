import React from "react";
import PropTypes from "prop-types";
import { Calendar, globalizeLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import globalize from "globalize";
import EventComponent from "./EventComponent";

const localizer = globalizeLocalizer(globalize);
// consider changing default view to week

const BigCalendar = ({ bookings }) => {
	const transformedBookings = bookings.map((booking) => ({
		start: new Date(booking.date),
		end: new Date(booking.date),
		allDay: true,
		title: `Customer: ${booking.Customer.firstName} ${booking.Customer.lastName} - Vehicle: ${booking.Vehicle.make} Reg: ${booking.Vehicle.registration} - Mot:${booking.mot} Repair:${booking.repair} Diagnostic:${booking.diagnostic}`,
		tooltip: `Customer contact: ${booking.Customer.mobileNumber} Quote: £${booking.quote} - Parts: £${booking.parts} Labour: £${booking.labour} Booked by: ${booking.User.username} `, // create a tooltip property displayed on hover.
		resource: booking.mot
			? "Mot"
			: booking.repair
			? "Repair"
			: booking.diagnostic
			? "Diagnostic"
			: "Other",
		// Include other required properties from your 'bookings' object
	}));

	return (
		<div className="myCustomHeight">
			<Calendar
				localizer={localizer}
				events={transformedBookings}
				startAccessor="start"
				endAccessor="end"
				components={{
					event: EventComponent,
				}}
			/>
		</div>
	);
};

BigCalendar.propTypes = {
	bookings: PropTypes.arrayOf(
		PropTypes.shape({
			date: PropTypes.string.isRequired,
			// Include other required properties from your 'bookings' object
		})
	).isRequired,
};

export default BigCalendar;
