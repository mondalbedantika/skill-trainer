import { describe, expect, it } from 'vitest';
import { AiEngine } from './aiEngine';
import { INITIAL_RESOURCES } from './mockData';

describe('AiEngine.searchSkillResources', () => {
  it('returns the seeded catalogue for an empty query', () => {
    expect(AiEngine.searchSkillResources('   ')).toEqual(INITIAL_RESOURCES);
  });

  it('creates normalized provider results for an unknown skill', () => {
    const results = AiEngine.searchSkillResources('Rust');

    expect(results).toHaveLength(3);
    expect(results.map((resource) => resource.provider)).toEqual(['YouTube', 'Coursera', 'Udemy']);
    expect(results.every((resource) => resource.skillId === 'rust')).toBe(true);
  });
});

describe('AiEngine.buildOneHourSession', () => {
  it('creates the complete six-stage session sequence', () => {
    const session = AiEngine.buildOneHourSession('React Hooks', 'Build Projects');

    expect(session.totalDurationMin).toBe(60);
    expect(session.createdForGoal).toBe('Build Projects');
    expect(session.stages.map((stage) => stage.id)).toEqual([
      'learn', 'understand', 'practice', 'quiz', 'build', 'reflect',
    ]);
    expect(session.stages.reduce((total, stage) => total + stage.durationMin, 0)).toBe(60);
  });
});
