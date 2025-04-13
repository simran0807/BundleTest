# BundleTest
1. What did you choose to mock the API and why?
I chose to mock the API using in-memory JavaScript logic with setTimeout and setInterval, instead of using tools like msw or axios-mock-adapter. This approach allowed me to:

Simulate delayed task processing (5–10 seconds),

Control outcomes (e.g. success, failure),

Keep everything self-contained and lightweight.

2. If you used an AI tool, what parts did it help with?
I used AI to help with:

Structuring the React + TypeScript app layout,

Writing the custom usePollingTask hook,

Debugging issues around hook misuse (invalid hook call).

3. What tradeoffs or shortcuts did you take?
I skipped setting up msw or a more formal mocking framework to save setup time.

I didn’t persist task states to localStorage or a database — so refresh clears the task list.

Polling logic is global (via a single hook), but not scoped per task or wrapped in a full data-fetching lib (like React Query).

4. What would you improve or add with more time?
✅ Add unit tests for file validation and polling behavior.

✅ Use React Query or SWR for built-in polling, caching, and retries.

🌀 Add animated status indicators (spinner, checkmark, error icon).

5. What was the trickiest part and how did you debug it?
The trickiest part was the “Invalid hook call” error due to mistakenly calling usePollingTask(...) inside the handleSubmit() callback.

To debug this:

I read the full error stack trace,

Used the React error link for guidance,

Realized the mistake: hooks must be called at the top level of components or custom hooks,

Refactored usePollingTask to return a startPolling() function instead.

Another tricky issue was ensuring cancelled tasks didn't keep polling — I resolved this by tracking cancelled task IDs with a Set and cleaning up intervals.


