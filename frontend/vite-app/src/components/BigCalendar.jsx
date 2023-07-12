import React from "react";
import PropTypes from "prop-types";
import { Calendar, Views, globalizeLocalizer } from "react-big-calendar";
import { DateTime } from "luxon";
import "react-big-calendar/lib/css/react-big-calendar.css";
import globalize from "globalize";
import EventComponent from "./EventComponent";

const localizer = globalizeLocalizer(globalize);
localizer.startOfWeek = function () {
	return this._weekStartsOn || 1; // Set Monday as the first day of the week
};

const BigCalendar = ({ bookings }) => {
	const transformedBookings = bookings.map((booking) => ({
		start: DateTime.fromISO(booking.startDate).toJSDate(),
		end: DateTime.fromISO(booking.endDate).toJSDate(),
		allDay: booking.mot ? false : true,
		title: booking.mot
			? `Customer: ${booking.Customer.firstName} ${booking.Customer.lastName} | Type: ${booking.Vehicle.type} Make: ${booking.Vehicle.make} Reg: ${booking.Vehicle.registration} | Repair: ${booking.repair} Diagnostic:${booking.diagnostic}`
			: `Customer: ${booking.Customer.firstName} ${booking.Customer.lastName} | Type: ${booking.Vehicle.type} Make: ${booking.Vehicle.make} Reg: ${booking.Vehicle.registration}`,
		resourceId: booking.mot ? "mot" : "workshop",
		tooltip: booking.mot
			? `Customer: ${booking.Customer.firstName} ${booking.Customer.lastName} - Vehicle: ${booking.Vehicle.make} Reg: ${booking.Vehicle.registration} - Mot:${booking.mot} Repair:${booking.repair} Diagnostic:${booking.diagnostic}`
			: `Customer: ${booking.Customer.firstName} Contact: ${booking.Customer.mobileNumber} Vehicle: ${booking.Vehicle.make} Reg: ${booking.Vehicle.registration} - Repair:${booking.repair} Diagnostic:${booking.diagnostic} Quote: ${booking.quote} parts: ${booking.parts} labour: ${booking.labour} complete? ${booking.complete}`,
	}));

	const resources = [
		{ id: "mot", title: "MOT" },
		{ id: "workshop", title: "Workshop" },
	];

	return (
		<div className="myCustomHeight">
			<Calendar
				localizer={localizer}
				events={transformedBookings}
				startAccessor="start"
				endAccessor="end"
				resources={resources}
				resourceIdAccessor="id"
				resourceTitleAccessor="title"
				defaultView={Views.WEEK}
				min={new Date(2021, 0, 1, 7, 0, 0)} // set the time window for the calendar
				max={new Date(2021, 0, 1, 20, 0, 0)}
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
			startDate: PropTypes.string.isRequired,
			endDate: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default BigCalendar;
