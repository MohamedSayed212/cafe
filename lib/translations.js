// Single dictionary for the whole site — no i18n package needed.
// Add a key here, then read it with `t.section.key` inside any component.
export const translations = {
  en: {
    nav: {
      home: "HOME",
      about: "ABOUT",
      menu: "MENU",
      contact: "CONTACT",
      reserve: "RESERVE A TABLE",
    },

    hero: {
      eyebrow: "Specialty Coffee · Cairo, Egypt",
      titleLine1: "Where Every Cup",
      titleLine2: "Tells a Story",
      subtitle:
        "Handcrafted coffee, a warm atmosphere, and a corner of Cairo that feels like home. Come as a stranger, leave as a regular.",
      viewMenu: "VIEW MENU",
      reserve: "RESERVE A TABLE",
      est: "Est. 2018",
      serving: "Serving Cairo",
    },

    about: {
      eyebrow: "Our Story",
      titleLine1: "A Passion for Coffee,",
      titleLine2: "Rooted in Cairo",
      paragraph1:
        "terra was born from a simple belief — that great coffee deserves a great space. Nestled in the heart of Heliopolis, we opened our doors to bring specialty coffee culture to Cairo without losing the warmth and hospitality Egypt is known for.",
      paragraph2:
        "Every bean is carefully sourced, every cup is brewed with intention. Whether you're starting your morning or winding down your evening, terra is your place.",
      statEstLabel: "Est. in Cairo",
      statDrinksLabel: "Drinks on the Menu",
    },

    bestSellers: {
      eyebrow: "What We Brew",
      title: "Featured Drinks",
      tags: {
        favorite: "Customer Favorite",
        barista: "Barista's Pick",
        specialty: "House Specialty",
        summer: "Summer Special",
      },
      currency: "EGP",
    },

    menuSection: {
      eyebrow: "A Taste of What We Offer",
      title: "Menu Preview",
      subtitle:
        "A curated selection across our menu — coffee, iced drinks, desserts, and fresh bakery.",
      cta: "VIEW FULL MENU",
      currency: "EGP",
    },

    why: {
      eyebrow: "Why terra",
      title: "More Than Just Coffee",
      items: [
        {
          title: "Fresh Daily",
          description: "Beans roasted every week. Your cup is never stale.",
        },
        {
          title: "Egyptian Warmth",
          description: "Hospitality is in our DNA. Every guest feels at home.",
        },
        {
          title: "Cairo's Corner",
          description:
            "A quiet spot in Heliopolis to slow down and recharge.",
        },
        {
          title: "Your Regular Café",
          description: "We remember your name. And your order.",
        },
      ],
    },

    gallery: {
      eyebrow: "Our Space",
      title: "A Glimpse Inside terra",
      showMore: "SHOW MORE PHOTOS",
      showLess: "SHOW LESS PHOTOS",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Common Questions",
      items: [
        {
          q: "Do you take table reservations?",
          a: "Yes! You can reserve a table through our website or by calling us directly. We recommend booking in advance, especially on weekends.",
        },
        {
          q: "What are your opening hours?",
          a: "We're open 24 hours a day, 7 days a week.",
        },
        {
          q: "Do you offer takeaway?",
          a: "Absolutely. All drinks and food items on our menu are available for takeaway.",
        },
        {
          q: "Is there Wi-Fi available?",
          a: "Yes, free high-speed Wi-Fi is available for all guests. Just ask one of our baristas for the password.",
        },
      ],
    },

    reservation: {
      eyebrow: "Visit Us",
      title: "Reserve a Table",
      subtitle: "Book your spot in advance and we'll have it ready for you.",
      name: "Full Name",
      phone: "Phone Number",
      phonePlaceholder: "0 100 000 0000",
      phoneError: "Enter a valid number (01X XXXXXXXX)",
      email: "Email Address",
      emailPlaceholder: "you@example.com",
      date: "Date",
      time: "Time",
      guests: "Guests",
      guestSingular: "Guest",
      guestPlural: "Guests",
      notes: "Special Notes",
      notesPlaceholder: "Any special requests or occasion?",
      submit: "RESERVE TABLE",
      submitting: "SUBMITTING…",
      hour: "Hr",
      am: "AM",
      pm: "PM",
      modal: {
        title: "Reservation Received!",
        message: "We will confirm your table shortly via WhatsApp/SMS.",
        done: "DONE",
      },
    },

    contact: {
      eyebrow: "Find Us",
      title: "Contact & Location",
      addressTitle: "Address",
      addressLine1: "15 El-Nozha Street, Heliopolis",
      addressLine2: "Cairo, Egypt",
      directions: "Get Directions →",
      hoursTitle: "Opening Hours",
      hoursValue: "Open 24 hours · 7 days a week",
      touchTitle: "Get in Touch",
    },

    footer: {
      tagline:
        "Specialty coffee rooted in Cairo. A space to slow down, sip well, and stay a while.",
      quickLinks: "Quick Links",
      links: {
        home: "Home",
        about: "About",
        menu: "Menu",
        contact: "Contact",
      },
      hoursTitle: "Opening Hours",
      hoursValue: "Open 24 hours · 7 days a week",
      locationTitle: "Location",
      addressLine1: "15 El-Nozha St, Heliopolis",
      addressLine2: "Cairo, Egypt",
      rights: "terra. All rights reserved.",
    },

    whatsapp: {
      label: "Chat with us",
      // Sent as the pre-filled WhatsApp message
      message: "Hello terra cafe, I would like to inquire about...",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية",
      about: "حكايتنا",
      menu: "المنيو",
      contact: "تواصل معنا",
      reserve: "احجز طاولة",
    },

    hero: {
      eyebrow: "قهوة مختصة · القاهرة، مصر",
      titleLine1: "لكل فنجان",
      titleLine2: "حكاية تُروى",
      subtitle:
        "قهوة تُحضَّر بحب، أجواء دافئة، وركن في القاهرة تشعر فيه أنك في بيتك. تدخل ضيفًا، وتخرج من أهل المكان.",
      viewMenu: "تصفح المنيو",
      reserve: "احجز طاولة",
      est: "منذ 2018",
      serving: "في قلب القاهرة",
    },

    about: {
      eyebrow: "حكايتنا",
      titleLine1: "شغف بالقهوة،",
      titleLine2: "وُلد في القاهرة",
      paragraph1:
        "بدأت terra من فكرة بسيطة: القهوة المميزة تستحق مكانًا يليق بها. من قلب مصر الجديدة فتحنا أبوابنا لنقدّم ثقافة القهوة المختصة، مع الدفء وكرم الضيافة الذي تشتهر به مصر.",
      paragraph2:
        "نختار كل حبة بن بعناية، ونُحضّر كل فنجان باهتمام. سواء كنت تبدأ يومك أو تختم مساءك، ستجد في terra مكانك.",
      statEstLabel: "تأسسنا في القاهرة",
      statDrinksLabel: "مشروبًا في المنيو",
    },

    bestSellers: {
      eyebrow: "ما نُحضّره لك",
      title: "أبرز المشروبات",
      tags: {
        favorite: "الأكثر طلبًا",
        barista: "اختيار الباريستا",
        specialty: "تخصّص terra",
        summer: "نجم الصيف",
      },
      currency: "ج.م",
    },

    menuSection: {
      eyebrow: "لمحة من المنيو",
      title: "نظرة على المنيو",
      subtitle:
        "تشكيلة مختارة من المنيو — قهوة، مشروبات باردة، حلويات، ومخبوزات طازجة.",
      cta: "تصفح المنيو كاملًا",
      currency: "ج.م",
    },

    why: {
      eyebrow: "لماذا terra؟",
      title: "أكثر من مجرد قهوة",
      items: [
        {
          title: "طازج كل يوم",
          description: "نُحمّص البن كل أسبوع، فيصلك الفنجان بكامل نكهته.",
        },
        {
          title: "ضيافة مصرية",
          description: "الكرم طبعنا، وكل ضيف عندنا يشعر أنه في بيته.",
        },
        {
          title: "ركنك في القاهرة",
          description: "مكان هادئ في مصر الجديدة تهدأ فيه وتستعيد طاقتك.",
        },
        {
          title: "مقهاك المفضّل",
          description: "نتذكر اسمك… ونتذكر طلبك أيضًا.",
        },
      ],
    },

    gallery: {
      eyebrow: "المكان",
      title: "من داخل terra",
      showMore: "المزيد من الصور",
      showLess: "عرض أقل",
    },

    faq: {
      eyebrow: "الأسئلة الشائعة",
      title: "تسألون… ونجيب",
      items: [
        {
          q: "هل يمكن حجز طاولة؟",
          a: "بالتأكيد. احجز من الموقع أو اتصل بنا مباشرة، ويُفضّل الحجز مبكرًا في عطلات نهاية الأسبوع.",
        },
        {
          q: "ما مواعيد العمل؟",
          a: "أبوابنا مفتوحة 24 ساعة، طوال أيام الأسبوع.",
        },
        {
          q: "هل يوجد تيك أواي؟",
          a: "طبعًا، كل ما في المنيو من مشروبات ومأكولات متاح للتيك أواي.",
        },
        {
          q: "هل يتوفر واي فاي؟",
          a: "نعم، واي فاي مجاني وسريع لكل الضيوف — اطلب كلمة المرور من أي باريستا.",
        },
      ],
    },

    reservation: {
      eyebrow: "زيارتك تسعدنا",
      title: "احجز طاولة",
      subtitle: "احجز مكانك مقدمًا، وسنجهّزه في انتظارك.",
      name: "الاسم بالكامل",
      phone: "رقم الموبايل",
      phonePlaceholder: "0 100 000 0000",
      phoneError: "من فضلك أدخل رقمًا صحيحًا (01X XXXXXXXX)",
      email: "البريد الإلكتروني",
      emailPlaceholder: "you@example.com",
      date: "التاريخ",
      time: "الميعاد",
      guests: "عدد الضيوف",
      guestSingular: "ضيف",
      guestPlural: "ضيوف",
      notes: "طلبات خاصة",
      notesPlaceholder: "مناسبة خاصة؟ أو طلب معيّن؟ اكتبه هنا.",
      submit: "تأكيد الحجز",
      submitting: "جارٍ الحجز…",
      hour: "ساعة",
      am: "ص",
      pm: "م",
      modal: {
        title: "وصلنا حجزك!",
        message: "سنؤكد لك الطاولة قريبًا عبر واتساب أو رسالة نصية.",
        done: "تم",
      },
    },

    contact: {
      eyebrow: "أين تجدنا",
      title: "العنوان والتواصل",
      addressTitle: "العنوان",
      addressLine1: "15 شارع النزهة، مصر الجديدة",
      addressLine2: "القاهرة، مصر",
      directions: "افتح على الخريطة ←",
      hoursTitle: "مواعيد العمل",
      hoursValue: "مفتوح 24 ساعة · طوال الأسبوع",
      touchTitle: "تواصل معنا",
    },

    footer: {
      tagline:
        "قهوة مختصة من قلب القاهرة. مكان تهدأ فيه، وتشرب فنجانًا يستحق، وتبقى على راحتك.",
      quickLinks: "روابط سريعة",
      links: {
        home: "الرئيسية",
        about: "حكايتنا",
        menu: "المنيو",
        contact: "تواصل معنا",
      },
      hoursTitle: "مواعيد العمل",
      hoursValue: "مفتوح 24 ساعة · طوال الأسبوع",
      locationTitle: "العنوان",
      addressLine1: "15 شارع النزهة، مصر الجديدة",
      addressLine2: "القاهرة، مصر",
      rights: "terra. جميع الحقوق محفوظة.",
    },

    whatsapp: {
      label: "كلّمنا على واتساب",
      message: "مرحبًا terra، أود الاستفسار عن...",
    },
  },
};
