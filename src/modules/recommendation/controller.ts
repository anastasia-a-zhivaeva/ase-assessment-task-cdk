import { RecommendationRequest, RecommendationResponse } from "./models";
import { RecommendationMapper, RecommendationServiceFactory } from "./services";
import { supportedRecommendationServices } from "./supported-recommendation-services";

/**
 * In real implementation, recommendations are retrieved by workers that poll tasks from message queue,
 * update cache with recent recommendations and store them in the database
 * (the functionality of notifying a user when new recommendations are available is also possible)
 */
const recommendationServiceFactory = new RecommendationServiceFactory();
const recommendationMapper = new RecommendationMapper();

export async function getRecommendations(requestParams: RecommendationRequest): Promise<RecommendationResponse> {
    const recommendationsArrays = await Promise.all(
        supportedRecommendationServices.map(async serviceInfo => {
            try {
                const service = recommendationServiceFactory.createRecommendationService(serviceInfo.name, serviceInfo);
                const recommendations = await service.getRecommendation(requestParams);
                return recommendationMapper.toDto(serviceInfo.name, recommendations);
            } catch(error) {
                console.log(error);
                return [];
            }
        })
    );
    return {
        recommendations: recommendationsArrays.flat().sort((a, b) => a.priority < b.priority ? 1 : -1)
    };
}

