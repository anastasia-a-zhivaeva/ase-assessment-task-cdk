import { RecommendationDto } from "../models";
import { Service1Recommendation } from "./recommendation-service1.service";
import { Service2Recommendation } from "./recommendation-service2.service";

/**
 * RecommendationMapper transforms service-specific recommendation models into DTOs
 */
export class RecommendationMapper {
    /**
     * Maps service-specific recommendations to DTOs
     */
    public toDto(serviceName: string, recommendations: unknown): Array<RecommendationDto> {
        if (!Array.isArray(recommendations)) {
            return [];
        }

        switch (serviceName) {
            case "service1":
                return this.fromService1(recommendations as Array<Service1Recommendation>);
            case "service2":
                return this.fromService2(recommendations as Array<Service2Recommendation>);
            default:
                return [];
        }
    }

    /**
     * Maps Service1 recommendations to DTOs
     */
    private fromService1(recommendations: Array<Service1Recommendation>): Array<RecommendationDto> {
        return recommendations.map(recommendation => ({
            priority: recommendation.confidence * 1000,
            title: recommendation.recommendation
        }));
    }

    /**
     * Maps Service2 recommendations to DTOs
     */
    private fromService2(recommendations: Array<Service2Recommendation>): Array<RecommendationDto> {
        return recommendations.map(recommendation => ({
            priority: recommendation.priority,
            title: recommendation.title,
            description: recommendation.details,
        }));
    }
} 