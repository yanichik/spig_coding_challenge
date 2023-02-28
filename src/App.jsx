import { useRef, useEffect, useState } from "react";
import { Grid, Stack, Card } from "@mui/material";
import "./App.css";
import SearchFilter from "./Components/SearchFilter";

function App() {
	const [books, setBooks] = useState([]);
	const [filteredBooks, setFilteredBooks] = useState([]);

	/*  
  Filters books according to 4 parameters (all optional): year range, title, author, and/or isbn.
  */
	const handleFilter = (e) => {
		e.preventDefault();
		const yearStart = parseInt(e.target[0].value);
		const yearEnd = parseInt(e.target[2].value);
		const titleSearched = e.target[4].value;
		const authorSearched = e.target[6].value;
		const isbnSearched = e.target[8].value;

		/* Filter chain: by year range, title, author, and isbn. */
		const filtered = books
			.filter(filterByYear(yearStart, yearEnd))
			.filter(
				(book) =>
					book.title &&
					book.title.toLowerCase().includes(titleSearched.toLowerCase())
			)
			.filter(
				(book) =>
					book.author &&
					book.author.toLowerCase().includes(authorSearched.toLowerCase())
			)
			.filter(filterByIsbn(isbnSearched));
		setFilteredBooks(() => filtered);
	};

	/* Callback function to filter by ISBN.
     If ISBN entered, filter by ISBN. Otherwise return all.
  */
	const filterByIsbn = (isbnSearched) => {
		return (book) => {
			if (isbnSearched) {
				return book.isbn.toString().includes(isbnSearched);
			}
			return true;
		};
	};

	/* Callback function to filter by year range.
     If yearStart and yearEnd blank, returns full array of books.
     If yearStart and not yearEnd, returns books authored including and after yearStart
     If yearEnd and not yearStart, returns books authored including and before yearEnd
  */
	const filterByYear = (yearStart, yearEnd) => {
		return (book) => {
			if (yearStart && yearEnd) {
				return book.year >= yearStart && book.year <= yearEnd;
			}
			if (yearStart && !yearEnd) {
				return book.year >= yearStart;
			}
			if (yearEnd && !yearStart) {
				return book.year <= yearEnd;
			}
			return true;
		};
	};
	/*
  Fetches books data from API and sets books state with data transformations.
  Fetch occurs only on initial load.
	 */
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
			<SearchFilter onFilter={handleFilter} />
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 2, sm: 8, md: 12, lg: 16 }}
			>
				{filteredBooks.length > 0 ? (
					filteredBooks.map((book) => (
						<Grid item xs={2} sm={4} md={4} key={Math.random()}>
							<Card variant="outlined">
								<div className="card-item">Title: {book.title}</div>
								<div className="card-item">Author: {book.author}</div>
								<div className="card-item">Year: {book.year}</div>
								<div className="card-item">ISBN: {book.isbn}</div>
							</Card>
						</Grid>
					))
				) : (
					<p className="no-books">No Books Match</p>
				)}
			</Grid>
		</div>
	);
}

export default App;
