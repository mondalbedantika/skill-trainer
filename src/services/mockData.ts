import type { Resource, SkillOverview, QuizQuestion, PracticeExercise, MiniProjectChallenge, InterviewQuestion } from '../types';

export const INITIAL_RESOURCES: Resource[] = [
  // REACT HOOKS
  {
    id: 'yt-react-hooks-1',
    skillId: 'react-hooks',
    title: 'React Hooks Complete Masterclass (useState, useEffect, useMemo & Custom Hooks)',
    provider: 'YouTube',
    url: 'https://www.youtube.com/watch?v=TNhaISOUy68',
    description: 'Learn modern React Hooks in 45 minutes with clear animated visualizations, code examples, and practical production patterns.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    duration: '45 min',
    durationMinutes: 45,
    difficulty: 'Beginner',
    rating: 4.9,
    ratingCount: 14200,
    learnerCount: '1.8M views',
    priceType: 'FREE',
    channel: 'WebDevSimplified',
    topics: ['useState', 'useEffect', 'useMemo', 'useCallback', 'Custom Hooks'],
    hasCertificate: false,
    projectCount: 3,
    lastUpdated: '2026-02-10',
    learningScore: {
      score: 96,
      verdict: 'Highest recommended video for mastering Hooks efficiently.',
      bestFor: 'Learners looking for quick visual explanations and instant coding practice.',
      notIdealFor: 'Developers who already know advanced fiber architecture details.',
      reasons: [
        { label: 'Relevance', passed: true, text: 'Directly covers modern React 19 functional state patterns.' },
        { label: 'Freshness', passed: true, text: 'Updated recently with modern strict mode best practices.' },
        { label: '60-Min Fit', passed: true, text: 'Perfect length to watch core chapters within a 1-hour session.' },
        { label: 'Community Rating', passed: true, text: '98.6% positive like-to-view ratio across 1.8M views.' },
      ]
    },
    timestamps: [
      {
        id: 'ts-1',
        title: 'useState Deep Dive & State Batches',
        startTime: '02:15',
        endTime: '12:40',
        startSeconds: 135,
        endSeconds: 760,
        description: 'Understand immutable state updates and functional updater forms.',
        isRecommendedFor1Hour: true
      },
      {
        id: 'ts-2',
        title: 'useEffect Lifecycle & Cleanup Functions',
        startTime: '12:41',
        endTime: '24:10',
        startSeconds: 761,
        endSeconds: 1450,
        description: 'How dependencies trigger effects, handling async fetch and cleanup.',
        isRecommendedFor1Hour: true
      },
      {
        id: 'ts-3',
        title: 'useMemo & useCallback Optimization',
        startTime: '24:11',
        endTime: '35:20',
        startSeconds: 1451,
        endSeconds: 2120,
        description: 'Memoizing expensive calculations and callback references to prevent re-renders.',
        isRecommendedFor1Hour: true
      },
      {
        id: 'ts-4',
        title: 'Building a Custom UseLocalStorage Hook',
        startTime: '35:21',
        endTime: '45:00',
        startSeconds: 2121,
        endSeconds: 2700,
        description: 'Encapsulating state logic into reusable custom React hooks.',
        isRecommendedFor1Hour: false
      }
    ]
  },
  {
    id: 'coursera-react-1',
    skillId: 'react-hooks',
    title: 'Advanced React Specialization & Architecture',
    provider: 'Coursera',
    url: 'https://www.coursera.org/learn/advanced-react',
    description: 'Offered by Meta. Deep dive into React state mechanics, custom hooks, context API, component composition, and performance testing.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    duration: '4 weeks (~24 hours)',
    durationMinutes: 1440,
    difficulty: 'Intermediate',
    rating: 4.8,
    ratingCount: 38500,
    learnerCount: '210k+ learners',
    priceType: 'SUBSCRIPTION',
    price: 'Included in Coursera Plus ($49/mo)',
    priceCheckDate: 'Verified 2 days ago',
    instructor: 'Meta Staff Engineering Team',
    topics: ['React Hooks', 'Context API', 'Performance Tuning', 'Jest Unit Tests'],
    hasCertificate: true,
    projectCount: 6,
    lastUpdated: '2026-01-15',
    learningScore: {
      score: 91,
      verdict: 'Best for career seekers needing verified Meta certificates and portfolio reviews.',
      bestFor: 'Developers seeking full job-ready certification.',
      notIdealFor: 'Someone wanting a 1-hour fast crash course.',
      reasons: [
        { label: 'Industry Credibility', passed: true, text: 'Created directly by Meta frontend engineers.' },
        { label: 'Structured Assessments', passed: true, text: 'Includes graded code labs and peer project reviews.' },
        { label: 'Pacing', passed: false, text: 'Requires several weeks of committed study time.' }
      ]
    },
    syllabus: [
      'Module 1: React Components & Hooks Deep Dive',
      'Module 2: Advanced State Management & Reducers',
      'Module 3: Custom Hooks & Reusability Patterns',
      'Module 4: End-to-End Testing with React Testing Library'
    ]
  },
  {
    id: 'udemy-react-1',
    skillId: 'react-hooks',
    title: 'React - The Complete Guide 2026 (incl. Next.js, Redux & Hooks)',
    provider: 'Udemy',
    url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
    description: 'Master React.js from ground zero: Hooks, Redux Toolkit, React Router, Next.js App Router, animation, and backend integration.',
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop',
    duration: '52 hours',
    durationMinutes: 3120,
    difficulty: 'All Levels',
    rating: 4.8,
    ratingCount: 245000,
    learnerCount: '890k+ students',
    priceType: 'PAID',
    price: '$14.99 (Discounted)',
    priceCheckDate: 'Checked recently',
    instructor: 'Maximilian Schwarzmüller',
    topics: ['useState', 'useEffect', 'useReducer', 'Redux', 'Next.js'],
    hasCertificate: true,
    projectCount: 12,
    lastUpdated: '2026-03-01',
    learningScore: {
      score: 93,
      verdict: 'The ultimate comprehensive library for all React topics.',
      bestFor: 'Learners building 10+ real projects for their portfolio.',
      notIdealFor: 'Quick 60-minute targeted single-concept learning.',
      reasons: [
        { label: 'Project Depth', passed: true, text: 'Includes 12 real-world fullstack projects.' },
        { label: 'Comprehensive', passed: true, text: 'Covers every edge case and legacy to modern transition.' }
      ]
    }
  },

  // PYTHON
  {
    id: 'yt-python-1',
    skillId: 'python',
    title: 'Python for Beginners — Full Course in 1 Hour',
    provider: 'YouTube',
    url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    description: 'Learn Python programming language fundamentals: variables, control flow, functions, data structures, and mini projects.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    duration: '60 min',
    durationMinutes: 60,
    difficulty: 'Beginner',
    rating: 4.9,
    ratingCount: 89000,
    learnerCount: '4.5M views',
    priceType: 'FREE',
    channel: 'Programming with Mosh',
    topics: ['Syntax', 'Functions', 'Lists & Dicts', 'OOP Basics'],
    hasCertificate: false,
    projectCount: 2,
    learningScore: {
      score: 98,
      verdict: 'Ideal match for 1-Hour Skill Trainer! Tailor-made length and pacing.',
      bestFor: 'Complete beginners needing zero setup code walkthroughs.',
      notIdealFor: 'Advanced engineers looking for asyncio or CPython internals.',
      reasons: [
        { label: 'Optimal Duration', passed: true, text: 'Exactly 60 minutes long — perfect match for 1-Hour mode.' },
        { label: 'Clarity', passed: true, text: 'Clear explanations without fluff or long intros.' }
      ]
    },
    timestamps: [
      { id: 'py-1', title: 'Variables & Data Types', startTime: '00:00', endTime: '12:15', startSeconds: 0, endSeconds: 735, description: 'Numbers, strings, booleans, and dynamic typing.', isRecommendedFor1Hour: true },
      { id: 'py-2', title: 'Control Flow & Logic', startTime: '12:16', endTime: '25:40', startSeconds: 736, endSeconds: 1540, description: 'If/else, while loops, and for loops with range().', isRecommendedFor1Hour: true },
      { id: 'py-3', title: 'Data Structures (Lists, Dicts, Tuples)', startTime: '25:41', endTime: '42:10', startSeconds: 1541, endSeconds: 2530, description: 'Manipulating lists, dictionary lookups, sets.', isRecommendedFor1Hour: true },
      { id: 'py-4', title: 'Functions & Modules', startTime: '42:11', endTime: '60:00', startSeconds: 2531, endSeconds: 3600, description: 'Defining parameters, return values, importing math.', isRecommendedFor1Hour: true }
    ]
  },
  {
    id: 'coursera-python-1',
    skillId: 'python',
    title: 'Python for Everybody Specialization',
    provider: 'Coursera',
    url: 'https://www.coursera.org/specializations/python',
    description: 'Offered by University of Michigan. Learn to program and analyze data with Python. Cover data structures, web scraping, and databases.',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop',
    duration: '8 months (~3 hours/week)',
    durationMinutes: 5760,
    difficulty: 'Beginner',
    rating: 4.8,
    ratingCount: 215000,
    learnerCount: '1.2M learners',
    priceType: 'SUBSCRIPTION',
    price: 'Free to audit / $49 per month with Certificate',
    priceCheckDate: 'Verified today',
    instructor: 'Dr. Charles Severance (Dr. Chuck)',
    topics: ['Python Data Structures', 'Web Scraping', 'SQLite', 'Data Visualization'],
    hasCertificate: true,
    projectCount: 5,
    learningScore: {
      score: 95,
      verdict: 'The gold standard university-backed Python foundation course.',
      bestFor: 'Academic credit seekers and thorough foundational learners.',
      notIdealFor: 'Fast 1-hour session requirements.',
      reasons: [
        { label: 'University Quality', passed: true, text: 'Taught by University of Michigan professor Dr. Chuck.' },
        { label: 'Data Focus', passed: true, text: 'Covers real web scraping with BeautifulSoup and SQLite.' }
      ]
    }
  },
  {
    id: 'udemy-python-1',
    skillId: 'python',
    title: '100 Days of Code: The Complete Python Pro Bootcamp 2026',
    provider: 'Udemy',
    url: 'https://www.udemy.com/course/100-days-of-code/',
    description: 'Master Python by building 100 projects in 100 days. Learn Data Science, Automation, Web Dev with FastAPI/Flask, and GUI Apps.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    duration: '64 hours',
    durationMinutes: 3840,
    difficulty: 'All Levels',
    rating: 4.7,
    ratingCount: 290000,
    learnerCount: '1.1M students',
    priceType: 'PAID',
    price: '$16.99',
    priceCheckDate: 'Verified today',
    instructor: 'Dr. Angela Yu',
    topics: ['Web Scraping', 'Automation', 'Data Science', 'PyGame', 'FastAPI'],
    hasCertificate: true,
    projectCount: 100,
    learningScore: {
      score: 94,
      verdict: 'Incredible practice density — 100 mini-projects build unstoppable coding habits.',
      bestFor: 'Hands-on project builders.',
      notIdealFor: 'Learners with tight single-day deadlines.',
      reasons: [
        { label: 'Project Density', passed: true, text: '100 practical projects keep learning active.' },
        { label: 'High Engagement', passed: true, text: 'Consistently rated #1 Python course on Udemy.' }
      ]
    }
  },

  // MACHINE LEARNING
  {
    id: 'yt-ml-1',
    skillId: 'machine-learning',
    title: 'Machine Learning in 20 Minutes — Complete Overview & intuition',
    provider: 'YouTube',
    url: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI',
    description: 'Supervised vs Unsupervised learning, Neural Networks, Decision Trees, Gradient Descent intuitive walkthrough with visual animation.',
    thumbnail: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=800&auto=format&fit=crop',
    duration: '22 min',
    durationMinutes: 22,
    difficulty: 'Beginner',
    rating: 4.9,
    ratingCount: 31000,
    learnerCount: '2.1M views',
    priceType: 'FREE',
    channel: 'StatQuest with Josh Starmer',
    topics: ['Supervised Learning', 'Decision Trees', 'Gradient Descent', 'Overfitting'],
    hasCertificate: false,
    projectCount: 1,
    learningScore: {
      score: 95,
      verdict: 'Best intuitive visual introduction to machine learning math.',
      bestFor: 'Visual learners who want clear intuition without dense matrix math calculus.',
      notIdealFor: 'Production model deployment engineers.',
      reasons: [
        { label: 'Visual Intuition', passed: true, text: 'Breakdowns complex ML equations into step-by-step illustrations.' },
        { label: 'Compact', passed: true, text: '22 minutes duration fits easily into 1-hour sessions.' }
      ]
    },
    timestamps: [
      { id: 'ml-1', title: 'What is Machine Learning?', startTime: '00:00', endTime: '05:20', startSeconds: 0, endSeconds: 320, description: 'Inputs, weights, and prediction outputs.', isRecommendedFor1Hour: true },
      { id: 'ml-2', title: 'Supervised vs Unsupervised', startTime: '05:21', endTime: '12:00', startSeconds: 321, endSeconds: 720, description: 'Labeled training vs clustering patterns.', isRecommendedFor1Hour: true },
      { id: 'ml-3', title: 'How Decision Trees & Forest Work', startTime: '12:01', endTime: '22:00', startSeconds: 721, endSeconds: 1320, description: 'Splitting features and calculating information gain.', isRecommendedFor1Hour: true }
    ]
  },
  {
    id: 'coursera-ml-1',
    skillId: 'machine-learning',
    title: 'Machine Learning Specialization',
    provider: 'Coursera',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction',
    description: 'Created by Andrew Ng & DeepLearning.AI. Modernized foundational program covering supervised learning, neural networks, and ML best practices.',
    thumbnail: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=800&auto=format&fit=crop',
    duration: '3 months (9 hours/week)',
    durationMinutes: 6480,
    difficulty: 'Beginner',
    rating: 4.9,
    ratingCount: 180000,
    learnerCount: '750k+ learners',
    priceType: 'SUBSCRIPTION',
    price: '$49/mo (Coursera Plus)',
    priceCheckDate: 'Verified today',
    instructor: 'Andrew Ng',
    topics: ['Linear Regression', 'Neural Networks', 'Decision Trees', 'Recommender Systems'],
    hasCertificate: true,
    projectCount: 8,
    learningScore: {
      score: 99,
      verdict: 'The world-famous gold standard in AI and ML education.',
      bestFor: 'Anyone serious about building a career in AI/ML.',
      notIdealFor: 'Quick 1-hour fast skimming.',
      reasons: [
        { label: 'World Class Instructor', passed: true, text: 'Taught by AI pioneer Andrew Ng (Co-founder of Coursera & Stanford Adjunct).' },
        { label: 'Modernized Tech Stack', passed: true, text: 'Updated recently using Python, NumPy, and TensorFlow.' }
      ]
    }
  },

  // DOCKER
  {
    id: 'yt-docker-1',
    skillId: 'docker',
    title: 'Docker in 100 Seconds + Full 40 Min Practical Crash Course',
    provider: 'YouTube',
    url: 'https://www.youtube.com/watch?v=gAkwW2tuIqE',
    description: 'Containers, Images, Dockerfiles, Volumes, Networking, and Docker Compose demystified with hands-on CLI terminal commands.',
    thumbnail: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=800&auto=format&fit=crop',
    duration: '42 min',
    durationMinutes: 42,
    difficulty: 'Beginner',
    rating: 4.9,
    ratingCount: 54000,
    learnerCount: '2.9M views',
    priceType: 'FREE',
    channel: 'Fireship & TechWorld with Nana',
    topics: ['Containers vs VMs', 'Dockerfile', 'Docker Compose', 'Volumes'],
    hasCertificate: false,
    projectCount: 2,
    learningScore: {
      score: 97,
      verdict: 'Fastest route to containerizing real Node/Python apps.',
      bestFor: 'Developers who need to containerize their app today.',
      notIdealFor: 'Kubernetes multi-region cluster architects.',
      reasons: [
        { label: 'Practical', passed: true, text: 'Direct terminal commands without unnecessary theory slides.' },
        { label: 'Concise', passed: true, text: '42 minutes duration fits right into 1-hour path.' }
      ]
    },
    timestamps: [
      { id: 'doc-1', title: 'Why Containers? (VMs vs Containers)', startTime: '00:00', endTime: '08:30', startSeconds: 0, endSeconds: 510, description: 'Isolated userland processes vs guest OS overhead.', isRecommendedFor1Hour: true },
      { id: 'doc-2', title: 'Writing your first Dockerfile', startTime: '08:31', endTime: '20:15', startSeconds: 511, endSeconds: 1215, description: 'FROM, WORKDIR, COPY, RUN, and CMD instructions.', isRecommendedFor1Hour: true },
      { id: 'doc-3', title: 'Managing Port Mapping & Volumes', startTime: '20:16', endTime: '31:45', startSeconds: 1216, endSeconds: 1905, description: 'Binding host ports and persisting data.', isRecommendedFor1Hour: true },
      { id: 'doc-4', title: 'Multi-container setups with Docker Compose', startTime: '31:46', endTime: '42:00', startSeconds: 1906, endSeconds: 2520, description: 'Orchestrating Web API + Postgres database in YAML.', isRecommendedFor1Hour: true }
    ]
  }
];

