import fs from "fs";
import path from "path";

const HIST_FILE_NAME = "history.json";

const ROOT_FOLDER = path.resolve(process.cwd());

const HISTORY_FILE = path.join(ROOT_FOLDER, HIST_FILE_NAME);

export const loadHistory = (): Record<string, unknown> => {
    if (!fs.existsSync(HISTORY_FILE)) {
        fs.writeFileSync(HISTORY_FILE, "{}");
        return {};
    }

    return JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
};

export const writeistory = (history: Record<string, unknown>): void => {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history));
};
