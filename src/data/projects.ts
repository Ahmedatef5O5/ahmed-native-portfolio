import { Project } from "./schemas";

const SOCIAL_MATE_APK_VERSION = "v1.0.0"; // TODO(owner): update to the actual GitHub Release tag once published

function githubReleaseAsset(repo: string, version: string, fileName: string): string {
  return `https://github.com/${repo}/releases/download/${version}/${fileName}`;
}

export const projects: Project[] = [
  {
    slug: "social-mate",
    title: "Social Mate",
    tagline: "Connect · Share · Discover · Belong",
    positioning: "Production-grade, AI-powered social platform built with Flutter & Supabase",
    description: {
      short:
        "Production-grade, AI-augmented social platform featuring real-time 1-on-1 and group chat, low-latency audio/video calls via LiveKit WebRTC SFU, 24h ephemeral stories, vertical short-form Reels, on-device multi-provider AI Assistant (Gemini, Groq, OpenRouter), custom Sticker Studio, and 12 dynamic themes — all on Supabase Realtime.",
      full: "Social Mate is a comprehensive cross-platform social networking app that orchestrates 24 self-contained feature modules under a clean Feature-First Architecture. Engineered with Flutter and BLoC/Cubit, it couples Supabase PostgreSQL & Realtime with LiveKit WebRTC SFU for resilient, low-latency communication. It integrates a multi-provider AI gateway (Gemini, Groq, OpenRouter) for in-context assistive intelligence, alongside Hive offline caching, FCM actionable push notifications with full-screen incoming call intents, and biometric app security.",
    },
    isFeatured: true,
    theme: {
      primary: "#6c63ff",
      secondary: "#3B1FA3",
    },
    techStack: [
      "Flutter",
      "Dart",
      "Supabase (PostgreSQL & Realtime)",
      "LiveKit (WebRTC SFU)",
      "Firebase (FCM)",
      "BLoC / Cubit",
      "Hive",
      "Multi-Provider AI (Gemini · Groq · OpenRouter)",
      "Cloudinary CDN",
    ],
    links: {
      github: "https://github.com/Ahmedatef5O5/Social-Media-App",
    },
    features: [
      {
        id: "messaging",
        title: "Real-time Messaging & Unified Media Engine",
        description:
          "Instant 1-on-1 and group chats with Supabase Realtime, typing indicators, read receipts, professional voice messaging with live waveforms, rich link previews, @mentions, and multi-target message forwarding.",
        icon: "MessageSquare",
      },
      {
        id: "calls",
        title: "LiveKit WebRTC Audio & Video Calling",
        description:
          "Carrier-grade 1-on-1 and group calling powered by LiveKit SFU with FCM lock-screen full-screen intents, flutter_foreground_task persistence, floating Picture-in-Picture (PiP) overlay, and active speaker detection.",
        icon: "Video",
      },
      {
        id: "ai-assistant",
        title: "Multi-Provider AI Assistant & AI Chat",
        description:
          "Pluggable AI gateway supporting Gemini, Groq, and OpenRouter with automated vision detection. Delivers contextual autocomplete, smart replies, comment suggestions, chat summaries, and standalone streaming chat.",
        icon: "Bot",
      },
      {
        id: "stories-reels",
        title: "Ephemeral Stories & Short-Form Reels",
        description:
          "24-hour auto-expiring stories with rich gradient text editor, image/video progress timers, animated reaction fountains, and DM replies. Complemented by a vertical swipeable Reels feed with pooled controllers and home discovery rail.",
        icon: "Film",
      },
      {
        id: "comments-reactions",
        title: "Threaded Discussions & Voice Comments",
        description:
          "Deeply nested comment threads with visual connector lines via ThreadPainter, in-line voice comment recording and playback, universal emoji reaction bubbles, and AI-powered comment recommendations.",
        icon: "MessageCircle",
      },
      {
        id: "sticker-studio",
        title: "Custom Sticker Studio & Creative Suite",
        description:
          "Built-in creator studio for designing and publishing custom sticker packs with public/private visibility, upload quota enforcement, friend sharing, and integrated Giphy engine.",
        icon: "Smile",
      },
      {
        id: "social-discovery",
        title: "Social Graph & Unified Global Search",
        description:
          "Friendship lifecycle management, audience privacy picker (public, friends, private, custom), algorithmic friend discovery, and unified search across accounts, posts, reels, and groups with a For You tab.",
        icon: "Users",
      },
      {
        id: "theming-security",
        title: "12 Bespoke Theming Engines & Biometric Security",
        description:
          "12 dynamically switchable themes with responsive Lottie color adaptation, base/circle palette shifts, and light/dark modes. Fortified by biometric local_auth app lock and Hive cache eviction.",
        icon: "ShieldCheck",
      },
    ],
    media: {
      hero: {
        id: "hero-social-mate",
        type: "image",
        url: "/assets/projects/social-mate/home_view.png",
        alt: "Social Mate Home Feed & Navigation",
        role: "hero",
        priority: true,
      },
      gallery: [
        {
          category: "Real-time Messaging",
          items: [
            {
              id: "msg-1",
              type: "image",
              url: "/assets/projects/social-mate/messaging-chat.webp",
              alt: "1-on-1 Chat Interface with Read Receipts & Voice Note",
              category: "Real-time Messaging",
              role: "storytelling",
              caption: "Real-time messaging with live waveform voice notes, link previews, and read receipts.",
            },
            {
              id: "msg-2",
              type: "image",
              url: "/assets/projects/social-mate/group_chat_details_view.png",
              alt: "Group Chat Details and Active Conversation",
              category: "Real-time Messaging",
              role: "gallery",
              caption: "Multi-participant group conversations with member avatars and typing indicators.",
            },
            {
              id: "msg-3",
              type: "image",
              url: "/assets/projects/social-mate/messaging-group.webp",
              alt: "Group Chat with Mentions & Media",
              category: "Real-time Messaging",
              role: "gallery",
            },
            {
              id: "msg-4",
              type: "video",
              url: "/assets/projects/social-mate/messaging-demo.mp4",
              poster: "/assets/projects/social-mate/messaging-chat.webp",
              alt: "Messaging Video Demo",
              category: "Real-time Messaging",
              role: "demo",
            },
          ],
        },
        {
          category: "WebRTC Audio & Video Calls",
          items: [
            {
              id: "call-1",
              type: "image",
              url: "/assets/projects/social-mate/call-audio.webp",
              alt: "1-on-1 Audio Call with Ambient Glassmorphism UI",
              category: "WebRTC Audio & Video Calls",
              role: "storytelling",
              caption: "LiveKit SFU audio call with live reactive waveforms and floating controls.",
            },
            {
              id: "call-2",
              type: "image",
              url: "/assets/projects/social-mate/call-video.webp",
              alt: "HD Video Call with PiP Overlay Support",
              category: "WebRTC Audio & Video Calls",
              role: "gallery",
              caption: "Full-screen WebRTC video calling with picture-in-picture background multitasking.",
            },
            {
              id: "call-3",
              type: "image",
              url: "/assets/projects/social-mate/call-group-livekit.webp",
              alt: "Multi-Party Group Video Call Grid",
              category: "WebRTC Audio & Video Calls",
              role: "gallery",
            },
          ],
        },
        {
          category: "AI Assistant & Chat",
          items: [
            {
              id: "ai-1",
              type: "image",
              url: "/assets/projects/social-mate/ai-chat-streaming.webp",
              alt: "Standalone AI Chat with Streaming Responses",
              category: "AI Assistant & Chat",
              role: "storytelling",
              caption: "Conversational AI companion with multi-provider switching (Gemini, Groq, OpenRouter).",
            },
            {
              id: "ai-2",
              type: "image",
              url: "/assets/projects/social-mate/ai-photo-preview.webp",
              alt: "Multimodal Vision Analysis Preview",
              category: "AI Assistant & Chat",
              role: "gallery",
            },
            {
              id: "ai-3",
              type: "image",
              url: "/assets/projects/social-mate/ai-comment-suggestions.webp",
              alt: "In-Context AI Comment Suggestions",
              category: "AI Assistant & Chat",
              role: "gallery",
            },
          ],
        },
        {
          category: "Stories & Reels",
          items: [
            {
              id: "stories-1",
              type: "image",
              url: "/assets/projects/social-mate/stories-feed.webp",
              alt: "Stories Discovery Feed Tray",
              category: "Stories & Reels",
              role: "storytelling",
              caption: "Horizontal stories discovery tray with animated gradient unread indicators.",
            },
            {
              id: "stories-2",
              type: "image",
              url: "/assets/projects/social-mate/your_story_disply_view.png",
              alt: "Full-screen Story Viewer with Segmented Progress",
              category: "Stories & Reels",
              role: "gallery",
              caption: "24-hour ephemeral stories with segmented progress timers and reaction fountains.",
            },
            {
              id: "stories-3",
              type: "image",
              url: "/assets/projects/social-mate/reels-player-fullscreen.webp",
              alt: "Vertical Short-Form Video Reels Player",
              category: "Stories & Reels",
              role: "gallery",
            },
          ],
        },
        {
          category: "Feed & Communities",
          items: [
            {
              id: "feed-1",
              type: "image",
              url: "/assets/projects/social-mate/home_view.png",
              alt: "Social Mate Home Feed Overview",
              category: "Feed & Communities",
              role: "storytelling",
              caption: "Comprehensive feed with interleaved Reels rail, rich media cards, and community updates.",
            },
            {
              id: "feed-2",
              type: "image",
              url: "/assets/projects/social-mate/notifications_view.png",
              alt: "In-App Notification Center with Category Filters",
              category: "Feed & Communities",
              role: "gallery",
              caption: "Categorized notification center separating messages, reactions, comments, and calls.",
            },
            {
              id: "feed-3",
              type: "image",
              url: "/assets/projects/social-mate/discover-people.webp",
              alt: "Algorithmic People Discovery and Mutual Connections",
              category: "Feed & Communities",
              role: "gallery",
            },
          ],
        },
        {
          category: "Stickers & Media",
          items: [
            {
              id: "stickers-1",
              type: "image",
              url: "/assets/projects/social-mate/sticker-packs-browser.webp",
              alt: "Custom Sticker Studio and Pack Browser",
              category: "Stickers & Media",
              role: "storytelling",
              caption: "Built-in creator studio allowing users to design, upload, and publish custom sticker packs.",
            },
            {
              id: "stickers-2",
              type: "image",
              url: "/assets/projects/social-mate/sticker-pack-details.webp",
              alt: "Sticker Pack Details and Download Sheet",
              category: "Stickers & Media",
              role: "gallery",
            },
          ],
        },
        {
          category: "Theming & Security",
          items: [
            {
              id: "theme-1",
              type: "image",
              url: "/assets/projects/social-mate/my_profile_view.png",
              alt: "User Profile View with Statistics and Post Grid",
              category: "Theming & Security",
              role: "storytelling",
              caption: "Custom profile view with followers, following, media tabs, and dynamic theme palette.",
            },
            {
              id: "theme-2",
              type: "image",
              url: "/assets/projects/social-mate/profile.png",
              alt: "Profile Overview and Activity",
              category: "Theming & Security",
              role: "gallery",
            },
            {
              id: "theme-3",
              type: "image",
              url: "/assets/projects/social-mate/themes-select-grid.webp",
              alt: "12 Dynamic Bespoke Themes Selector",
              category: "Theming & Security",
              role: "gallery",
            },
            {
              id: "theme-4",
              type: "image",
              url: "/assets/projects/social-mate/biometric-app-lock.webp",
              alt: "Biometric App Lock Gate",
              category: "Theming & Security",
              role: "gallery",
            },
          ],
        },
      ],
    },
    downloads: {
      version: SOCIAL_MATE_APK_VERSION,
      releaseDate: undefined,
      variants: [
        {
          id: "sm-arm64",
          abi: "arm64-v8a",
          label: "ARM64-v8a",
          description: "Recommended for most modern Android devices.",
          fileUrl: githubReleaseAsset(
            "Ahmedatef5O5/Social-Media-App",
            SOCIAL_MATE_APK_VERSION,
            "social-mate-arm64-v8a.apk"
          ),
          fileName: "social-mate-arm64-v8a.apk",
          recommended: true,
          status: "pending",
        },
        {
          id: "sm-armv7",
          abi: "armeabi-v7a",
          label: "ARMv7",
          description: "For older 32-bit Android devices.",
          fileUrl: githubReleaseAsset(
            "Ahmedatef5O5/Social-Media-App",
            SOCIAL_MATE_APK_VERSION,
            "social-mate-armeabi-v7a.apk"
          ),
          fileName: "social-mate-armeabi-v7a.apk",
          status: "pending",
        },
        {
          id: "sm-x86_64",
          abi: "x86_64",
          label: "x86_64",
          description: "For Android emulators and x86 devices.",
          fileUrl: githubReleaseAsset(
            "Ahmedatef5O5/Social-Media-App",
            SOCIAL_MATE_APK_VERSION,
            "social-mate-x86_64.apk"
          ),
          fileName: "social-mate-x86_64.apk",
          status: "pending",
        },
      ],
    },
    caseStudy: {
      overview: [
        "Social Mate is a production-grade cross-platform social networking application engineered to deliver the breadth and depth of tier-1 consumer platforms. It brings together 24 self-contained feature modules spanning real-time messaging, multi-party audio/video conferencing, ephemeral stories, short-form video reels, creator sticker packs, and on-device generative AI assistance.",
        "Architected around a Feature-First Clean Architecture paradigm with BLoC/Cubit state management, the application guarantees strict unidirectional data flow and modular boundary isolation. The persistent data layer is backed by Supabase PostgreSQL, leveraging real-time Change Data Capture (CDC) and row-level security (RLS) to synchronize complex social graphs, message streams, and threaded discussions.",
        "Real-time audio and video communications are powered by LiveKit's open WebRTC Selective Forwarding Unit (SFU) architecture, replacing proprietary SDKs with high-efficiency media routing. Complementing this is a pluggable multi-provider AI gateway hot-swapping between Google Gemini, Groq, and OpenRouter, paired with Hive binary offline caching and biometric security.",
      ],
      architecture: [
        {
          title: "Presentation & Reactive State Management",
          description:
            "Feature-First Clean Architecture isolating 24 modules with unidirectional BLoC/Cubit state flow and 12-theme dynamic color adaptation.",
          items: ["Flutter 3.x", "BLoC / Cubit Pattern", "Custom AppRouter & Active-Screen Tracker", "12 Dynamic Themes"],
        },
        {
          title: "Realtime Communications & Signaling Layer",
          description:
            "Scalable PostgreSQL database utilizing Supabase Realtime Change Data Capture (CDC) over WebSockets with optimistic client reconciliation.",
          items: ["Supabase PostgreSQL", "PostgreSQL CDC Subscriptions", "Row Level Security (RLS)", "Cloudinary CDN"],
        },
        {
          title: "LiveKit WebRTC SFU Audio/Video Engine",
          description:
            "Carrier-grade 1-on-1 and group calling utilizing LiveKit SFU, FCM full-screen incoming call intents, flutter_foreground_task, and Picture-in-Picture.",
          items: ["LiveKit SDK (WebRTC SFU)", "FCM Full-Screen Intents", "flutter_foreground_task", "In-App PiP Overlay"],
        },
        {
          title: "Pluggable Multi-Provider AI Gateway & Hive Offline Tier",
          description:
            "Multi-provider AI inference layer with automatic vision detection, accompanied by Hive-backed offline caching with LRU storage eviction.",
          items: ["Gemini · Groq · OpenRouter Gateway", "Hive Binary Persistence", "LRU Cache Eviction", "Biometric local_auth"],
        },
      ],
      decisions: [
        {
          title: "LiveKit WebRTC SFU vs P2P Mesh or Proprietary SDKs",
          context:
            "Peer-to-peer WebRTC mesh architectures degrade rapidly in mobile group calling due to N*(N-1) uplink bandwidth saturation, while proprietary SDKs like ZEGOCLOUD introduce vendor lock-in and opaque pricing.",
          approach:
            "Standardized on LiveKit's open WebRTC Selective Forwarding Unit (SFU) architecture. Clients publish a single upstream track while the SFU intelligently distributes downlinks based on active speaker detection and network conditions. This reduced mobile bandwidth by over 65% in group calls and enabled seamless Picture-in-Picture (PiP) background multitasking.",
        },
        {
          title: "Pluggable Multi-Provider AI Gateway with Runtime Vision Detection",
          context:
            "Relying on a single AI vendor introduces rate limit vulnerabilities, regional latency spikes, and feature constraints when bridging text assistance and multimodal image analysis.",
          approach:
            "Built an abstraction layer over Gemini, Groq, and OpenRouter. The gateway dynamically inspects the request context: when an image attachment is detected, it automatically routes the payload to Gemini or OpenRouter's vision endpoints; for rapid conversational replies and comment suggestions, it prioritizes Groq for sub-second token delivery.",
        },
        {
          title: "Supabase Realtime CDC with Optimistic Client-Side Reconciliation",
          context:
            "Maintaining instantaneous chat delivery, typing indicators, and deeply nested comment threads across hundreds of concurrent users without excessive polling or race conditions.",
          approach:
            "Employed Supabase Realtime Change Data Capture (CDC) directly hooked to PostgreSQL table events. The presentation layer applies immediate optimistic UI updates upon user action, then seamlessly reconciles with the authoritative WebSocket broadcast payload, ensuring zero perceivable UI lag.",
        },
        {
          title: "Feature-First Domain Isolation with Unified Shared Primitives",
          context:
            "Organizing a 24-feature social app by technical layers (all models in one folder, all views in another) creates high coupling and makes parallel feature evolution error-prone.",
          approach:
            "Structured the codebase into self-contained feature slices (`single_chats`, `reels`, `stories`, `stickers`, etc.), each encapsulating its own Cubits, Models, Services, and Views. Reusable infrastructure — such as MediaCacheRepository, AttachmentPicker, and ChatPresenceService — is centralized in `core/` as shared primitives.",
        },
      ],
      challenges: [
        {
          title: "Reliable Lock-Screen Incoming Call Delivery via FCM Full-Screen Intents",
          context:
            "Android's battery-saving Doze modes and background execution limits frequently delay standard notifications and terminate background sockets when an incoming audio/video call arrives.",
          approach:
            "Configured high-priority FCM data messages coupled with Android Full-Screen Intents and custom notification channels. When an incoming call payload is received, the app immediately raises a full-screen calling activity over the lock screen and initializes `flutter_foreground_task` to prevent the OS from killing the LiveKit signaling socket before the user answers.",
        },
        {
          title: "Video Controller Lifecycle & Memory Pooling in Reels Feed",
          context:
            "Continuous vertical swiping through short-form video reels causes rapid memory accumulation and eventual Out-Of-Memory (OOM) crashes if VideoPlayerControllers are not aggressively managed.",
          approach:
            "Engineered a pooled video controller manager that maintains active controllers only for the current video and the immediate adjacent videos (index - 1, index + 1) for seamless pre-buffering. Out-of-viewport controllers are aggressively paused and disposed, keeping native video memory within a predictable, bounded ceiling.",
        },
        {
          title: "Multi-Surface Cache Eviction & Offline Storage Synchronization",
          context:
            "Caching rich media (voice notes, thumbnails, high-res photos, sticker packs) for offline browsing quickly exhausts device storage if unbounded.",
          approach:
            "Implemented an indexed Hive cache with an intelligent Least-Recently-Used (LRU) eviction pipeline. The MediaCacheRepository tracks access frequencies and timestamps, automatically purging non-essential cached media when local storage approaches a configurable limit while keeping textual chat history and user profile metadata intact.",
        },
      ],
    },
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
