import { RecommendationDto } from "../models";

type ServiceMapper<T> = (recommendations: Array<T>) => Array<RecommendationDto>;

/**
 * RecommendationDtoMapper transforms service-specific recommendation models into DTOs
 * Uses a registry pattern to map different service recommendations to DTOs
 */
export class RecommendationDtoMapper {
    private readonly mapperRegistry: Map<string, ServiceMapper<unknown>> = new Map();

    /**
     * Maps service-specific recommendations to DTOs
     */
    public toDto(serviceName: string, recommendations: unknown): Array<RecommendationDto> {
        if (!Array.isArray(recommendations)) {
            return [];
        }

        const mapper = this.mapperRegistry.get(serviceName);
        if (!mapper) {
            return [];
        }

        return mapper(recommendations);
    }

    /**
     * Registers a new service mapper
     * @param serviceName The name of the service
     * @param mapper The mapper function for the service
     */
    public registerMapper<T>(serviceName: string, mapper: ServiceMapper<T>): void {
        this.mapperRegistry.set(serviceName, mapper as ServiceMapper<unknown>);
    }
} 