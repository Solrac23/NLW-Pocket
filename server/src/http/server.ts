import fastify from 'fastify'
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createGoalCompletionRoute } from './routes/create-goal-completion'
import { getPengingGoalRoute } from './routes/get-pending-goal'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
	origin: '*',
	methods: 'GET, POST, PUT, DELETE',
	allowedHeaders: ['Origin', 'Content-Type', 'Authorization'],
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getPengingGoalRoute)
app.register(getWeekSummaryRoute)

async function bootstrap() {
	try {
		await app.listen({
			port: 3333,
		})
		console.log('Server is running at http://localhost:3333')
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

bootstrap()
