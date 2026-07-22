// CPD Foundation Program — Course Data
// Videos sourced from @createjoyhappiness YouTube channel

export const courseInfo = {
  title: "CPD Foundation Program",
  subtitle: "Elevate your teaching practice with structured, certified learning",
  organization: "Adobe Express for Education",
  faculty: [
    {
      id: 1,
      name: "Pooja Upadhyay",
      designation: "Lead Education Projects & Creative Cloud Product Marketing @ Adobe India",
      photo: null,
    },
  ],
  overview:
    "The CPD Foundation Program is a structured professional development course designed to help educators bring digital creativity into their teaching. Through guided lessons, interactive assessments, and applied projects, you will build the practical skills to create engaging learning materials and to guide your students in developing these same digital skills, empowering them to design and build projects of their own.",
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
    series: 1,
    session: 1,
    title: "CPD Series 1 - Session 1 — Implementation of NEP 2020 & SDGs in Schools through Digital Creativity",
    topic: "Implementation of NEP 2020 & SDGs in Schools through Digital Creativity",
    formLink: "https://forms.gle/RsZTh5oU9bHeaTBu7",
    introVideo: {
      youtubeId: "JKcnwdffjrM",
      title: "Session Intro — NEP 2020 & SDGs in Practice",
      duration: "Intro Video",
      thumbnail: "https://img.youtube.com/vi/JKcnwdffjrM/hqdefault.jpg",
    },
    description:
      `This session introduces educators to implementing NEP 2020 and the Sustainable Development Goals (SDGs) through digital creativity using Adobe Express. Teachers explore how technology integration, digital storytelling, and safe Generative AI can enhance classroom instruction while fostering creativity, critical thinking, and student engagement.

The session includes hands-on demonstrations of Generative AI in the classroom, showcasing practical applications across subjects such as language, mathematics, science, social science, and art. Teachers learn how to use AI-powered prompts and digital creation tools to design engaging learning experiences aligned with NEP 2020.

To support classroom implementation, tutorial videos and remixable Adobe Express templates are provided, enabling teachers to customize resources for their teaching needs or create their own content from scratch.`,
    objectives: [
      `This session introduces educators to implementing NEP 2020 and the Sustainable Development Goals (SDGs) through digital creativity using Adobe Express. Teachers explore how technology integration, digital storytelling, and safe Generative AI can enhance classroom instruction while fostering creativity, critical thinking, and student engagement.`,
      `The session includes hands-on demonstrations of Generative AI in the classroom, showcasing practical applications across subjects such as language, mathematics, science, social science, and art. Teachers learn how to use AI-powered prompts and digital creation tools to design engaging learning experiences aligned with NEP 2020.`,
      `To support classroom implementation, tutorial videos and remixable Adobe Express templates are provided, enabling teachers to customize resources for their teaching needs or create their own content from scratch.`,
    ],
    lessons: [
      "Login and Gen AI activity",
      "How to send assignments and make Assignment submission gallery using Adobe Express",
      "Quick Walkthrough of Adobe express and how to begin with your journey.",
    ],
    lessonCount: 3,
    videoCount: 3,
    quizCount: 0,
    videos: [
      {
        id: "v1-1",
        title: "Login and Gen AI activity",
        youtubeId: "y7da9oY5HbE",
        duration: "4:40",
        source: "YOUTUBE",
      },
      {
        id: "v1-2",
        title: "How to send assignments and make Assignment submission gallery using Adobe Express",
        youtubeId: "YGLejCqemto",
        duration: "11:31",
        source: "YOUTUBE",
      },
      {
        id: "v1-3",
        title: "Quick Walkthrough of Adobe express and how to begin with your journey.",
        youtubeId: "iuuC3YYBUs8",
        duration: "10:25",
        source: "YOUTUBE",
      },
    ],
    resourceSections: [
      {
        title: "Sample Templates",
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
    resources: [],
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
    series: 2,
    session: 1,
    title: "CPD Series 2 - Session 1 — Leveraging Creative Thinking and AI Enabled Pedagogies to Enhance Classroom Learning Outcomes",
    topic: "Leveraging Creative Thinking and AI Enabled Pedagogies to Enhance Classroom Learning Outcomes",
    formLink: "https://forms.gle/K5tvi1K7LYAYJjgMA",
    pptLink: "https://docs.google.com/presentation/d/1puBxFGkgAgRSjXmn_q-o-1U5zY2PuYYX/edit?slide=id.p1#slide=id.p1",
    pptTitle: "Session 1 Presentation Slides — Creative Thinking & AI Pedagogies (PPT)",
    description:
      `This session introduces educators to creative thinking, storytelling, experiential learning, and AI-enabled pedagogies to enhance student engagement and improve learning outcomes. Teachers will explore how Adobe Express can support critical and creative thinking and interactive classroom experiences through digital creativity and Generative AI.

As part of the hands-on learning experience, teachers learn to create two classroom-ready digital activities:

Flashcards
Learning Journal

To support implementation, step-by-step tutorial videos for both activities are provided for reference. Additionally, remixable Adobe Express templates are shared, allowing teachers to customize the activities according to their classroom needs or create their own versions from scratch.

This session equips educators with practical strategies and ready-to-use resources to translate policy into meaningful classroom practice and create engaging, student-centered learning experiences.`,
    objectives: [
      `This session introduces educators to creative thinking, storytelling, experiential learning, and AI-enabled pedagogies to enhance student engagement and improve learning outcomes. Teachers will explore how Adobe Express can support critical and creative thinking and interactive classroom experiences through digital creativity and Generative AI.`,
      `As part of the hands-on learning experience, teachers learn to create two classroom-ready digital activities:`,
      `Flashcards
Learning Journal`,
      `To support implementation, step-by-step tutorial videos for both activities are provided for reference. Additionally, remixable Adobe Express templates are shared, allowing teachers to customize the activities according to their classroom needs or create their own versions from scratch.`,
      `This session equips educators with practical strategies and ready-to-use resources to translate policy into meaningful classroom practice and create engaging, student-centered learning experiences.`,
    ],
    lessons: [
      "Fast Adobe Express Login Guide for Beginners",
      "Making a Concept flashcard using Adobe express",
      "Leveraging Creative Thinking and AI-Enabled Pedagogies",
      "Learning Journals using #adobeexpress",
      "How to send assignments and make Assignment submission gallery using Adobe Express",
      "Quick Walkthrough of Adobe express and how to begin with your journey.",
    ],
    lessonCount: 6,
    videoCount: 6,
    quizCount: 0,
    videos: [
      {
        id: "v2-1",
        title: "Fast Adobe Express Login Guide for Beginners",
        youtubeId: "y7da9oY5HbE",
        duration: "4:40",
        source: "YOUTUBE",
      },
      {
        id: "v2-2",
        title: "Making a Concept flashcard using Adobe express",
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
        title: "How to send assignments and make Assignment submission gallery using Adobe Express",
        youtubeId: "YGLejCqemto",
        duration: "11:31",
        source: "YOUTUBE",
      },
      {
        id: "v2-6",
        title: "Quick Walkthrough of Adobe express and how to begin with your journey.",
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
            title: "Eddy Currents — Grade 12",
            type: "Template",
            url: "https://new.express.adobe.com/webpage/I4vfTONGDUaxH/remix",
          },
          {
            title: "Learning Journal: Sample covering multiple subjects",
            type: "Template",
            url: "https://new.express.adobe.com/webpage/CitEgGQ0ZDI5y/remix",
          },
          {
            title: "Meselson and Stahl's Experiment — Grade 12",
            type: "Template",
            url: "https://new.express.adobe.com/webpage/dmpzyK5NgRAja/remix",
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
        ],
      },
      {
        title: "Flashcard Remixable Templates",
        icon: "🃏",
        resources: [
          {
            title: "Resources — Grade 8",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:5a2b36a8-5865-530a-ac68-33ab96e690c1?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
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
            title: "Structure of Atom — Grade 11",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:17b68682-fb7e-5bda-8640-9ef230ab20bd?promoid=Y69SGM5H&mv=other",
          },
          {
            title: "English Ch — Deep Water — Grade 12",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:aff855a1-00ff-5d26-a513-117b55837b99?promoid=Y69SGM5H&mv=other",
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
    series: 1,
    session: 2,
    title: "CPD Series 1 - Session 2 — Classroom Planning & Organization Skills",
    topic: "Classroom Planning & Organization Skills",
    formLink: "https://forms.gle/P2A7SJwhYWLcjsJ48",
    introVideo: {
      youtubeId: "Zt6kle6Q5ms",
      title: "Session Intro — Classroom Planning & Organization Skills",
      duration: "Intro Video",
      thumbnail: "https://img.youtube.com/vi/Zt6kle6Q5ms/hqdefault.jpg",
    },
    description:
      `This session focuses on addressing real classroom challenges such as managing multiple subjects and grade levels, balancing curriculum coverage with meaningful learning, and handling high student-teacher ratios. Educators explore how effective classroom organization can reduce instructional stress, improve productivity, and support alignment with NEP 2020 and curriculum goals.

Teachers learn to use Adobe Express to create visually organized and classroom-ready resources, including simple Lesson Plans and Class Calendars, to streamline planning and communication. The session highlights how structured planning tools help track classroom activities, improve time management, and keep students and parents informed.

To support implementation, step-by-step tutorial videos and remixable templates are provided, enabling teachers to customize resources according to their classroom needs or create their own designs from scratch.`,
    objectives: [
      `This session focuses on addressing real classroom challenges such as managing multiple subjects and grade levels, balancing curriculum coverage with meaningful learning, and handling high student-teacher ratios. Educators explore how effective classroom organization can reduce instructional stress, improve productivity, and support alignment with NEP 2020 and curriculum goals.`,
      `Teachers learn to use Adobe Express to create visually organized and classroom-ready resources, including simple Lesson Plans and Class Calendars, to streamline planning and communication. The session highlights how structured planning tools help track classroom activities, improve time management, and keep students and parents informed.`,
      `To support implementation, step-by-step tutorial videos and remixable templates are provided, enabling teachers to customize resources according to their classroom needs or create their own designs from scratch.`,
    ],
    lessons: [
      "Fast Adobe Express Login Guide for Beginners",
      "Webpage using #adobeexpress App",
      "How to send assignments and make Assignment submission gallery using Adobe Express",
      "Designing a calendar",
    ],
    lessonCount: 4,
    videoCount: 4,
    quizCount: 0,
    videos: [
      {
        id: "v3-1",
        title: "Fast Adobe Express Login Guide for Beginners",
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
        title: "How to send assignments and make Assignment submission gallery using Adobe Express",
        youtubeId: "YGLejCqemto",
        duration: "11:31",
        source: "YOUTUBE",
      },
      {
        id: "v3-4",
        title: "Designing a calendar",
        youtubeId: "G6rC8XW4WS8",
        duration: "9:39",
        source: "YOUTUBE",
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
            title: "Social Science — Grade 10",
            type: "Webpage",
            url: "https://new.express.adobe.com/webpage/1VyNxAF2zqdfW/remix",
          },
          {
            title: "Biology — Grade 12",
            type: "Webpage",
            url: "https://new.express.adobe.com/webpage/8ZKtaQM5IpkRi/remix",
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
    series: 2,
    session: 2,
    title: "CPD Series 2 - Session 2 — Socio-Emotional Learning 2.0: Deepening Impact with Digital Creativity & AI",
    topic: "Socio-Emotional Learning 2.0: Deepening Impact with Digital Creativity & AI",
    introVideo: {
      youtubeId: "2iUApCAgrvg",
      title: "Session Intro — Socio-Emotional Learning 2.0",
      duration: "Intro Video",
      thumbnail: "https://img.youtube.com/vi/2iUApCAgrvg/hqdefault.jpg",
    },
    description:
      `This session focuses on integrating Social and Emotional Learning (SEL) into everyday classroom teaching using Adobe Express. Educators and students will foster self-awareness, self-management, social awareness, relationship skills, and responsible decision-making through creative, student-centered activities. The session demonstrates how digital creativity can strengthen emotional well-being while enhancing engagement across grade levels.

Teachers will learn how to embed SEL competencies across all subjects through creative Adobe Express activities such as comic strips, My Strengths Shield, and My Calm Down Toolkit.

To support implementation, step-by-step tutorial videos and remixable templates are provided, enabling teachers to customize resources according to their classroom needs or create their own designs from scratch.`,
    objectives: [
      `This session focuses on integrating Social and Emotional Learning (SEL) into everyday classroom teaching using Adobe Express. Educators and students will foster self-awareness, self-management, social awareness, relationship skills, and responsible decision-making through creative, student-centered activities. The session demonstrates how digital creativity can strengthen emotional well-being while enhancing engagement across grade levels.`,
      `Teachers will learn how to embed SEL competencies across all subjects through creative Adobe Express activities such as comic strips, My Strengths Shield, and My Calm Down Toolkit.`,
      `To support implementation, step-by-step tutorial videos and remixable templates are provided, enabling teachers to customize resources according to their classroom needs or create their own designs from scratch.`,
    ],
    lessons: [
      "Create a Comic Strip",
      "Activity on My Strength",
      "Activity on My Calm-Down Toolkit",
    ],
    lessonCount: 3,
    videoCount: 3,
    quizCount: 0,
    videos: [
      {
        id: "v4-1",
        title: "Create a Comic Strip",
        youtubeId: "yo18LrVT1jk",
        duration: "7:33",
        source: "YOUTUBE",
      },
      {
        id: "v4-2",
        title: "Activity on My Strength",
        youtubeId: "IIadGaqO_t8",
        duration: "8:11",
        source: "YOUTUBE",
      },
      {
        id: "v4-3",
        title: "Activity on My Calm-Down Toolkit",
        youtubeId: "mYr-JUfU6gA",
        duration: "13:53",
        source: "YOUTUBE",
      },
    ],
    resourceSections: [
      {
        title: "Remixable Templates",
        icon: "📓",
        resources: [
          {
            title: "My Calm down Toolkit (5 Pages)",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:0c15af09-beb4-5f3c-ae5c-c3cff4140ad6?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
          },
          {
            title: "Self-Reflection Card- My Strength SEL",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:990e6291-fc00-52c1-965f-d8ccd4dc431c?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
          },
        ],
      },
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
            title: "Science SEL — Responsible Decision Making & Collaboration (Template 1)",
            type: "Comic Strip",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:4d6b39cc-f800-5eac-bd10-725b49a2c0f4?bloomOrigin=comicstrip",
          },
          {
            title: "Science SEL — Responsible Decision Making & Collaboration (Template 2)",
            type: "Comic Strip",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:279ae3b5-7d05-5be5-b46b-a477bcd15dd2?bloomOrigin=comicstrip",
          },
          {
            title: "Computer Science SEL — Responsible Decision Making & Ethical Tech Use",
            type: "Comic Strip",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:2d872141-98f3-53d2-9f78-c518be45debc?bloomOrigin=comicstrip",
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

  // ─── CPD Series 1 - Session 3 ────────────────────────────────────
  {
    id: 5,
    series: 1,
    session: 3,
    title: "CPD Series 1 - Session 3 — Building SocioEmotional Learning (SEL) Skills in the Classroom",
    topic: "Building SocioEmotional Learning (SEL) Skills in the Classroom",
    formLink: "https://forms.gle/VmP6cCHnyGp1MyxX6",
    introVideo: {
      youtubeId: "QgE6dME7IQU",
      title: "Session Intro — Building SocioEmotional Learning (SEL) Skills",
      duration: "Intro Video",
      thumbnail: "https://img.youtube.com/vi/QgE6dME7IQU/hqdefault.jpg",
    },
    description:
      `This session introduces educators to the core concepts of Social and Emotional Learning (SEL) and its five competencies—Self-Awareness, Self-Management, Social Awareness, Relationship Skills, and Responsible Decision-Making. Teachers explore how SEL supports student well-being, positive relationships, emotional resilience, and an inclusive classroom environment.

Using Adobe Express, educators and students learn to create engaging SEL resources such as reflective journals/gratitude journals and affirmation posters that promote SEL competencies.

To support implementation, step-by-step tutorial videos and suggestive templates which can be remixed are provided, enabling teachers to customize resources according to their classroom needs or create their own designs from scratch.`,
    objectives: [
      `This session introduces educators to the core concepts of Social and Emotional Learning (SEL) and its five competencies—Self-Awareness, Self-Management, Social Awareness, Relationship Skills, and Responsible Decision-Making. Teachers explore how SEL supports student well-being, positive relationships, emotional resilience, and an inclusive classroom environment.`,
      `Using Adobe Express, educators and students learn to create engaging SEL resources such as reflective journals/gratitude journals and affirmation posters that promote SEL competencies.`,
      `To support implementation, step-by-step tutorial videos and suggestive templates which can be remixed are provided, enabling teachers to customize resources according to their classroom needs or create their own designs from scratch.`,
    ],
    lessons: [
      "Gratitude Journal",
      "My Superpower Poster",
    ],
    lessonCount: 2,
    videoCount: 2,
    quizCount: 0,
    videos: [
      {
        id: "v5-1",
        title: "Gratitude Journal",
        youtubeId: "jW019UIr0Is",
        duration: "10:02",
        source: "YOUTUBE",
      },
      {
        id: "v5-2",
        title: "My Superpower Poster",
        youtubeId: "jRkxQEfDhG0",
        duration: "3:43",
        source: "YOUTUBE",
      },
    ],
    resourceSections: [
      {
        title: "Remixable Templates",
        icon: "📓",
        resources: [
          {
            title: "Gratitude Journal",
            type: "Template",
            url: "https://new.express.adobe.com/webpage/cKgfko4ZtrsGh/remix",
          },
          {
            title: "My Superpower Poster",
            type: "Template",
            url: "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:d2f71114-4387-5e5f-adf1-0ec75a1f7ac3?promoid=Y69SGM5H&sdid=C4SZ2FYJ&mv=other",
          },
        ],
      },
    ],
    resources: [],
    quiz: [
      {
        question: "What are the five competencies of Social and Emotional Learning (SEL)?",
        options: [
          "Reading, Writing, Math, Science, Art",
          "Self-Awareness, Self-Management, Social Awareness, Relationship Skills, Responsible Decision-Making",
          "Speaking, Listening, Presenting, Writing, Drawing",
          "Creativity, Critical Thinking, Collaboration, Communication, Citizenship",
        ],
        correct: 1,
      },
      {
        question: "Which SEL competency is developed by reflecting on things you are grateful for?",
        options: [
          "Self-Management",
          "Self-Awareness and Social Awareness",
          "Physical Fitness",
          "Computer Literacy",
        ],
        correct: 1,
      },
      {
        question: "The 'My Superpower Poster' activity primarily helps students build:",
        options: [
          "Physical strength",
          "Self-Awareness and Self-Confidence",
          "Programming skills",
          "Math speed",
        ],
        correct: 1,
      },
      {
        question: "How does a Gratitude Journal support student well-being?",
        options: [
          "By replacing their school grades",
          "By cultivating a positive mindset and empathy",
          "By teaching them typing skills",
          "By storing passwords",
        ],
        correct: 1,
      },
      {
        question: "Which Adobe Express feature allows you to customize existing SEL templates?",
        options: [
          "Crop",
          "Remix",
          "Delete",
          "Filter",
        ],
        correct: 1,
      },
    ],
  },
  // ─── CPD Series 1 - Session 4 ────────────────────────────────────
  {
    id: 7,
    series: 1,
    session: 4,
    title: "CPD Series 1 - Session 4 — Designing CompetencyBased Assessments & Meaningful Assignments",
    topic: "Designing CompetencyBased Assessments & Meaningful Assignments",
    formLink: "https://forms.gle/aWVR5NjbRAUdNVRj9",
    description: "This session explores designing competency-based assessments and meaningful assignments using Adobe Express to measure student growth, critical thinking, and digital creativity.",
    objectives: [
      "Learn practical frameworks for designing competency-based assessments in the classroom.",
      "Use Adobe Express templates to create rubrics, project briefs, and student assignments.",
      "Access session materials and submit project links via the official Google Form."
    ],
    lessons: [
      "Designing Competency-Based Assessments Framework",
      "Creating Meaningful Assignments using Adobe Express",
    ],
    lessonCount: 2,
    videoCount: 0,
    quizCount: 0,
    videos: [],
    resourceSections: [
      {
        title: "Session Form & Submissions",
        icon: "📋",
        resources: [
          {
            title: "Official Session Submission Form",
            type: "Google Form",
            url: "https://forms.gle/aWVR5NjbRAUdNVRj9",
          }
        ]
      }
    ],
    resources: [],
    quiz: []
  },
  // ─── CPD Series 1 - Session 5 ────────────────────────────────────
  {
    id: 9,
    series: 1,
    session: 5,
    title: "CPD Series 1 - Session 5 — Subject Integration( Languages, Science, Social Science, mathematics and Arts)",
    topic: "Subject Integration( Languages, Science, Social Science, mathematics and Arts)",
    formLink: "https://forms.gle/rSBAPriRzvGQr2pU7",
    description: "This session focuses on integrating digital creativity across core academic subjects including Languages, Science, Social Science, Mathematics, and Fine Arts using Adobe Express.",
    objectives: [
      "Discover cross-curricular strategies for integrating Adobe Express into daily subject lesson plans.",
      "Explore sample templates across science, math, social studies, and language arts.",
      "Access session materials and submit project links via the official Google Form."
    ],
    lessons: [
      "Cross-Curricular Digital Integration Strategies",
      "Subject-Wise Creative Projects & Digital Portfolios",
    ],
    lessonCount: 2,
    videoCount: 0,
    quizCount: 0,
    videos: [],
    resourceSections: [
      {
        title: "Session Form & Submissions",
        icon: "📋",
        resources: [
          {
            title: "Official Session Submission Form",
            type: "Google Form",
            url: "https://forms.gle/rSBAPriRzvGQr2pU7",
          }
        ]
      }
    ],
    resources: [],
    quiz: []
  },
  // ─── CPD Series 2 - Session 3 ────────────────────────────────────
  {
    id: 6,
    series: 2,
    session: 3,
    title: "CPD Series 2 - Session 3 — AI Foundations for Teachers — Responsible and Creative Use of Generative AI with Adobe Express",
    topic: "AI Foundations for Teachers — Responsible and Creative Use of Generative AI with Adobe Express",
    formLink: "https://forms.gle/FSsWjHX87VkrSdMV8",
    description: "This session introduces educators to responsible, ethical, and creative applications of Generative AI in education using Adobe Express Firefly features.",
    objectives: [
      "Understand core AI concepts, ethical guidelines, and safe usage of AI in K-12 education.",
      "Learn prompt engineering techniques to create visual learning resources in seconds.",
      "Access session materials and submit project links via the official Google Form."
    ],
    lessons: [
      "Responsible AI Framework for Educators",
      "Generative AI Prompting Techniques in Adobe Express",
    ],
    lessonCount: 2,
    videoCount: 0,
    quizCount: 0,
    videos: [],
    resourceSections: [
      {
        title: "Session Form & Submissions",
        icon: "📋",
        resources: [
          {
            title: "Official Session Submission Form",
            type: "Google Form",
            url: "https://forms.gle/FSsWjHX87VkrSdMV8",
          }
        ]
      }
    ],
    resources: [],
    quiz: []
  },
  // ─── CPD Series 2 - Session 4 ────────────────────────────────────
  {
    id: 8,
    series: 2,
    session: 4,
    title: "CPD Series 2 - Session 4 — Creating Real-World Learning Experiences through Creative Projects",
    topic: "Creating Real-World Learning Experiences through Creative Projects",
    formLink: "https://forms.gle/G8sQaQx1sMBz9TbS9",
    description: "This session guides teachers in building real-world, project-based learning experiences that foster problem-solving, collaboration, and authentic student output.",
    objectives: [
      "Design real-world project prompts that connect classroom learning to community & global issues.",
      "Guide students in publishing digital portfolios, web pages, and multimedia reports.",
      "Access session materials and submit project links via the official Google Form."
    ],
    lessons: [
      "Project-Based Learning (PBL) Design Principles",
      "Authentic Student Output & Digital Portfolios",
    ],
    lessonCount: 2,
    videoCount: 0,
    quizCount: 0,
    videos: [],
    resourceSections: [
      {
        title: "Session Form & Submissions",
        icon: "📋",
        resources: [
          {
            title: "Official Session Submission Form",
            type: "Google Form",
            url: "https://forms.gle/G8sQaQx1sMBz9TbS9",
          }
        ]
      }
    ],
    resources: [],
    quiz: []
  }
];
