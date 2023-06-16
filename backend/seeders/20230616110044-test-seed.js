// Seed users
console.log("Seeding users...");
const usersData = [];
for (let i = 0; i < 5; i++) {
	usersData.push({
		username: faker.internet.userName(),
		email: faker.internet.email(),
		password: "12345678",
	});
}
await User.bulkCreate(usersData);

// Seed customers
console.log("Seeding customers...");
const customersData = [];
const users = await User.findAll();
for (const user of users) {
	const customerCount = faker.datatype.number({ min: 1, max: 3 });
	for (let i = 0; i < customerCount; i++) {
		const customer = await Customer.create({
			userId: user.id,
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			mobileNumber: faker.phone.phoneNumber(),
			address: faker.address.streetAddress(),
			dateAdded: new Date(),
		});
		customersData.push(customer);
	}
}

// Seed cars
console.log("Seeding cars...");
const carsData = [];
const customers = await Customer.findAll();
for (const customer of customers) {
	const carCount = faker.datatype.number({ min: 1, max: 5 });
	for (let i = 0; i < carCount; i++) {
		const car = await Car.create({
			customerId: customer.id,
			make: faker.vehicle.manufacturer(),
			model: faker.vehicle.model(),
			year: faker.datatype.number({ min: 2000, max: 2023 }),
			color: faker.commerce.color(),
			registration: faker.vehicle.vrm(),
			lastMot: faker.datatype.number({ min: 2020, max: 2023 }),
			userId: customer.User.id,
		});
		carsData.push(car);
	}
}

// Seed bookings
console.log("Seeding bookings...");
const bookingsData = [];
const cars = await Car.findAll();
for (const car of cars) {
	const bookingCount = faker.datatype.number({ min: 1, max: 3 });
	for (let i = 0; i < bookingCount; i++) {
		const booking = await Booking.create({
			carId: car.id,
			startDate: faker.date.future(),
			endDate: faker.date.future(),
			userId: car.Customer.User.id,
			customerId: car.Customer.id,
		});
		bookingsData.push(booking);
	}
}
