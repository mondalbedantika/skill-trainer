import type { Resource, OneHourSession } from '../types';
import { INITIAL_RESOURCES, SAMPLE_QUIZZES, SAMPLE_PRACTICE_EXERCISES, SAMPLE_MINI_PROJECTS } from './mockData';

export class AiEngine {
  /**
   * Searches resources or dynamically generates realistic AI normalized resources for custom user queries.
   */
  static searchSkillResources(query: string): Resource[] {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return INITIAL_RESOURCES;

    const matches = INITIAL_RESOURCES.filter(r => 
      r.title.toLowerCase().includes(cleanQuery) ||
      r.description.toLowerCase().includes(cleanQuery) ||
      r.topics.some(t => t.toLowerCase().includes(cleanQuery)) ||
      r.skillId.toLowerCase().includes(cleanQuery)
    );

    if (matches.length > 0) return matches;

    // Dynamically generate AI curated resources for any novel skill (e.g. "Rust", "System Design", "Go")
    const titleCase = query.charAt(0).toUpperCase() + query.slice(1);
    return [
      {
        id: `yt-dynamic-${cleanQuery}`,
        skillId: cleanQuery,
        title: `${titleCase} Full Course — 1-Hour Micro Learning`,
        provider: 'YouTube',
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(query + ' tutorial')}`,
        description: `Complete introductory breakdown of ${titleCase} syntax, key architecture, best practices, and hands-on examples.`,
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
        duration: '45 min',
        durationMinutes: 45,
        difficulty: 'Beginner',
        rating: 4.8,
        ratingCount: 12400,
        learnerCount: '1.2M views',
        priceType: 'FREE',
        channel: 'Tech Lead Academy',
        topics: [`${titleCase} Basics`, 'Core Patterns', 'Project Setup', 'Best Practices'],
        hasCertificate: false,
        projectCount: 2,
        lastUpdated: '2026-03-01',
        learningScore: {
          score: 95,
          verdict: `Top AI-recommended YouTube video for learning ${titleCase} in 60 minutes.`,
          bestFor: 'Learners wanting fast hands-on momentum.',
          notIdealFor: 'Deep academic research papers.',
          reasons: [
            { label: 'Relevance', passed: true, text: `Directly targets ${titleCase} core concepts.` },
            { label: 'Freshness', passed: true, text: 'Includes modern framework features.' },
            { label: '1-Hour Fit', passed: true, text: 'Duration fits cleanly inside 60 minutes.' }
          ]
        },
        timestamps: [
          { id: 'ts-dyn-1', title: `${titleCase} Fundamentals & Setup`, startTime: '00:00', endTime: '12:00', startSeconds: 0, endSeconds: 720, description: 'Environment setup and initial code execution.', isRecommendedFor1Hour: true },
          { id: 'ts-dyn-2', title: 'Core Control Flow & Data Structures', startTime: '12:01', endTime: '28:00', startSeconds: 721, endSeconds: 1680, description: 'Managing variables, logic loops, and collection types.', isRecommendedFor1Hour: true },
          { id: 'ts-dyn-3', title: 'Building a Micro Application', startTime: '28:01', endTime: '45:00', startSeconds: 1681, endSeconds: 2700, description: 'Putting everything together in a working mini project.', isRecommendedFor1Hour: true }
        ]
      },
      {
        id: `coursera-dynamic-${cleanQuery}`,
        skillId: cleanQuery,
        title: `${titleCase} Enterprise Specialization`,
        provider: 'Coursera',
        url: `https://www.coursera.org/search?query=${encodeURIComponent(query)}`,
        description: `Comprehensive academic and enterprise grade certification course on ${titleCase} principles and software design.`,
        thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
        duration: '2 months',
        durationMinutes: 4320,
        difficulty: 'Intermediate',
        rating: 4.9,
        ratingCount: 18900,
        learnerCount: '95k learners',
        priceType: 'SUBSCRIPTION',
        price: 'Coursera Plus ($49/mo)',
        priceCheckDate: 'Verified today',
        instructor: 'University Engineering Faculty',
        topics: [`${titleCase} Architecture`, 'Enterprise Security', 'Performance Testing'],
        hasCertificate: true,
        projectCount: 5,
        learningScore: {
          score: 92,
          verdict: `Best structured certification program for ${titleCase}.`,
          bestFor: 'Engineers needing formal credentials.',
          notIdealFor: 'Quick 1-hour fast practice.',
          reasons: [
            { label: 'Verified Credential', passed: true, text: 'Includes graded coding labs and official certificate.' }
          ]
        }
      },
      {
        id: `udemy-dynamic-${cleanQuery}`,
        skillId: cleanQuery,
        title: `${titleCase} Masterclass 2026: From Zero to Hero`,
        provider: 'Udemy',
        url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(query)}`,
        description: `Hands-on bootcamp teaching ${titleCase} through 15 real-world production projects.`,
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
        duration: '28 hours',
        durationMinutes: 1680,
        difficulty: 'All Levels',
        rating: 4.8,
        ratingCount: 42000,
        learnerCount: '150k students',
        priceType: 'PAID',
        price: '$13.99',
        priceCheckDate: 'Price checked recently',
        instructor: 'Senior Staff Software Architect',
        topics: [`${titleCase} Deep Dive`, 'System Design', 'Production Deployment'],
        hasCertificate: true,
        projectCount: 15,
        learningScore: {
          score: 93,
          verdict: 'Highest density of practical coding assignments.',
          bestFor: 'Deep project builders.',
          notIdealFor: 'Same-day 60-minute constraints.',
          reasons: [
            { label: 'Project Density', passed: true, text: 'Includes 15 portfolio-ready projects.' }
          ]
        }
      }
    ];
  }

  /**
   * Generates a 60-Minute Session path for any skill.
   */
  static buildOneHourSession(skillName: string, goal?: string): OneHourSession {
    const normSkill = skillName.toLowerCase().replace(/\s+/g, '-');
    const resources = this.searchSkillResources(skillName);
    const topVideo = resources.find(r => r.provider === 'YouTube') || resources[0];

    const quizQuestions = SAMPLE_QUIZZES[normSkill] || [
      {
        id: 'dq1',
        question: `What is the core design philosophy of ${skillName}?`,
        options: [
          'Maximizing developer productivity through concise abstractions',
          'Forcing manual assembly code compilation',
          'Eliminating all function parameters',
          'Requiring dedicated hardware dongles'
        ],
        correctIndex: 0,
        explanation: `${skillName} emphasizes developer productivity, modularity, and maintainable software engineering practices.`,
        topicTag: 'Core Concepts'
      },
      {
        id: 'dq2',
        question: `How should you structure a production application using ${skillName}?`,
        options: [
          'Store everything in a single global variable',
          'Decouple business logic into modular functions and maintain clear state flow',
          'Never write comments or documentation',
          'Disable error handling and exceptions'
        ],
        correctIndex: 1,
        explanation: 'Modular design and isolated state management ensure scalability and bug resistance.',
        topicTag: 'Architecture'
      },
      {
        id: 'dq3',
        question: `Which tool is standard for testing and validating ${skillName} code?`,
        options: [
          'Standard unit testing runners and assertion suites',
          'Manual screenshot comparisons only',
          'Printing text to printer paper',
          'Writing code on whiteboards without running it'
        ],
        correctIndex: 0,
        explanation: 'Automated assertion test suites validate logic edge cases instantly.',
        topicTag: 'Testing'
      },
      {
        id: 'dq4',
        question: `What is a common performance bottleneck when working with ${skillName}?`,
        options: [
          'Unnecessary redundant recalculations or un-memoized state updates',
          'Using dark mode themes in VS Code',
          'Having more than 3 lines of code in a file',
          'Using modern web browsers'
        ],
        correctIndex: 0,
        explanation: 'Redundant work or un-cached operations degrade performance. Optimization techniques solve this.',
        topicTag: 'Performance'
      },
      {
        id: 'dq5',
        question: `What is the recommended next step after completing ${skillName} fundamentals?`,
        options: [
          'Building real-world mini projects and integrating with APIs',
          'Deleting all your code repositories',
          'Quitting programming entirely',
          'Memorizing raw binary machine code'
        ],
        correctIndex: 0,
        explanation: 'Building real projects solidifies conceptual knowledge into muscle memory.',
        topicTag: 'Next Steps'
      }
    ];

    const practice = SAMPLE_PRACTICE_EXERCISES[normSkill] || {
      id: `ex-gen-${normSkill}`,
      title: `Hands-On ${skillName} Code Implementation`,
      prompt: `Implement a clean, modular code example in ${skillName} that accepts user input, processes state logic, and outputs the result.`,
      starterCode: `// ${skillName} Quick Practice\nfunction executeLogic(inputData) {\n  // Implement logic here\n  return inputData;\n}\n\nconsole.log(executeLogic("Sample Input"));`,
      solutionCode: `function executeLogic(inputData) {\n  const formatted = String(inputData).trim().toUpperCase();\n  return { success: true, processed: formatted, timestamp: Date.now() };\n}\n\nconsole.log(executeLogic("Sample Input"));`,
      expectedOutput: '{ success: true, processed: "SAMPLE INPUT", timestamp: ... }',
      hints: ['Transform input strings using standard methods.', 'Return an object with structured metadata.']
    };

