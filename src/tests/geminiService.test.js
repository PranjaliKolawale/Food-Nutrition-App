import { describe, it, expect, vi } from 'vitest';
import { generateNutritionSuggestion } from '../services/geminiService';

describe('Smart Assistant API Logic', () => {
  it('should return a valid structured response even in fallback mode', async () => {
    // We expect the function to return the mocked fallback since there's no API key in the test env
    const result = await generateNutritionSuggestion({
      goal: 'Weight Loss',
      mood: 'Happy',
      food: 'Chicken',
      time: 'Dinner'
    });

    expect(result).toHaveProperty('parsed');
    expect(result.parsed).toHaveProperty('meal');
    expect(result.parsed).toHaveProperty('calories');
    expect(result.parsed.meal).toContain('Chicken');
  });
});
