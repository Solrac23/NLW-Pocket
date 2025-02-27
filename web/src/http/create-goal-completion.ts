export async function createGoalCompletion(goalId: string): Promise<void> {
	await fetch('http://localhost:3333/goal-completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			goalId,
		}),
	})
}
