import { FastifyInstance } from "fastify";

import { getRecommendations } from "./controller";
import { RecommendationRequest } from "./models";

export function routes(fastify: FastifyInstance): void {
    fastify.post<{ Body: RecommendationRequest }>("/recommendation", async (request) => 
       getRecommendations(request.body)
    );
}