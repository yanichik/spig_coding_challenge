import { useRef, useEffect, useState } from "react";
import "./App.css";
import Card from "./UI/Card";
import SearchFilter from "./UI/SearchFilter";

function App() {
	const [books, setBooks] = useState([]);
	const [filteredBooks, setFilteredBooks] = useState([]);
	const [isFiltered, setIsFiltered] = useState(false);
	const handleYrRange = (e) => {
		e.preventDefault();
		const yearStart = parseInt(e.target[0].value);
		const yearEnd = parseInt(e.target[1].value);
		console.log(yearStart, yearEnd);
		const filtered = books.filter(
			(book) => book.year >= yearStart && book.year <= yearEnd
		);
		setFilteredBooks(() => filtered);
		// SOLVE: books complete list only at initial fetch. if multiple filters applied, will not reflect accurate filter
	};
	const handleTitleSearch = (e) => {
		e.preventDefault();
		const titleSearched = e.target[0].value;
		const filtered = books.filter(
			(book) =>
				book.title &&
				book.title.toLowerCase().includes(titleSearched.toLowerCase())
		);
		setFilteredBooks(() => filtered);
	};
	const handleAuthorSearch = (e) => {
		e.preventDefault();
		const authorSearched = e.target[0].value;
		const filtered = books.filter(
			(book) =>
				book.author &&
				book.author.toLowerCase().includes(authorSearched.toLowerCase())
		);
		setFilteredBooks(() => filtered);
	};
	const handleIsbnSearch = (e) => {
		e.preventDefault();
		const isbnSearched = e.target[0].value;
		console.log(typeof books[0].isbn);
		const filtered = books.filter(
			(book) => book.isbn && book.isbn.toString().includes(isbnSearched)
		);
		setFilteredBooks(() => filtered);
	};
	useEffect(() => {
		const url = "/books";

		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const json = await response.json();
				console.log(json);
				setBooks((prev) =>
					[prev, ...json.body].map((book) => {
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
			{/* <form onSubmit={handleYrRange}>
				<label>
					Start Year:
					<input type="text" name="yearStart" placeholder="" />
				</label>
				<label>
					Start End:
					<input type="text" name="yearEnd" placeholder="" />
				</label>
				<button type="submit">Filter by Year Range</button>
			</form> */}
			{/* <form onSubmit={handleTitleSearch}>
				<label>
					Title
					<input type="text" name="title" placeholder="" />
				</label>
				<button type="submit">Filter by Title</button>
			</form> */}
			<SearchFilter handleTitleSearch={handleTitleSearch} />
			{/* <form onSubmit={handleAuthorSearch}>
				<label>
					Author
					<input type="text" name="author" placeholder="" />
				</label>
				<button type="submit">Filter by Author</button>
			</form> */}
			{/* <form onSubmit={handleIsbnSearch}>
				<label>
					ISBN
					<input type="text" name="isbn" placeholder="" />
				</label>
				<button type="submit">Filter by ISBN</button>
			</form> */}
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
