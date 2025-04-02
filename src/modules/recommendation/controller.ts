import { RecommendationDtoMapper, service1Mapper, service2Mapper } from "./mappers";
import { RecommendationRequest, RecommendationResponse } from "./models";
import { RecommendationAggregatorService, RecommendationServiceFactory } from "./services";

/**
 * In real implementation, recommendations are retrieved by workers that poll tasks from message queue,
 * update cache with recent recommendations and store them in the database
 * (the functionality of notifying a user when new recommendations is also possible)
 */
const recommendationServiceFactory = new RecommendationServiceFactory();
const recommendationAggregator = new RecommendationAggregatorService(recommendationServiceFactory);
const recommendationDtoMapper = new RecommendationDtoMapper();

// Register service mappers
recommendationDtoMapper.registerMapper("service1", service1Mapper);
recommendationDtoMapper.registerMapper("service2", service2Mapper);

export async function getRecommendations(requestParams: RecommendationRequest): Promise<RecommendationResponse> {
    const serviceRecommendations = await recommendationAggregator.getRecommendations(requestParams);
    const recommendations = recommendationDtoMapper.toDtos(serviceRecommendations);
    
    return {
        recommendations
    };
}