export const MOCK_SKILLS: SkillOverview[] = [
  {
    id: 'react-hooks',
    name: 'React Hooks',
    category: 'Web Development',
    discoveredCount: 14280,
    description: 'Master functional component state, side-effects, memoization, and custom state encapsulation patterns in React 19.',
    popularTopics: ['useState', 'useEffect', 'useMemo', 'useCallback', 'useContext', 'Custom Hooks'],
    pathIntelligence: {
      goalMatchPercentage: 94,
      difficultyProgression: 'Excellent',
      handsOnCoveragePercentage: 87,
      rationale: 'We selected these resources based on your current level, learning goal, resource quality, topic coverage, and estimated learning time.'
    },
    learningPath: [
      { levelNumber: 1, levelName: '01 — Fundamentals', provider: 'YouTube', resourceTitle: 'React Hooks in 10 Minutes', priceType: 'FREE', duration: '10 min', description: 'Core mental model & useState syntax', resourceId: 'yt-react-hooks-1', status: 'Completed' },
      { levelNumber: 2, levelName: '02 — Intermediate', provider: 'Udemy', resourceTitle: 'React Complete Guide (Hooks & State)', priceType: 'PAID', duration: '18 hours', description: 'useReducer, Context API & state synchronization', resourceId: 'udemy-react-1', status: '30% complete' },
      { levelNumber: 3, levelName: '03 — Projects', provider: 'YouTube', resourceTitle: 'Build 5 Custom React Hooks Projects', priceType: 'FREE', duration: '2.5 hours', description: 'useFetch, useLocalStorage, useDebounce', resourceId: 'yt-react-hooks-1', status: 'Not started' },
      { levelNumber: 4, levelName: '04 — Advanced', provider: 'Coursera', resourceTitle: 'Advanced React Architecture by Meta', priceType: 'SUBSCRIPTION', duration: '4 weeks', description: 'Fiber reconciliation, Concurrent features & Custom Renderers', resourceId: 'coursera-react-1', status: 'Not started' }
    ]
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    discoveredCount: 28450,
    description: 'The versatile language powering Data Science, Machine Learning, Web Development, Automation, and Scripting.',
    popularTopics: ['Data Types', 'Functions', 'List Comprehensions', 'OOP', 'Decorators', 'FastAPI'],
    pathIntelligence: {
      goalMatchPercentage: 91,
      difficultyProgression: 'Smooth',
      handsOnCoveragePercentage: 82,
      rationale: 'Curated path emphasizing hands-on project-building from day one, with smooth difficulty progression from syntax basics to production APIs.'
    },
    learningPath: [
      { levelNumber: 1, levelName: '01 — Fundamentals', provider: 'YouTube', resourceTitle: 'Python Fundamentals Crash Course', priceType: 'FREE', duration: '45 min', description: 'Variables, loops, functions, and control flow', resourceId: 'yt-python-1', status: 'Completed' },
      { levelNumber: 2, levelName: '02 — Intermediate', provider: 'Udemy', resourceTitle: '100 Days of Code Python Bootcamp', priceType: 'PAID', duration: '8.5 hours', description: 'OOP, File I/O, Error Handling & Modules', resourceId: 'udemy-python-1', status: '30% complete' },
      { levelNumber: 3, levelName: '03 — Projects', provider: 'YouTube', resourceTitle: 'Build 5 Python Web & Data Projects', priceType: 'FREE', duration: '2.5 hours', description: 'Web scraper, REST API, CLI tool', resourceId: 'yt-python-1', status: 'Not started' },
      { levelNumber: 4, levelName: '04 — Advanced', provider: 'Coursera', resourceTitle: 'Python for Everybody Specialization', priceType: 'SUBSCRIPTION', duration: '~3 months', description: 'Databases, Network Programming & Data Visualization', resourceId: 'coursera-python-1', status: 'Not started' }
    ]
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'Artificial Intelligence',
    discoveredCount: 18920,
    description: 'Build predictive algorithms, statistical models, and neural networks using Python, Scikit-Learn, and PyTorch.',
    popularTopics: ['Linear Regression', 'Decision Trees', 'Neural Networks', 'Feature Engineering', 'PyTorch'],
    pathIntelligence: {
      goalMatchPercentage: 96,
      difficultyProgression: 'Excellent',
      handsOnCoveragePercentage: 90,
      rationale: 'Path carefully sequenced with visual theory first, then applied projects, ensuring intuition before production system development.'
    },
    learningPath: [
      { levelNumber: 1, levelName: '01 — Fundamentals', provider: 'YouTube', resourceTitle: 'Machine Learning Intuition in 20 min', priceType: 'FREE', duration: '20 min', description: 'Supervised vs Unsupervised models explained visually', resourceId: 'yt-ml-1', status: 'Not started' },
      { levelNumber: 2, levelName: '02 — Intermediate', provider: 'Udemy', resourceTitle: 'Machine Learning A-Z Hands On Python', priceType: 'PAID', duration: '40 hours', description: 'Scikit-learn, Pandas, XGBoost & hyperparameter tuning', resourceId: 'coursera-ml-1', status: 'Not started' },
      { levelNumber: 3, levelName: '03 — Projects', provider: 'YouTube', resourceTitle: 'Build & Deploy 3 ML Prediction APIs', priceType: 'FREE', duration: '3.5 hours', description: 'House price predictor & sentiment analyzer API', resourceId: 'yt-ml-1', status: 'Not started' },
      { levelNumber: 4, levelName: '04 — Advanced', provider: 'Coursera', resourceTitle: 'Machine Learning Specialization by Andrew Ng', priceType: 'SUBSCRIPTION', duration: '3 months', description: 'Deep learning, CNNs, Transformers, and MLOps', resourceId: 'coursera-ml-1', status: 'Not started' }
    ]
  },
  {
    id: 'docker',
    name: 'Docker & Containers',
    category: 'DevOps & Infrastructure',
    discoveredCount: 11400,
    description: 'Package applications into lightweight, repeatable container environments for seamless deployment.',
    popularTopics: ['Dockerfiles', 'Container Images', 'Docker Compose', 'Volume Mounting', 'Networking'],
    pathIntelligence: {
      goalMatchPercentage: 89,
      difficultyProgression: 'Smooth',
      handsOnCoveragePercentage: 93,
      rationale: 'Heavily weighted toward hands-on terminal practice. Theory is kept minimal in favor of building real containerized applications immediately.'
    },
    learningPath: [
      { levelNumber: 1, levelName: '01 — Fundamentals', provider: 'YouTube', resourceTitle: 'Docker Concepts & CLI in 40 min', priceType: 'FREE', duration: '40 min', description: 'Containers vs Virtual Machines & basic commands', resourceId: 'yt-docker-1', status: 'Not started' },
      { levelNumber: 2, levelName: '02 — Intermediate', provider: 'Udemy', resourceTitle: 'Docker Mastery: with Compose & Swarm', priceType: 'PAID', duration: '19 hours', description: 'Multi-stage builds, security hardening, multi-container YAML', resourceId: 'yt-docker-1', status: 'Not started' },
      { levelNumber: 3, levelName: '03 — Projects', provider: 'YouTube', resourceTitle: 'Containerize Next.js + Postgres + Redis', priceType: 'FREE', duration: '1.5 hours', description: 'Production-ready docker-compose stack', resourceId: 'yt-docker-1', status: 'Not started' },
      { levelNumber: 4, levelName: '04 — Advanced', provider: 'Coursera', resourceTitle: 'Cloud Native Application Development with Kubernetes', priceType: 'SUBSCRIPTION', duration: '2 months', description: 'Container orchestration, Helm charts, CI/CD pipelines', resourceId: 'yt-docker-1', status: 'Not started' }
    ]
  }
];

