export type Language = 'en' | 'bn';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: 'campus' | 'tech' | 'study' | 'reflections';
  categoryLabel: string;
  imageUrl: string;
  imageCaption?: string;
  isCustom?: boolean;
}

export interface BlogContentStrings {
  kicker: string;
  title: string;
  subtitle: string;
  addPostBtn: string;
  filterAll: string;
  filterCampus: string;
  filterTech: string;
  filterStudy: string;
  filterReflections: string;
  readStory: string;
  deletePost: string;
  deleteConfirm: string;
  noPosts: string;
  modalAddTitle: string;
  modalAddDesc: string;
  labelTitle: string;
  placeholderTitle: string;
  labelCategory: string;
  catCampus: string;
  catTech: string;
  catStudy: string;
  catReflections: string;
  labelImage: string;
  uploadPhoto: string;
  uploadHint: string;
  orImageUrl: string;
  placeholderImageUrl: string;
  presetPhotos: string;
  labelDate: string;
  labelReadTime: string;
  labelContent: string;
  placeholderContent: string;
  btnCancel: string;
  btnPublish: string;
  successAdded: string;
  close: string;
  initialPosts: BlogPost[];
}

export interface ContentStrings {
  nav: {
    about: string;
    blog: string;
    academics: string;
    lifestyle: string;
    aspirations: string;
    contact: string;
    getInTouch: string;
    switchLangTooltip: string;
  };
  hero: {
    kicker: string;
    greeting: string;
    name: string;
    subtitle: string;
    bio: string;
    ctaWork: string;
    ctaContact: string;
    schoolTag: string;
    avatarName: string;
    avatarTag: string;
    kpi: {
      rankLabel: string;
      rankVal: string;
      rankSub: string;
      buildsLabel: string;
      buildsVal: string;
      buildsSub: string;
      awardsLabel: string;
      awardsVal: string;
      awardsSub: string;
      booksLabel: string;
      booksVal: string;
      booksSub: string;
    };
  };
  about: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    strengths: Array<{
      title: string;
      desc: string;
      tags: string[];
    }>;
  };
  blog: BlogContentStrings;
  academics: {
    kicker: string;
    title: string;
    subtitle: string;
    timelineTitle: string;
    timeline: Array<{
      title: string;
      period: string;
      tag: string;
      desc: string;
    }>;
    subjectsTitle: string;
    subjects: Array<{
      name: string;
      score: string;
      desc: string;
      pct: string;
    }>;
    awardsTitle: string;
    awards: Array<{
      medal: string;
      title: string;
      event: string;
    }>;
  };
  lifestyle: {
    kicker: string;
    title: string;
    subtitle: string;
    tabRoutine: string;
    tabHobbies: string;
    tabBooks: string;
    tabJournal: string;
    routineHeader: string;
    routineSub: string;
    cadenceTag: string;
    routineList: Array<{
      time: string;
      title: string;
      desc: string;
    }>;
    hobbiesHeader: string;
    hobbiesSub: string;
    hobbiesList: Array<{
      title: string;
      desc: string;
    }>;
    booksHeader: string;
    booksSub: string;
    booksCategoryLabel: string;
    booksList: Array<{
      title: string;
      author: string;
      desc: string;
      status: string;
    }>;
    podcastsCategoryLabel: string;
    podcastsList: Array<{
      title: string;
      host: string;
      desc: string;
    }>;
    journalHeader: string;
    journalSub: string;
    journalList: Array<{
      tag: string;
      date: string;
      title: string;
      text: string;
    }>;
  };
  aspirations: {
    kicker: string;
    title: string;
    bio: string;
    cards: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
    mottoText: string;
    mottoAuthor: string;
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    labelName: string;
    labelEmail: string;
    labelSubject: string;
    labelMessage: string;
    btnSubmit: string;
    btnSending: string;
    successTitle: string;
    successDesc: string;
    errorTitle: string;
    errorDesc: string;
    btnOpenMail: string;
    btnReset: string;
    inboxNotice: string;
    directTitle: string;
    directSub: string;
    btnCopy: string;
    btnCopied: string;
    socialTitle: string;
    linkFacebook: string;
    linkWhatsapp: string;
    linkJournal: string;
  };
  footer: {
    copyright: string;
    backToTop: string;
  };
}

