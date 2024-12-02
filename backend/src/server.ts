import express, { type Request, type Response } from "express";
import bodyParser from "body-parser";

// Create the Express app
const app = express();
app.use(bodyParser.json());

// Define a User type
type User = {
	email: string;
	password: string;
	dob: string;
};

// Temporary in-memory "database"
const users: User[] = [];

interface RegisterRequestBody {
	email: string; // The user's email address
	password: string; // The user's password
	dob: string; // The user's date of birth (format: YYYY-MM-DD)
}
// Route to register a new user
app.post(
	"/register",
	(req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
		const {
			email,
			password,
			dob,
		}: { email: string; password: string; dob: string } = req.body;

		// Add the new user to the in-memory database
		users.push({ email, password, dob });
		res.json({ success: true });
	}
);

interface GenerateProofRequestBody {
	email: string; // The user's email address
	cutoffDate: string; // The cutoff date against which the proof is generated
}
// Route to generate a ZKP proof (dummy implementation for now)
app.post(
	"/generate-proof",
	(req: Request<{}, {}, GenerateProofRequestBody>, res: Response) => {
		const { email, cutoffDate } = req.body;

		const user = users.find((u) => u.email === email);
		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		res.json({ proof: `Proof for ${email} against ${cutoffDate}` });
	}
);

interface ValidateProofRequestBody {
	proof: string; // The zero-knowledge proof submitted by the user
}
// Route to validate a proof (dummy implementation for now)
app.post(
	"/validate-proof",
	(req: Request<{}, {}, ValidateProofRequestBody>, res: Response) => {
		const { proof }: { proof: string } = req.body;

		// Always return true for now
		res.json({ valid: true });
	}
);

// Start the server
app.listen(3000, () => console.log("API running on http://localhost:3000"));
