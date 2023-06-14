// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// changed syntax to make it compatible with jest
const { render, screen } = require("@testing-library/react");
const App = require("./App").default;

test("renders learn react link", () => {
	render(App());
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
