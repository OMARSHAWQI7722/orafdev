/*
  Arabic translation layer.
  English lives in the HTML. Each visible English string below maps to its Arabic version;
  switching language swaps text, attributes, direction and font, and remembers the choice.
*/
(function () {
  const AR = {
    // Meta
    'Orafdev — Web Development & Digital Solutions': 'Orafdev — تطوير الويب والحلول الرقمية',
    'Skip to content': 'تخطَّ إلى المحتوى',

    // Navigation
    'Home': 'الرئيسية',
    'Work': 'أعمالنا',
    'Services': 'خدماتنا',
    'Process': 'آلية العمل',
    'About': 'من نحن',
    'Contact': 'تواصل معنا',
    'Start a project': 'ابدأ مشروعك',
    'Open menu': 'فتح القائمة',
    'Close menu': 'إغلاق القائمة',
    'Switch to light mode': 'التبديل إلى الوضع الفاتح',
    'Switch to dark mode': 'التبديل إلى الوضع الداكن',
    'Switch to English': 'التبديل إلى الإنجليزية',
    'Switch to Arabic': 'التبديل إلى العربية',
    'Orafdev home': 'الصفحة الرئيسية لـ Orafdev',
    'Main': 'القائمة الرئيسية',
    'Mobile': 'قائمة الجوال',
    'Footer': 'تذييل الصفحة',

    // Hero
    'We build digital': 'نبني تجارب رقمية',
    'experiences that move': 'تدفع أعمالك',
    'businesses forward.': 'إلى الأمام.',
    'Modern websites, landing pages, custom web applications, and digital solutions built around the way your business works.':
      'مواقع حديثة، وصفحات هبوط، وتطبيقات ويب مخصصة، وحلول رقمية مصممة حول طريقة عمل مشروعك.',
    'Explore our work': 'استكشف أعمالنا',
    'Websites': 'المواقع الإلكترونية',
    'Web apps': 'تطبيقات الويب',
    'Digital solutions': 'الحلول الرقمية',
    'Support': 'الدعم',
    'What we do': 'ما نقدمه',
    'Scroll to next section': 'انتقل إلى القسم التالي',

    // Positioning
    'Built around your business.': 'مصمم حول أعمالك.',
    'From a first idea to a fully deployed digital product, Orafdev combines thoughtful design, modern development, and practical business thinking.':
      'من الفكرة الأولى حتى إطلاق منتج رقمي متكامل، تجمع Orafdev بين التصميم المدروس والتطوير الحديث والفهم العملي لاحتياجات الأعمال.',
    'Modern UI': 'واجهات حديثة',
    'Clear interfaces your customers understand at a glance.': 'واجهات واضحة يفهمها عملاؤك من النظرة الأولى.',
    'Responsive experiences': 'تجارب متجاوبة',
    'Built for phones first, sharp on every screen.': 'مصممة للهاتف أولاً، وواضحة على كل شاشة.',
    'Custom development': 'تطوير مخصص',
    'Written for your workflow, not bent from a template.': 'مكتوب خصيصاً لسير عملك، لا مُعدَّل من قالب جاهز.',
    'Scalable solutions': 'حلول قابلة للتوسع',
    'Structured so new features fit without a rebuild.': 'بنية تستوعب الميزات الجديدة دون إعادة البناء.',
    'Performance': 'الأداء',
    'Fast pages, light code, optimized assets.': 'صفحات سريعة، وكود خفيف، وملفات محسّنة.',
    'Ongoing support': 'دعم مستمر',
    'Updates and fixes after launch, from the same team.': 'تحديثات وإصلاحات بعد الإطلاق من الفريق نفسه.',

    // Services
    'What we build': 'ماذا نبني',
    'Digital solutions designed to solve real business problems.': 'حلول رقمية مصممة لحل مشكلات حقيقية في الأعمال.',
    'Business websites': 'مواقع الأعمال',
    'Professional, responsive websites designed to establish credibility, communicate your value, and turn visitors into customers.':
      'مواقع احترافية ومتجاوبة تبني المصداقية، وتوضّح قيمتك، وتحوّل الزوار إلى عملاء.',
    'Corporate websites': 'مواقع الشركات',
    'Responsive design': 'تصميم متجاوب',
    'Contact systems': 'أنظمة التواصل',
    'Google Maps': 'خرائط Google',
    'WhatsApp integration': 'ربط واتساب',
    'Social integration': 'ربط منصات التواصل',
    'SEO-ready structure': 'بنية جاهزة لمحركات البحث',
    'Performance optimization': 'تحسين الأداء',
    'Landing pages': 'صفحات الهبوط',
    'Focused landing pages designed around a clear message, strong user experience, and measurable conversion goals.':
      'صفحات هبوط مركّزة مبنية حول رسالة واضحة، وتجربة مستخدم قوية، وأهداف تحويل قابلة للقياس.',
    'Campaign pages': 'صفحات الحملات',
    'Product pages': 'صفحات المنتجات',
    'Service pages': 'صفحات الخدمات',
    'Lead generation': 'جذب العملاء المحتملين',
    'Conversion-focused UI': 'واجهة تركّز على التحويل',
    'Get a quote': 'اطلب عرض سعر',
    'Custom web applications': 'تطبيقات ويب مخصصة',
    'Custom web applications built around the workflows, users, and requirements of your business.':
      'تطبيقات ويب مخصصة مبنية حول سير العمل والمستخدمين ومتطلبات مشروعك.',
    'Dashboards': 'لوحات المعلومات',
    'Authentication': 'تسجيل الدخول والمصادقة',
    'Databases': 'قواعد البيانات',
    'Admin panels': 'لوحات الإدارة',
    'Booking systems': 'أنظمة الحجز',
    'APIs': 'واجهات APIs',
    'Business tools': 'أدوات الأعمال',
    'Custom workflows': 'سير عمل مخصص',
    'Data-driven systems': 'أنظمة قائمة على البيانات',
    'Maintenance & support': 'الصيانة والدعم',
    'Keep your digital product reliable, updated, secure, and ready to evolve with your business.':
      'حافظ على منتجك الرقمي موثوقاً ومحدّثاً وآمناً، وجاهزاً للتطور مع أعمالك.',
    'Bug fixes': 'إصلاح الأخطاء',
    'Content updates': 'تحديث المحتوى',
    'Technical improvements': 'تحسينات تقنية',
    'Monitoring': 'المراقبة',
    'Maintenance': 'الصيانة',
    "Not sure which one fits? Describe the problem and we'll suggest the right build.":
      'لست متأكداً أيها يناسبك؟ صف لنا التحدي وسنقترح الحل المناسب.',

    // Work
    'Selected work': 'أعمال مختارة',
    'Real projects, thoughtful design, practical technology.': 'مشاريع حقيقية، وتصميم مدروس، وتقنية عملية.',
    'Filter projects': 'تصفية المشاريع',
    'All': 'الكل',
    'E-commerce': 'التجارة الإلكترونية',
    'Web application': 'تطبيق ويب',
    'A web application project, taken from interface design through to a working product.':
      'مشروع تطبيق ويب، من تصميم الواجهة حتى منتج يعمل فعلياً.',
    'Digital platform': 'منصة رقمية',
    'The digital home of Next Stack, a separate initiative with its own identity.':
      'الواجهة الرقمية لـ Next Stack، وهي مبادرة مستقلة لها هويتها الخاصة.',
    'An online store built around product presentation, brand and a clear path to purchase.':
      'متجر إلكتروني مبني حول عرض المنتجات والهوية التجارية ومسار شراء واضح.',
    'View case study': 'عرض دراسة الحالة',
    'No projects in this category yet.': 'لا توجد مشاريع في هذا التصنيف بعد.',

    // Why
    'Why Orafdev': 'لماذا Orafdev',
    'Technology with purpose.': 'تقنية لها هدف.',
    'Business-first thinking': 'الأعمال أولاً',
    "We build around the actual needs of the business, not technology for technology's sake.":
      'نبني حول الاحتياجات الفعلية للعمل، لا التقنية لمجرد التقنية.',
    'Modern experience': 'تجربة حديثة',
    'Thoughtful interfaces, responsive experiences, and modern visual systems.':
      'واجهات مدروسة، وتجارب متجاوبة، وأنظمة بصرية حديثة.',
    'Built to evolve': 'مبني ليتطور',
    'Digital products should be ready to grow as your business grows.':
      'المنتج الرقمي يجب أن يكون جاهزاً للنمو مع نمو أعمالك.',
    'Direct collaboration': 'تعاون مباشر',
    'Work directly with the people designing and building your product.':
      'تعامل مباشرة مع من يصمم منتجك ويبنيه.',
    'Strategy': 'الاستراتيجية',
    'Design': 'التصميم',
    'Development': 'التطوير',

    // Process
    'From idea to launch': 'من الفكرة إلى الإطلاق',
    'Six stages, one team, and you can see where the project stands at every point.':
      'ست مراحل وفريق واحد، وتعرف موقع مشروعك في كل مرحلة.',
    'Discover': 'الاكتشاف',
    'Understand the business, goals, audience, and requirements.': 'فهم النشاط والأهداف والجمهور والمتطلبات.',
    'Plan': 'التخطيط',
    'Define structure, features, user experience, and technical direction.': 'تحديد الهيكل والميزات وتجربة المستخدم والتوجه التقني.',
    'Create the visual identity, interface, and responsive experience.': 'تصميم الهوية البصرية والواجهة والتجربة المتجاوبة.',
    'Build': 'البناء',
    'Develop the website or application using modern technology.': 'تطوير الموقع أو التطبيق باستخدام تقنيات حديثة.',
    'Test': 'الاختبار',
    'Test usability, responsiveness, functionality, and performance.': 'اختبار سهولة الاستخدام والتجاوب والوظائف والأداء.',
    'Launch': 'الإطلاق',
    'Deploy the product and support its ongoing growth.': 'نشر المنتج ودعم نموه المستمر.',

    // Technology
    'Built with modern technology.': 'مبني بتقنيات حديثة.',
    'Every product we ship follows the same architecture. Hover or tap a layer to see what runs there.':
      'كل منتج نسلّمه يتبع البنية نفسها. مرّر المؤشر أو اضغط على أي طبقة لترى ما يعمل فيها.',
    'Frontend': 'الواجهة الأمامية',
    'API': 'واجهة API',
    'Backend': 'الواجهة الخلفية',
    'Database': 'قاعدة البيانات',
    'Deployment': 'النشر',
    'Relational and document databases': 'قواعد بيانات علائقية ووثائقية',
    'Git, cloud deployment': 'Git والنشر السحابي',

    // About
    'The people behind Orafdev.': 'الفريق وراء Orafdev.',
    'Orafdev is built by Omar and Arafat, combining frontend, backend, product thinking, design, and technical problem-solving to create digital experiences for modern businesses. The name is simply the two of us plus what we do: Omar + Arafat + Dev.':
      'أسّس Orafdev عمر وعرفات، ونجمع بين تطوير الواجهات الأمامية والخلفية والتفكير في المنتج والتصميم وحل المشكلات التقنية لنصنع تجارب رقمية للأعمال الحديثة. والاسم ببساطة يجمعنا مع ما نقوم به: ⁦Omar + Arafat + Dev⁩.',
    'Omar': 'عمر',
    'Arafat': 'عرفات',
    'Frontend, UI/UX, client communication': 'الواجهة الأمامية، تصميم UI/UX، التواصل مع العملاء',
    'UI design': 'تصميم الواجهات',
    'UX': 'تجربة المستخدم',
    'Client communication': 'التواصل مع العملاء',
    'Sales': 'المبيعات',
    'Your first point of contact. Omar shapes what the product looks like and how it feels to use.':
      'نقطة تواصلك الأولى. يرسم عمر شكل المنتج وتجربة استخدامه.',
    'Backend, APIs, infrastructure': 'الواجهة الخلفية، APIs، البنية التحتية',
    'Technical support': 'الدعم التقني',
    'Builds what runs underneath: data, integrations, deployment, and keeping it all running after launch.':
      'يبني ما يعمل في الخلفية: البيانات والتكاملات والنشر، ويضمن استمرار كل شيء بعد الإطلاق.',

    // Pricing
    'Clear starting points.': 'نقاط انطلاق واضحة.',
    'Every project is scoped to its requirements. These are where engagements begin.':
      'كل مشروع يُسعَّر حسب متطلباته، وهذه هي الأسعار المبدئية.',
    'Landing page': 'صفحة هبوط',
    'From': 'ابتداءً من',
    '/month': '/شهرياً',
    'One focused page built to turn a campaign, product or service into enquiries.':
      'صفحة واحدة مركّزة تحوّل حملتك أو منتجك أو خدمتك إلى استفسارات.',
    'Conversion-focused layout': 'تصميم يركّز على التحويل',
    'Lead or contact form': 'نموذج تواصل أو طلب',
    'Start a landing page': 'ابدأ صفحة الهبوط',
    'Business website': 'موقع أعمال',
    'A multi-page website that explains what you do and makes it easy to contact you.':
      'موقع متعدد الصفحات يشرح ما تقدمه ويسهّل التواصل معك.',
    'Multi-page structure': 'هيكل متعدد الصفحات',
    'Contact systems and Google Maps': 'أنظمة التواصل وخرائط Google',
    'Social and WhatsApp integration': 'ربط منصات التواصل وواتساب',
    'Start a website': 'ابدأ موقعك',
    'Custom web application': 'تطبيق ويب مخصص',
    'Software shaped around your workflow: bookings, dashboards, admin tools.':
      'برمجيات مصممة حول سير عملك: الحجوزات ولوحات المعلومات وأدوات الإدارة.',
    'Authentication and user roles': 'تسجيل الدخول وصلاحيات المستخدمين',
    'Database and admin panel': 'قاعدة بيانات ولوحة إدارة',
    'APIs and integrations': 'واجهات APIs والتكاملات',
    'Discuss an app': 'ناقش تطبيقك',
    'Ongoing care so your site stays updated, secure and working.': 'رعاية مستمرة ليبقى موقعك محدّثاً وآمناً ويعمل بكفاءة.',
    'Set up maintenance': 'اشترك في الصيانة',
    'Custom solutions are quoted based on project requirements.': 'الحلول المخصصة تُسعَّر بناءً على متطلبات المشروع.',

    // CTA
    'Ready to build your next digital experience?': 'مستعد لبناء تجربتك الرقمية القادمة؟',
    "Tell us what you're building, what you're trying to improve, or what you want to achieve. We'll help turn the idea into a practical digital solution.":
      'أخبرنا بما تبنيه، أو ما تريد تحسينه، أو ما تطمح لتحقيقه، وسنساعدك على تحويل الفكرة إلى حل رقمي عملي.',
    'Talk to Orafdev': 'تحدّث مع Orafdev',

    // Contact
    "Let's build something great.": 'لنبنِ معاً شيئاً رائعاً.',
    'Share a few details. We reply with questions, a recommended approach and a quote.':
      'شاركنا بعض التفاصيل، وسنرد عليك بأسئلتنا والنهج المقترح وعرض سعر.',
    'WhatsApp': 'واتساب',
    'Email': 'البريد الإلكتروني',
    'Instagram': 'إنستغرام',
    'LinkedIn': 'لينكدإن',
    'Name': 'الاسم',
    'Business name': 'اسم النشاط التجاري',
    'optional': 'اختياري',
    'WhatsApp / phone': 'واتساب / الهاتف',
    'Project type': 'نوع المشروع',
    'Budget': 'الميزانية',
    'Timeline': 'المدة الزمنية',
    'Project details': 'تفاصيل المشروع',
    'Choose one': 'اختر نوع المشروع',
    'Business Website': 'موقع أعمال',
    'Landing Page': 'صفحة هبوط',
    'Web Application': 'تطبيق ويب',
    'Redesign': 'إعادة تصميم',
    'Other': 'أخرى',
    'Not sure yet': 'غير محددة بعد',
    'Under $200': 'أقل من 200$',
    'Flexible': 'مرنة',
    'As soon as possible': 'في أقرب وقت ممكن',
    'Within a month': 'خلال شهر',
    '1–3 months': 'من شهر إلى 3 أشهر',
    'Later this year': 'لاحقاً هذا العام',
    'Enter your name.': 'أدخل اسمك.',
    'Enter an email address like name@business.com.': 'أدخل بريداً إلكترونياً مثل name@business.com.',
    'Choose the closest project type.': 'اختر أقرب نوع لمشروعك.',
    'Tell us a little about the project.': 'أخبرنا قليلاً عن المشروع.',
    'What does your business do, and what should the website or app help with?':
      'ما طبيعة نشاطك، وبماذا يجب أن يساعدك الموقع أو التطبيق؟',
    'Send project request': 'أرسل طلب المشروع',
    'Some details are missing. Check the highlighted fields.': 'بعض التفاصيل ناقصة. راجع الحقول المحددة.',
    'Sending your request…': 'جارٍ إرسال طلبك…',
    "Project request sent. We'll reply by email or WhatsApp.": 'تم إرسال طلب المشروع. سنرد عليك عبر البريد الإلكتروني أو واتساب.',
    'The request did not send. Check your connection and try again, or message us on WhatsApp.':
      'لم يُرسَل الطلب. تحقق من اتصالك وحاول مجدداً، أو راسلنا عبر واتساب.',
    'WhatsApp opened with your request written out. Press send there to deliver it.':
      'فُتح واتساب وطلبك مكتوب جاهزاً. اضغط إرسال هناك لإيصاله.',
    'Your email app opened with the request written out. Press send there to deliver it.':
      'فُتح تطبيق البريد وطلبك مكتوب جاهزاً. اضغط إرسال هناك لإيصاله.',
    'Sending is not set up yet. Please reach us through another channel.': 'الإرسال غير مفعّل بعد. يرجى التواصل معنا عبر قناة أخرى.',

    'What happens next': 'ماذا يحدث بعد ذلك',
    'We read your request': 'نقرأ طلبك',
    'Every request is read by Omar or Arafat directly.': 'يقرأ عمر أو عرفات كل طلب بنفسه.',
    'We reply with questions': 'نرد عليك بأسئلتنا',
    'A short follow-up to understand goals, content and timing.': 'متابعة قصيرة لفهم الأهداف والمحتوى والمدة.',
    'You get an approach and a quote': 'تحصل على النهج المقترح وعرض السعر',
    'A clear scope, price and timeline before any work starts.': 'نطاق عمل وسعر وجدول زمني واضح قبل بدء أي عمل.',

    // Footer
    'Modern websites, web applications, and digital solutions built around your business.':
      'مواقع حديثة وتطبيقات ويب وحلول رقمية مصممة حول أعمالك.',
    'Navigate': 'التنقل',
    'Business Websites': 'مواقع الأعمال',
    'Landing Pages': 'صفحات الهبوط',
    'Web Applications': 'تطبيقات الويب',
    'Social': 'تابعنا',
    'ORAFDEV. All Rights Reserved.': 'ORAFDEV. جميع الحقوق محفوظة.',
    'Chat with us': 'تحدث معنا',
    'Message Orafdev on WhatsApp': 'راسل Orafdev عبر واتساب',

    // Redesign additions
    "Modern websites, landing pages, custom web applications, and digital solutions designed around the way your business works.": "مواقع حديثة، وصفحات هبوط، وتطبيقات ويب مخصصة، وحلول رقمية مصممة حول طريقة عمل مشروعك.",
    "Experience that goes beyond the brand.": "خبرة أعمق من عمر العلامة.",
    "Orafdev is a new brand built on real hands-on experience delivering digital projects for clients and businesses.": "Orafdev علامة جديدة مبنية على خبرة عملية حقيقية في تنفيذ مشاريع رقمية للعملاء والشركات.",
    "Projects delivered": "مشروعاً منجزاً",
    "Clients served": "عميلاً خدمناهم",
    "New brand. Real experience.": "علامة جديدة. خبرة حقيقية.",
    "Real projects. Real experience. Practical digital solutions.": "مشاريع حقيقية. خبرة حقيقية. حلول رقمية عملية.",
    "Booking platform": "منصة حجوزات",
    "Hourly car rental system": "نظام تأجير سيارات بالساعة",
    "A car rental platform built around hourly bookings, from choosing a vehicle to reserving the hours you need.": "منصة لتأجير السيارات مبنية حول الحجز بالساعة، من اختيار السيارة حتى حجز الساعات التي تحتاجها.",
    "Coming soon": "قريباً",
    "Case study": "دراسة الحالة",
    "Compact": "صغيرة",
    "SUV": "دفع رباعي",
    "Sedan": "سيدان",
    "4 seats, automatic": "4 مقاعد، أوتوماتيك",
    "7 seats, automatic": "7 مقاعد، أوتوماتيك",
    "5 seats, manual": "5 مقاعد، يدوي",
    "Choose your hours": "اختر ساعاتك",
    "Today": "اليوم",
    "Reserve": "احجز",
    "October": "أكتوبر",
    "Confirm": "تأكيد",
    "Interface concept": "تصور للواجهة",
    "Interface concept of the car rental booking screen": "تصور لواجهة شاشة حجز السيارات",
    "Community platform": "منصة مجتمعية",
    "A student tech community bridging the gap between academics and the real job market through skills, exposure and community.": "مجتمع تقني طلابي يسد الفجوة بين الدراسة الأكاديمية وسوق العمل الحقيقي من خلال المهارات والاحتكاك والمجتمع.",
    "Mobile app, social impact": "تطبيق جوال، أثر مجتمعي",
    "A food-waste reduction app for Malaysia that connects students with affordable meals while helping local restaurants reduce waste.": "تطبيق للحد من هدر الطعام في ماليزيا يربط الطلاب بوجبات بأسعار مناسبة ويساعد المطاعم المحلية على تقليل الهدر.",
    "An Arabic-first online store for luxury watches, designed as one shopping experience across desktop and mobile.": "متجر إلكتروني للساعات الفاخرة باللغة العربية أولاً، مصمم كتجربة تسوق واحدة على الحاسوب والجوال.",
    "Recruitment platform": "منصة توظيف",
    "ATS resume matching system": "نظام مطابقة السير الذاتية (ATS)",
    "A recruitment tool that compares resumes with job descriptions to help hiring teams review candidates faster.": "أداة توظيف تقارن السير الذاتية بالأوصاف الوظيفية لتساعد فرق التوظيف على مراجعة المرشحين بشكل أسرع.",
    "Interface concept of a resume matching dashboard": "تصور لواجهة لوحة مطابقة السير الذاتية",
    "Resume": "السيرة الذاتية",
    "Experience": "الخبرة",
    "Match": "التطابق",
    "Job description": "الوصف الوظيفي",
    "Requirements": "المتطلبات",
    "Next Stack brand presentation: Code, Connect, Create Impact": "هوية Next Stack: برمج، تواصل، اصنع أثراً",
    "Israf Guard app screens showing nearby discounted meals from Malaysian restaurants": "شاشات تطبيق Israf Guard تعرض وجبات مخفضة قريبة من مطاعم ماليزية",
    "OZO Store luxury watch storefront in Arabic on laptop and phone": "واجهة متجر OZO للساعات الفاخرة بالعربية على الحاسوب والجوال",
    "Five ways we help businesses grow online, each built around a specific business need.": "خمس طرق نساعد بها الأعمال على النمو رقمياً، كل منها مبني حول احتياج محدد.",
    "Professional, responsive websites designed to establish credibility, communicate value, and help businesses grow.": "مواقع احترافية ومتجاوبة تبني المصداقية، وتوضّح القيمة، وتساعد الأعمال على النمو.",
    "Maps": "الخرائط",
    "Social integrations": "ربط منصات التواصل",
    "Visitors": "الزوار",
    "Engaged": "المهتمون",
    "Leads": "العملاء المحتملون",
    "Focused digital experiences designed around clear messaging, strong UX, and conversion goals.": "تجارب رقمية مركّزة مبنية حول رسالة واضحة وتجربة مستخدم قوية وأهداف تحويل.",
    "Custom software built around the workflows, users, and requirements of your business.": "برمجيات مخصصة مبنية حول سير العمل والمستخدمين ومتطلبات أعمالك.",
    "Digital solutions": "الحلول الرقمية",
    "Practical digital products designed to solve specific business problems.": "منتجات رقمية عملية مصممة لحل مشكلات محددة في الأعمال.",
    "Website": "الموقع",
    "Backups": "النسخ الاحتياطي",
    "Updates": "التحديثات",
    "Keep your digital product updated, reliable, and ready to evolve.": "حافظ على منتجك الرقمي محدّثاً وموثوقاً وجاهزاً للتطور.",
    "Content changes": "تعديلات المحتوى",
    "Your digital team, built for growth.": "فريقك الرقمي، مبني للنمو.",
    "From strategy and interface design to development, deployment, and ongoing support, Orafdev brings the skills needed to turn ideas into reliable digital experiences.": "من الاستراتيجية وتصميم الواجهات إلى التطوير والنشر والدعم المستمر، يجمع فريق Orafdev المهارات اللازمة لتحويل الأفكار إلى تجارب رقمية موثوقة.",
    "Talk to our team": "تحدث مع فريقنا",
    "Strategy and planning": "الاستراتيجية والتخطيط",
    "We start with your goals, your customers and what the product must achieve.": "نبدأ بأهدافك وعملائك وما يجب أن يحققه المنتج.",
    "Interface design": "تصميم الواجهات",
    "Our designers shape clear, responsive interfaces your customers understand.": "يصمم مصممونا واجهات واضحة ومتجاوبة يفهمها عملاؤك.",
    "Frontend development": "تطوير الواجهات الأمامية",
    "Our developers turn designs into fast, accessible pages that work on every screen.": "يحوّل مطورونا التصاميم إلى صفحات سريعة وسهلة الوصول تعمل على كل شاشة.",
    "Backend and APIs": "الواجهة الخلفية وواجهات APIs",
    "Databases, integrations and business logic built to stay reliable as you grow.": "قواعد بيانات وتكاملات ومنطق أعمال مبني ليبقى موثوقاً مع نموك.",
    "Our technical team handles hosting, domains and a smooth, monitored launch.": "يتولى فريقنا التقني الاستضافة والنطاقات وإطلاقاً سلساً تحت المراقبة.",
    "Updates, fixes and improvements after launch, from the same people who built it.": "تحديثات وإصلاحات وتحسينات بعد الإطلاق من الفريق نفسه الذي بناه.",
    "Why businesses choose Orafdev": "لماذا تختار الأعمال Orafdev",
    "One team carries your project from the first conversation to long after launch.": "فريق واحد يرافق مشروعك من أول محادثة حتى ما بعد الإطلاق بكثير.",
    "We build around the actual needs of your business, not technology for technology's sake.": "نبني حول الاحتياجات الفعلية لأعمالك، لا التقنية لمجرد التقنية.",
    "Modern UI/UX": "واجهات وتجربة استخدام حديثة",
    "Thoughtful interfaces and responsive experiences that make your business easy to choose.": "واجهات مدروسة وتجارب متجاوبة تجعل اختيار أعمالك أمراً سهلاً.",
    "Written for your workflow, not bent from a template, and structured to grow with you.": "مكتوب لسير عملك لا مُعدَّل من قالب، ومنظم لينمو معك.",
    "Updates, monitoring and improvements after launch, so your product keeps working.": "تحديثات ومراقبة وتحسينات بعد الإطلاق ليستمر منتجك في العمل.",
    "How a project moves through Orafdev: strategy, design, development, deployment, support": "رحلة المشروع في Orafdev: الاستراتيجية، التصميم، التطوير، النشر، الدعم",
    "Goals, audience, scope": "الأهداف والجمهور والنطاق",
    "Website and mobile interface": "واجهة الموقع والجوال",
    "Dashboard, API, database": "لوحة التحكم وAPI وقاعدة البيانات",
    "Hosting, analytics, launch": "الاستضافة والتحليلات والإطلاق",
    "Monitoring and updates": "المراقبة والتحديثات",
    "Six stages, one team, and you always know where your project stands.": "ست مراحل وفريق واحد، وتعرف دائماً أين وصل مشروعك.",
    "Start with discovery": "ابدأ بمرحلة الاكتشاف",
    "Create the interface and responsive experience.": "تصميم الواجهة والتجربة المتجاوبة.",
    "Develop the digital product.": "تطوير المنتج الرقمي.",
    "Test functionality, usability, responsiveness, and performance.": "اختبار الوظائف وسهولة الاستخدام والتجاوب والأداء.",
    "Deploy and provide ongoing support.": "النشر وتقديم الدعم المستمر.",
    "Every product we ship follows the same clear architecture. Hover or tap a layer to see what runs there.": "كل منتج نسلّمه يتبع البنية الواضحة نفسها. مرّر المؤشر أو اضغط على أي طبقة لترى ما يعمل فيها.",
    "What your customers see and use: HTML, CSS, JavaScript, React, Next.js": "ما يراه عملاؤك ويستخدمونه: HTML وCSS وJavaScript وReact وNext.js",
    "How the screens talk to the system: REST APIs": "كيف تتواصل الشاشات مع النظام: REST APIs",
    "Where business rules run: Node.js": "حيث يعمل منطق الأعمال: Node.js",
    "Where your data is stored safely: relational and document databases": "حيث تُحفظ بياناتك بأمان: قواعد بيانات علائقية ووثائقية",
    "How it goes live and stays live: Git, cloud deployment": "كيف ينطلق ويبقى متاحاً: Git والنشر السحابي",
    "What our clients say": "ماذا يقول عملاؤنا",
    "Feedback from businesses our team has worked with.": "آراء أعمال عمل معها فريقنا.",
    "Previous testimonial": "الرأي السابق",
    "Next testimonial": "الرأي التالي",
    "Client testimonials": "آراء العملاء",
    "Every request is reviewed by our team, not an automated system.": "يراجع فريقنا كل طلب بنفسه، لا نظام آلي.",
    "From idea to digital experience.": "من الفكرة إلى التجربة الرقمية.",
    "Company": "الشركة",
    "Digital Solutions": "الحلول الرقمية",
    "ORAFDEV — All Rights Reserved.": "ORAFDEV — جميع الحقوق محفوظة.",
    "Interface concept until the live project is published.": "تصور للواجهة إلى حين نشر المشروع.",
    "What it is": "عن المشروع",
    "Who it serves": "لمن صُمم",
    "What we showcase": "ما نعرضه",
    "Platform": "المنصة",
    "Live view": "معاينة مباشرة",
    "Mobile app": "تطبيق جوال",
    "Website and brand presence": "موقع وحضور للعلامة",
    "Arabic-first web store": "متجر ويب بالعربية أولاً",
    "Web platform": "منصة ويب",

    "Technology": "التقنيات",
    "To be published": "تُنشر قريباً",
    "An hourly car rental platform. The screens on this page are an interface concept; the full case study and live link will be published together with the project.": "منصة لتأجير السيارات بالساعة. الشاشات في هذه الصفحة تصور للواجهة، وستُنشر دراسة الحالة الكاملة والرابط المباشر مع إطلاق المشروع.",
    "Customers who need a car for a few hours rather than a full day, and rental businesses that want to offer hourly bookings online.": "العملاء الذين يحتاجون سيارة لبضع ساعات بدلاً من يوم كامل، وشركات التأجير التي تريد تقديم الحجز بالساعة عبر الإنترنت.",
    "Browsing vehicles by type": "تصفح السيارات حسب النوع",
    "Choosing a number of hours and a time range": "اختيار عدد الساعات والفترة الزمنية",
    "A clear reservation step on desktop and mobile": "خطوة حجز واضحة على الحاسوب والجوال",
    "Hourly car rental system — Orafdev": "نظام تأجير سيارات بالساعة — Orafdev",
    "Next Stack is a student tech community built around three ideas: code, connect and create impact. It is a separate initiative with its own name and identity, not part of Orafdev.": "Next Stack مجتمع تقني طلابي قائم على ثلاث أفكار: البرمجة والتواصل وصناعة الأثر. وهو مبادرة مستقلة باسمها وهويتها الخاصة، وليس جزءاً من Orafdev.",
    "Students who want practical experience and a clearer path from their studies into the job market.": "الطلاب الذين يريدون خبرة عملية ومساراً أوضح من الدراسة إلى سوق العمل.",
    "Practical skills": "مهارات عملية",
    "Expert insights": "خبرات من المختصين",
    "Career readiness": "الجاهزية المهنية",
    "Community impact": "أثر مجتمعي",
    "Better futures": "مستقبل أفضل",
    "Israf Guard tackles food waste in Malaysia. Restaurants offer surplus meals at lower prices, and students find affordable food nearby instead of it going to waste.": "يعالج Israf Guard هدر الطعام في ماليزيا: تعرض المطاعم وجباتها الفائضة بأسعار أقل، ويجد الطلاب طعاماً بسعر مناسب بالقرب منهم بدلاً من أن يُهدر.",
    "Students looking for affordable meals, and local restaurants that want to reduce food waste.": "الطلاب الباحثون عن وجبات بأسعار مناسبة، والمطاعم المحلية التي تريد تقليل هدر الطعام.",
    "Affordable meals": "وجبات بأسعار مناسبة",
    "Reducing food waste": "تقليل هدر الطعام",
    "Supporting local restaurants": "دعم المطاعم المحلية",
    "A cleaner Malaysia": "ماليزيا أنظف",
    "OZO Store is an online store for luxury watches, built Arabic-first with a right-to-left storefront and a premium visual identity.": "OZO Store متجر إلكتروني للساعات الفاخرة، مبني بالعربية أولاً بواجهة من اليمين إلى اليسار وهوية بصرية فاخرة.",
    "Arabic-speaking shoppers browsing and buying luxury watches on desktop or on their phone.": "المتسوقون الناطقون بالعربية الذين يتصفحون الساعات الفاخرة ويشترونها على الحاسوب أو الجوال.",
    "Arabic, right-to-left storefront": "واجهة متجر عربية من اليمين إلى اليسار",
    "Luxury product presentation": "عرض فاخر للمنتجات",
    "Matching desktop and mobile experience": "تجربة متطابقة على الحاسوب والجوال",
    "OZO Store — Orafdev": "OZO Store — Orafdev",
    "A resume matching system for recruitment. The screens on this page are an interface concept; the full case study and live link will be published together with the project.": "نظام لمطابقة السير الذاتية في التوظيف. الشاشات في هذه الصفحة تصور للواجهة، وستُنشر دراسة الحالة الكاملة والرابط المباشر مع إطلاق المشروع.",
    "Hiring teams and recruiters who review many resumes against the same job description.": "فرق التوظيف ومسؤولو التوظيف الذين يراجعون سيراً ذاتية كثيرة مقابل الوصف الوظيفي نفسه.",
    "Comparing a resume with a job description": "مقارنة السيرة الذاتية بالوصف الوظيفي",
    "Seeing which skills match and which are missing": "معرفة المهارات المتطابقة والناقصة",
    "Reviewing candidates from one dashboard": "مراجعة المرشحين من لوحة واحدة",
    "ATS resume matching system — Orafdev": "نظام مطابقة السير الذاتية (ATS) — Orafdev",

    // Project pages
    'All work': 'كل الأعمال',
    'Type': 'النوع',
    'Category': 'التصنيف',
    'Project overview': 'نظرة عامة',
    'The walkthrough': 'الشرح التفصيلي',
    'Live view': 'معاينة مباشرة',
    'Source code': 'الكود المصدري',
    'Discuss a similar project': 'ناقش مشروعاً مشابهاً',
    'Next project': 'المشروع التالي',
    'Have a project like this in mind?': 'لديك مشروع مشابه في ذهنك؟',
    'Israf Guard — Orafdev': 'Israf Guard — Orafdev',
    'Next Stack — Orafdev': 'Next Stack — Orafdev',
    'Ozo Store — Orafdev': 'Ozo Store — Orafdev',
    'A web application project, presented as a case study from interface design to working product.':
      'مشروع تطبيق ويب، نعرضه كدراسة حالة من تصميم الواجهة حتى المنتج العامل.',
    'The digital presence of Next Stack.': 'الحضور الرقمي لـ Next Stack.',
    'An e-commerce project: an online store built around product presentation, brand and a clear path to purchase.':
      'مشروع تجارة إلكترونية: متجر مبني حول عرض المنتجات والهوية التجارية ومسار شراء واضح.',
    'Next Stack is a separate project and initiative with its own name and identity. It is not part of Orafdev; this page describes the digital work done for it.':
      'Next Stack مشروع ومبادرة مستقلة باسمها وهويتها الخاصة، وليست جزءاً من Orafdev. تعرض هذه الصفحة العمل الرقمي المنجز لها.',
    'Israf Guard is a web application from the Orafdev portfolio.': 'Israf Guard تطبيق ويب ضمن أعمال Orafdev.',
    'Ozo Store is an e-commerce project from the Orafdev portfolio.': 'Ozo Store مشروع تجارة إلكترونية ضمن أعمال Orafdev.',
    'We are happy to walk you through this project in a call: the problem it solves, the decisions behind the interface, and how it was built.':
      'يسعدنا أن نشرح لك هذا المشروع في مكالمة: المشكلة التي يحلها، والقرارات وراء تصميم الواجهة، وكيف تم بناؤه.',
    'Website / platform': 'موقع / منصة',
    'Online store': 'متجر إلكتروني',
  };

  const STORE_KEY = 'orafdev-lang';
  const texts = new WeakMap();
  const attrs = new WeakMap();
  const ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];
  const norm = s => s.replace(/\s+/g, ' ').trim();
  let current = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  let originalTitle = null;

  const t = en => (current === 'ar' && AR[en]) || en;

  function apply(lang) {
    current = lang;
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.parentElement && n.parentElement.closest('script, style, svg, pre')) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
    });
    let node;
    while ((node = walker.nextNode())) {
      if (!texts.has(node)) texts.set(node, node.nodeValue);
      const orig = texts.get(node);
      const key = norm(orig);
      if (!key) continue;
      if (lang === 'ar' && AR[key]) {
        const lead = orig.match(/^\s*/)[0], trail = orig.match(/\s*$/)[0];
        node.nodeValue = lead + AR[key] + trail;
      } else {
        node.nodeValue = orig;
      }
    }
    document.querySelectorAll(ATTRS.map(a => `[${a}]`).join(',')).forEach(el => {
      if (!attrs.has(el)) {
        const o = {}; ATTRS.forEach(a => { if (el.hasAttribute(a)) o[a] = el.getAttribute(a); }); attrs.set(el, o);
      }
      const o = attrs.get(el);
      Object.keys(o).forEach(a => el.setAttribute(a, lang === 'ar' && AR[norm(o[a])] ? AR[norm(o[a])] : o[a]));
    });
    if (originalTitle === null) originalTitle = document.title;
    document.title = lang === 'ar' && AR[originalTitle] ? AR[originalTitle] : originalTitle;

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
    root.classList.remove('i18n-pending');
    document.dispatchEvent(new CustomEvent('orafdev:lang', { detail: { lang } }));
  }

  // Re-register attribute originals when JS changes them later (e.g. menu toggle label)
  function setAttr(el, name, en) {
    const o = attrs.get(el) || {};
    o[name] = en; attrs.set(el, o);
    el.setAttribute(name, t(en));
  }

  window.I18N = { t, apply, setAttr, has: k => !!AR[norm(k)], get lang() { return current; } };
})();
