
import { readFileSync } from "fs";
import path from "path";

export function loadTextFileSync(filePath: string) {
	try {
		const absolutePath = path.isAbsolute(filePath)
			? filePath
			: path.resolve(process.cwd(), filePath);

		const content = readFileSync(absolutePath, "utf-8");

		return content;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Échec du chargement du fichier "${filePath}": ${error.message}`);
		}
		throw error;
	}
}