export const SAMPLE_QUIZZES: Record<string, QuizQuestion[]> = {
  'react-hooks': [
    {
      id: 'q1',
      question: 'What happens when you call useState updater function with the exact same primitive value as current state?',
      options: [
        'React throws a runtime re-render error',
        'React bails out without re-rendering the component or children',
        'React re-renders all child components twice',
        'React resets the entire component subtree state'
      ],
      correctIndex: 1,
      explanation: 'React uses Object.is comparison algorithm. If the updated value equals current state, React skips re-rendering component subtrees for optimization.',
      topicTag: 'useState'
    },
    {
      id: 'q2',
      question: 'Why should you list all variables used inside useEffect in its dependency array?',
      options: [
        'To prevent memory leaks in Chrome V8 engine',
        'To ensure the effect closure always accesses fresh props and state values',
        'Because TypeScript forces strict array typing',
        'To cause synchronous DOM updates before painting'
      ],
      correctIndex: 1,
      explanation: 'JavaScript closures capture variables from the render cycle they were created in. Missing dependencies cause stale closure bugs.',
      topicTag: 'useEffect'
    },
    {
      id: 'q3',
      question: 'What is the primary difference between useMemo and useCallback?',
      options: [
        'useMemo caches JSX elements; useCallback caches Redux actions',
        'useMemo returns the cached result of calling a function; useCallback returns the memoized function instance itself',
        'useMemo works asynchronously; useCallback works synchronously',
        'There is no difference; useCallback is an alias for useMemo'
      ],
      correctIndex: 1,
      explanation: 'useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). useCallback memoizes function references across renders.',
      topicTag: 'useMemo & useCallback'
    },
    {
      id: 'q4',
      question: 'Where can React Hooks be safely called?',
      options: [
        'Inside regular JavaScript functions or nested loop statements',
        'Only at the top level of React functional components or custom hooks',
        'Inside class component lifecycle methods like componentDidMount',
        'Inside conditional if statements'
      ],
      correctIndex: 1,
      explanation: 'React relies on the call order of Hooks between renders. Calling them inside conditionals or loops breaks the hook state index order.',
      topicTag: 'Rules of Hooks'
    },
    {
      id: 'q5',
      question: 'What is the purpose of the cleanup function returned inside useEffect?',
      options: [
        'To delete unused local storage items automatically',
        'To run before the component unmounts or before the effect re-runs on dependency changes',
        'To clear browser memory cache',
        'To unmount child React components'
      ],
      correctIndex: 1,
      explanation: 'Cleanup functions unsubscribe event listeners, clear timers, or abort fetch requests before effect re-execution or unmounting.',
      topicTag: 'useEffect'
    }
  ],
  'python': [
    {
      id: 'pyq1',
      question: 'What is the key difference between a Python List and a Python Tuple?',
      options: [
        'Lists store strings, Tuples store numbers',
        'Lists are mutable (modifiable), while Tuples are immutable',
        'Tuples use square brackets [ ], Lists use parentheses ( )',
        'Lists cannot be iterated in a for loop'
      ],
      correctIndex: 1,
      explanation: 'Lists are mutable datatypes created with []. Tuples are immutable datatypes created with () and cannot be changed after assignment.',
      topicTag: 'Data Structures'
    },
    {
      id: 'pyq2',
      question: 'How does Python handle memory management and unused objects?',
      options: [
        'Manual free() allocation like C language',
        'Automatic reference counting and garbage collection',
        'Operating system page swapping only',
        'Objects are never removed from memory'
      ],
      correctIndex: 1,
      explanation: 'Python uses primary reference counting paired with a cyclic garbage collector to reclaim unreferenced heap memory.',
      topicTag: 'CPython Architecture'
    },
    {
      id: 'pyq3',
      question: 'What does a List Comprehension `[x**2 for x in range(5) if x % 2 == 0]` evaluate to?',
      options: [
        '[0, 4, 16]',
        '[0, 1, 4, 9, 16]',
        '[1, 9]',
        '[0, 2, 4]'
      ],
      correctIndex: 0,
      explanation: 'range(5) gives 0,1,2,3,4. Even numbers are 0,2,4. Their squares (x**2) are 0, 4, 16.',
      topicTag: 'List Comprehensions'
    },
    {
      id: 'pyq4',
      question: 'What does the `*args` parameter in a function definition allow?',
      options: [
        'Accepting a variable number of positional arguments as a tuple',
        'Accepting key-value dictionary keyword arguments',
        'Dereferencing C pointers inside Python',
        'Declaring global global variables'
      ],
      correctIndex: 0,
      explanation: '`*args` collects extra positional arguments passed to a function into an immutable tuple.',
      topicTag: 'Functions'
    },
    {
      id: 'pyq5',
      question: 'What happens when accessing a dictionary key that does not exist using bracket notation `my_dict["missing"]`?',
      options: [
        'Returns None automatically',
        'Raises a KeyError exception',
        'Returns 0 by default',
        'Creates the missing key with null'
      ],
      correctIndex: 1,
      explanation: 'Direct indexing `my_dict[key]` raises KeyError if absent. Use `my_dict.get("missing", default)` to safely avoid exceptions.',
      topicTag: 'Dictionaries'
    }
  ]
};

