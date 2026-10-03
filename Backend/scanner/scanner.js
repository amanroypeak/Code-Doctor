import fs from "fs";
import path from "path";

export const scanFolder = function (folderpath) {

    const issues = [];

    const read = fs.readdirSync(folderpath);

    read.forEach((item) => {

        const joined = path.join(folderpath, item);
        if (item === "node_modules" || item === ".git") {
            return;
        }

        const which = fs.statSync(joined);

        if (which.isFile()) {

            console.log("File:", joined);

            if (item === ".env") {
                issues.push({
                    file: joined,
                    line: 1,
                    type: "env-file-exposure",
                    severity: "high",
                    message: "Environment file found in uploaded project"
                });
            }
            const allowedExtensions = [
                ".js",
                ".jsx",
                ".ts",
                ".tsx",
                ".json"
            ];

            const extension = path.extname(item)
            if (!allowedExtensions.includes(extension) && item !== ".env") {
                return;
            }


            const code = fs.readFileSync(joined, "utf-8");

            const lines = code.split(/\r?\n/);

            lines.forEach((item, index) => {

                if (item.includes("console.log(")) {

                    issues.push({
                        file: joined,
                        line: index + 1,
                        type: "console.log",
                        severity: "low",
                        message: "Remove console.log in production",
                        code: item.trim()
                    });

                }

                if (
                    item.match(/password\s*=\s*["'][^"']+["']/i) ||
                    item.match(/apiKey\s*=\s*["'][^"']+["']/i) ||
                    item.match(/secret\s*=\s*["'][^"']+["']/i)
                ) {

                    issues.push({
                        file: joined,
                        line: index + 1,
                        type: "secret-key-exposure",
                        severity: "high",
                        message: "Possible hardcoded secret",
                        code: item.trim()
                    });

                }
                if (item.includes("eval(")) {
                    issues.push({
                        file: joined,
                        line: index + 1,
                        type: "eval-usage",
                        severity: "high",
                        message: "Avoid eval() because it can execute dynamic code",
                        code: item.trim()
                    });
                }
                if (item.match(/\bTODO\b|\bFIXME\b/i)) {
                    issues.push({
                        file: joined,
                        line: index + 1,
                        type: "todo-fixme",
                        severity: "low",
                        message: "Pending TODO/FIXME comment found",
                        code: item.trim()
                    });
                }
                if (item.trim().startsWith("catch") && item.includes("{")) {
                    const nextLine = lines[index + 1]?.trim();

                    if (nextLine === "}") {
                        issues.push({
                            file: joined,
                            line: index + 1,
                            type: "empty-catch",
                            severity: "medium",
                            message: "Empty catch block found",
                            code: item.trim()
                        });
                    }
                }

            });

        }

        else if (which.isDirectory()) {

            issues.push(...scanFolder(joined));

        }

    });

    return issues;
};

