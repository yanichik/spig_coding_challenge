const SearchFilter = ({ handleTitleSearch }) => {
	return (
		<div>
			<form onSubmit={handleTitleSearch}>
				<label>
					Start Year:
					<input type="text" name="yearStart" placeholder="" />
				</label>
				<label>
					Start End:
					<input type="text" name="yearEnd" placeholder="" />
				</label>
				{/* <button type="submit">Filter by Year Range</button> */}
				<label>
					Title
					<input type="text" name="title" placeholder="" />
				</label>
				{/* <button type="submit">Filter by Title</button> */}
				<label>
					Author
					<input type="text" name="author" placeholder="" />
				</label>
				{/* <button type="submit">Filter by Author</button> */}
				<label>
					ISBN
					<input type="text" name="isbn" placeholder="" />
				</label>
				<button type="submit">Filter</button>
				{/* <button type="submit">Filter by ISBN</button> */}
			</form>
		</div>
	);
};

export default SearchFilter;