export const SAMPLE_PRACTICE_EXERCISES: Record<string, PracticeExercise> = {
  'react-hooks': {
    id: 'ex-react-1',
    title: 'Build a Smart Toggle & Counter Hook',
    prompt: 'Implement a React functional component using `useState` that maintains a counter value. Add a button to increment, a button to reset, and a checkbox to toggle dark/light theme mode.',
    starterCode: `import React, { useState } from 'react';

export default function CounterApp() {
  // 1. Declare count state initialized to 0
  // 2. Declare isDark state initialized to false

  return (
    <div className="p-4 border rounded font-sans">
      <h2 className="text-xl font-bold mb-2">Count: {/* count */}</h2>
      <div className="flex gap-2 mb-4">
        {/* Add Increment & Reset buttons */}
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        {/* Add checkbox for theme toggle */}
        <span>Enable Dark Mode</span>
      </label>
    </div>
  );
}`,
    solutionCode: `import React, { useState } from 'react';

export default function CounterApp() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={\`p-6 rounded-xl border transition-all \${isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-200'}\`}>
      <h2 className="text-2xl font-bold mb-3">Count: {count}</h2>
      <div className="flex gap-3 mb-4">
        <button 
          onClick={() => setCount(prev => prev + 1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition"
        >
          Increment (+1)
        </button>
        <button 
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg font-medium hover:bg-slate-600 transition"
        >
          Reset
        </button>
      </div>
      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
        <input 
          type="checkbox"
          checked={isDark}
          onChange={(e) => setIsDark(e.target.checked)}
          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
        />
        <span>Enable Dark Sub-Theme</span>
      </label>
    </div>
  );
}`,
    expectedOutput: 'Interactive React Component with live state updates, dark mode toggle, and count increment buttons.',
    requirements: [
      'Declare count state with useState initialized to 0',
      'Declare isDark state with useState initialized to false',
      'Render a button that increments count by 1',
      'Render a button that resets count to 0',
      'Render a checkbox that toggles isDark'
    ],
    hints: [
      'Use functional state updater `setCount(prev => prev + 1)` for safe sequential state updates.',
      'Controlled checkbox uses `checked={isDark}` and `onChange={e => setIsDark(e.target.checked)}`.'
    ]
  },
  'python': {
    id: 'ex-py-1',
    title: 'Implement a Frequency Dictionary & Filtering Function',
    prompt: 'Write a Python function `filter_frequent_words(text, min_freq)` that takes a string of text, counts word occurrences (case-insensitive), and returns a dictionary of words that appear at least `min_freq` times.',
    starterCode: `def filter_frequent_words(text: str, min_freq: int) -> dict:
    # Convert text to lowercase and split into words
    # Build dictionary with word frequency
    # Filter dictionary for words with count >= min_freq
    pass

# Test execution:
sample_text = "React Hooks and Python Hooks and React state"
print(filter_frequent_words(sample_text, 2))
`,
    solutionCode: `def filter_frequent_words(text: str, min_freq: int) -> dict:
    words = text.lower().split()
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    
    return {word: count for word, count in counts.items() if count >= min_freq}

# Test run output:
sample_text = "React Hooks and Python Hooks and React state"
result = filter_frequent_words(sample_text, 2)
print(result) # Output: {'react': 2, 'hooks': 2, 'and': 2}
`,
    expectedOutput: "{'react': 2, 'hooks': 2, 'and': 2}",
    requirements: [
      'Define function `filter_frequent_words(text, min_freq)` with correct signature',
      'Convert text to lowercase before processing',
      'Build a frequency dictionary counting each word',
      'Filter and return only words with count >= min_freq'
    ],
    hints: [
      'Use `text.lower().split()` to get lowercase word tokens.',
      'Use dict `.get(word, 0)` to default missing word frequencies to 0.'
    ]
  }
};

