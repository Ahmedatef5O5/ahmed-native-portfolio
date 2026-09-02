import { Project } from "./schemas";

export const projects: Project[] = [
  {
    slug: "social-mate",
    title: "Social Mate",
    tagline: "Connect · Share · Discover · Belong",
    positioning: "Production-grade social platform",
    description: {
      short:
        "Production-grade social media platform with real-time 1-on-1 & group chat, audio/video calls via ZEGOCLOUD, stories, push notifications via FCM, 6+ dynamic themes, and live presence system — all on Supabase Realtime.",
      full: "Social Mate is a comprehensive cross-platform social networking app that brings together real-time messaging, audio/video calling, stories, and smart push notifications — all under a beautifully themed, highly customizable UI. Built on Feature-First Clean Architecture with BLoC/Cubit state management, every feature is a self-contained module with its own data, domain, and presentation layers.",
    },
    isFeatured: true,
    theme: {
      primary: "#6c63ff", // Extracted from Repomix #7C6FFF approx
      secondary: "#3B1FA3",
    },
    techStack: ["Flutter", "Supabase", "Firebase", "ZEGOCLOUD", "BLoC"],
    links: {
      github: "https://github.com/Ahmedatef5O5/Social-Media-App",
    },
    features: [
      {
        id: "messaging",
        title: "Real-time Messaging",
        description:
          "1-on-1 & group chats with rich media, emoji reactions, typing indicators, and read receipts — powered by Supabase Realtime.",
        icon: "MessageSquare",
      },
      {
        id: "calls",
        title: "Audio & Video Calls",
        description:
          "High-quality calls via ZEGOCLOUD SDK with full-screen incoming call UI, ringtone alerts, and live call duration — even when the app is closed (FCM full-screen intents).",
        icon: "Video",
      },
      {
        id: "stories",
        title: "Stories & Status",
        description:
          "Text, image, and video stories with gradient backgrounds, tap-to-pause progress bar, and auto-expiry following standard social media conventions.",
        icon: "BookOpen",
      },
      {
        id: "notifications",
        title: "Smart Push Notifications",
        description:
          "FCM + flutter_local_notifications for instant alerts on messages, group chats, and calls — with actionable reply/decline directly from the notification shade.",
        icon: "Bell",
      },
      {
        id: "themes",
        title: "6+ Dynamic Themes",
        description:
          "Ocean, Sunset, Midnight, Emerald, Carbon, and more — with seamless light/dark switching and smooth Lottie animations throughout.",
        icon: "Palette",
      },
      {
        id: "presence",
        title: "Live Presence System",
        description:
          "Real-time Online / Last Seen status for all users, auto-updated based on app foreground/background state and integrated into every chat surface.",
        icon: "CircleDot",
      },
    ],
    media: {
      hero: {
        id: "hero-1",
        type: "image",
        url: "/assets/projects/social-mate/hero-device.webp",
        alt: "Social Mate home screen",
        role: "hero",
        priority: true,
      },
      gallery: [
        {
          category: "Messaging",
          items: [
            {
              id: "msg-1",
              type: "image",
              url: "/assets/projects/social-mate/messaging-chat.webp",
              alt: "1-on-1 Chat Interface",
              category: "Messaging",
              role: "storytelling",
              caption: "Real-time chat with typing indicators and read receipts.",
            },
            {
              id: "msg-2",
              type: "image",
              url: "/assets/projects/social-mate/messaging-group.webp",
              alt: "Group Chat Interface",
              category: "Messaging",
              role: "gallery",
            },
            {
              id: "msg-3",
              type: "video",
              url: "/assets/projects/social-mate/messaging-demo.mp4",
              poster: "/assets/projects/social-mate/messaging-demo-poster.webp",
              alt: "Messaging Video Demo",
              category: "Messaging",
              role: "demo",
            }
          ]
        },
        {
          category: "Calls",
          items: [
            {
              id: "call-1",
              type: "image",
              url: "/assets/projects/social-mate/call-audio.webp",
              alt: "Audio Call Interface",
              category: "Calls",
              role: "storytelling",
            },
            {
              id: "call-2",
              type: "image",
              url: "/assets/projects/social-mate/call-video.webp",
              alt: "Video Call Interface",
              category: "Calls",
              role: "gallery",
            }
          ]
        },
        {
          category: "Stories",
          items: [
            {
              id: "stories-1",
              type: "image",
              url: "/assets/projects/social-mate/stories-feed.webp",
              alt: "Stories Feed",
              category: "Stories",
              role: "storytelling",
            },
            {
              id: "stories-2",
              type: "gif",
              url: "/assets/projects/social-mate/stories-demo.gif",
              alt: "Stories interaction",
              category: "Stories",
              role: "demo",
            }
          ]
        },
        {
          category: "Themes",
          items: [
            {
              id: "theme-1",
              type: "image",
              url: "/assets/projects/social-mate/theme-dark.webp",
              alt: "Dark Mode Theme",
              category: "Themes",
              role: "gallery",
            },
            {
              id: "theme-2",
              type: "image",
              url: "/assets/projects/social-mate/theme-custom.webp",
              alt: "Custom Color Theme",
              category: "Themes",
              role: "gallery",
            }
          ]
        }
        // Note: You can add the remaining ~25 screenshots here mapping to actual project functionality
      ],
    },
    downloads: {
      variants: [
        {
          id: "sm-arm64",
          abi: "arm64-v8a",
          label: "ARM64-v8a",
          description: "Recommended for most modern Android devices.",
          fileUrl: "/assets/projects/social-mate/builds/social-mate-arm64-v8a.apk",
          fileName: "social-mate-arm64-v8a.apk",
          recommended: true,
          status: "pending",
        },
        {
          id: "sm-armv7",
          abi: "armeabi-v7a",
          label: "ARMv7",
          description: "For older 32-bit Android devices.",
          fileUrl: "/assets/projects/social-mate/builds/social-mate-armeabi-v7a.apk",
          fileName: "social-mate-armeabi-v7a.apk",
          status: "pending",
        },
        {
          id: "sm-x86_64",
          abi: "x86_64",
          label: "x86_64",
          description: "For Android emulators and x86 devices.",
          fileUrl: "/assets/projects/social-mate/builds/social-mate-x86_64.apk",
          fileName: "social-mate-x86_64.apk",
          status: "pending",
        }
      ]
    },
    caseStudy: {
      overview: [
        "Social Mate is a comprehensive cross-platform social networking app that brings together real-time messaging, audio/video calling, stories, and smart push notifications — all under a beautifully themed, highly customizable UI.",
        "Built on Feature-First Clean Architecture with BLoC/Cubit state management, every feature is a self-contained module with its own data, domain, and presentation layers.",
      ],
      architecture: [
        {
          title: "Presentation",
          description: "UI Components, Screens, and declarative routing.",
          items: ["Flutter", "Custom UI Toolkit"]
        },
        {
          title: "State Management",
          description: "Reactive state handling using BLoC pattern.",
          items: ["BLoC / Cubit"]
        },
        {
          title: "Domain / Repositories",
          description: "Feature-first clean architecture separating business logic from infrastructure.",
          items: ["Entities", "Use Cases", "Interfaces"]
        },
        {
          title: "Infrastructure",
          description: "Realtime backend and media handling services.",
          items: ["Supabase Realtime", "Firebase Cloud Messaging", "ZEGOCLOUD"]
        }
      ],
      decisions: [
        {
          title: "Feature-First Architecture",
          context: "A large social app quickly becomes difficult to maintain if organized by layer (e.g., all models together, all views together).",
          approach: "Adopted a feature-first folder structure where each capability (Messaging, Stories, Calls) is fully isolated with its own presentation, domain, and data layers. This allows easier feature scaling and isolated testing."
        },
        {
          title: "Supabase Realtime over Firebase RTDB",
          context: "Needed a reliable, typed, and easily queryable realtime database for 1-on-1 and group messaging.",
          approach: "Chose Supabase due to its strong Postgres foundation and native realtime subscriptions, allowing complex joins for chat history while maintaining fast websocket-based updates."
        }
      ],
      challenges: [
        {
          title: "Background Call Notifications",
          context: "Ringing the user's phone for an incoming audio/video call even when the app is completely closed.",
          approach: "Integrated FCM with full-screen intents and native Android incoming call UI APIs. Handled the transition from a background payload directly into the ZEGOCLOUD call interface."
        }
      ]
    }
  },
  {
    slug: "newswave",
    title: "NewsWave",
    tagline: "Your world, curated — in real time",
    positioning: "Offline-first Bilingual News Reader",
    description: {
      short:
        "Bilingual (EN/AR) news reader with reactive RTL support, offline-first Hive caching, dependency-free network resilience, on-device translation via MyMemory API, and Clean Architecture with strict DIP enforcement.",
      full: "NewsWave is a production-ready Flutter news application delivering breaking headlines, personalized feeds, and offline-first reading — fully bilingual (English/Arabic) with reactive RTL support. Built with strict Clean Architecture and enforced Dependency Inversion at every repository boundary, it handles real-world failure modes like captive portals, API rate limits, and stale cross-language caches by construction.",
    },
    isFeatured: true,
    theme: {
      primary: "#1A73E8",
      secondary: "#0D47A1",
    },
    techStack: ["Flutter", "Cubit", "Hive", "Supabase", "REST API"],
    links: {
      github: "https://github.com/Ahmedatef5O5/News-App",
    },
    features: [
      {
        id: "bilingual",
        title: "Fully Bilingual (EN/AR)",
        description:
          "100% localized with zero hardcoded strings — reactive RTL/LTR layout switching, locale-aware typography (Poppins/Cairo), and locale-namespaced Hive caching to prevent cross-language cache pollution.",
        icon: "Globe",
      },
      {
        id: "offline",
        title: "Offline-First Architecture",
        description:
          "Hive-backed locale-namespaced cache for headlines and paginated feeds. Articles already seen are always available offline, in the correct language, with zero JSON overhead on the hot path.",
        icon: "WifiOff",
      },
      {
        id: "translation",
        title: "On-Device Translation",
        description:
          "Chunked, field-merged translation pipeline via MyMemory API — batches of 3 articles at a time, cutting API calls by 80%+ vs naive per-field approach. Cached per-article, purged on locale switch.",
        icon: "Languages",
      },
      {
        id: "connectivity",
        title: "Dependency-Free Connectivity",
        description:
          "No connectivity_plus. Custom NetworkInfoImpl races multiple HTTP endpoints simultaneously — correctly detecting captive portals that appear online but block real traffic.",
        icon: "Signal",
      },
      {
        id: "search",
        title: "Smart Search",
        description:
          "500ms debounced search with infinite scroll, locale-aware results, and automatic re-query on language switch — powered by NewsAPI /v2/everything with title-scoped precision.",
        icon: "Search",
      },
      {
        id: "favorites",
        title: "Locale-Aware Favorites",
        description:
          "Save articles in any language — they are dynamically re-translated when you revisit your list in a different locale. Persisted indefinitely via Hive.",
        icon: "Bookmark",
      },
    ],
    media: {
      hero: {
        id: "nw-hero",
        type: "image",
        url: "/projects/newswave/hero.png",
        alt: "NewsWave Hero Showcase",
        role: "hero",
      },
    },
  },
  {
    slug: "findash",
    title: "FinDash",
    tagline: "Responsive Finance Dashboard",
    positioning: "Adaptive cross-platform dashboard",
    description: {
      short:
        "Fully responsive admin dashboard adapting across mobile, tablet, and desktop via custom AdaptiveLayout & SizeConfig. Features interactive FL Charts, card carousel, transaction history, and quick invoice creation.",
      full: "FinDash is a production-ready financial admin dashboard built entirely with Flutter. It demonstrates a clean, scalable architecture that elegantly handles layout adaptation across all screen sizes — from compact mobile viewports to wide desktop monitors — without a single line of platform-specific code. Every breakpoint has a dedicated layout class for pixel-perfect results.",
    },
    isFeatured: true,
    theme: {
      primary: "#00C853",
      secondary: "#00695C",
    },
    techStack: ["Flutter", "fl_chart", "Adaptive UI", "Dart"],
    links: {
      github: "https://github.com/Ahmedatef5O5/responsive_dash_board",
    },
    features: [
      {
        id: "adaptive",
        title: "Adaptive Layouts",
        description:
          "Three dedicated layouts (Mobile/Tablet/Desktop) selected automatically at runtime via AdaptiveLayout + LayoutBuilder — breakpoints at 800px and 1300px for pixel-perfect results on every device.",
        icon: "MonitorSmartphone",
      },
      {
        id: "charts",
        title: "Interactive FL Charts",
        description:
          "Touch-responsive donut chart with animated segment expansion showing income breakdown by category. Tap any segment to highlight and see the detailed value.",
        icon: "PieChart",
      },
      {
        id: "carousel",
        title: "Card Carousel",
        description:
          "ExpandablePageView-powered card carousel with animated dot indicators for smooth swipe-through navigation between multiple financial cards.",
        icon: "CreditCard",
      },
      {
        id: "invoice",
        title: "Quick Invoice",
        description:
          "Inline invoice creation form with Recipient, Amount, and Bank Name fields — Cancel and Send Payment actions with a clean, minimal UI.",
        icon: "Receipt",
      },
      {
        id: "history",
        title: "Transaction History",
        description:
          "Color-coded transaction list distinguishing withdrawals from deposits at a glance — with title, subtitle, and signed amounts in TransactionItem cards.",
        icon: "ArrowRightLeft",
      },
      {
        id: "typography",
        title: "Responsive Typography",
        description:
          "Custom getResponsiveFontSize() utility scales all text with clamp(min, scaleFactor × baseSize, max) based on viewport width — readable on every screen size.",
        icon: "Type",
      },
    ],
    media: {
      hero: {
        id: "fd-hero",
        type: "image",
        url: "/projects/findash/hero.png",
        alt: "FinDash Hero Showcase",
        role: "hero",
      },
    },
  },
];
