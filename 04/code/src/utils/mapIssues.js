export function mapIssues(issues = []) {
    const out = {};
    for (const issue of issues) {
      const key = issue.path?.[0]?.key ?? issue.path?.[0] ?? "form";
      if (!out[key]) out[key] = issue.message;
    }
    return out;
  }
  