export const SAMPLE_MINI_PROJECTS: Record<string, MiniProjectChallenge> = {
  'react-hooks': {
    id: 'proj-react-1',
    title: 'Build a Live Debounced API Search Component',
    objective: 'Create a custom React Hook `useDebounce` to prevent sending excessive network requests while typing into a search input.',
    steps: [
      '1. Create a `useDebounce(value, delay)` hook using `useEffect` and `setTimeout`.',
      '2. Return the debounced value and clear the timeout in the effect cleanup.',
      '3. In your main search component, pass the search query to `useDebounce(query, 500)`.',
      '4. Trigger the API fetch effect ONLY when the debounced query changes.'
    ],
    starterCode: `import { useState, useEffect } from 'react';

// Custom Hook
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`,
    requirementsChecklist: [
      { id: 'rq1', label: 'useDebounce hook implemented with useEffect and setTimeout' },
      { id: 'rq2', label: 'Cleanup function correctly clears timeout on re-run' },
      { id: 'rq3', label: 'Search component uses debounced value for API fetch trigger' },
      { id: 'rq4', label: 'API call fires only after delay (not on every keystroke)' }
    ],
    keyTakeaways: [
      'Prevents server overload during fast keypress events',
      'Demonstrates real-world use of useEffect cleanup functions',
      'Reusable custom hook design pattern'
    ]
  },
  'python': {
    id: 'proj-py-1',
    title: 'Build a CLI Resource Score Evaluator',
    objective: 'Write a Python program that reads a list of learning resource records, calculates an automated recommendation score based on rating and view count, and prints a formatted terminal summary.',
    steps: [
      '1. Define a list of dictionary resources with rating, views, and duration.',
      '2. Write a function `calc_score(resource)` returning a 0-100 score.',
      '3. Sort resources by score descending.',
      '4. Display a formatted terminal table using f-strings.'
    ],
    starterCode: `resources = [
    {"name": "React Hooks 10min", "rating": 4.9, "views": 1800000},
    {"name": "Python Fast Pass", "rating": 4.7, "views": 450000}
]`,
    requirementsChecklist: [
      { id: 'rq1', label: 'Define resources list with rating and views fields' },
      { id: 'rq2', label: 'Implement calc_score function returning 0-100 value' },
      { id: 'rq3', label: 'Sort resources by score in descending order' },
      { id: 'rq4', label: 'Print formatted output table using f-strings' }
    ],
    keyTakeaways: [
      'Manipulating complex list & dictionary datasets in Python',
      'Sorting with lambda key functions',
      'Clean terminal output formatting'
    ]
  }
};

