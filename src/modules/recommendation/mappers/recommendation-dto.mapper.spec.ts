import { RecommendationDtoMapper } from "./recommendation-dto.mapper";

describe('RecommendationDtoMapper', () => {
    let mapper: RecommendationDtoMapper;

    beforeEach(() => {
        mapper = new RecommendationDtoMapper();
    });

    describe('toDto', () => {
        it('should return empty array for unknown service', () => {
            const result = mapper.toDto('unknown-service', []);
            expect(result).toEqual([]);
        });

        describe('TestService1', () => {
            interface TestService1Recommendation {
                score: number;
                message: string;
            }

            const testService1Mapper = (recommendations: Array<TestService1Recommendation>): Array<{ priority: number; title: string }> => 
                recommendations.map(rec => ({
                    priority: rec.score * 1000,
                    title: rec.message
                }));

            beforeEach(() => {
                mapper.registerMapper<TestService1Recommendation>('test-service1', testService1Mapper);
            });

            it('should correctly map recommendations', () => {
                const recommendations: TestService1Recommendation[] = [
                    { score: 0.8, message: 'Test recommendation 1' },
                    { score: 0.5, message: 'Test recommendation 2' }
                ];

                const result = mapper.toDto('test-service1', recommendations);

                expect(result).toEqual([
                    { priority: 800, title: 'Test recommendation 1' },
                    { priority: 500, title: 'Test recommendation 2' }
                ]);
            });

            it('should handle empty array', () => {
                const result = mapper.toDto('test-service1', []);
                expect(result).toEqual([]);
            });

            it('should handle invalid input gracefully', () => {
                const result = mapper.toDto('test-service1', null);
                expect(result).toEqual([]);
            });
        });

        describe('TestService2', () => {
            interface TestService2Recommendation {
                importance: number;
                heading: string;
                content: string;
            }

            const testService2Mapper = (recommendations: Array<TestService2Recommendation>): Array<{ priority: number; title: string; description: string }> => 
                recommendations.map(rec => ({
                    priority: rec.importance,
                    title: rec.heading,
                    description: rec.content
                }));

            beforeEach(() => {
                mapper.registerMapper<TestService2Recommendation>('test-service2', testService2Mapper);
            });

            it('should correctly map recommendations', () => {
                const recommendations: TestService2Recommendation[] = [
                    { importance: 100, heading: 'Test title 1', content: 'Test content 1' },
                    { importance: 200, heading: 'Test title 2', content: 'Test content 2' }
                ];

                const result = mapper.toDto('test-service2', recommendations);

                expect(result).toEqual([
                    { priority: 100, title: 'Test title 1', description: 'Test content 1' },
                    { priority: 200, title: 'Test title 2', description: 'Test content 2' }
                ]);
            });

            it('should handle empty array', () => {
                const result = mapper.toDto('test-service2', []);
                expect(result).toEqual([]);
            });

            it('should handle invalid input gracefully', () => {
                const result = mapper.toDto('test-service2', null);
                expect(result).toEqual([]);
            });
        });
    });

    describe('registerMapper', () => {
        interface CustomRecommendation {
            score: number;
            text: string;
        }

        it('should register and use a custom mapper', () => {
            const customMapper = (recommendations: Array<CustomRecommendation>): Array<{ priority: number; title: string }> => 
                recommendations.map(rec => ({
                    priority: rec.score * 100,
                    title: rec.text
                }));

            mapper.registerMapper<CustomRecommendation>('custom-service', customMapper);

            const recommendations: CustomRecommendation[] = [
                { score: 0.8, text: 'Custom recommendation 1' },
                { score: 0.5, text: 'Custom recommendation 2' }
            ];

            const result = mapper.toDto('custom-service', recommendations);

            expect(result).toEqual([
                { priority: 80, title: 'Custom recommendation 1' },
                { priority: 50, title: 'Custom recommendation 2' }
            ]);
        });

        it('should override existing mapper when registering with same service name', () => {
            interface TestRecommendation {
                value: number;
                text: string;
            }

            const originalMapper = (recommendations: Array<TestRecommendation>): Array<{ priority: number; title: string }> => 
                recommendations.map(rec => ({
                    priority: rec.value,
                    title: rec.text
                }));

            const overrideMapper = (recommendations: Array<TestRecommendation>): Array<{ priority: number; title: string }> => 
                recommendations.map(_rec => ({
                    priority: 1000,
                    title: 'Overridden mapping'
                }));

            mapper.registerMapper<TestRecommendation>('test-service', originalMapper);
            mapper.registerMapper<TestRecommendation>('test-service', overrideMapper);

            const recommendations: TestRecommendation[] = [
                { value: 100, text: 'Original recommendation' }
            ];

            const result = mapper.toDto('test-service', recommendations);

            expect(result).toEqual([
                { priority: 1000, title: 'Overridden mapping' }
            ]);
        });
    });
}); 