import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalService } from '../../services/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
	app.post(
		'/goals',
		{
			schema: {
				body: z.object({
					title: z.string(),
					desiredWeeklyFrequency: z.number().int().min(1).max(7),
				}),
			},
		},
		async (request, reply) => {
			const { title, desiredWeeklyFrequency } = request.body

			await createGoalService({
				title,
				desiredWeeklyFrequency,
			})
		}
	)
}