export const SAMPLE_INTERVIEW_QUESTIONS: Record<string, InterviewQuestion[]> = {
  'react-hooks': [
    {
      id: 'iq-1',
      category: 'Conceptual',
      question: 'How does React fiber reconciliation work under the hood and how do Hooks interact with the Fiber tree?',
      hints: [
        'Mention fiber nodes as lightweight JavaScript units of work.',
        'Explain linked list structure of memoizedState.'
      ],
      sampleAnswer: 'React Fiber splits rendering into render/reconciliation phase and commit phase. Each component instance is backed by a Fiber node containing a linked list of hook objects in `memoizedState`. During re-renders, React traverses this linked list in the exact call order, matching hook calls to stored state nodes.',
      keyPoints: ['Fiber linked list structure', 'Call order preservation', 'Render vs Commit phase']
    },
    {
      id: 'iq-2',
      category: 'Coding',
      question: 'Implement a custom `usePrevious(value)` hook in React.',
      hints: [
        'Use `useRef` to store the previous value.',
        'Use `useEffect` which executes after paint.'
      ],
      sampleAnswer: `import { useRef, useEffect } from 'react';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}`,
      keyPoints: ['useRef stores mutable reference without triggering re-render', 'useEffect executes post-render snapshot']
    },
    {
      id: 'iq-3',
      category: 'Debugging',
      question: 'An effect with `useEffect(() => { fetchData(id); }, [id])` causes infinite network request loops. Why?',
      hints: [
        'Check if fetchData modifies a state variable that triggers a parent re-render or updates `id`.',
        'Check if `id` is an object reference created fresh on every render.'
      ],
      sampleAnswer: 'Infinite loops occur when state updated inside the effect causes a re-render that passes a new reference object/array for `id`. Solution: pass primitive properties or memoize object references with `useMemo`.',
      keyPoints: ['Reference inequality in dependency array', 'State update triggering top-level re-render']
    }
  ]
};


