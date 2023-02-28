import { Box, Button, TextField } from "@mui/material";
const SearchFilter = ({ onFilter }) => {
	return (
		<div className="search-filter">
			<Box component="form" noValidate autoComplete="off" onSubmit={onFilter}>
				<TextField
					size="small"
					label="Start Year"
					type="number"
					name="yearStart"
					className="year"
					style={{ width: 100, margin: 5 }}
				/>
				<TextField
					size="small"
					label="End Year"
					type="number"
					name="yearEnd"
					className="year"
					style={{ width: 100, margin: 5 }}
				/>
				<TextField
					size="small"
					label="Title"
					type="text"
					name="title"
					className="title"
					style={{ width: 175, margin: 5 }}
				/>
				<TextField
					size="small"
					label="Author"
					type="text"
					name="author"
					className="author"
					style={{ width: 175, margin: 5 }}
				/>
				<TextField
					size="small"
					label="ISBN"
					type="text"
					name="isbn"
					className="isbn"
					style={{ width: 125, margin: 5 }}
				/>
				<Button
					type="submit"
					variant="contained"
					style={{ width: 100, margin: 5, height: 40 }}
				>
					Filter
				</Button>
			</Box>
		</div>
	);
};

export default SearchFilter;
