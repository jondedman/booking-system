import React, { useState } from "react";
import axios from "axios";

function Quotes() {
	const [quote, setQuote] = useState({ text: "", author: "" });

	function getQuote() {
		const url = "http://localhost:8080/";
		axios.get(url).then((response) => {
			const { text, author } = response.data;
			setQuote({ text, author });
		});
	}

	return (
		<div>
			<button onClick={getQuote}>Generate Quote</button>
			<h1>{quote.text}</h1>
			<h3>{"-" + quote.author}</h3>
		</div>
	);
}

export default Quotes;