export const COMPARISON_MATRICES: Record<string, { headers: string[]; rows: { feature: string; youtube: string; coursera: string; udemy: string }[] }> = {
  'default': {
    headers: ['Feature / Dimension', 'YouTube', 'Coursera', 'Udemy'],
    rows: [
      { feature: 'Cost Model', youtube: '100% Free', coursera: 'Paid / Subscription ($49/mo)', udemy: 'Paid ($12.99 - $19.99)' },
      { feature: 'Average Duration', youtube: '10 min – 2 hours', coursera: '20 hours – 3 months', udemy: '10 hours – 50 hours' },
      { feature: 'Depth & Pacing', youtube: 'Micro-learning / Fast crash courses', coursera: 'Structured Academic & Professional', udemy: 'Comprehensive Bootcamps' },
      { feature: 'Practical Projects', youtube: '1 – 3 mini-projects', coursera: '4 – 8 graded peer projects', udemy: '10 – 20 full-stack projects' },
      { feature: 'Verified Certificate', youtube: 'None', coursera: 'Yes (Shareable Meta/Google/Univ)', udemy: 'Yes (Certificate of Completion)' },
      { feature: 'Community Feedback', youtube: 'High engagement & instant likes', coursera: 'Peer discussion forums & mentors', udemy: 'Course Q&A & direct instructor' },
      { feature: '1-Hour Session Fit', youtube: '⭐ Excellent (98% match)', coursera: '⚠️ Low (Long term modules)', udemy: '🟡 Moderate (Selected sections)' }
    ]
  }
};
