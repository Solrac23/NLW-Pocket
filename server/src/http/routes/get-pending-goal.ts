import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPedingGoalsService } from '../../services/get-week-pending-goals'

export const getPengingGoalRoute: FastifyPluginAsyncZod = async app => {
	app.get('/pending-goals', async () => {
		const { pendingGoals } = await getWeekPedingGoalsService()

		return {
			pendingGoals,
		}
	})
}
