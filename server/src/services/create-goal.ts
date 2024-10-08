import { db } from '../db'
import { goals } from '../db/schema'
import type { ICreateGoalRequest } from './dtos/createGoalRequest'
export async function createGoalService({
	title,
	desiredWeeklyFrequency,
}: ICreateGoalRequest) {
	const result = await db
		.insert(goals)
		.values({
			title,
			desiredWeeklyFrequency,
		})
		.returning()

	const goal = result[0]

	return {
		goal,
	}
}