export const TRANSLATIONS: Record<Language, ContentStrings> = {
  en: {
    nav: {
      about: 'About',
      blog: 'Blog',
      academics: 'Academics',
      lifestyle: 'Lifestyle',
      aspirations: 'Aspirations',
      contact: 'Contact',
      getInTouch: 'Get in Touch',
      switchLangTooltip: 'Switch to Bangla (বাংলা)',
    },
    hero: {
      kicker: 'Student Portfolio · Secondary Education',
      greeting: "Hi, I'm",
      name: 'Ali Arafat',
      subtitle: 'Class 10 Student, Tech Enthusiast, & Lifelong Learner',
      bio: 'Currently preparing for secondary board exams while immersing myself in science, mathematics, and technological inquiry. I love transforming curiosity into understanding, clear thinking, and disciplined study habits.',
      ctaWork: 'Explore Academics',
      ctaContact: 'Contact Me',
      schoolTag: "St. Xavier's Model Secondary · Class 10 (Science Stream) · Batch 2026",
      avatarName: 'Ali Arafat',
      avatarTag: 'Curious Mind · Scholar · Class 10 Student',
      kpi: {
        rankLabel: 'Academic Rank',
        rankVal: 'Top 5%',
        rankSub: 'Consistent grade-point honors',
        buildsLabel: 'Science Inquiry',
        buildsVal: '100% Focus',
        buildsSub: 'Physics, chemistry & math',
        awardsLabel: 'Science Honors',
        awardsVal: '3 Awards',
        awardsSub: 'Olympiad & science fairs',
        booksLabel: 'Books Explored',
        booksVal: '40+ Books',
        booksSub: 'Science, history & philosophy',
      },
    },
    about: {
      kicker: 'Background & Philosophy',
      title: 'Balancing Rigor, Curiosity, and Everyday Life',
      p1: 'As a Class 10 student in Bangladesh, my days are a dynamic blend of balancing quadratic equations, physics formulas, and preparing for milestone board examinations. But beyond the textbooks, what truly energizes me is understanding fundamental principles—whether that means exploring mathematical proofs, understanding physical laws, or discussing historical turning points.',
      p2: 'I believe that being a well-rounded student means pairing discipline with playful exploration. When I am not at my study desk or in the physics lab, you can find me playing goalkeeper on the football field or reading fascinating chapters on cosmology.',
      strengths: [
        {
          title: 'Problem Solving',
          desc: 'Approaching mathematical puzzles and complex questions systematically with patience, breaking multi-step challenges into manageable first principles.',
          tags: ['Algebra', 'Analytical Reasoning', 'Logic'],
        },
        {
          title: 'Creative Thinking',
          desc: 'Combining technical curiosity with expressive communication—from drafting structured notes to writing thought-provoking essays on emerging science.',
          tags: ['Conceptual Clarity', 'Science Writing', 'Curiosity'],
        },
        {
          title: 'Collaboration & Leadership',
          desc: 'Active member of the School Science Club and sports squads. Experienced in coordinating group assignments, mentoring junior students, and active listening.',
          tags: ['Science Club', 'Team Sports', 'Peer Tutoring'],
        },
      ],
    },
    blog: {
      kicker: 'Photo Journal & Student Stories',
      title: 'Life in Pictures & Student Blog',
      subtitle: 'Snapshots from campus mornings, robotics experiments, study routines, and personal reflections. Add your own memories with photos anytime.',
      addPostBtn: 'Add New Post with Photos',
      filterAll: 'All Stories',
      filterCampus: 'Campus Life',
      filterTech: 'STEM & Robotics',
      filterStudy: 'Study Habits',
      filterReflections: 'Reflections',
      readStory: 'Read Full Story',
      deletePost: 'Delete',
      deleteConfirm: 'Are you sure you want to delete this blog post?',
      noPosts: 'No posts found in this category. Be the first to share one!',
      modalAddTitle: 'Create New Blog Post',
      modalAddDesc: 'Share a story from school, an experiment, or everyday life with your pictures.',
      labelTitle: 'Post Title *',
      placeholderTitle: 'e.g., Morning Assembly & Science Exhibition Prep',
      labelCategory: 'Category *',
      catCampus: 'Campus Life',
      catTech: 'STEM & Robotics',
      catStudy: 'Study Habits',
      catReflections: 'Reflections',
      labelImage: 'Post Picture *',
      uploadPhoto: 'Upload photo from device',
      uploadHint: 'PNG, JPG, WEBP up to 5MB. Preview appears instantly.',
      orImageUrl: 'Or enter an image web URL',
      placeholderImageUrl: 'https://...',
      presetPhotos: 'Or choose a preset photo',
      labelDate: 'Date *',
      labelReadTime: 'Read Time',
      labelContent: 'Story & Narrative *',
      placeholderContent: 'Write your thoughts, experience, or what made this moment special...',
      btnCancel: 'Cancel',
      btnPublish: 'Publish Post',
      successAdded: 'Blog post published successfully with your picture!',
      close: 'Close',
      initialPosts: [
        {
          id: 'post-1',
          title: 'Morning Walk Through Our Historic School Corridors',
          excerpt: 'Walking through the red brick archways under the morning mahogany shade reminds me how precious these final school years are.',
          content: 'Every morning as the clock strikes 7:45 AM, the school gates open to a familiar rhythm of laughter, brisk footsteps, and teachers welcoming us at the foyer. St. Gregory’s red brick architecture, with its towering verandas and century-old mahogany trees, has a way of grounding you in purpose.\n\nAs Class 10 students, we all carry a quiet awareness that this is our final year in these uniform shirts before board exams separate us into college streams. We gathered near the auditorium today discussing our physics practicals and sharing tiffin sandwiches. Capturing this candid view reminds me to enjoy the journey, not just chase exam grades.',
          date: 'October 28, 2025',
          readTime: '3 min read',
          category: 'campus',
          categoryLabel: 'Campus Life',
          imageUrl: '/images/blog_campus.jpg',
          imageCaption: 'Classmates gathering along the historic verandas before morning assembly.',
        },
        {
          id: 'post-2',
          title: 'Hands-on with Arduino: Bringing Our Science Club Bench to Life',
          excerpt: 'Three evenings of methodical circuit wiring taught me that patience is as critical in engineering as clean code.',
          content: 'There is a special thrill in moving from textbook circuit schematics to physical breadboards where LEDs actually light up and sensors send live readings. In our Friday science club workshop, we tackled an analog soil moisture probe hooked to an Arduino microcontroller.\n\nWe faced an elusive bug where the LED indicator stayed dark despite 5V supply. After tracing ground wires with a multimeter, we found a microscopic loose pin. That moment when the circuit flashed green was pure magic. Hands-on experimentation bridges theoretical physics and real problem solving like nothing else.',
          date: 'September 14, 2025',
          readTime: '4 min read',
          category: 'tech',
          categoryLabel: 'STEM & Robotics',
          imageUrl: '/images/blog_robotics.jpg',
          imageCaption: 'Debugging breadboard connections and Arduino circuitry during science club.',
        },
        {
          id: 'post-3',
          title: 'Crafting a Calm Study Routine for Class 10 Pre-Boards',
          excerpt: 'Why 45-minute focused study sprints beat 4-hour continuous cramming when mastering Higher Math and Physics.',
          content: 'With board examinations looming on the calendar, anxiety is easy to stumble into. Over the last semester, I redesigned my entire study environment to prioritize focus over brute exhaustion.\n\nI keep my wooden desk clear of everything except the chapter at hand, a spiral notebook for handwritten derivations, and a glass of water. Working in 45-minute Pomodoro blocks with 10-minute breaks to stretch and listen to instrumental music keeps my mind fresh. Consistency beats frantic late-night cramming every single time.',
          date: 'August 22, 2025',
          readTime: '3 min read',
          category: 'study',
          categoryLabel: 'Study Habits',
          imageUrl: '/images/lifestyle_books_study_1793686325956.jpg',
          imageCaption: 'My quiet morning revision desk with formulas and revision checklists.',
        },
        {
          id: 'post-4',
          title: 'Automated Greenhouse: Lessons from Our Regional Science Fair',
          excerpt: 'Building a sensor-driven irrigation prototype and presenting it to visiting judges taught me the power of applied science.',
          content: 'Our automated greenhouse prototype was conceived during a biology class discussion on seasonal drought. Combining DHT11 climate sensors, a miniature submersible pump, and Arduino logic, we demonstrated how small farms can automate watering cycles.\n\nPresenting the live demo to junior students and visiting evaluators was the most rewarding part. Seeing eyes light up when the moisture sensor triggered the pump proved that student engineering can spark curiosity across our whole school community.',
          date: 'July 18, 2025',
          readTime: '4 min read',
          category: 'tech',
          categoryLabel: 'STEM & Robotics',
          imageUrl: '/images/project_science_stem_1793686326788.jpg',
          imageCaption: 'The working IoT greenhouse model showcased at the school science exhibition.',
        },
      ],
    },
    academics: {
      kicker: 'Education & Milestones',
      title: 'Academic Journey & Distinctions',
      subtitle: 'Highlights of school progress, favorite fields of inquiry, and recognition in regional competitions.',
      timelineTitle: 'School Progress Timeline',
      timeline: [
        {
          title: 'Class 10 (Secondary Board Preparation)',
          period: '2025 – Present',
          tag: "St. Xavier's Model Secondary School",
          desc: 'Currently specializing in Advanced Science & Mathematics track. Leading the school STEM delegation and participating in pre-board mock examinations with steady 94%+ marks average.',
        },
        {
          title: 'Class 9 (Junior High Milestone)',
          period: '2024 – 2025',
          tag: 'Academic Excellence Honor Roll',
          desc: 'Achieved Distinction in Science and Information Technology. Represented school in the Inter-School Science Exhibition with academic honors.',
        },
        {
          title: 'Class 8 (Foundational Honors)',
          period: '2023 – 2024',
          tag: 'Best All-Rounder Student Nominee',
          desc: 'Discovered deep enthusiasm for mathematics and science; selected for the school junior science society.',
        },
      ],
      subjectsTitle: 'Favorite Subjects',
      subjects: [
        {
          name: 'Physical & Chemical Sciences',
          score: '96% Avg',
          desc: 'Laws of motion, optics, electromagnetism, and chemical bonding reactions.',
          pct: '96%',
        },
        {
          name: 'Computer Science & IT',
          score: '98% Avg',
          desc: 'Algorithms, conditional loops, web architectures, and basic cybersecurity fundamentals.',
          pct: '98%',
        },
        {
          name: 'Mathematics',
          score: '93% Avg',
          desc: 'Trigonometric identities, polynomials, surface areas & volumes, and probability models.',
          pct: '93%',
        },
      ],
      awardsTitle: 'Key Awards & Honors',
      awards: [
        {
          medal: '🥈 Silver Medalist',
          title: 'Inter-School Science Olympiad 2025',
          event: 'District Secondary Science League',
        },
        {
          medal: '🥉 2nd Runner Up',
          title: 'Regional Junior Hackathon 2025',
          event: 'Green Tech Innovation Track',
        },
        {
          medal: '🎤 Best Speaker',
          title: 'Annual Inter-House Debate 2024',
          event: 'Technology Ethics & Society Topic',
        },
        {
          medal: '🌟 High Distinction',
          title: 'Math Talent Search Examination',
          event: 'National Junior Mathematics League',
        },
      ],
    },
    lifestyle: {
      kicker: 'Life Beyond The Desk',
      title: 'Lifestyle & Personal Interests',
      subtitle: 'A peek into my daily habits, creative hobbies, media library, and journal reflections.',
      tabRoutine: 'Daily Routine',
      tabHobbies: 'Hobbies & Sports',
      tabBooks: 'Books & Media Shelf',
      tabJournal: 'Student Journal',
      routineHeader: 'Time Management & Study Habits',
      routineSub: 'Constructing a sustainable rhythm between board syllabus and deep creative focus.',
      cadenceTag: 'Pomodoro 50/10 Cadence',
      routineList: [
        {
          time: '06:00 – 07:30 AM',
          title: 'Early Morning Prime',
          desc: 'Revision of theoretical physics formulas and biology diagrams when retention is highest.',
        },
        {
          time: '08:00 AM – 03:00 PM',
          title: 'School & Lab Sessions',
          desc: 'Active classroom participation, laboratory experiments, and group collaboration.',
        },
        {
          time: '04:30 – 06:00 PM',
          title: 'Sports & Reset',
          desc: 'Football drills or outdoor cycling to clear the mind and stay physically fit.',
        },
        {
          time: '07:30 – 10:00 PM',
          title: 'Deep Work & Reading',
          desc: 'Solving advanced mathematics problems, followed by 45 minutes of evening reflective reading.',
        },
      ],
      hobbiesHeader: 'Passions, Sports & Interests',
      hobbiesSub: 'Activities that fuel imagination, resilience, and tactical teamwork.',
      hobbiesList: [
        {
          title: 'Tech & Computational Thinking',
          desc: 'Exploring logical problem solving, scripting in Python, and experimenting with computational concepts.',
        },
        {
          title: 'Football & Athletics',
          desc: 'Playing competitive football as goalkeeper and defender for the school team. It has taught me split-second decision making, communication under pressure, and mental stamina.',
        },
        {
          title: 'Science Communication',
          desc: 'Translating intricate science concepts—like special relativity or gravity—into relatable, illustrated notes and essays for school peers.',
        },
      ],
      booksHeader: 'Recommended Reads & Audio Shelf',
      booksSub: 'Works that expanded how I view science, habits, and computational history.',
      booksCategoryLabel: 'Books On My Desk',
      booksList: [
        {
          title: 'A Brief History of Time',
          author: 'Stephen Hawking',
          desc: 'Sparked my fascination with cosmological horizons and gravity.',
          status: 'Finished',
        },
        {
          title: 'Atomic Habits',
          author: 'James Clear',
          desc: 'Shaped how I approach daily study intervals and compounding knowledge.',
          status: 'Essential',
        },
        {
          title: 'Ignited Minds',
          author: 'Dr. A.P.J. Abdul Kalam',
          desc: 'A constant reminder of using science for societal empowerment.',
          status: 'Inspiring',
        },
      ],
      podcastsCategoryLabel: 'Podcasts & Channels',
      podcastsList: [
        {
          title: 'Veritasium & 3Blue1Brown',
          host: 'Visual Math & Physics',
          desc: 'Masterclasses in conceptual clarity and intuitive math representations.',
        },
        {
          title: 'Lex Fridman Podcast',
          host: 'AI, Robotics & Physics Interviews',
          desc: 'Long-form conversations on robotics, mathematics, and computing history.',
        },
        {
          title: 'Radiolab',
          host: 'WNYC Studios',
          desc: 'Fascinating documentary storytelling at the intersection of science and humanity.',
        },
      ],
      journalHeader: 'Student Journal & Learning Reflections',
      journalSub: 'Candid thoughts on learning curves, exam pressure, and personal growth.',
      journalList: [
        {
          tag: 'Reflection #12',
          date: 'October 2025',
          title: 'What hands-on experiments taught me about patience',
          text: '"In textbooks, every law of physics feels clean and predictable. In the lab, when an experiment yields unexpected data, you have to verify every variable. That patience taught me more about methodical inquiry than reading alone ever could."',
        },
        {
          tag: 'Reflection #08',
          date: 'August 2025',
          title: 'Balancing Class 10 board prep with personal passions',
          text: '"A lot of older students told me I had to give up all personal interests for Class 10. I found that completely shutting off curiosity makes studying harder. Setting aside time for reading and exercise acts like a mental palate cleanser—it makes study sessions twice as sharp."',
        },
      ],
    },
    aspirations: {
      kicker: 'Vision & Ambitions',
      title: 'Future Aspirations & Road Ahead',
      bio: 'Looking beyond Class 10, my aspiration is to study Computer Science and Engineering at a premier institution, combining high-speed algorithmic thinking with physical science to tackle real-world challenges like clean energy and educational equity.',
      cards: [
        {
          step: '01. Next 2 Years (High School)',
          title: 'Senior Secondary Excellence',
          desc: 'Opt for Physics, Chemistry, and Mathematics (PCM) with Computer Science. Compete in the National Science Olympiad and develop strong academic fundamentals.',
        },
        {
          step: '02. University Horizon',
          title: 'Computer Science & Systems',
          desc: 'Pursue an undergraduate degree in Computer Engineering. Explore embedded operating systems, artificial intelligence, and distributed computing architectures.',
        },
        {
          step: '03. Long-Term Mission',
          title: 'Tech for Tangible Impact',
          desc: 'Build sustainable, open technology systems—like intelligent environmental probes or accessible offline educational toolkits—that deliver measurable help to communities.',
        },
      ],
      mottoText:
        '"Technology is at its best when it solves real everyday problems for ordinary people—not just when it looks impressive on a screen."',
      mottoAuthor: '— Ali Arafat, Personal Motto',
    },
    contact: {
      kicker: 'Say Hello',
      title: 'Get in Touch',
      subtitle:
        'Whether you want to discuss a student science topic, share a book recommendation, or connect, I’d love to hear from you!',
      labelName: 'Your Name *',
      labelEmail: 'Your Email *',
      labelSubject: 'Subject / Topic',
      labelMessage: 'Message *',
      btnSubmit: 'Send Message',
      btnSending: 'Sending Message...',
      successTitle: 'Message Delivered to Inbox!',
      successDesc: 'Thank you for reaching out! Your message was sent directly to aliarafat57000@gmail.com. Ali will get back to your note soon after school hours.',
      errorTitle: 'Delivery Issue',
      errorDesc: 'Could not send automatically via the server. You can click below to send directly using your email app or Gmail.',
      btnOpenMail: 'Send via Email App',
      btnReset: 'Send Another Message',
      inboxNotice: 'Messages sent here are delivered directly to Ali’s Gmail inbox (aliarafat57000@gmail.com).',
      directTitle: 'Direct Communication',
      directSub: "Feel free to copy Ali's student contact email or connect via safe educational profiles.",
      btnCopy: 'Copy',
      btnCopied: 'Copied!',
      socialTitle: 'Social Profiles & Direct Chat',
      linkFacebook: 'Facebook (aliarafat.5203)',
      linkWhatsapp: 'WhatsApp (+880 1804-734908)',
      linkJournal: 'Student Journal & Notes',
    },
    footer: {
      copyright: 'Ali Arafat. Crafted with care for curiosity, science, and learning.',
      backToTop: 'Back to Top ↑',
    },
  },
  bn: {
    nav: {
      about: 'পরিচিতি',
      blog: 'ব্লগ',
      academics: 'শিক্ষাজীবন',
      lifestyle: 'জীবনযাপন',
      aspirations: 'ভবিষ্যৎ লক্ষ্য',
      contact: 'যোগাযোগ',
      getInTouch: 'বার্তা পাঠান',
      switchLangTooltip: 'Switch to English',
    },
    hero: {
      kicker: 'শিক্ষার্থী পোর্টফোলিও · মাধ্যমিক শিক্ষা',
      greeting: 'হ্যালো, আমি',
      name: 'আলী আরাফাত',
      subtitle: '১০ম শ্রেণির শিক্ষার্থী, বিজ্ঞানপ্রেমী ও আজীবন শিক্ষার্থী',
      bio: 'বর্তমানে মাধ্যমিক পরীক্ষার প্রস্তুতির পাশাপাশি বিজ্ঞান, গণিত ও প্রযুক্তি অনুসন্ধানে নিবেদিত। পাঠ্যবইয়ের তাত্ত্বিক ধারণাকে গভীর উপলব্ধি, শৃঙ্খলিত চিন্তা এবং বাস্তব জ্ঞানে রূপান্তর করতে আমি ভীষণ ভালোবাসি।',
      ctaWork: 'শিক্ষাজীবন ও অর্জন',
      ctaContact: 'যোগাযোগ করুন',
      schoolTag: 'সেন্ট জেভিয়ার্স মডেল সেকেন্ডারি স্কুল · ১০ম শ্রেণি (বিজ্ঞান বিভাগ) · ব্যাচ ২০২৬',
      avatarName: 'আলী আরাফাত',
      avatarTag: 'কৌতূহলী শিক্ষার্থী · বিজ্ঞানমনস্ক · ১০ম শ্রেণি',
      kpi: {
        rankLabel: 'মেধা অবস্থান',
        rankVal: 'শীর্ষ ৫%',
        rankSub: 'ধারাবাহিক একাডেমিক সম্মাননা',
        buildsLabel: 'বিজ্ঞান চর্চা',
        buildsVal: '১০০% নিষ্ঠা',
        buildsSub: 'পদার্থ, রসায়ন ও গণিত',
        awardsLabel: 'বিজ্ঞান সম্মাননা',
        awardsVal: '৩টি পদক',
        awardsSub: 'অলিম্পিয়াড ও বিজ্ঞান মেলা',
        booksLabel: 'পঠিত প্রিয় বই',
        booksVal: '৪০+ বই',
        booksSub: 'বিজ্ঞান, ইতিহাস ও মননশীল বই',
      },
    },
    about: {
      kicker: 'পরিচিতি ও জীবনদর্শন',
      title: 'পড়াশোনা, কৌতূহল এবং দৈনন্দিন জীবনের চমৎকার ভারসাম্য',
      p1: 'বাংলাদেশের একজন ১০ম শ্রেণির শিক্ষার্থী হিসেবে আমার দিনগুলো কাটে সমীকরণ সমাধান, পদার্থবিজ্ঞানের সূত্রের গভীর বিশ্লেষণ এবং গুরুত্বপূর্ণ মাধ্যমিক পরীক্ষার প্রস্তুতির মধ্য দিয়ে। তবে শুধু মুখস্থ না করে মৌলিক বিজ্ঞান কীভাবে কাজ করে তা বোঝার মধ্যেই আমার আসল আনন্দ—সেটা কোনো গাণিতিক উপপাদ্য প্রমাণ হোক কিংবা প্রকৃতির নিয়ম অন্বেষণ করা হোক।',
      p2: 'আমি বিশ্বাস করি একজন আদর্শ শিক্ষার্থীর জীবন গড়ে ওঠে নিয়মানুবর্তিতা ও স্বতঃস্ফূর্ত উদ্ভাবনী কৌতূহলের মেলবন্ধনে। পড়ার টেবিল বা বিজ্ঞানের গবেষণাগারের বাইরে আমাকে দেখা যাবে ফুটবল মাঠে গোলকিপারের দায়িত্ব সামলাতে কিংবা মহাবিশ্ব ও জ্যোতির্বিজ্ঞানের চমৎকার কোনো বইয়ের পাতায় ডুবে থাকতে।',
      strengths: [
        {
          title: 'সমস্যা সমাধান (Problem Solving)',
          desc: 'ধৈর্যের সাথে গাণিতিক সমস্যা ও জটিল প্রশ্নের কারণ বিশ্লেষণ করা এবং বিষয়গুলোকে ক্ষুদ্র অংশে ভাগ করে যৌক্তিক সমাধান বের করা।',
          tags: ['বীজগণিত', 'যৌক্তিক বিশ্লেষণ', 'গাণিতিক যুক্তি'],
        },
        {
          title: 'সৃজনশীল চিন্তা (Creative Thinking)',
          desc: 'তত্ত্ব ও ধারণার গভীর উপলব্ধি—বিজ্ঞানের জটিল সূত্রগুলোকে সহজ ভাষায় সুন্দর নোট ও চিন্তাশীল লেখার মাধ্যমে প্রকাশ করা।',
          tags: ['ধারণাগত স্পষ্টতা', 'বিজ্ঞান সাহিত্য', 'অনুসন্ধানী মন'],
        },
        {
          title: 'দলগত নেতৃত্ব ও সহযোগিতা (Teamwork & Leadership)',
          desc: 'স্কুল বিজ্ঞান ক্লাবের সক্রিয় সদস্য ও ক্রীড়া দলের নেতৃত্ব। সহপাঠীদের সাথে দলগত কাজের চমৎকার সমন্বয় এবং ছোটদের পড়াশোনায় উৎসাহিত করার অভিজ্ঞতা।',
          tags: ['বিজ্ঞান ক্লাব', 'দলগত ক্রীড়া', 'সহশিক্ষা ও মেন্টরিং'],
        },
      ],
    },
    blog: {
      kicker: 'স্মৃতিচিত্র ও শিক্ষার্থী জার্নাল',
      title: 'আমার ব্লগ ও ছবির গল্প',
      subtitle: 'স্কুল প্রাঙ্গণের সকাল, রোবোটিক্স ল্যাবের রোমাঞ্চ, পড়াশোনার রুটিন ও চিন্তাভাবনার ছবির সংগ্রহ। আপনিও সহজেই নিজের ছবি ও অভিজ্ঞতা যুক্ত করতে পারেন।',
      addPostBtn: 'ছবিসহ নতুন পোস্ট যোগ করুন',
      filterAll: 'সকল পোস্ট',
      filterCampus: 'ক্যাম্পাস জীবন',
      filterTech: 'বিজ্ঞান ও প্রযুক্তি',
      filterStudy: 'পড়াশোনা ও প্রস্তুতি',
      filterReflections: 'ভাবনা ও অনুভূতি',
      readStory: 'বিস্তারিত পড়ুন',
      deletePost: 'মুছুন',
      deleteConfirm: 'আপনি কি নিশ্চিতভাবে এই ব্লগ পোস্টটি মুছে ফেলতে চান?',
      noPosts: 'এই ক্যাটাগরিতে এখনও কোনো পোস্ট নেই। নতুন পোস্ট যোগ করতে উপরের বাটনে ক্লিক করুন!',
      modalAddTitle: 'ছবিসহ নতুন ব্লগ পোস্ট লিখুন',
      modalAddDesc: 'আপনার স্কুলের কোনো মুহূর্ত, বিজ্ঞান প্রজেক্ট বা দৈনন্দিন অভিজ্ঞতার ছবি ও গল্প শেয়ার করুন।',
      labelTitle: 'পোস্টের শিরোনাম *',
      placeholderTitle: 'যেমন: স্কুল প্রাঙ্গণের সকাল ও বিজ্ঞান মেলা প্রস্তুতি',
      labelCategory: 'ক্যাটাগরি *',
      catCampus: 'ক্যাম্পাস জীবন',
      catTech: 'বিজ্ঞান ও প্রযুক্তি',
      catStudy: 'পড়াশোনা ও প্রস্তুতি',
      catReflections: 'ভাবনা ও অনুভূতি',
      labelImage: 'পোস্টের ছবি *',
      uploadPhoto: 'ডিভাইস থেকে ছবি আপলোড করুন',
      uploadHint: 'PNG, JPG, WEBP (সর্বোচ্চ ৫ মেগাবাইট)। তাৎক্ষণিক প্রিভিউ দেখতে পাবেন।',
      orImageUrl: 'অথবা ছবির ওয়েব লিংক দিন',
      placeholderImageUrl: 'https://...',
      presetPhotos: 'অথবা গ্যালারি থেকে ছবি বেছে নিন',
      labelDate: 'তারিখ *',
      labelReadTime: 'পড়ার সময়',
      labelContent: 'মূল লেখা ও বর্ণনা *',
      placeholderContent: 'আপনার অভিজ্ঞতা, অনুভূতি বা এই মুহূর্তটির বিশেষত্ব সম্পর্কে লিখুন...',
      btnCancel: 'বাতিল',
      btnPublish: 'পোস্ট প্রকাশ করুন',
      successAdded: 'ছবিসহ আপনার ব্লগ পোস্টটি সফলভাবে প্রকাশিত হয়েছে!',
      close: 'বন্ধ করুন',
      initialPosts: [
        {
          id: 'post-1',
          title: 'ঐতিহাসিক স্কুল বারান্দায় সকালের স্মৃতি ও সহপাঠীদের আড্ডা',
          excerpt: 'সকালের স্নিগ্ধ রোদে লাল ইটের বারান্দা ও শতবর্ষী মেহগনি গাছের ছায়ায় হাঁটলে মনে পড়ে যায় স্কুলজীবনের এই শেষ দিনগুলো কত মূল্যবান।',
          content: 'প্রতিদিন সকাল পৌনে আটটায় যখন স্কুলের ঘণ্টা বাজে, তখন গেট দিয়ে প্রবেশের চিরাচরিত কোলাহল, বন্ধুদের হাসি আর শিক্ষক মহাশয়দের শুভেচ্ছা এক অনন্য আবহের সৃষ্টি করে। ঐতিহ্যবাহী সেন্ট গ্রেগরির লাল ইটের খিলানযুক্ত বারান্দা এবং শতাব্দীপ্রাচীন মেহগনি গাছের শান্ত পরিবেশ মনে নতুন প্রেরণা জোগায়।\n\nদশম শ্রেণির ছাত্র হিসেবে আমরা সবাই জানি, স্কুল ইউনিফর্ম গায়ে এটাই আমাদের শেষ বছর। বোর্ড পরীক্ষার পর সবাই হয়তো বিভিন্ন কলেজে ছড়িয়ে পড়বে। আজ সকালে অডিটোরিয়ামের পাশে দাঁড়িয়ে আমরা পদার্থবিজ্ঞানের প্র্যাকটিক্যাল নিয়ে আলোচনা করছিলাম এবং টিফিন ভাগ করে খাচ্ছিলাম। এই মুহূর্তের একটি ছবি তুলে রেখে মনে হলো—শুধু পরীক্ষার ফলাফলের পেছনে না ছুটে এই যাত্রার প্রতিটি সুন্দর মুহূর্ত উপভোগ করা দরকার।',
          date: '২৮ অক্টোবর, ২০২৫',
          readTime: '৩ মিনিট পাঠ',
          category: 'campus',
          categoryLabel: 'ক্যাম্পাস জীবন',
          imageUrl: '/images/blog_campus.jpg',
          imageCaption: 'সকালের সমাবেশের আগে ঐতিহ্যের বারান্দায় সহপাঠীদের সাথে এক টুকরো সময়।',
        },
        {
          id: 'post-2',
          title: 'হাতে-কলমে আরডুইনো: বিজ্ঞান ক্লাবের ল্যাব টেবিলে রোবোটিক্সের রোমাঞ্চ',
          excerpt: 'সার্কিট তারের সংযোগ মেলানো আর তিন সন্ধ্যার নিরবচ্ছিন্ন চেষ্টায় বুঝলাম—প্রকৌশল বিদ্যায় ধৈর্যের মূল্য কোডের চেয়ে কোনো অংশে কম নয়।',
          content: 'পাঠ্যবইয়ের সার্কিট ডায়াগ্রাম থেকে বেরিয়ে সরাসরি ব্রেডবোর্ডে তার আর রেজিস্টর বসিয়ে এলইডি জ্বালানোর আনন্দের কোনো তুলনা হয় না। আমাদের শুক্রবারের বিজ্ঞান ক্লাবের কর্মশালায় আমরা একটি এনালগ আর্দ্রতা সেন্সর ও আরডুইনো মাইক্রোকন্ট্রোলার সার্কিট নিয়ে কাজ করছিলাম।\n\nশুরুতে সার্কিটে পাওয়ার দিলেও কোনো রেসপন্স পাচ্ছিলাম না। মাল্টিমিটার দিয়ে প্রায় এক ঘণ্টা পরীক্ষার পর দেখা গেল ব্রেডবোর্ডের একটি জাম্পার ওয়্যার ভেতরে হালকা আলগা ছিল। যেই মুহূর্তে সেটি ঠিক করে সবুজ বাতি জ্বলে উঠল, সবার মুখের হাসি ছিল দেখার মতো। এই হাতে-কলমে গবেষণাই বিজ্ঞানের আসল সৌন্দর্য ফুটিয়ে তোলে।',
          date: '১৪ সেপ্টেম্বর, ২০২৫',
          readTime: '৪ মিনিট পাঠ',
          category: 'tech',
          categoryLabel: 'বিজ্ঞান ও প্রযুক্তি',
          imageUrl: '/images/blog_robotics.jpg',
          imageCaption: 'বিজ্ঞান ক্লাবের ল্যাব টেবিলে আরডুইনো সার্কিট ও ব্রেডবোর্ড নিয়ে পরীক্ষা।',
        },
        {
          id: 'post-3',
          title: 'টেস্ট ও বোর্ড পরীক্ষার প্রস্তুতি: শান্ত মনে পড়ার রুটিন তৈরি',
          excerpt: 'টানা ৪ ঘণ্টা মুখস্থ করার চেয়ে ৪৫ মিনিটের গভীর মনোযোগ ও ১০ মিনিটের বিরতি উচ্চতর গণিত ও পদার্থবিজ্ঞানকে সহজ করে দেয়।',
          content: 'দশম শ্রেণির বোর্ড পরীক্ষা সামনে রেখে মনের ভেতর কিছুটা ভয় বা দুশ্চিন্তা কাজ করা স্বাভাবিক। কিন্তু গত কয়েক মাসে আমি আমার পড়ার পরিবেশ ও নিয়মে ইতিবাচক পরিবর্তন এনেছি।\n\nআমার কাঠের পড়ার টেবিলে অপ্রয়োজনীয় বইপত্র বা মোবাইল রাখি না; শুধু যে অধ্যায়টি পড়ছি সেই বই, একটি সাদা খাতা ও এক গ্লাস পানি। ৪৫ মিনিট একটানা ফোকাস রেখে পড়ার পর ১০ মিনিটের বিরতি নিয়ে হালকা হাঁটাচলা করি বা গান শুনি। এই পোমোডোরো টেকনিক মাথাকে সতেজ রাখে এবং কঠিন গাণিতিক সূত্রগুলো সহজে মনে রাখতে সাহায্য করে।',
          date: '২২ আগস্ট, ২০২৫',
          readTime: '৩ মিনিট পাঠ',
          category: 'study',
          categoryLabel: 'পড়াশোনা ও প্রস্তুতি',
          imageUrl: '/images/lifestyle_books_study_1793686325956.jpg',
          imageCaption: 'আমার সকালের পড়ার টেবিল—যেখানে সূত্র, খাতা ও দিনের লক্ষ্য সাজানো থাকে।',
        },
        {
          id: 'post-4',
          title: 'স্বয়ংক্রিয় গ্রিনহাউস: স্কুল বিজ্ঞান মেলা থেকে বাস্তব অভিজ্ঞতা',
          excerpt: 'মাটির আর্দ্রতা অনুধাবনকারী স্বয়ংক্রিয় সেচ ব্যবস্থা বানিয়ে শিক্ষক ও জুনিয়রদের সামনে উপস্থাপন করার আনন্দ ছিল অতুলনীয়।',
          content: 'জীববিজ্ঞান ক্লাসে খরার প্রভাব নিয়ে আলোচনার সূত্র ধরেই আমাদের স্বয়ংক্রিয় গ্রিনহাউস মডেল তৈরির আইডিয়া আসে। সেন্সর, ছোট সাবমার্সিবল পাম্প ও আরডুইনো প্রোগ্রামিং একত্রিত করে আমরা এমন একটি সিস্টেম বানাই যা মাটি শুকিয়ে গেলে স্বয়ংক্রিয়ভাবে পানি দেয়।\n\nবিজ্ঞান মেলায় শিক্ষক, বিচারক ও ছোট ক্লাসের শিক্ষার্থীদের কাছে যখন এটি প্রদর্শন করলাম এবং তাদের কৌতূহলী প্রশ্নের উত্তর দিলাম, তখন মনে হলো বিজ্ঞানের জ্ঞান বাস্তব জীবনে প্রয়োগ করতে পারার চেয়ে আনন্দদায়ক আর কিছুই হতে পারে না।',
          date: '১৮ জুলাই, ২০২৫',
          readTime: '৪ মিনিট পাঠ',
          category: 'tech',
          categoryLabel: 'বিজ্ঞান ও প্রযুক্তি',
          imageUrl: '/images/project_science_stem_1793686326788.jpg',
          imageCaption: 'স্কুল বিজ্ঞান প্রদর্শনীতে উপস্থাপিত স্বয়ংক্রিয় গ্রিনহাউস মডেল।',
        },
      ],
    },
    academics: {
      kicker: 'শিক্ষা ও মাইলফলক',
      title: 'শিক্ষাজীবনের পথচলা ও অর্জনসমূহ',
      subtitle: 'স্কুলের ধারাবাহিক সাফল্য, প্রিয় বিষয়সমূহ এবং বিভিন্ন আঞ্চলিক ও জাতীয় প্রতিযোগিতায় অর্জিত সম্মাননা।',
      timelineTitle: 'স্কুল শিক্ষাজীবনের টাইমলাইন',
      timeline: [
        {
          title: '১০ম শ্রেণি (মাধ্যমিক বোর্ড পরীক্ষার প্রস্তুতি)',
          period: '২০২৫ – বর্তমান',
          tag: 'সেন্ট জেভিয়ার্স মডেল সেকেন্ডারি স্কুল',
          desc: 'উচ্চতর বিজ্ঞান ও গণিত বিভাগে অধ্যয়নরত। বিদ্যালয়ের বিজ্ঞান দলের নেতৃত্ব প্রদান এবং প্রি-বোর্ড মডেল টেস্টে গড়ে ৯৪%+ নম্বর ধরে রাখা।',
        },
        {
          title: '৯ম শ্রেণি (জুনিয়র হাই স্কুল সম্মাননা)',
          period: '২০২৪ – ২০২৫',
          tag: 'একাডেমিক এক্সিলেন্স অনার রোল',
          desc: 'বিজ্ঞান ও তথ্যপ্রযুক্তিতে বিশেষ ডিস্টিংকশন অর্জন এবং বিদ্যালয়ের বিজ্ঞান প্রদর্শনীতে মেধা সম্মাননা।',
        },
        {
          title: '৮ম শ্রেণি (ভিত্তিমূল সম্মাননা)',
          period: '২০২৩ – ২০২৪',
          tag: 'সেরা অলরাউন্ডার শিক্ষার্থী মনোনীত',
          desc: 'গণিত ও বিজ্ঞানের প্রতি গভীর অনুরাগ এবং বিদ্যালয়ের জুনিয়র সায়েন্স ক্লাবে সক্রিয় অন্তর্ভুক্তি।',
        },
      ],
      subjectsTitle: 'প্রিয় বিষয়সমূহ',
      subjects: [
        {
          name: 'পদার্থ ও রসায়ন বিজ্ঞান',
          score: '৯৬% গড়',
          desc: 'গতির সূত্র, আলোকবিজ্ঞান, তড়িৎ-চৌম্বকত্ব এবং রাসায়নিক বন্ধন ও বিক্রিয়া।',
          pct: '96%',
        },
        {
          name: 'কম্পিউটার বিজ্ঞান ও তথ্যপ্রযুক্তি',
          score: '৯৮% গড়',
          desc: 'অ্যালগরিদম, প্রোগ্রামিং লুপ, আধুনিক ওয়েব প্রযুক্তি এবং সাইবার নিরাপত্তার প্রাথমিক পাঠ।',
          pct: '98%',
        },
        {
          name: 'উচ্চতর গণিত',
          score: '৯৩% গড়',
          desc: 'ত্রিকোণমিতি, বহুপদী সমীকরণ, স্থানাঙ্ক জ্যামিতি এবং সম্ভাবনা তত্ত্ব।',
          pct: '93%',
        },
      ],
      awardsTitle: 'প্রধান পুরস্কার ও সম্মাননা',
      awards: [
        {
          medal: '🥈 রৌপ্য পদক',
          title: 'আন্তঃস্কুল বিজ্ঞান অলিম্পিয়াড ২০২৫',
          event: 'জেলা মাধ্যমিক বিজ্ঞান পরিষদ',
        },
        {
          medal: '🥉 দ্বিতীয় রানার-আপ',
          title: 'আঞ্চলিক জুনিয়র হ্যাকাথন ২০২৫',
          event: 'গ্রিন টেক ইনোভেশন ট্র্যাক',
        },
        {
          medal: '🎤 শ্রেষ্ঠ বক্তা',
          title: 'বার্ষিক আন্তঃহাউস বিতর্ক প্রতিযোগিতা ২০২৪',
          event: 'প্রযুক্তি ও নৈতিকতা বিতর্ক',
        },
        {
          medal: '🌟 বিশেষ ডিস্টিংকশন',
          title: 'গণিত মেধা অন্বেষণ পরীক্ষা',
          event: 'জাতীয় জুনিয়র গণিত লীগ',
        },
      ],
    },
    lifestyle: {
      kicker: 'পড়ার টেবিলের বাইরে জীবন',
      title: 'জীবনযাপন ও ব্যক্তিগত আগ্রহ',
      subtitle: 'দৈনিক অভ্যাস, খেলাধুলা, প্রিয় বই ও পডকাস্টের তালিকা এবং ডায়েরির কিছু প্রতিফলন।',
      tabRoutine: 'দৈনিক রুটিন',
      tabHobbies: 'শখ ও খেলাধুলা',
      tabBooks: 'বই ও মিডিয়া সেল্ফ',
      tabJournal: 'শিক্ষার্থী ডায়েরি',
      routineHeader: 'সময় ব্যবস্থাপনা ও পড়ার অভ্যাস',
      routineSub: 'বোর্ড পরীক্ষার পড়া এবং নিজের সৃজনশীল শেখার চমৎকার সমন্বিত সময়সূচি।',
      cadenceTag: 'পোমোডোরো ৫০/১০ কৌশল',
      routineList: [
        {
          time: 'সকাল ০৬:০০ – ০৭:৩০',
          title: 'ভোরের শান্ত অধ্যয়ন',
          desc: 'দিনের শুরুতে সবচেয়ে কঠিন পদার্থবিজ্ঞান সূত্র ও জীববিজ্ঞান চিত্রাঙ্কন অনুশীলন।',
        },
        {
          time: 'সকাল ০৮:০০ – দুপুর ০৩:০০',
          title: 'স্কুল ও প্র্যাকটিক্যাল ল্যাব',
          desc: 'নিয়মিত ক্লাসে অংশগ্রহণ, বিজ্ঞানের ব্যবহারিক পরীক্ষণ এবং সহপাঠীদের সাথে গ্রুপ স্টাডি।',
        },
        {
          time: 'বিকাল ০৪:৩০ – ০৬:০০',
          title: 'খেলাধুলা ও শরীরচর্চা',
          desc: 'ফুটবল প্র্যাকটিস কিংবা সাইক্লিং—মনকে সতেজ ও শরীরকে চনমনে রাখা।',
        },
        {
          time: 'সন্ধ্যা ০৭:৩০ – রাত ১০:০০',
          title: 'গভীর মনোযোগে অধ্যয়ন ও পাঠ',
          desc: 'উচ্চতর গণিত সমাধান এবং দিনের শেষে ৪৫ মিনিট পছন্দের বই পড়া।',
        },
      ],
      hobbiesHeader: 'প্যাশন, খেলাধুলা ও আগ্রহ',
      hobbiesSub: 'যেসব কাজ কল্পনাশক্তি, মানসিক ধৈর্য ও দলগত চেতনা বাড়িয়ে তোলে।',
      hobbiesList: [
        {
          title: 'বিজ্ঞান ও কম্পিউটিং চিন্তা',
          desc: 'যৌক্তিক সমস্যা সমাধান, পাইথন প্রোগ্রামিং শেখা এবং কম্পিউটেশনাল চিন্তার বিকাশ ঘটানো।',
        },
        {
          title: 'ফুটবল ও অ্যাথলেটিক্স',
          desc: 'স্কুল ফুটবল দলের হয়ে গোলকিপার হিসেবে খেলা। এটি আমাকে দ্রুত সিদ্ধান্ত নেওয়া, চাপের মুখে শান্ত থাকা এবং স্ট্যামিনা বাড়াতে শিখিয়েছে।',
        },
        {
          title: 'বিজ্ঞান জনপ্রিয়করণ',
          desc: 'বিজ্ঞানের জটিল সব বিষয়—যেমন আপেক্ষিকতা তত্ত্ব বা মহাকর্ষ—সহজ ভাষায় নোট ও আলোচনার মাধ্যমে সহপাঠীদের বোঝানো।',
        },
      ],
      booksHeader: 'পছন্দের বই ও অডিও সেল্ফ',
      booksSub: 'যে বইগুলো মহাবিশ্ব, শৃঙ্খলা এবং বিজ্ঞানের প্রতি আমার দৃষ্টিভঙ্গি বদলে দিয়েছে।',
      booksCategoryLabel: 'পড়ার টেবিলের প্রিয় বই',
      booksList: [
        {
          title: 'আ ব্রিফ হিস্ট্রি অব টাইম',
          author: 'স্টিফেন হকিং',
          desc: 'মহাকর্ষ ও কৃষ্ণগহ্বরের অদ্ভুত রহস্যের প্রতি আমার আজীবন আগ্রহ তৈরি করে দিয়েছে।',
          status: 'পড়া শেষ',
        },
        {
          title: 'অ্যাটমিক হ্যাবিটস',
          author: 'জেমস ক্লিয়ার',
          desc: 'প্রতিদিনের ছোট ছোট অভ্যাস কীভাবে পড়াশোনায় বিশাল সাফল্য এনে দেয় তা শিখিয়েছে।',
          status: 'অপরিহার্য',
        },
        {
          title: 'ইগনাইটেড মাইন্ডস',
          author: 'ড. এ পি জে আবদুল কালাম',
          desc: 'বিজ্ঞানকে সমাজের সাধারণ মানুষের উন্নয়নে কাজে লাগানোর চিরন্তন প্রেরণা।',
          status: 'অনুপ্রেরণাদায়ী',
        },
      ],
      podcastsCategoryLabel: 'পডকাস্ট ও ইউটিউব চ্যানেল',
      podcastsList: [
        {
          title: 'ভেরিটাসিয়াম ও ৩ব্লু১ব্রাউন',
          host: 'ভিজ্যুয়াল গণিত ও পদার্থবিজ্ঞান',
          desc: 'জটিল গাণিতিক ধারণা সহজে ভিজ্যুয়ালাইজ করার অনন্য পাঠশালা।',
        },
        {
          title: 'লেক্স ফ্রিডম্যান পডকাস্ট',
          host: 'বিজ্ঞান ও গণিত আলোচনা',
          desc: 'বিশ্বসেরা বিজ্ঞানী ও চিন্তাবিদদের দীর্ঘ মুক্ত আলোচনা।',
        },
        {
          title: 'রেডিওল্যাব (Radiolab)',
          host: 'ডব্লিউএনওয়াইসি স্টুডিও',
          desc: 'বিজ্ঞান, মনস্তত্ত্ব ও মানবিক গল্পের অসাধারণ মেলবন্ধন।',
        },
      ],
      journalHeader: 'শিক্ষার্থী ডায়েরি ও ব্যক্তিগত ভাবনা',
      journalSub: 'শেখার পথচলা, পরীক্ষার চাপ সামলানো এবং মেধার বিকাশ।',
      journalList: [
        {
          tag: 'ডায়েরি ভাবনা #১২',
          date: 'অক্টোবর ২০২৫',
          title: 'বিজ্ঞানাগারের পরীক্ষণ আমাকে যা শিখিয়েছে',
          text: '"পাঠ্যবইয়ে বিজ্ঞানের সব সূত্র খুব সহজ ও নিখুঁত মনে হয়। কিন্তু ল্যাবে পরীক্ষণ করার সময় সামান্য ত্রুটিও ফলাফল বদলে দিতে পারে। এই অভিজ্ঞতা আমাকে পুঙ্খানুপুঙ্খ পর্যবেক্ষণ এবং পরম ধৈর্য শিখিয়েছে।"',
        },
        {
          tag: 'ডায়েরি ভাবনা #০৮',
          date: 'আগস্ট ২০২৫',
          title: 'বোর্ড পরীক্ষার প্রস্তুতির সাথে ব্যক্তিগত শখের সমন্বয়',
          text: '"অনেকেই পরামর্শ দিয়েছিল ১০ম শ্রেণিতে সব শখ ও বই পড়া বন্ধ রাখতে। কিন্তু আমি দেখলাম সৃজনশীল আনন্দ পুরোপুরি বন্ধ রাখলে পড়াশোনা একঘেয়ে হয়ে যায়। নির্দিষ্ট সময় খেলাধুলা ও বই পড়া মস্তিষ্ককে সতেজ রাখে—যার ফলে পরের পড়াশোনা আরো অনেক বেশি ফলপ্রসূ হয়।"',
        },
      ],
    },
    aspirations: {
      kicker: 'স্বপ্ন ও ভবিষ্যৎ পরিকল্পনা',
      title: 'ভবিষ্যতের পথচলা ও উচ্চাশা',
      bio: '১০ম শ্রেণির পর আমার লক্ষ্য একটি শীর্ষস্থানীয় প্রকৌশল বিশ্ববিদ্যালয়ে কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিং নিয়ে পড়াশোনা করা। আধুনিক বিজ্ঞানের গভীর জ্ঞানের সাথে প্রযুক্তির সমন্বয় ঘটিয়ে বাস্তব জীবনের নানা চ্যালেঞ্জের টেকসই সমাধান তৈরি করাই আমার স্বপ্ন।',
      cards: [
        {
          step: '০১. আগামী ২ বছর (উচ্চ মাধ্যমিক)',
          title: 'একাদশ ও দ্বাদশে বিজ্ঞান শ্রেষ্ঠত্ব',
          desc: 'পদার্থবিজ্ঞান, রসায়ন ও উচ্চতর গণিতের সাথে কম্পিউটার সায়েন্স নিয়ে পড়াশোনা। জাতীয় বিজ্ঞান অলিম্পিয়াডে অংশগ্রহণ এবং একাডেমিক ভিত্তি সুদৃঢ় করা।',
        },
        {
          step: '০২. বিশ্ববিদ্যালয় জীবন',
          title: 'কম্পিউটার সায়েন্স ও সিস্টেম ইঞ্জিনিয়ারিং',
          desc: 'কম্পিউটার ইঞ্জিনিয়ারিংয়ে স্নাতক ডিগ্রি অর্জন। আধুনিক কম্পিউটিং সিস্টেম, অ্যালগরিদম এবং কৃত্রিম বুদ্ধিমত্তা নিয়ে মৌলিক গবেষণা করা।',
        },
        {
          step: '০৩. দীর্ঘমেয়াদী ব্রত',
          title: 'মানবকল্যাণে প্রযুক্তির বাস্তবায়ন',
          desc: 'পরিবেশ সুরক্ষা কিংবা সাধারণ শিক্ষার্থীদের শিক্ষা সহায়ক প্রযুক্তি—বাস্তব জীবনে মানুষের উপকারে আসে এমন সমাধান তৈরি করা।',
        },
      ],
      mottoText:
        '"প্রযুক্তি তখনই সবচেয়ে সুন্দর, যখন তা স্ক্রিনে জাঁকজমক দেখানোর বদলে সাধারণ মানুষের বাস্তব সমস্যার সত্যিকারের সমাধান দেয়। এটাই আমার চলার অনুপ্রেরণা।"',
      mottoAuthor: '— আলী আরাফাত, ব্যক্তিগত মূলমন্ত্র',
    },
    contact: {
      kicker: 'কথা বলুন',
      title: 'যোগাযোগ করুন',
      subtitle:
        'কোনো বিজ্ঞান বিষয় নিয়ে আলোচনা করতে, ভালো কোনো বইয়ের পরামর্শ দিতে কিংবা যুক্ত হতে চাইলে নির্দ্বিধায় বার্তা পাঠান!',
      labelName: 'আপনার নাম *',
      labelEmail: 'আপনার ইমেইল *',
      labelSubject: 'বিষয়',
      labelMessage: 'আপনার বার্তা *',
      btnSubmit: 'বার্তা পাঠান',
      btnSending: 'বার্তা পাঠানো হচ্ছে...',
      successTitle: 'বার্তা ইনবক্সে সফলভাবে পৌঁছেছে!',
      successDesc: 'যোগাযোগের জন্য ধন্যবাদ! আপনার বার্তাটি সরাসরি aliarafat57000@gmail.com ইনবক্সে পাঠানো হয়েছে। স্কুল সময়ের পর আলী যত দ্রুত সম্ভব উত্তর দেবে।',
      errorTitle: 'বার্তা পাঠাতে সমস্যা হয়েছে',
      errorDesc: 'সার্ভার দিয়ে পাঠানো সম্ভব হয়নি। আপনি সরাসরি আপনার ইমেইল অ্যাপ বা জিমেইল দিয়ে বার্তা পাঠাতে পারেন।',
      btnOpenMail: 'ইমেইল অ্যাপে পাঠান',
      btnReset: 'আরেকটি বার্তা পাঠান',
      inboxNotice: 'এখানে বার্তা পাঠালে তা সরাসরি আলীর জিমেইল ইনবক্সে (aliarafat57000@gmail.com) পৌঁছে যাবে।',
      directTitle: 'সরাসরি যোগাযোগ',
      directSub: 'আলী আরাফাতের শিক্ষার্থী ইমেইল কপি করতে পারেন অথবা শিক্ষামূলক প্রোফাইলে যুক্ত হতে পারেন।',
      btnCopy: 'কপি করুন',
      btnCopied: 'কপি হয়েছে!',
      socialTitle: 'সোশ্যাল প্রোফাইল ও সরাসরি চ্যাট',
      linkFacebook: 'ফেইসবুক (aliarafat.5203)',
      linkWhatsapp: 'হোয়াটসঅ্যাপ (০১৮০৪৭৩৪৯০৮)',
      linkJournal: 'শিক্ষার্থী ডায়েরি ও পাঠ পর্যবেক্ষণ',
    },
    footer: {
      copyright: 'আলী আরাফাত। বিজ্ঞান, প্রযুক্তি ও শেখার অনুপ্রেরণায় নির্মিত।',
      backToTop: 'উপরে যান ↑',
    },
  },
};
