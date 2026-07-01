// CPD Foundation Program — Course Data
// Videos sourced from @createjoyhappiness YouTube channel

export const courseInfo = {
  title: "CPD Foundation Program",
  subtitle: "Elevate your professional practice with structured, certified learning",
  organization: "CPD - Continuous Professional Development",
  faculty: [
    {
      id: 1,
      name: "Pooja Upadhyay",
      designation: "Lead Education Projects & Creative Cloud Product Marketing @ Adobe India",
      photo: null,
    },
  ],
  overview:
    "The CPD Foundation Program is a comprehensive continuing professional development course designed to enhance your skills, deepen your knowledge, and keep you at the forefront of your profession. Through structured video lectures, interactive quizzes, and practical assignments, you will gain the competencies needed to excel in today's rapidly evolving professional landscape.",
  benefits: [
    "Official CPD certification upon completion",
    "Access to advanced professional tools and frameworks",
    "Join a community of 10,000+ certified professionals",
    "Lifetime access to course materials and updates",
  ],
  languages: ["English", "Hindi"],
  promoVideoId: "5cJ2PbaKm8A",
};

export const modules = [
  // ─── CPD Series 1 - Session 1 ────────────────────────────────────
  {
    id: 1,
    title: "CPD Series 1 - Session 1 — Implementation of NEP 2020 & SDGs in Schools through Digital Creativity",
    topic: "Implementation of NEP 2020 & SDGs in Schools through Digital Creativity",
    description:
      "This session introduces educators to implementing NEP 2020 and the Sustainable Development Goals (SDGs) through digital creativity using Adobe Express. Teachers explore how technology integration, digital storytelling, and safe Generative AI can enhance classroom instruction while fostering creativity, critical thinking, and student engagement.\n\nThe session includes hands-on demonstrations of Generative AI in the classroom, showcasing practical applications across subjects such as language, mathematics, science, social science, and art. Teachers learn how to use AI-powered prompts and digital creation tools to design engaging learning experiences aligned with NEP 2020.\n\nTo support classroom implementation, tutorial videos and remixable Adobe Express templates are provided, enabling teachers to customize resources for their teaching needs or create their own content from scratch.",
    objectives: [
      "This session introduces educators to implementing NEP 2020 and the Sustainable Development Goals (SDGs) through digital creativity using Adobe Express. Teachers explore how technology integration, digital storytelling, and safe Generative AI can enhance classroom instruction while fostering creativity, critical thinking, and student engagement.",
      "The session includes hands-on demonstrations of Generative AI in the classroom, showcasing practical applications across subjects such as language, mathematics, science, social science, and art. Teachers learn how to use AI-powered prompts and digital creation tools to design engaging learning experiences aligned with NEP 2020.",
      "To support classroom implementation, tutorial videos and remixable Adobe Express templates are provided, enabling teachers to customize resources for their teaching needs or create their own content from scratch.",
    ],
    lessons: [
      "Login and Gen AI Activity",
      "Assignment Submission Gallery using Adobe Express",
      "Quick Walkthrough of Adobe Express",
    ],
    lessonCount: 3,
    videoCount: 3,
    quizCount: 1,
    videos: [
      {
        id: "v1-1",
        title: "Login and Gen AI Activity",
        youtubeId: "y7da9oY5HbE",
        duration: "4:40",
        source: "YOUTUBE",
      },
      {
        id: "v1-2",
        title: "How to Send Assignments and Make Assignment Submission Gallery using Adobe Express",
        youtubeId: "YGLejCqemto",
        duration: "11:31",
        source: "YOUTUBE",
      },
      {
        id: "v1-3",
        title: "Quick Walkthrough of Adobe Express and How to Begin with Your Journey",
        youtubeId: "iuuC3YYBUs8",
        duration: "10:25",
        source: "YOUTUBE",
      },
    ],
    resourceSections: [
      {
        title: "Gen AI Remixable Templates",
        icon: "🤖",
        resources: [
          {
            title: "Social Science",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:eb507fbf-d1a6-5063-afce-eeff1aa3eb6f?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
          },
          {
            title: "Mathematics",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:7cfc47f6-9a2c-5a7d-8cb1-96e6093ffcb2?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
          },
          {
            title: "Science",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:6b52bced-44b5-5ffd-b348-38099ffc6cd4?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
          },
        ],
      },
    ],
    // Keep existing resources flat array for backward compatibility
    resources: [
      {
        title: "Gen AI Template: Social Science",
        type: "Template",
        url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:eb507fbf-d1a6-5063-afce-eeff1aa3eb6f?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
      },
      {
        title: "Gen AI Template: Mathematics",
        type: "Template",
        url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:7cfc47f6-9a2c-5a7d-8cb1-96e6093ffcb2?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
      },
      {
        title: "Gen AI Template: Science",
        type: "Template",
        url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:6b52bced-44b5-5ffd-b348-38099ffc6cd4?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
      },
    ],
    quiz: [
      {
        question: "What is Adobe Express primarily used for?",
        options: [
          "Video editing software",
          "Quick and easy content creation for social media, flyers, and more",
          "3D modeling tool",
          "Code editor",
        ],
        correct: 1,
      },
      {
        question: "How can you create a free Adobe Express account?",
        options: [
          "Only through paid subscription",
          "By visiting adobe.com and signing up",
          "It's not available for free",
          "Only through schools",
        ],
        correct: 1,
      },
      {
        question: "Adobe Express is available on which platforms?",
        options: [
          "Only desktop",
          "Only mobile",
          "Both desktop browser and mobile app",
          "Only iPad",
        ],
        correct: 2,
      },
      {
        question: "What do you need to start using Adobe Express?",
        options: [
          "An Adobe Creative Cloud subscription",
          "A free Adobe account",
          "A professional design degree",
          "Photoshop installed first",
        ],
        correct: 1,
      },
      {
        question: "Which mobile platforms support Adobe Express?",
        options: [
          "Only Android",
          "Only iPhone",
          "Both Android and iPhone",
          "Only Windows Phone",
        ],
        correct: 2,
      },
      {
        question: "The login process for Adobe Express on Android and iPhone is:",
        options: [
          "Completely different",
          "Similar / the same",
          "Only available on iPhone",
          "Requires separate accounts",
        ],
        correct: 1,
      },
      {
        question: "Where can you download the Adobe Express mobile app?",
        options: [
          "Only from Adobe's website",
          "App Store and Play Store",
          "Only from Play Store",
          "It cannot be downloaded",
        ],
        correct: 1,
      },
      {
        question: "What is the first step after opening Adobe Express?",
        options: [
          "Start designing immediately",
          "Login or create an account",
          "Pay for a subscription",
          "Install plugins",
        ],
        correct: 1,
      },
      {
        question: "Can students use Adobe Express for free?",
        options: [
          "No, it requires a paid license",
          "Yes, Adobe Express has a free tier for students",
          "Only if their school pays",
          "Only during trial period",
        ],
        correct: 1,
      },
      {
        question: "What type of content can you create with Adobe Express?",
        options: [
          "Only social media posts",
          "Social media posts, flyers, webpages, videos, and more",
          "Only presentations",
          "Only photo editing",
        ],
        correct: 1,
      },
    ],
  },

  // ─── CPD Series 2 - Session 1 ────────────────────────────────────
  {
    id: 2,
    title: "CPD Series 2 - Session 1 — NEP 2020 and SDGs in Practice: A Digital Creativity-Driven Approach for Schools",
    topic: "NEP 2020 and SDGs in Practice: A Digital Creativity-Driven Approach for Schools",
    description:
      "This session introduces educators to the integration of NEP 2020 and the Sustainable Development Goals (SDGs) through digital creativity. Teachers explore how Adobe Express can support critical thinking, collaboration, digital fluency, and creative expression in the classroom.\n\nAs part of the hands-on learning experience, teachers learn to create two classroom-ready digital activities:\n\n• Flashcards\n• Learning Journal\n\nTo support implementation, step-by-step tutorial videos for both activities are provided for reference. Additionally, remixable Adobe Express templates are shared, allowing teachers to customize the activities according to their classroom needs or create their own versions from scratch.\n\nThis session equips educators with practical strategies and ready-to-use resources to translate policy into meaningful classroom practice and create engaging, student-centered learning experiences.",
    objectives: [
      "This session introduces educators to the integration of NEP 2020 and the Sustainable Development Goals (SDGs) through digital creativity. Teachers explore how Adobe Express can support critical thinking, collaboration, digital fluency, and creative expression in the classroom.",
      "As part of the hands-on learning experience, teachers learn to create two classroom-ready digital activities: Flashcards and Learning Journal.",
      "To support implementation, step-by-step tutorial videos for both activities are provided for reference. Additionally, remixable Adobe Express templates are shared, allowing teachers to customize the activities according to their classroom needs or create their own versions from scratch.",
    ],
    lessons: [
      "Fast Adobe Express Login Guide for Beginners",
      "Making a Concept Flashcard using Adobe Express",
      "Leveraging Creative Thinking and AI-Enabled Pedagogies",
      "Learning Journals using #adobeexpress",
      "Sending Assignments & Creating Submission Gallery",
      "Quick Walkthrough of Adobe Express",
    ],
    lessonCount: 6,
    videoCount: 6,
    quizCount: 1,
    videos: [
      {
        id: "v2-1",
        title: "Fast Adobe Express Login Guide for Beginners!",
        youtubeId: "y7da9oY5HbE",
        duration: "4:40",
        source: "YOUTUBE",
      },
      {
        id: "v2-2",
        title: "Making a Concept Flashcard using Adobe Express",
        youtubeId: "QX0z6FVFdQo",
        duration: "11:49",
        source: "YOUTUBE",
      },
      {
        id: "v2-3",
        title: "Leveraging Creative Thinking and AI-Enabled Pedagogies",
        youtubeId: "Zxy8CKDiV9g",
        duration: "52:19",
        source: "YOUTUBE",
      },
      {
        id: "v2-4",
        title: "Learning Journals using #adobeexpress",
        youtubeId: "5EJlK4W3jHw",
        duration: "46:34",
        source: "YOUTUBE",
      },
      {
        id: "v2-5",
        title: "How to Send Assignments and Make Assignment Submission Gallery using Adobe Express",
        youtubeId: "YGLejCqemto",
        duration: "11:31",
        source: "YOUTUBE",
      },
      {
        id: "v2-6",
        title: "Quick Walkthrough of Adobe Express and How to Begin with Your Journey",
        youtubeId: "iuuC3YYBUs8",
        duration: "10:25",
        source: "YOUTUBE",
      },
    ],
    resourceSections: [
      {
        title: "Learning Journal Remixable Templates",
        icon: "📓",
        resources: [
          {
            title: "Meselson and Stahl's Experiment — Grade 12",
            type: "Template",
            url: "https://new.express.adobe.com/webpage/dmpzyK5NgRAja/remix",
          },
          {
            title: "Eddy Currents — Grade 12",
            type: "Template",
            url: "https://new.express.adobe.com/webpage/I4vfTONGDUaxH/remix",
          },
          {
            title: "Banking — Grade 11",
            type: "Template",
            url: "https://new.express.adobe.com/webpage/zupIehE2KZJCg/remix",
          },
          {
            title: "Coordinate Geometry — Grade 10",
            type: "Template",
            url: "https://new.express.adobe.com/webpage/UilyIZD7Yo82b/remix",
          },
          {
            title: "Learning Journal: Sample covering multiple subjects",
            type: "Template",
            url: "https://new.express.adobe.com/webpage/CitEgGQ0ZDI5y/remix",
          },
        ],
      },
      {
        title: "Flashcard Remixable Templates",
        icon: "🃏",
        resources: [
          {
            title: "English Ch — Deep Water — Grade 12",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:aff855a1-00ff-5d26-a513-117b55837b99?promoid=Y69SGM5H&mv=other",
          },
          {
            title: "Structure of Atom — Grade 11",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:17b68682-fb7e-5bda-8640-9ef230ab20bd?promoid=Y69SGM5H&mv=other",
          },
          {
            title: "Pair of Linear Equations — Grade 10",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:21935a2e-f320-5c3b-8970-ff344adfee52?promoid=Y69SGM5H&mv=other",
          },
          {
            title: "Drainage — Grade 9",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:477500a7-df26-5d61-8f9a-2db528c5fe55?promoid=Y69SGM5H&mv=other",
          },
          {
            title: "Resources — Grade 8",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:5a2b36a8-5865-530a-ac68-33ab96e690c1?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
          },
        ],
      },
    ],
    resources: [],
    quiz: [
      {
        question: "Adobe Express allows you to create concept flashcards by:",
        options: [
          "Writing code",
          "Using templates and drag-and-drop tools",
          "Only uploading images",
          "Using command line",
        ],
        correct: 1,
      },
      {
        question: "What feature lets you use and modify existing Adobe Express designs?",
        options: [
          "Copy-paste",
          "Remix a template",
          "Screenshot",
          "Download and re-upload",
        ],
        correct: 1,
      },
      {
        question: "A Learning Journal in Adobe Express can include:",
        options: [
          "Only text",
          "Text, images, graphics, and interactive elements",
          "Only spreadsheets",
          "Only handwritten content",
        ],
        correct: 1,
      },
      {
        question: "The 'Remix' feature in Adobe Express allows you to:",
        options: [
          "Delete other people's work",
          "Customize and build upon shared templates",
          "Copy content without permission",
          "Only view templates",
        ],
        correct: 1,
      },
      {
        question: "Adobe Express Classrooms allow teachers to:",
        options: [
          "Only share videos",
          "Create, distribute assignments, and collect student work",
          "Only chat with students",
          "Only grade exams",
        ],
        correct: 1,
      },
      {
        question: "An Assignment Submission Gallery is used to:",
        options: [
          "Store teacher credentials",
          "Showcase and organize student-submitted work",
          "Buy Adobe products",
          "Track attendance",
        ],
        correct: 1,
      },
      {
        question: "What type of projects are best suited for Adobe Express?",
        options: [
          "Complex 3D animations",
          "Quick visual content like posters, flashcards, and webpages",
          "Database management",
          "Network administration",
        ],
        correct: 1,
      },
      {
        question: "How long does it take to create a flashcard in Adobe Express?",
        options: [
          "Several days",
          "Just a few minutes",
          "At least a week",
          "It's not possible",
        ],
        correct: 1,
      },
      {
        question: "Can students use Adobe Express for free?",
        options: [
          "No, it requires a paid license",
          "Yes, Adobe Express has a free tier for students",
          "Only if their school pays",
          "Only during trial period",
        ],
        correct: 1,
      },
      {
        question: "The overall goal of CPD Sessions with Adobe Express is:",
        options: [
          "To sell Adobe products",
          "To empower educators with creative digital tools for engaging teaching",
          "To replace traditional teaching",
          "To train graphic designers only",
        ],
        correct: 1,
      },
    ],
  },

  // ─── CPD Series 1 - Session 2 ────────────────────────────────────
  {
    id: 3,
    title: "CPD Series 1 - Session 2 — Enhance Classroom Organization with Adobe Express Lesson Plans & Calendars",
    topic: "Enhance Classroom Organization with Adobe Express Lesson Plans & Calendars",
    description:
      "This session focuses on addressing real classroom challenges such as managing multiple subjects and grade levels, balancing curriculum coverage with meaningful learning, and handling high student-teacher ratios. Educators explore how effective classroom organization can reduce instructional stress, improve productivity, and support alignment with NEP 2020 and curriculum goals.\n\nTeachers learn to use Adobe Express to create visually organized and classroom-ready resources, including simple Lesson Plans and Class Calendars, to streamline planning and communication. The session highlights how structured planning tools help track classroom activities, improve time management, and keep students and parents informed.\n\nTo support implementation, step-by-step tutorial videos and remixable templates are provided, enabling teachers to customize resources according to their classroom needs or create their own designs from scratch.",
    objectives: [
      "This session focuses on addressing real classroom challenges such as managing multiple subjects and grade levels, balancing curriculum coverage with meaningful learning, and handling high student-teacher ratios. Educators explore how effective classroom organization can reduce instructional stress, improve productivity, and support alignment with NEP 2020 and curriculum goals.",
      "Teachers learn to use Adobe Express to create visually organized and classroom-ready resources, including simple Lesson Plans and Class Calendars, to streamline planning and communication. The session highlights how structured planning tools help track classroom activities, improve time management, and keep students and parents informed.",
      "To support implementation, step-by-step tutorial videos and remixable templates are provided, enabling teachers to customize resources according to their classroom needs or create their own designs from scratch.",
    ],
    lessons: [
      "Fast Adobe Express Login Guide for Beginners",
      "Webpage using #adobeexpress App",
      "Sending Assignments and Making Submission Gallery",
      "Designing a Calendar (Coming Soon)",
    ],
    lessonCount: 4,
    videoCount: 3,
    quizCount: 1,
    videos: [
      {
        id: "v3-1",
        title: "Fast Adobe Express Login Guide for Beginners!",
        youtubeId: "y7da9oY5HbE",
        duration: "4:40",
        source: "YOUTUBE",
      },
      {
        id: "v3-2",
        title: "Webpage using #adobeexpress App",
        youtubeId: "SF4-2WsYI2E",
        duration: "4:58",
        source: "YOUTUBE",
      },
      {
        id: "v3-3",
        title: "How to Send Assignments and Make Assignment Submission Gallery using Adobe Express",
        youtubeId: "YGLejCqemto",
        duration: "11:31",
        source: "YOUTUBE",
      },
      {
        id: "v3-4",
        title: "Designing a Calendar",
        youtubeId: null,
        duration: "Coming Soon",
        source: "YOUTUBE",
        comingSoon: true,
      },
    ],
    resourceSections: [
      {
        title: "Remixable Calendar",
        icon: "📅",
        resources: [
          {
            title: "Calendar Template 1",
            type: "Calendar",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:577fc490-bd51-5a5f-896a-85c6bf4726ea?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
          },
          {
            title: "Calendar Template 2",
            type: "Calendar",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:eef6dcb4-940b-50df-9569-445f52aad627?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
          },
        ],
      },
      {
        title: "Remixable Webpage",
        icon: "🌐",
        resources: [
          {
            title: "Biology — Grade 12",
            type: "Webpage",
            url: "https://new.express.adobe.com/webpage/8ZKtaQM5IpkRi/remix",
          },
          {
            title: "Social Science — Grade 10",
            type: "Webpage",
            url: "https://new.express.adobe.com/webpage/1VyNxAF2zqdfW/remix",
          },
          {
            title: "Computer Science — Grade 8",
            type: "Webpage",
            url: "https://new.express.adobe.com/webpage/X9dwiVLMn8g5H/remix",
          },
          {
            title: "Mathematics — Grade 5",
            type: "Webpage",
            url: "https://new.express.adobe.com/webpage/M107aWSRyXTZU/remix",
          },
        ],
      },
    ],
    resources: [],
    quiz: [
      {
        question: "Adobe Express Classrooms allow teachers to:",
        options: [
          "Only share videos",
          "Create, distribute assignments, and collect student work",
          "Only chat with students",
          "Only grade exams",
        ],
        correct: 1,
      },
      {
        question: "How can students access their assignments on Adobe Express?",
        options: [
          "Through email only",
          "Through the Adobe Express Classrooms feature",
          "They cannot access assignments",
          "Only through the mobile app",
        ],
        correct: 1,
      },
      {
        question: "An Assignment Submission Gallery is used to:",
        options: [
          "Store teacher credentials",
          "Showcase and organize student-submitted work",
          "Buy Adobe products",
          "Track attendance",
        ],
        correct: 1,
      },
      {
        question: "To create a classroom on Adobe Express, you need to:",
        options: [
          "Pay for the premium version",
          "Use the classrooms feature in Adobe Express",
          "Contact Adobe support",
          "Install a separate plugin",
        ],
        correct: 1,
      },
      {
        question: "How do students submit their work back to teachers?",
        options: [
          "By emailing files",
          "Through the submission feature in Adobe Express",
          "By printing and handing in",
          "Through a third-party app",
        ],
        correct: 1,
      },
      {
        question: "What is the benefit of using a gallery in Adobe Express?",
        options: [
          "It stores passwords",
          "It showcases student creations in an organized collection",
          "It replaces the classroom",
          "It is only for teachers",
        ],
        correct: 1,
      },
      {
        question: "Teachers need to complete what process before creating classrooms?",
        options: [
          "Buy a license",
          "Teacher registration process",
          "Complete a certification",
          "Install Photoshop",
        ],
        correct: 1,
      },
      {
        question: "Can multiple students submit to the same assignment gallery?",
        options: [
          "No, only one student per gallery",
          "Yes, multiple students can submit to the same gallery",
          "Only if they pay extra",
          "Only 5 students at a time",
        ],
        correct: 1,
      },
      {
        question: "The student registration process on Adobe Express:",
        options: [
          "Requires a credit card",
          "Is simple and free",
          "Takes several weeks",
          "Requires teacher approval for each step",
        ],
        correct: 1,
      },
      {
        question: "Adobe Express classrooms help in:",
        options: [
          "Only storing files",
          "Facilitating creative learning and assignment management",
          "Playing games",
          "Social media posting only",
        ],
        correct: 1,
      },
    ],
  },

  // ─── CPD Series 2 - Session 2 ────────────────────────────────────
  {
    id: 4,
    title: "CPD Series 2 - Session 2 — Integrating Social and Emotional Learning (SEL)",
    topic: "Integrating Social and Emotional Learning (SEL) into Everyday Classroom Teaching",
    description:
      "This session focuses on integrating Social and Emotional Learning (SEL) into everyday classroom teaching using Adobe Express. Educators and students will foster self-awareness, self-management, social awareness, relationship skills, and responsible decision-making through creative, student-centered activities. The session demonstrates how digital creativity can strengthen emotional well-being while enhancing engagement across grade levels.\n\nTeachers will learn how to embed SEL competencies across all subjects through creative Adobe Express activities such as comic strips, My Strengths Shield, and My Calm Down Toolkit.\n\nTo support implementation, step-by-step tutorial videos and remixable templates are provided, enabling teachers to customize resources according to their classroom needs or create their own designs from scratch.",
    objectives: [
      "This session focuses on integrating Social and Emotional Learning (SEL) into everyday classroom teaching using Adobe Express. Educators and students will foster self-awareness, self-management, social awareness, relationship skills, and responsible decision-making through creative, student-centered activities. The session demonstrates how digital creativity can strengthen emotional well-being while enhancing engagement across grade levels.",
      "Teachers will learn how to embed SEL competencies across all subjects through creative Adobe Express activities such as comic strips, My Strengths Shield, and My Calm Down Toolkit.",
      "To support implementation, step-by-step tutorial videos and remixable templates are provided, enabling teachers to customize resources according to their classroom needs or create their own designs from scratch.",
    ],
    lessons: [
      "Explore Comic Strip Templates for SEL",
      "Embed SEL Competencies Across Subjects",
    ],
    lessonCount: 2,
    videoCount: 0,
    quizCount: 1,
    videos: [],
    resourceSections: [
      {
        title: "Comic Strip Templates",
        icon: "💬",
        resources: [
          {
            title: "Math SEL — Self Management & Relationship Skills",
            type: "Comic Strip",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:61dc92e9-51d8-5939-802e-e23408d9e133?bloomOrigin=comicstrip",
          },
          {
            title: "Science SEL — Responsible Decision Making & Collaboration",
            type: "Comic Strip",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:4d6b39cc-f800-5eac-bd10-725b49a2c0f4?bloomOrigin=comicstrip",
          },
        ],
      },
    ],
    resources: [],
    quiz: [
      {
        question: "Social and Emotional Learning (SEL) in schools helps students develop:",
        options: [
          "Only academic skills",
          "Self-awareness, self-management, social awareness, and relationship skills",
          "Only physical fitness",
          "Only test-taking skills",
        ],
        correct: 1,
      },
      {
        question: "Adobe Express can be used for SEL activities by:",
        options: [
          "Only writing essays",
          "Creating comic strips, visual stories, and creative expression activities",
          "Only taking tests",
          "Only watching videos",
        ],
        correct: 1,
      },
      {
        question: "Comic strips in SEL activities help students:",
        options: [
          "Only practice drawing",
          "Express emotions, practice decision-making, and build social skills visually",
          "Only learn about comics",
          "Only read stories",
        ],
        correct: 1,
      },
      {
        question: "The 'My Strengths Shield' activity is designed to:",
        options: [
          "Test physical strength",
          "Help students identify and celebrate their personal strengths and qualities",
          "Build actual shields",
          "Compete with classmates",
        ],
        correct: 1,
      },
      {
        question: "SEL competencies can be embedded across:",
        options: [
          "Only language arts",
          "All subjects including math, science, and social science",
          "Only physical education",
          "Only art class",
        ],
        correct: 1,
      },
      {
        question: "Responsible decision-making in SEL involves:",
        options: [
          "Always following others",
          "Making constructive choices about personal and social behavior",
          "Avoiding all decisions",
          "Only making quick decisions",
        ],
        correct: 1,
      },
      {
        question: "Digital creativity tools like Adobe Express support SEL by:",
        options: [
          "Replacing teachers",
          "Providing engaging formats for students to express emotions and practice social skills",
          "Only teaching technology",
          "Only grading students",
        ],
        correct: 1,
      },
      {
        question: "The 'My Calm Down Toolkit' activity helps students:",
        options: [
          "Only sit quietly",
          "Identify and practice healthy coping strategies for managing emotions",
          "Only meditate",
          "Only exercise",
        ],
        correct: 1,
      },
      {
        question: "Collaboration skills in SEL are developed through:",
        options: [
          "Working alone",
          "Group activities, shared creative projects, and peer feedback",
          "Only competitions",
          "Only tests",
        ],
        correct: 1,
      },
      {
        question: "The overall benefit of integrating SEL with digital creativity is:",
        options: [
          "To sell Adobe products",
          "To strengthen emotional well-being while enhancing engagement and learning",
          "To replace traditional teaching",
          "To make students use computers more",
        ],
        correct: 1,
      },
    ],
  },
];
