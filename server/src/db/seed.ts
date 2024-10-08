import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed(): Promise<void> {
	await db.delete(goalCompletions)
	await db.delete(goals)

	const result = await db
		.insert(goals)
		.values([
			{
				title: 'Exercise',
				desiredWeeklyFrequency: 3,
			},
			{
				title: 'Read 5 books',
				desiredWeeklyFrequency: 1,
			},
			{
				title: 'Meditate 30 minutes',
				desiredWeeklyFrequency: 1,
			},
			{
				title: 'Clean house',
				desiredWeeklyFrequency: 2,
			},
		])
		.returning()

	const startOfWeek = dayjs().startOf('week')

	await db.insert(goalCompletions).values([
		{ goalId: result[0].id, createdAt: startOfWeek.toDate() },
		{ goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
		{ goalId: result[2].id, createdAt: startOfWeek.add(2, 'day').toDate() },
		{ goalId: result[3].id, createdAt: startOfWeek.toDate() },
	])
}

seed().finally(() => {
	client.end()
})