    const project = SAMPLE_MINI_PROJECTS[normSkill] || {
      id: `proj-gen-${normSkill}`,
      title: `Build a ${skillName} Utility App`,
      objective: `Create a functional mini application incorporating core ${skillName} features.`,
      steps: [
        '1. Initialize your project state.',
        '2. Write the core data processing handler.',
        '3. Display results in a clean formatted layout.',
        '4. Add basic error boundary handling.'
      ],
      starterCode: `// ${skillName} Mini Project Starter Code`,
      keyTakeaways: ['Hands-on project experience', 'Problem solving with real constraints', 'Portfolio ready snippet']
    };

    return {
      id: `session-${normSkill}-${Date.now()}`,
      skillName: skillName,
      createdForGoal: goal || 'Build Projects',
      totalDurationMin: 60,
      stages: [
        {
          id: 'learn',
          title: 'Learn',
          durationMin: 10,
          timestampRange: '00:00 — 10:00',
          type: 'video',
          state: 'CURRENT',
          content: {
            videoSegment: {
              resource: topVideo,
              timestamps: topVideo.timestamps || []
            }
          }
        },
        {
          id: 'understand',
          title: 'Understand',
          durationMin: 10,
          timestampRange: '10:00 — 20:00',
          type: 'summary',
          state: 'LOCKED',
          content: {
            aiSummary: {
              summaryText: `Essential ${skillName} architecture breakdown generated by AI for rapid 10-minute mental model acquisition.`,
              keyConcepts: [
                {
                  concept: 'Core State & Abstraction',
                  detail: `Understanding how ${skillName} manages state flow and keeps logic isolated.`,
                  codeSnippet: `// Key Mental Model\nconst state = initializeState();\nconst nextState = update(state, action);`
                },
                {
                  concept: 'Immutability & Side Effects',
                  detail: 'Why mutation causes silent bugs and how functional updates preserve predictability.',
                  codeSnippet: `// Functional Immutable Update\nconst updatedList = [...originalList, newItem];`
                },
                {
                  concept: 'Performance & Optimization',
                  detail: 'Preventing unnecessary renders and caching heavy computation results.',
                  codeSnippet: `// Caching Strategy\nconst memoizedValue = memoize(() => heavyCalculation(param));`
                }
              ]
            }
          }
        },
        {
          id: 'practice',
          title: 'Practice',
          durationMin: 10,
          timestampRange: '20:00 — 30:00',
          type: 'coding',
          state: 'LOCKED',
          content: {
            practice: practice
          }
        },
        {
          id: 'quiz',
          title: 'Quiz',
          durationMin: 10,
          timestampRange: '30:00 — 40:00',
          type: 'quiz',
          state: 'LOCKED',
          content: {
            quiz: quizQuestions
          }
        },
        {
          id: 'build',
          title: 'Build',
          durationMin: 15,
          timestampRange: '40:00 — 55:00',
          type: 'project',
          state: 'LOCKED',
          content: {
            project: project
          }
        },
        {
          id: 'reflect',
          title: 'Reflect',
          durationMin: 5,
          timestampRange: '55:00 — 60:00',
          type: 'reflection',
          state: 'LOCKED',
          content: {
            reflection: {
              checklist: [
                `Mastered basic syntax & mental model of ${skillName}`,
                'Understood state mutations & side effects',
                'Completed hands-on live code exercise in sandbox',
                'Tested knowledge with 5 quiz questions',
                'Built working mini-challenge structure'
              ],
              unlockedSkills: [`${skillName} Fundamentals`, 'State Management Patterns', 'Hands-on Problem Solving'],
              summary: `You have successfully completed a focused 60-minute session on ${skillName}. Next step: build a complete project or attempt interview prep questions!`
            }
          }
        }
      ]
    };
  }

  /**
   * Contextual AI Learning Assistant response generator.
   */
  static askAssistant(skill: string, question: string, _currentContext?: string): string {
    const q = question.toLowerCase();
    if (q.includes('simpler') || q.includes('simple')) {
      return `Think of ${skill} like a smart kitchen appliance: instead of manually managing every step, you give it clear instructions (props/state) and it reliably delivers the exact output every single time without cluttering your main counter.`;
    }
    if (q.includes('example')) {
      return `Here is a real-world production example in ${skill}:\n\n\`\`\`js\n// Real-world pattern\nconst handleSearch = (query) => {\n  if (!query) return [];\n  return database.filter(item => item.name.includes(query));\n};\n\`\`\`\nThis avoids unnecessary memory leaks and returns clean data.`;
    }
    if (q.includes('why') || q.includes('work')) {
      return `This code works because ${skill} relies on deterministic pure functions. Inputs stay predictable, and state updates trigger automatic re-renders only where changes actually occurred.`;
    }
    if (q.includes('harder') || q.includes('exercise')) {
      return `🔥 **Harder Challenge:** Refactor your practice solution to handle async network error boundaries, retry timeouts (max 3 retries with exponential backoff), and local storage caching!`;
    }
    return `In ${skill}, the key is mastering state flow and isolating side effects. Would you like me to give you a code snippet, explain the mental model, or quiz you on this exact concept?`;
  }
}
