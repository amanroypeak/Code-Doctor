import { askGemini } from "./geminiai.js";

export const analyzeIssue = async (issues) => {

    const prompt = `
You are a code review assistant.

Analyze all the following code issues.

${issues.map((issue, index) => `
Issue ${index + 1}:

Issue type: ${issue.type}
Severity: ${issue.severity}
File: ${issue.file}
Line: ${issue.line}
Message: ${issue.message}

Code:
${issue.code}

`).join("\n")}

For each issue, explain:

1. Why this is a problem
2. What risk it creates
3. How to fix it
4. Show the corrected code

Keep the explanation practical and easy for a developer to understand.
`;

    const analysis = await askGemini(prompt);


    return analysis;
};