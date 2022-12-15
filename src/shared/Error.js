import { Button, Snackbar } from "@mui/material";
import React, { useState } from "react";

const Error = ({ classes, error }) => {
	const [open, setOpen] = useState(true);

	return (
		<Snackbar
			open={open}
			className="m-10"
			message={error.message}
			action={
				<Button onClick={() => setOpen(false)} color="secondary" size="small">
					Close
				</Button>
			}
		/>
	);
};

export default Error;
