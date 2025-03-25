import { Service1Recommendation } from "./recommendation-service1.service";
import { Service2Recommendation } from "./recommendation-service2.service";
import { RecommendationMapper } from "./recommendation.mapper";

describe('RecommendationMapper', () => {
    let mapper: RecommendationMapper;

    beforeEach(() => {
        mapper = new RecommendationMapper();
    });

    describe('toDto', () => {
        it('should return empty array for unknown service', () => {
            const result = mapper.toDto('unknown-service', []);
            expect(result).toEqual([]);
        });

        describe('Service1', () => {
            it('should correctly map Service1 recommendations', () => {
                const recommendations: Service1Recommendation[] = [
                    { confidence: 0.8, recommendation: 'Test recommendation 1' },
                    { confidence: 0.5, recommendation: 'Test recommendation 2' }
                ];

                const result = mapper.toDto('service1', recommendations);

                expect(result).toEqual([
                    { priority: 800, title: 'Test recommendation 1' },
                    { priority: 500, title: 'Test recommendation 2' }
                ]);
            });

            it('should handle empty array', () => {
                const result = mapper.toDto('service1', []);
                expect(result).toEqual([]);
            });

            it('should handle invalid input gracefully', () => {
                const result = mapper.toDto('service1', null);
                expect(result).toEqual([]);
            });
        });

        describe('Service2', () => {
            it('should correctly map Service2 recommendations', () => {
                const recommendations: Service2Recommendation[] = [
                    { priority: 100, title: 'Test title 1', details: 'Test details 1' },
                    { priority: 200, title: 'Test title 2', details: 'Test details 2' }
                ];

                const result = mapper.toDto('service2', recommendations);

                expect(result).toEqual([
                    { priority: 100, title: 'Test title 1', description: 'Test details 1' },
                    { priority: 200, title: 'Test title 2', description: 'Test details 2' }
                ]);
            });

            it('should handle empty array', () => {
                const result = mapper.toDto('service2', []);
                expect(result).toEqual([]);
            });

            it('should handle invalid input gracefully', () => {
                const result = mapper.toDto('service2', null);
                expect(result).toEqual([]);
            });
        });
    });
}); 