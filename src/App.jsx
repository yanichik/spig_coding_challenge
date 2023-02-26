import { useEffect, useState } from "react";
import "./App.css";
import Card from "./UI/Card";

function App() {
	const [books, setBooks] = useState([]);
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [yearRange, setYearRange] = useState([]);
	const filterBksByYearRange = () => {
		// SOLVE: books complete list only at initial fetch. if multiple filters applied, will not reflect accurate filter
		setFilteredBooks(() =>
			books.filter(
				(book) => book.year >= yearRange[0] && book.year <= yearRange[1]
			)
		);
	};
	const handleYrRange = (e) => {
		e.preventDefault();
		const yearStart = parseInt(e.target[0].value);
		const yearEnd = parseInt(e.target[1].value);
		console.log(yearStart, yearEnd);
		setYearRange(() => [yearStart, yearEnd]);
		filterBksByYearRange();
	};
	useEffect(() => {
		const url = "/books";

		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const json = await response.json();
				console.log(json);
				setBooks(() =>
					[...json.body].map((book) => {
						return {
							title: book.title,
							author: book.author,
							year: parseInt(book.year),
							isbn: parseInt(book.isbn),
						};
					})
				);
			} catch (error) {
				console.log("error", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="App">
			<h1>ServicePros Coding Challenge</h1>
			<form onSubmit={handleYrRange}>
				<label>
					Start Year:
					<input type="text" name="yearStart" placeholder="" />
				</label>
				<label>
					Start End:
					<input type="text" name="yearEnd" placeholder="" />
				</label>
				<button type="submit">Filter by Year</button>
			</form>
			<ul>
				{filteredBooks.length > 0 ? (
					filteredBooks.map((book) => (
						<Card key={Math.random()}>
							<li>
								<div>Title: {book.title}</div>
								<div>Author: {book.author}</div>
								<div>Year: {book.year}</div>
								<div>ISBN: {book.isbn}</div>
							</li>
						</Card>
					))
				) : (
					<p>No Books Filtered</p>
				)}
			</ul>
		</div>
	);
}

export default App;
