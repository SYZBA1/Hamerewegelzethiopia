export type Lang = "am" | "en";

export type Translations = {
  nav: {
    home: string;
    about: string;
    sermons: string;
    blog: string;
    library: string;
    contact: string;
    departments: string;
    lms: string;
    donate: string;
  };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    motto: string;
    scroll: string;
    cta_support: string;
    cta_learn: string;
  };
  footer: {
    title: string;
    motto: string;
    links: {
      home: string;
      about: string;
      departments: string;
      blog: string;
      sermons: string;
      library: string;
      contact: string;
      lms: string;
      donate: string;
    };
    copyright: string;
    followUs: string;
  };
  mission: {
    overline: string;
    heading: string;
    mission_label: string;
    mission_text: string;
    vision_label: string;
    vision_text: string;
    cta_story: string;
    cta_dept: string;
  };
  mega: {
    hq_title: string;
    dept: {
      media: string;
      finance: string;
      research: string;
      education: string;
      relief: string;
      gospel: string;
    };
    edu_title: string;
    edu: {
      diploma: string;
      degree: string;
      masters: string;
      library: string;
    };
    loc_title: string;
    loc: {
      diocese: string;
      zone: string;
      district: string;
    };
    viewAll: string;
    structureDesc: string;
  };
  about: {
    title: string;
    intro: string;
  };
};

export const translations: Record<Lang, Translations> = {
  am: {
    nav: {
      home: "ዋና",
      about: "ስለ እኛ",
      sermons: "ወንጌሎች",
      blog: "ብሎግ",
      library: "ላይብረሪ",
      contact: "አግናኝ",
      departments: "ክፍሎች",
      lms: "ማስተማሪያ",
      donate: "ለእግዚአብሔር እገዛ",
    },
    hero: {
      eyebrow: "እንኳን ደህና መጣችሁ",
      line1: "ሕይወትን በእምነት እንኖር",
      line2: "የፍቅር ስም የሚወሰን",
      line3: "እና የተስፋ ድምጽ",
      motto: "እኛ እንደ ፍቅር የታወቀ፣ የተስፋ ድምጽ።",
      scroll: "ለመቀጥል ታቦትን አጥብቅ",
      cta_support: "ይደግፉን",
      cta_learn: "ተጨማሪ ያውቁ",
    },
    footer: {
      title: "ሐመረ ወንጌል ዘኢትዮጵያ",
      motto: "እኛ ሕይወትን በእምነት እና በፍቅር እንኖር",
      links: {
        home: "ዋና",
        about: "ስለ እኛ",
        departments: "ክፍሎች",
        blog: "ብሎግ",
        sermons: "ወንጌሎች",
        library: "ላይብረሪ",
        contact: "አግናኝ",
        lms: "ማስተማሪያ",
        donate: "ለእግዚአብሔር እገዛ",
      },
      copyright: "© 2026 ሐመረ ወንጌል ዘኢትዮጵያ",
      followUs: "እኛን ይከታቱ",
    },
    mission: {
      overline: "የተስፋ የማዕከል ፕሮግራሞች",
      heading: "የእኛ ተግባር",
      mission_label: "ተግባር",
      mission_text: "እኛ በፍቅር እና በእምነት ሕይወትን እንጠብቃለን እና ዕረፍትን እንሰጣለን።",
      vision_label: "ራዕይ",
      vision_text: "የእኛ ራዕይ ለሁሉም ዕረፍት እና ተስፋ ተቀባይነት ይደርስ ዘንድ ነው።",
      cta_story: "ታሪክን ይውቁ",
      cta_dept: "ክፍሎችን ይመልከቱ",
    },
    mega: {
      hq_title: "ዋና ቢሮ",
      dept: {
        media: "ሚዲያ",
        finance: "ፋይናንስ",
        research: "ጥናት",
        education: "ትምህርት",
        relief: "ድጋፍ",
        gospel: "ወንጌል",
      },
      edu_title: "ትምህርት ፕሮግራሞች",
      edu: {
        diploma: "ዲፕሎማ",
        degree: "ዲግሪ",
        masters: "ማስተርስ",
        library: "ላይብረሪ",
      },
      loc_title: "አውድ አወዳድ",
      loc: {
        diocese: "ቅዱስ ቤተክርስቲያን",
        zone: "ዞን",
        district: "ወረዳ",
      },
      viewAll: "ሁሉንም እይ",
      structureDesc: "ከጠቅላይ ጽሕፈት ቤት እስከ ወረዳ ድረስ ያለ ሙሉ ተዋረዳዊ አደረጃጀት።",
    },
    about: {
      title: "ስለ እኛ",
      intro: "እኛ ሕይወትን በእምነት እና በፍቅር እንኖር እና ለሕዝብ ምን እንደምንደርስ እንሰማር።",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      sermons: "Sermons",
      blog: "Blog",
      library: "Library",
      contact: "Contact",
      departments: "Departments",
      lms: "LMS",
      donate: "Donate",
    },
    hero: {
      eyebrow: "Welcome",
      line1: "Living by Faith",
      line2: "Known by Love",
      line3: "A voice of hope",
      motto: "We are known by love and we uplift the community.",
      scroll: "Scroll to continue",
      cta_support: "Support Us",
      cta_learn: "Learn More",
    },
    footer: {
      title: "Hamere Wengel Zethiopia",
      motto: "We live by faith and are known by love.",
      links: {
        home: "Home",
        about: "About",
        departments: "Departments",
        blog: "Blog",
        sermons: "Sermons",
        library: "Library",
        contact: "Contact",
        lms: "LMS",
        donate: "Donate",
      },
      copyright: "© 2026 Hamere Wengel Zethiopia",
      followUs: "Follow Us",
    },
    mission: {
      overline: "Hope-Centered Programs",
      heading: "Our Mission",
      mission_label: "Mission",
      mission_text: "We serve with love and faith, delivering hope and restoration to the community.",
      vision_label: "Vision",
      vision_text: "Our vision is a world where everyone has access to hope and opportunity.",
      cta_story: "Read Our Story",
      cta_dept: "Explore Departments",
    },
    mega: {
      hq_title: "Headquarters",
      dept: {
        media: "Media",
        finance: "Finance",
        research: "Research",
        education: "Education",
        relief: "Relief",
        gospel: "Gospel",
      },
      edu_title: "Education Programs",
      edu: {
        diploma: "Diploma",
        degree: "Degree",
        masters: "Masters",
        library: "Library",
      },
      loc_title: "Administrative Structure",
      loc: {
        diocese: "Diocese",
        zone: "Zone",
        district: "District",
      },
      viewAll: "View All",
      structureDesc: "Full hierarchical structure from HQ to local Wereda offices.",
    },
    about: {
      title: "About Us",
      intro: "We live faithfully, known by love, and strive to bring hope to the community.",
    },
  },
};
