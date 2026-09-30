import { Project } from "./schemas";

const SOCIAL_MATE_APK_VERSION = "1.0.0";

function githubReleaseAsset(repo: string, fileName: string): string {
  return `https://github.com/${repo}/releases/latest/download/${fileName}`;
}

export const projects: Project[] = [
  {
    slug: "social-mate",
    title: "Social Mate",
    tagline: "Connect · Share · Discover · Belong",
    icon: "/assets/projects/social-mate/icon.png",
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
        type: "video",
        url: "/assets/projects/social-mate/social_mate_social_features_edited_Trim.mp4",
        poster: "/assets/projects/social-mate/home_view.webp",
        alt: "Social Mate Core Social Features & Real-Time Experience Demo",
        role: "hero",
        priority: true,
      },
      cover: {
        id: "cover-social-mate",
        type: "image",
        url: "/assets/projects/social-mate/cover.png",
        alt: "Social Mate 3D Trio Showcase with Real Flutter App UI",
        role: "hero",
      },
      gallery: [
        {
          category: "Real-time Messaging",
          items: [
            {
              id: "msg-single-1",
              type: "image",
              url: "/assets/projects/social-mate/messaging-single-chat-1.webp",
              alt: "1-on-1 Chat Interface with Read Receipts & Voice Note",
              category: "Real-time Messaging",
              role: "storytelling",
              featureId: "messaging",
              caption: "Real-time 1-on-1 messaging with live waveform voice notes, link previews, and read receipts.",
            },
            {
              id: "msg-chats-list",
              type: "image",
              url: "/assets/projects/social-mate/chats-list.webp",
              alt: "Chats Conversation List with Unread Badges and Online Indicators",
              category: "Real-time Messaging",
              role: "gallery",
              caption: "Unified conversation hub with real-time Supabase subscriptions, unread badges, and presence indicators.",
            },
            {
              id: "msg-single-2",
              type: "image",
              url: "/assets/projects/social-mate/messaging-single-chat-2.webp",
              alt: "1-on-1 Chat with Reaction Bar and Media Actions",
              category: "Real-time Messaging",
              role: "gallery",
              caption: "Interactive message actions, emoji reactions, and media sharing tray.",
            },
            {
              id: "msg-group-1",
              type: "image",
              url: "/assets/projects/social-mate/messaging-group-chat-1.webp",
              alt: "Group Chat Details and Active Multi-Participant Stream",
              category: "Real-time Messaging",
              role: "gallery",
              caption: "Multi-participant group conversations with member avatars, role badges, and typing indicators.",
            },
            {
              id: "msg-group-2",
              type: "image",
              url: "/assets/projects/social-mate/messaging-group-chat-2.webp",
              alt: "Group Chat Media and Attachment Sheet",
              category: "Real-time Messaging",
              role: "supporting",
              caption: "Collaborative group interactions with media gallery attachments.",
            },
            {
              id: "msg-gif-chat-1",
              type: "image",
              url: "/assets/projects/social-mate/gif-at-chat-messages-1.webp",
              alt: "Chat Conversation with Integrated GIF Picker and Animated Stickers",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Inline GIF search and animated sticker sharing directly within active chat conversations.",
            },
            {
              id: "msg-recording-audio-chat-1",
              type: "image",
              url: "/assets/projects/social-mate/recoding-audio-at-chat-view-1.webp",
              alt: "In-Chat Voice Message Recording Bar — Active Capture State",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Inline voice note capture inside an active conversation with real-time duration timer and waveform feedback.",
            },
            {
              id: "msg-recording-audio-chat-2",
              type: "image",
              url: "/assets/projects/social-mate/recoding-audio-at-chat-view-2.webp",
              alt: "In-Chat Voice Message Recording — Waveform Progression and Lock Action",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Hands-free voice recording progression with slide-to-cancel and instant dispatch controls.",
            },
            {
              id: "msg-recording-audio-chat-3",
              type: "image",
              url: "/assets/projects/social-mate/recoding-audio-at-chat-view-3.webp",
              alt: "In-Chat Voice Message Review and Delivery Controls",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Pre-send voice note review state allowing audio preview before dispatching to the chat stream.",
            },
            {
              id: "msg-receiver-profile-1",
              type: "image",
              url: "/assets/projects/social-mate/receiver-profile-view-1.webp",
              alt: "Chat Participant Receiver Profile Overview and Quick Communication Actions",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Direct chat participant profile sheet displaying contact identity, presence status, and quick audio/video call actions.",
            },
            {
              id: "msg-receiver-profile-2",
              type: "image",
              url: "/assets/projects/social-mate/receiver-profile-view-2.webp",
              alt: "Chat Participant Receiver Profile Details, Privacy Controls, and Shared Content",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Extended receiver profile view with conversation mute toggles, shared media shortcuts, and privacy controls.",
            },
            {
              id: "msg-group-info-1",
              type: "image",
              url: "/assets/projects/social-mate/group-info-view-1.webp",
              alt: "Group Chat Information Header, Member Count, and Quick Actions",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Group conversation info screen highlighting group identity, participant count, and instant call/search shortcuts.",
            },
            {
              id: "msg-group-info-2",
              type: "image",
              url: "/assets/projects/social-mate/group-info-view-2.webp",
              alt: "Group Chat Member Directory and Role Badges",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Group participant directory displaying member avatars, online presence indicators, and admin/moderator role badges.",
            },
            {
              id: "msg-group-settings-1",
              type: "image",
              url: "/assets/projects/social-mate/group-settings-view-1.webp",
              alt: "Group Chat Administration and Permissions Settings",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Group administration panel configuring member permissions, message posting rights, and group metadata.",
            },
            {
              id: "msg-group-settings-2",
              type: "image",
              url: "/assets/projects/social-mate/group-settings-view-2.webp",
              alt: "Group Chat Member Management and Moderation Controls",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Granular moderation controls for managing group roles, invitations, and participant access.",
            },
            {
              id: "msg-group-settings-3",
              type: "image",
              url: "/assets/projects/social-mate/group-settings-view-3.webp",
              alt: "Group Chat Notification and Privacy Configuration Sheet",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Group-level notification preferences and administrative action confirmation sheet.",
            },
            {
              id: "msg-shared-media-1",
              type: "image",
              url: "/assets/projects/social-mate/shared-chat-media--view-1.webp",
              alt: "Shared Chat Media Gallery — Photos and Videos Grid",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Unified in-chat shared media browser indexing photos and videos exchanged within the conversation.",
            },
            {
              id: "msg-shared-media-2",
              type: "image",
              url: "/assets/projects/social-mate/shared-chat-media--view-2.webp",
              alt: "Shared Chat Media — Categorized Documents and Audio Files",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Categorized conversation attachments tab filtering shared documents, voice notes, and downloadable files.",
            },
            {
              id: "msg-audio-record-fullscreen-1",
              type: "image",
              url: "/assets/projects/social-mate/audio-record-full-screen-view-1.webp",
              alt: "Full-Screen Voice Message Recording Interface with Live Waveform",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Full-screen voice note recording mode with live acoustic waveform visualization and playback controls.",
            },
            {
              id: "msg-shared-media-3",
              type: "image",
              url: "/assets/projects/social-mate/shared-chat-media--view-3.webp",
              alt: "Shared Chat Media — High-Resolution Media Inspection View",
              category: "Real-time Messaging",
              role: "gallery",
              featureId: "messaging",
              caption: "Detailed media gallery view for browsing and managing shared visual assets inside a chat thread.",
            },
          ],
        },
        {
          category: "WebRTC Audio & Video Calls",
          items: [
            {
              id: "call-audio-1",
              type: "image",
              url: "/assets/projects/social-mate/single-call-audio-1.webp",
              alt: "1-on-1 Audio Call with Ambient Glassmorphism UI",
              category: "WebRTC Audio & Video Calls",
              role: "storytelling",
              featureId: "calls",
              caption: "LiveKit SFU audio calling with real-time audio waveforms, noise suppression, and floating controls.",
            },
            {
              id: "call-audio-2",
              type: "image",
              url: "/assets/projects/social-mate/single-call-audio-2.webp",
              alt: "1-on-1 Audio Call Active In-Call Session",
              category: "WebRTC Audio & Video Calls",
              role: "gallery",
              caption: "Active calling state with call duration timer, dynamic audio routing, and speakerphone switcher.",
            },
            {
              id: "call-audio-3",
              type: "image",
              url: "/assets/projects/social-mate/single-call-audio-3.webp",
              alt: "Audio Call Floating Action Tray",
              category: "WebRTC Audio & Video Calls",
              role: "supporting",
            },
            {
              id: "call-video-1",
              type: "image",
              url: "/assets/projects/social-mate/single-call-video-1.webp",
              alt: "HD Video Call Full-screen Stream",
              category: "WebRTC Audio & Video Calls",
              role: "gallery",
              caption: "Carrier-grade WebRTC video streaming with low latency and adaptive bitrate.",
            },
            {
              id: "call-video-2",
              type: "image",
              url: "/assets/projects/social-mate/single-call-video-2.webp",
              alt: "Video Call with Picture-in-Picture (PiP) and Camera Toggle",
              category: "WebRTC Audio & Video Calls",
              role: "gallery",
              caption: "Full-screen WebRTC video calling with picture-in-picture multitasking and camera switcher.",
            },
            {
              id: "call-video-3",
              type: "image",
              url: "/assets/projects/social-mate/single-call-video-3.webp",
              alt: "Video Call Session Settings & Controls",
              category: "WebRTC Audio & Video Calls",
              role: "supporting",
            },
            {
              id: "call-group-1",
              type: "image",
              url: "/assets/projects/social-mate/call-group-livekit-1.webp",
              alt: "Multi-Party Group Video Call Grid via LiveKit SFU",
              category: "WebRTC Audio & Video Calls",
              role: "gallery",
              caption: "Multi-party group video conference with adaptive grid layout and active speaker detection.",
            },
            {
              id: "call-group-2",
              type: "image",
              url: "/assets/projects/social-mate/call-group-livekit-2.webp",
              alt: "Group Video Call Active Speaker Highlight",
              category: "WebRTC Audio & Video Calls",
              role: "gallery",
            },
            {
              id: "call-group-3",
              type: "image",
              url: "/assets/projects/social-mate/call-group-livekit-3.webp",
              alt: "Group Video Conference Dynamic Participant Arrangement",
              category: "WebRTC Audio & Video Calls",
              role: "gallery",
            },
            {
              id: "call-group-4",
              type: "image",
              url: "/assets/projects/social-mate/call-group-livekit-4.webp",
              alt: "Group Call Participant Controls and Room Drawer",
              category: "WebRTC Audio & Video Calls",
              role: "supporting",
            },
            {
              id: "call-group-5",
              type: "image",
              url: "/assets/projects/social-mate/call-group-livekit-5.webp",
              alt: "Group Call Compact Stream View",
              category: "WebRTC Audio & Video Calls",
              role: "supporting",
            },
          ],
        },
        {
          category: "AI Assistant & Chat",
          items: [
            {
              id: "ai-assistant-demo-video",
              type: "video",
              url: "/assets/projects/social-mate/social_mate_ai_chat_and_providers_1.mp4",
              poster: "/assets/projects/social-mate/ai-chat-streaming-1.webp",
              alt: "Social Mate AI Assistant & Multi-Provider Chat Live Demo",
              category: "AI Assistant & Chat",
              role: "demo",
              featureId: "ai-assistant",
              caption: "Live demonstration of multi-provider AI assistant with streaming tokens and model switching.",
            },
            {
              id: "ai-stream-1",
              type: "image",
              url: "/assets/projects/social-mate/ai-chat-streaming-1.webp",
              alt: "Standalone AI Chat Companion with Streaming Responses",
              category: "AI Assistant & Chat",
              role: "storytelling",
              featureId: "ai-assistant",
              caption: "Conversational AI companion with multi-provider switching (Gemini, Groq, OpenRouter) and live streaming tokens.",
            },
            {
              id: "ai-stream-2",
              type: "image",
              url: "/assets/projects/social-mate/ai-chat-streaming-2.webp",
              alt: "AI Assistant Active Streaming Generation",
              category: "AI Assistant & Chat",
              role: "gallery",
              caption: "Real-time token stream rendering with low-latency response generation.",
            },
            {
              id: "ai-stream-3",
              type: "image",
              url: "/assets/projects/social-mate/ai-chat-streaming-3.webp",
              alt: "Rich Markdown & Code Syntax Highlighting in AI Chat",
              category: "AI Assistant & Chat",
              role: "gallery",
              caption: "Formatted code blocks, mathematical equations, and rich markdown parsing.",
            },
            {
              id: "ai-stream-5",
              type: "image",
              url: "/assets/projects/social-mate/ai-chat-streaming-5.webp",
              alt: "AI Conversation History and Export Options",
              category: "AI Assistant & Chat",
              role: "gallery",
            },
            {
              id: "ai-stream-6",
              type: "image",
              url: "/assets/projects/social-mate/ai-chat-streaming-6.webp",
              alt: "Context-Aware AI Dialogue Continuation",
              category: "AI Assistant & Chat",
              role: "supporting",
            },
            {
              id: "ai-files-7",
              type: "image",
              url: "/assets/projects/social-mate/ai-chat-files-7.webp",
              alt: "Multimodal Vision and Document Analysis Attachment Sheet",
              category: "AI Assistant & Chat",
              role: "gallery",
              caption: "On-device multimodal image and document upload for automated vision inspection.",
            },
            {
              id: "ai-drawer-8",
              type: "image",
              url: "/assets/projects/social-mate/ai-chat-drawer-8.webp",
              alt: "AI Model Gateway Configuration Drawer",
              category: "AI Assistant & Chat",
              role: "gallery",
              caption: "Pluggable model selector switching between Gemini 1.5 Pro, Groq LLaMA 3, and OpenRouter.",
            },
            {
              id: "ai-settings-1",
              type: "image",
              url: "/assets/projects/social-mate/ai-settings-view-1.webp",
              alt: "AI Assistant Provider Configuration and Model Switcher Settings",
              category: "AI Assistant & Chat",
              role: "gallery",
              featureId: "ai-assistant",
              caption: "Pluggable AI provider settings allowing API key configuration and dynamic model routing.",
            },
            {
              id: "ai-settings-2",
              type: "image",
              url: "/assets/projects/social-mate/ai-settings-view-2.webp",
              alt: "AI Generation Parameters and Token Streaming Preferences",
              category: "AI Assistant & Chat",
              role: "gallery",
              featureId: "ai-assistant",
              caption: "Granular controls for temperature, max token limits, and streaming output behavior.",
            },
          ],
        },
        {
          category: "Stories & Reels",
          items: [
            {
              id: "stories-tray-1",
              type: "image",
              url: "/assets/projects/social-mate/stories-feed-1.webp",
              alt: "Stories Discovery Feed Tray with Gradient Unread Rings",
              category: "Stories & Reels",
              role: "storytelling",
              featureId: "stories-reels",
              caption: "Horizontal stories discovery tray with animated gradient unread rings and instant author navigation.",
            },
            {
              id: "stories-tray-2",
              type: "image",
              url: "/assets/projects/social-mate/stories-feed-2.webp",
              alt: "Expanded Stories Feed and Status Overview",
              category: "Stories & Reels",
              role: "gallery",
            },
            {
              id: "story-view-1",
              type: "image",
              url: "/assets/projects/social-mate/your-story-display-view-1.webp",
              alt: "Full-screen Story Viewer with Segmented Progress Bars",
              category: "Stories & Reels",
              role: "gallery",
              caption: "24-hour ephemeral stories with segmented progress timers, author header, and quick pause.",
            },
            {
              id: "story-view-2",
              type: "image",
              url: "/assets/projects/social-mate/your-story-display-view-2.webp",
              alt: "Story Slide Transition and Rich Media Display",
              category: "Stories & Reels",
              role: "gallery",
            },
            {
              id: "story-view-3",
              type: "image",
              url: "/assets/projects/social-mate/your-story-display-view-3.webp",
              alt: "Story Analytics, Viewer List, and Direct Reply Input",
              category: "Stories & Reels",
              role: "gallery",
              caption: "Detailed story insights with view counts, viewer avatars, and private DM replies.",
            },
            {
              id: "story-view-4",
              type: "image",
              url: "/assets/projects/social-mate/your-story-display-view-4.webp",
              alt: "Story Quick Reaction Fountain and Emoji Sheet",
              category: "Stories & Reels",
              role: "supporting",
            },
            {
              id: "story-grid-5",
              type: "image",
              url: "/assets/projects/social-mate/grid-story-display-view-5.webp",
              alt: "Multi-Grid Story Archive & Overview Matrix",
              category: "Stories & Reels",
              role: "gallery",
              caption: "Visual matrix displaying all active and archived stories for quick batch browsing.",
            },
            {
              id: "reels-feed-1",
              type: "image",
              url: "/assets/projects/social-mate/reels-feed-tab-view-1.webp",
              alt: "Short-Form Reels Vertical Feed with Engagement Overlay",
              category: "Stories & Reels",
              role: "gallery",
              featureId: "stories-reels",
              caption: "Vertical short-form Reels feed featuring immersive full-screen display, creator profile links, and engagement counters.",
            },
            {
              id: "reels-feed-2",
              type: "image",
              url: "/assets/projects/social-mate/reels-feed-tab-view-2.webp",
              alt: "Reels Discovery Stream with Dynamic Audio Waveform",
              category: "Stories & Reels",
              role: "gallery",
              featureId: "stories-reels",
              caption: "Continuous Reels playback with synchronized audio track info and social sharing tray.",
            },
            {
              id: "reels-feed-3",
              type: "image",
              url: "/assets/projects/social-mate/reels-feed-tab-view-3.webp",
              alt: "Reels Interactive View with Creator Follow Action",
              category: "Stories & Reels",
              role: "gallery",
              featureId: "stories-reels",
              caption: "Fast swipeable Reels stream with seamless video preloading and quick author follow.",
            },
            {
              id: "reels-player-1",
              type: "image",
              url: "/assets/projects/social-mate/reels-player-view-1.webp",
              alt: "Full-Screen Reels Player with Playback Controls",
              category: "Stories & Reels",
              role: "gallery",
              featureId: "stories-reels",
              caption: "Hardware-accelerated video playback with tap-to-pause and progress tracking.",
            },
            {
              id: "reels-player-2",
              type: "image",
              url: "/assets/projects/social-mate/reels-player-view-2.webp",
              alt: "Reels Media Player with Audio Attribution & Hashtags",
              category: "Stories & Reels",
              role: "gallery",
              featureId: "stories-reels",
              caption: "Rich metadata overlay highlighting audio remixing, trending tags, and creator credits.",
            },
            {
              id: "reels-player-3",
              type: "image",
              url: "/assets/projects/social-mate/reels-player-view-3.webp",
              alt: "Reels Viewer Interface with Quick Share Actions",
              category: "Stories & Reels",
              role: "gallery",
              featureId: "stories-reels",
              caption: "One-tap sharing of short video clips to chat conversations and external platforms.",
            },
            {
              id: "reels-player-4",
              type: "image",
              url: "/assets/projects/social-mate/reels-player-view-4.webp",
              alt: "Reels Interactive Engagement Drawer",
              category: "Stories & Reels",
              role: "gallery",
              featureId: "stories-reels",
              caption: "Interactive bottom sheet displaying reactions, creator insights, and comment preview.",
            },
            {
              id: "reels-player-5",
              type: "image",
              url: "/assets/projects/social-mate/reels-player-view-5.webp",
              alt: "Reels Playback Management and Options Menu",
              category: "Stories & Reels",
              role: "gallery",
              featureId: "stories-reels",
              caption: "Granular video playback options including report, mute audio, and save video.",
            },
            {
              id: "create-story-1",
              type: "image",
              url: "/assets/projects/social-mate/create-story-view-1.webp",
              alt: "Interactive Story Creator Studio with Rich Text and Gradient Editor",
              category: "Stories & Reels",
              role: "gallery",
              featureId: "stories-reels",
              caption: "Ephemeral story creation interface featuring vibrant background gradients, text styles, and stickers.",
            },
            {
              id: "create-story-upload-1",
              type: "image",
              url: "/assets/projects/social-mate/create-story-view-upload-1.webp",
              alt: "Story Media Upload Pipeline and Publishing Preview",
              category: "Stories & Reels",
              role: "gallery",
              featureId: "stories-reels",
              caption: "Story publishing workflow with media compression, progress tracking, and privacy audience selection.",
            },
          ],
        },
        {
          category: "Feed & Communities",
          items: [
            {
              id: "feed-posts-1",
              type: "image",
              url: "/assets/projects/social-mate/home_view_reels_feed_and_posts.webp",
              alt: "Social Mate Home Feed with Interleaved Reels and Post Cards",
              category: "Feed & Communities",
              role: "storytelling",
              caption: "Comprehensive social feed integrating interleaved Reels rails, rich media cards, and community discussions.",
            },
            {
              id: "feed-hero-view",
              type: "image",
              url: "/assets/projects/social-mate/home_view.webp",
              alt: "Social Mate Primary Feed & Navigation Layout",
              category: "Feed & Communities",
              role: "gallery",
              caption: "Intuitive top app bar, search shortcut, and polished bottom navigation dock.",
            },
            {
              id: "comments-thread-1",
              type: "image",
              url: "/assets/projects/social-mate/comments-thread-view-1.webp",
              alt: "Threaded Post Comments Sheet with Nested Connector Lines",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "comments-reactions",
              caption: "Deeply nested comment hierarchy rendered with visual ThreadPainter connector lines and user avatars.",
            },
            {
              id: "comments-thread-2",
              type: "image",
              url: "/assets/projects/social-mate/comments-thread-view-2.webp",
              alt: "Active Comment Discussion with Real-Time Reply Indentation",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "comments-reactions",
              caption: "Real-time discussion threads showing nested reply levels and timestamps.",
            },
            {
              id: "comments-thread-3",
              type: "image",
              url: "/assets/projects/social-mate/comments-thread-view-3.webp",
              alt: "Comment Input Sheet with Voice Recording and Quick Reactions",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "comments-reactions",
              caption: "Multi-input comment composer supporting text, voice comments, and emoji reaction shortcuts.",
            },
            {
              id: "comments-thread-4",
              type: "image",
              url: "/assets/projects/social-mate/comments-thread-view-4.webp",
              alt: "Comment Reaction Counters and Voice Note Playback",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "comments-reactions",
              caption: "In-line playback for audio voice notes within threaded comments.",
            },
            {
              id: "comments-gif-sheet-1",
              type: "image",
              url: "/assets/projects/social-mate/gif-at-comments-sheet-1.webp",
              alt: "Giphy GIF Selector Integrated into Comments Bottom Sheet",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "comments-reactions",
              caption: "Integrated Giphy search modal for embedding animated GIFs directly into post comment threads.",
            },
            {
              id: "discovery-search-1",
              type: "image",
              url: "/assets/projects/social-mate/discovery-search-view-1.webp",
              alt: "Unified Global Search across Accounts, Posts, and Media",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "social-discovery",
              caption: "Unified multi-index search query interface across user accounts, posts, reels, and hashtags.",
            },
            {
              id: "discovery-search-2",
              type: "image",
              url: "/assets/projects/social-mate/discovery-search-view-2.webp",
              alt: "Algorithmic Discovery Grid with Trending Content",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "social-discovery",
              caption: "Algorithmic exploration grid presenting trending community posts and recommended creators.",
            },
            {
              id: "for-you-search-1",
              type: "image",
              url: "/assets/projects/social-mate/for-you-search-view-1.webp",
              alt: "Personalized 'For You' Algorithmic Discovery Feed",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "social-discovery",
              caption: "Personalized For You discovery feed curating relevant posts and creators tailored to user engagement.",
            },
            {
              id: "create-post-1",
              type: "image",
              url: "/assets/projects/social-mate/create-post-view-1.webp",
              alt: "Post Composer Interface with Rich Text and Media Tray",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "social-discovery",
              caption: "Full-featured post composer with markdown support, emoji picker, and multimedia attachments.",
            },
            {
              id: "create-post-2",
              type: "image",
              url: "/assets/projects/social-mate/create-post-view-2.webp",
              alt: "Post Audience Privacy Selector and Permission Scope",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "social-discovery",
              caption: "Granular post audience controls with options for public, friends-only, and custom privacy scopes.",
            },
            {
              id: "create-post-3",
              type: "image",
              url: "/assets/projects/social-mate/create-post-view-3.webp",
              alt: "Hashtag Recommendation and Tagging Sheet in Post Creation",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "social-discovery",
              caption: "Smart tag suggestions and user mentions integration during post authoring.",
            },
            {
              id: "create-post-4",
              type: "image",
              url: "/assets/projects/social-mate/create-post-view-4.webp",
              alt: "Post Media Attachment Grid and Multi-Image Preview",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "social-discovery",
              caption: "Multi-image carousel layout and media reordering prior to publication.",
            },
            {
              id: "create-post-upload-1",
              type: "image",
              url: "/assets/projects/social-mate/create-post-view-upload-1.webp",
              alt: "Background Media Upload Task with Live Progress Indicator",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "social-discovery",
              caption: "Resilient background media upload pipeline with retry handling and upload progress indicator.",
            },
            {
              id: "edit-profile-1",
              type: "image",
              url: "/assets/projects/social-mate/edit-your-profile-view-1.webp",
              alt: "User Profile Editor with Avatar and Cover Photo Management",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "social-discovery",
              caption: "Identity management screen allowing instant avatar updates, banner cropping, and display name customization.",
            },
            {
              id: "edit-profile-2",
              type: "image",
              url: "/assets/projects/social-mate/edit-your-profile-view-2.webp",
              alt: "Profile Biography and Social Links Configuration",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "social-discovery",
              caption: "Rich profile personalization with multi-line bio editor, website links, and location metadata.",
            },
            {
              id: "edit-profile-3",
              type: "image",
              url: "/assets/projects/social-mate/edit-your-profile-view-3.webp",
              alt: "Account Verification Badge and Social Presence Details",
              category: "Feed & Communities",
              role: "gallery",
              featureId: "social-discovery",
              caption: "Verified user credentials, social handles integration, and public profile preview.",
            },
          ],
        },
        {
          category: "Stickers & Media",
          items: [
            {
              id: "stickers-browse-1",
              type: "image",
              url: "/assets/projects/social-mate/sticker-packs-browser-1.webp",
              alt: "Custom Sticker Studio and Pack Browser",
              category: "Stickers & Media",
              role: "storytelling",
              featureId: "sticker-studio",
              caption: "Built-in creator studio allowing users to design, browse, and publish custom sticker packs.",
            },
            {
              id: "stickers-detail-1",
              type: "image",
              url: "/assets/projects/social-mate/sticker-pack-details-1.webp",
              alt: "Sticker Pack Details and Download Sheet",
              category: "Stickers & Media",
              role: "gallery",
              caption: "Detailed sticker pack showcase with full sticker grid and one-tap installation.",
            },
            {
              id: "stickers-detail-2",
              type: "image",
              url: "/assets/projects/social-mate/sticker-pack-details-2.webp",
              alt: "Sticker Preview and Animated Asset View",
              category: "Stickers & Media",
              role: "gallery",
            },
            {
              id: "stickers-detail-3",
              type: "image",
              url: "/assets/projects/social-mate/sticker-pack-details-3.webp",
              alt: "Sticker Pack Creator Attribution & Meta Sheet",
              category: "Stickers & Media",
              role: "supporting",
            },
            {
              id: "stickers-create-1",
              type: "image",
              url: "/assets/projects/social-mate/create-your-sticker-pack-1.webp",
              alt: "Sticker Pack Creator Studio Form",
              category: "Stickers & Media",
              role: "gallery",
              caption: "Creation flow with quota management, sticker naming, and privacy toggles.",
            },
            {
              id: "gif-picker-sheet-1",
              type: "image",
              url: "/assets/projects/social-mate/gif-bottom-sheet-1.webp",
              alt: "Categorized Giphy GIF Search Bottom Sheet",
              category: "Stickers & Media",
              role: "gallery",
              featureId: "sticker-studio",
              caption: "Dedicated GIF picker modal with trending search tags and infinite scroll Giphy integration.",
            },
            {
              id: "gif-picker-sheet-2",
              type: "image",
              url: "/assets/projects/social-mate/gif-bottom-sheet-2.webp",
              alt: "GIF Search Results Grid with Instant Preview",
              category: "Stickers & Media",
              role: "gallery",
              featureId: "sticker-studio",
              caption: "Responsive multi-column GIF selection grid with fast thumbnail streaming and caching.",
            },
            {
              id: "gif-picker-sheet-3",
              type: "image",
              url: "/assets/projects/social-mate/gif-bottom-sheet-3.webp",
              alt: "Animated Reaction Picker and Sticker Tray",
              category: "Stickers & Media",
              role: "gallery",
              featureId: "sticker-studio",
              caption: "Integrated media drawer allowing fluid switching between custom sticker packs and GIF library.",
            },
          ],
        },
        {
          category: "Theming & Security",
          items: [
            {
              id: "themes-grid-1",
              type: "image",
              url: "/assets/projects/social-mate/themes-select-grid-1.webp",
              alt: "12 Dynamic Bespoke Themes Selector Grid",
              category: "Theming & Security",
              role: "storytelling",
              featureId: "theming-security",
              caption: "12 dynamically switchable themes with responsive Lottie color adaptation and live palette shifts.",
            },
            {
              id: "themes-grid-2",
              type: "image",
              url: "/assets/projects/social-mate/themes-select-grid-2.webp",
              alt: "Dynamic Theme Live Color Scheme Application",
              category: "Theming & Security",
              role: "gallery",
              caption: "Instant real-time UI recoloring across all navigationbars, buttons, and elevation layers.",
            },
            {
              id: "themes-grid-3",
              type: "image",
              url: "/assets/projects/social-mate/themes-select-grid-3.webp",
              alt: "High Contrast & Dark/Light Theme Switching Matrix",
              category: "Theming & Security",
              role: "gallery",
              caption: "Seamless day/night mode transitions and high-contrast accessibility themes.",
            },
            {
              id: "settings-view-1",
              type: "image",
              url: "/assets/projects/social-mate/settings-view-1.webp",
              alt: "Application Settings Hub with Account and Security Preferences",
              category: "Theming & Security",
              role: "gallery",
              featureId: "theming-security",
              caption: "Comprehensive application preferences hub organizing account security, theme switches, and cache controls.",
            },
            {
              id: "settings-view-2",
              type: "image",
              url: "/assets/projects/social-mate/settings-view-2.webp",
              alt: "Notification Preferences and Media Cache Management",
              category: "Theming & Security",
              role: "gallery",
              featureId: "theming-security",
              caption: "Granular notification channel toggles and Hive LRU media cache storage management.",
            },
            {
              id: "settings-view-3",
              type: "image",
              url: "/assets/projects/social-mate/settings-view-3.webp",
              alt: "Biometric App Lock and Device Authentication Settings",
              category: "Theming & Security",
              role: "gallery",
              featureId: "theming-security",
              caption: "Fingerprint and Face Unlock biometric authentication configuration for app lock security.",
            },
            {
              id: "privacy-policy-1",
              type: "image",
              url: "/assets/projects/social-mate/privacy-policy-view-1.webp",
              alt: "Data Governance and Privacy Policy Document View",
              category: "Theming & Security",
              role: "gallery",
              featureId: "theming-security",
              caption: "Transparent privacy policy and regulatory data governance viewer with offline caching.",
            },
            {
              id: "about-us-1",
              type: "image",
              url: "/assets/projects/social-mate/about-us-view-1.webp",
              alt: "Product Identity, Release Version, and Engineering Credits",
              category: "Theming & Security",
              role: "gallery",
              featureId: "theming-security",
              caption: "Product information screen displaying architecture credits, release build version, and native dependencies.",
            },
            {
              id: "about-us-2",
              type: "image",
              url: "/assets/projects/social-mate/about-us-view-2.webp",
              alt: "Open Source Licenses and Technology Stack Attribution",
              category: "Theming & Security",
              role: "gallery",
              featureId: "theming-security",
              caption: "Open-source package attributions, dependency licensing, and developer links.",
            },
          ],
        },
      ],
    },
    downloads: {
      version: SOCIAL_MATE_APK_VERSION,
      buildNumber: "1.0.0+2",
      releaseUrl: "https://github.com/Ahmedatef5O5/Social-Media-App/releases/latest",
      commitSha: "5f0bee9",
      androidCompatibility: "minSdk 24 (Android 7.0+) — targetSdk 36",
      variants: [
        {
          id: "sm-arm64",
          abi: "arm64-v8a",
          label: "Social Mate — ARM64-v8a",
          description:
            "Recommended for 95% of modern 64-bit Android devices (Snapdragon, MediaTek, Exynos, Tensor).",
          fileUrl: githubReleaseAsset(
            "Ahmedatef5O5/Social-Media-App",
            "Social-Mate-v1.0.0-arm64-v8a.apk"
          ),
          fileName: "Social-Mate-v1.0.0-arm64-v8a.apk",
          sizeBytes: 71660344,
          sha256: "56e7eaa7e1ed5302de11ec9cefe0ec2b25dfb60bc081b17e2a02bfb4b879eeba",
          recommended: true,
          status: "available",
        },
        {
          id: "sm-armv7",
          abi: "armeabi-v7a",
          label: "Social Mate — ARMv7",
          description: "For older 32-bit Android devices.",
          fileUrl: githubReleaseAsset(
            "Ahmedatef5O5/Social-Media-App",
            "Social-Mate-v1.0.0-armeabi-v7a.apk"
          ),
          fileName: "Social-Mate-v1.0.0-armeabi-v7a.apk",
          sizeBytes: 65346052,
          sha256: "d547201fa2b8788beebffa5bb9804bcf7afb763aebf2c14dbdd48492547f65a1",
          status: "available",
        },
        {
          id: "sm-x86_64",
          abi: "x86_64",
          label: "Social Mate — x86_64",
          description: "For Android Studio emulators, PCs, and x86_64 devices.",
          fileUrl: githubReleaseAsset(
            "Ahmedatef5O5/Social-Media-App",
            "Social-Mate-v1.0.0-x86_64.apk"
          ),
          fileName: "Social-Mate-v1.0.0-x86_64.apk",
          sizeBytes: 77365594,
          sha256: "1b28ad96ffa681b6e905cce2418bf0649d3b9ee480fd145241feaf2738f5ec8a",
          status: "available",
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
    tagline: "Stay ahead of the story",
    icon: "/assets/projects/news-wave/icon.png",
    positioning: "Offline-First Bilingual News Platform built with Flutter, Supabase & Clean Architecture",
    description: {
      short:
        "Production-grade, offline-first bilingual (EN/AR) news platform featuring reactive RTL/LTR layout switching, pluggable article translation (LibreTranslate & MyMemory) with MD5 Hive caching, dependency-free HTTP multi-probe connectivity detection, numbered pagination, Supabase Auth with deep-linked password recovery, and 3-step personalization onboarding.",
      full: "NewsWave is a cross-platform Flutter news application engineered around strict Clean Architecture and Dependency Inversion across 8 feature modules. It pairs NewsAPI.org REST endpoints (/v2/top-headlines & /v2/everything) with a locale-namespaced Hive caching layer, an abstract TranslationService backed by LibreTranslate and MyMemory APIs for automatic Arabic article translation, and a custom Dio-based NetworkInfoImpl that races multiple HTTP probes to detect captive portals without third-party connectivity plugins. User identity, 3-step onboarding preferences, and avatar storage are powered by Supabase Auth, PostgreSQL, and Storage alongside full guest-mode access.",
    },
    isFeatured: true,
    theme: {
      primary: "#1A73E8",
      secondary: "#0D47A1",
    },
    techStack: [
      "Flutter",
      "Dart",
      "BLoC / Cubit",
      "Hive (Binary & JSON Cache)",
      "Supabase (Auth · PostgreSQL · Storage)",
      "Dio & NewsAPI REST",
      "LibreTranslate & MyMemory API",
      "WebView (webview_flutter) & Deep-Link Auth Recovery",
    ],
    links: {
      github: "https://github.com/Ahmedatef5O5/News-App",
    },
    features: [
      {
        id: "home-feed",
        title: "Breaking News Carousel & Curated Home Feed",
        description:
          "Custom-sliver home experience combining a floating SliverAppBar, a 0.88-viewport PageView breaking-news carousel with animated dot indicators and Hero transitions, category filter chips across 7 NewsCategory domains, and a paginated 'For You' recommended feed.",
        icon: "Newspaper",
      },
      {
        id: "bilingual-rtl",
        title: "Reactive Bilingual (EN/AR) & Pluggable Translation Pipeline",
        description:
          "100% ARB-localized interface with instant RTL/LTR layout switching, locale-aware typography (Poppins for Latin, Cairo for Arabic), Dual-Strategy Arabic News Fetching (/v2/everything with _getArabicQueryForCategory Arabic boolean queries alongside /v2/top-headlines), and a translation pipeline that translates non-Arabic article fields concurrently via Future.wait (chunkSize = 3) with persistent caching.",
        icon: "Languages",
      },
      {
        id: "offline-resilience",
        title: "Offline-First Hive Caching & Dependency-Free Connectivity",
        description:
          "Locale-namespaced Hive cache storing headlines by category and paginated 'For You' pages with zero-network fallback. Paired with a custom Dio-based NetworkInfoImpl that races multiple HTTP endpoints (NewsAPI, gstatic generate_204, Cloudflare trace) every 3 seconds and surfaces a live OfflineBanner.",
        icon: "WifiOff",
      },
      {
        id: "headlines-pagination",
        title: "Category Explorer & Numbered Pagination Engine",
        description:
          "Dedicated full-screen Headlines explorer featuring frosted-glass category cards (GlassCategoryRow & BackdropFilter), custom PaginationMeta sliding page-window math, and a numbered PaginationBarWidget with smooth scroll-to-top transitions.",
        icon: "LayoutGrid",
      },
      {
        id: "smart-search",
        title: "Debounced Title-Scoped Search & Locale Re-Querying",
        description:
          "500ms Timer-debounced SearchCubit querying NewsAPI /v2/everything with title-scoped precision, live result counters, numbered page navigation, and automatic stream-driven re-querying whenever the active app locale changes.",
        icon: "Search",
      },
      {
        id: "article-reader",
        title: "Immersive Article Reader, In-App WebView & Saved Library",
        description:
          "Draggable bottom-sheet ArticleDetailView with custom BorderRadius.lerp Hero flight shuttles, clipboard link sharing, an integrated WebViewController InAppBrowserView for full source reading, and a locale-aware FavoritesCubit that dynamically re-translates bookmarked articles.",
        icon: "Bookmark",
      },
      {
        id: "auth-recovery",
        title: "Supabase Authentication, Guest Mode & Deep-Link Recovery",
        description:
          "Full authentication suite via Supabase Auth supporting email/password sign-in, registration with E.164 phone normalization, one-tap Guest Mode, and end-to-end password reset via the Android io.newswave://reset-password deep-link intent-filter, processed by supabase_flutter to emit AuthChangeEvent.passwordRecovery and routed by AuthListenerCubit.",
        icon: "ShieldCheck",
      },
      {
        id: "onboarding-profile",
        title: "3-Step Personalization Onboarding & Cloud Profile Sync",
        description:
          "Guided 3-step onboarding wizard capturing user name, localized country & hobby (125+ countries with Arabic mappings), and preferred news categories, synced via AuthRepositoryImpl to Supabase PostgreSQL & Storage (avatars bucket with imageQuality: 80 compression) alongside local cache hydration.",
        icon: "UserCheck",
      },
    ],
    media: {
      hero: {
        id: "nw-hero",
        type: "video",
        url: "/assets/projects/news-wave/bilingual-rtl-language-switch.mp4",
        poster: "/assets/projects/news-wave/home-view.webp",
        alt: "NewsWave Bilingual EN/AR Live Switching & Reactive RTL Layout Demo",
        role: "hero",
        priority: true,
      },
      cover: {
        id: "cover-newswave",
        type: "image",
        url: "/assets/projects/news-wave/banner.webp",
        alt: "NewsWave Official Project Banner — Stay ahead of the story",
        role: "hero",
      },
      gallery: [
        {
          category: "Home & Themes",
          items: [
            {
              id: "nw-home-light",
              type: "image",
              url: "/assets/projects/news-wave/home-view.webp",
              alt: "NewsWave Home View in Light Mode with Breaking News Carousel and Technology Category",
              category: "Home & Themes",
              role: "storytelling",
              featureId: "home-feed",
              caption:
                "CustomScrollView home screen in Light Mode featuring the floating SliverAppBar, Breaking News carousel, CategoryFilterBar, and 'For You' page badge.",
            },
            {
              id: "nw-home-dark-tech",
              type: "image",
              url: "/assets/projects/news-wave/home-view-dark.webp",
              alt: "NewsWave Home View in Dark Mode with Technology Breaking News and Recommended Feed",
              category: "Home & Themes",
              role: "gallery",
              featureId: "home-feed",
              caption:
                "Dark Mode surface palette (#0F1117 / #1A1D27) showing active Technology headlines and paginated recommended articles.",
            },
            {
              id: "nw-home-dark-general",
              type: "image",
              url: "/assets/projects/news-wave/home-feed-view.webp",
              alt: "NewsWave Home Feed View in Dark Mode with General Category Selected",
              category: "Home & Themes",
              role: "supporting",
              featureId: "home-feed",
              caption:
                "General category feed on Page 1 of 8 with source badges, relative timestamps, and one-tap article bookmarking.",
            },
            {
              id: "nw-drawer-navigation",
              type: "image",
              url: "/assets/projects/news-wave/drawer-app.webp",
              alt: "NewsWave App Navigation Drawer with Categories, Theme Switcher, and Language Picker",
              category: "Home & Themes",
              role: "storytelling",
              featureId: "bilingual-rtl",
              caption:
                "AppDrawer displaying authenticated user profile header, quick route navigation, 7 color-coded news categories, and inline Theme & Language switchers.",
            },
          ],
        },
        {
          category: "RTL & Offline Demos",
          items: [
            {
              id: "nw-video-bilingual-rtl",
              type: "video",
              url: "/assets/projects/news-wave/bilingual-rtl-language-switch.mp4",
              poster: "/assets/projects/news-wave/drawer-app.webp",
              alt: "Live Screen Recording of NewsWave Switching Between English LTR and Arabic RTL",
              category: "RTL & Offline Demos",
              role: "demo",
              featureId: "bilingual-rtl",
              caption:
                "Live demonstration of switching the app locale from English to Arabic via LanguagePickerDialog — instantly flipping the layout to RTL, switching to Cairo typography, and translating the news feed.",
            },
            {
              id: "nw-video-offline-resilience",
              type: "video",
              url: "/assets/projects/news-wave/offline-resilience-cached-news.mp4",
              poster: "/assets/projects/news-wave/home-view.webp",
              alt: "Live Screen Recording of NewsWave Offline Detection Banner and Cached Article Reading",
              category: "RTL & Offline Demos",
              role: "demo",
              featureId: "offline-resilience",
              caption:
                "Real-time connectivity drop handled by NetworkInfoImpl & ConnectivityCubit, surfacing the OfflineBanner ('You're offline – showing cached news') while keeping Hive-cached articles readable.",
            },
          ],
        },
        {
          category: "Headlines & Search",
          items: [
            {
              id: "nw-headlines-view-all",
              type: "image",
              url: "/assets/projects/news-wave/headlines-view-all.webp",
              alt: "NewsWave Full-Screen Headlines Explorer with Frosted Glass Category Cards",
              category: "Headlines & Search",
              role: "storytelling",
              featureId: "headlines-pagination",
              caption:
                "HeadlinesView featuring horizontal GlassCategoryRow cards with BackdropFilter blur, live article counters, and category-scoped pagination.",
            },
            {
              id: "nw-for-you-pagination",
              type: "image",
              url: "/assets/projects/news-wave/for-you-pagination.webp",
              alt: "NewsWave For You Recommended Feed with Numbered Pagination Bar",
              category: "Headlines & Search",
              role: "gallery",
              featureId: "headlines-pagination",
              caption:
                "Numbered PaginationBarWidget at the bottom of the 'For You' feed with sliding window page buttons and automatic scroll-to-top on page transitions.",
            },
            {
              id: "nw-search-view",
              type: "image",
              url: "/assets/projects/news-wave/search-view.webp",
              alt: "NewsWave Debounced Search View with Results Counter and Paginated Articles",
              category: "Headlines & Search",
              role: "storytelling",
              featureId: "smart-search",
              caption:
                "500ms debounced SearchView querying NewsAPI /v2/everything with title-scoped filtering, total results badge, and multi-page navigation.",
            },
          ],
        },
        {
          category: "Reader & Saved",
          items: [
            {
              id: "nw-article-details",
              type: "image",
              url: "/assets/projects/news-wave/article-details-view.webp",
              alt: "NewsWave Article Detail View with Hero Image, Source Badge, and Read Full Article CTA",
              category: "Reader & Saved",
              role: "storytelling",
              featureId: "article-reader",
              caption:
                "Immersive ArticleDetailView with full-bleed Hero image, translucent floating back/share/bookmark controls, draggable content sheet, and In-App WebView launcher.",
            },
            {
              id: "nw-saved-articles",
              type: "image",
              url: "/assets/projects/news-wave/saved-articles-view.webp",
              alt: "NewsWave Saved Articles Favorites View with Persisted Bookmarks",
              category: "Reader & Saved",
              role: "gallery",
              featureId: "article-reader",
              caption:
                "FavoritesView backed by Hive box storage and FavoritesCubit, supporting one-tap removal and automatic on-demand re-translation when switching locales.",
            },
          ],
        },
        {
          category: "Auth & Recovery",
          items: [
            {
              id: "nw-sign-in",
              type: "image",
              url: "/assets/projects/news-wave/sign-in-view.webp",
              alt: "NewsWave Sign In Screen with Email, Password, and Continue as Guest",
              category: "Auth & Recovery",
              role: "storytelling",
              featureId: "auth-recovery",
              caption:
                "SignInView with validated email/password fields, Forgot Password trigger, Sign Up navigation, and one-tap 'Continue as Guest' access.",
            },
            {
              id: "nw-sign-up",
              type: "image",
              url: "/assets/projects/news-wave/sign-up-view.webp",
              alt: "NewsWave Sign Up Registration Screen with Phone Normalization and Terms Consent",
              category: "Auth & Recovery",
              role: "gallery",
              featureId: "auth-recovery",
              caption:
                "SignUpView enforcing email validation, E.164 phone number normalization, password confirmation matching, and terms acceptance.",
            },
            {
              id: "nw-forgot-password",
              type: "image",
              url: "/assets/projects/news-wave/forgot-password-view.webp",
              alt: "NewsWave Reset Password Request Screen",
              category: "Auth & Recovery",
              role: "supporting",
              featureId: "auth-recovery",
              caption:
                "ForgotPasswordView dispatching a Supabase password recovery email with custom redirectTo deep link (io.newswave://reset-password).",
            },
            {
              id: "nw-reset-password-sent",
              type: "image",
              url: "/assets/projects/news-wave/reset-password-view.webp",
              alt: "NewsWave Email Sent Confirmation Bottom Sheet for Password Reset",
              category: "Auth & Recovery",
              role: "supporting",
              featureId: "auth-recovery",
              caption:
                "Modal confirmation sheet confirming dispatch of the password recovery link to the user's email address.",
            },
            {
              id: "nw-set-new-password",
              type: "image",
              url: "/assets/projects/news-wave/set-new-password.webp",
              alt: "NewsWave Set New Password View Reached via Deep Link Recovery",
              category: "Auth & Recovery",
              role: "gallery",
              featureId: "auth-recovery",
              caption:
                "UpdatePasswordView opened automatically when the Android io.newswave://reset-password intent-filter delivers the recovery link, supabase_flutter emits AuthChangeEvent.passwordRecovery, and AuthListenerCubit navigates to updatePasswordRoute.",
            },
          ],
        },
        {
          category: "Onboarding & Profile",
          items: [
            {
              id: "nw-onboarding-step-1",
              type: "image",
              url: "/assets/projects/news-wave/onboarding-step-one.webp",
              alt: "NewsWave Onboarding Step 1 — First Name and Last Name Entry",
              category: "Onboarding & Profile",
              role: "storytelling",
              featureId: "onboarding-profile",
              caption:
                "Step 1 of the 3-step OnboardingView wizard capturing the user's first and last name with animated progress indicator.",
            },
            {
              id: "nw-onboarding-step-2",
              type: "image",
              url: "/assets/projects/news-wave/onboarding-step-two.webp",
              alt: "NewsWave Onboarding Step 2 — Localized Country Picker and Hobby Selection",
              category: "Onboarding & Profile",
              role: "gallery",
              featureId: "onboarding-profile",
              caption:
                "Step 2 capturing user country (searchable modal across 125+ countries with Arabic translations) and personal hobby.",
            },
            {
              id: "nw-onboarding-step-3",
              type: "image",
              url: "/assets/projects/news-wave/onboarding-step-three.webp",
              alt: "NewsWave Onboarding Step 3 — Preferred News Categories Selection",
              category: "Onboarding & Profile",
              role: "supporting",
              featureId: "onboarding-profile",
              caption:
                "Step 3 allowing multi-select customization of favorite news categories before persisting profile state to Supabase and Hive.",
            },
            {
              id: "nw-profile-settings",
              type: "image",
              url: "/assets/projects/news-wave/profile-settings-view.webp",
              alt: "NewsWave Profile and Settings Screen with Avatar Upload, Preferences, and Theme/Language Controls",
              category: "Onboarding & Profile",
              role: "gallery",
              featureId: "onboarding-profile",
              caption:
                "ProfileSettingsView supporting avatar selection via ImagePicker (imageQuality: 80) uploaded to the Supabase Storage avatars bucket ($userId/avatar_$timestamp.$ext), inline profile editing, preferred category chips, and theme/language pickers.",
            },
          ],
        },
      ],
    },
    downloads: {
      version: "1.0.0",
      buildNumber: "1",
      releaseDate: "2026-03-01",
      releaseUrl: "https://github.com/Ahmedatef5O5/News-App/releases",
      androidCompatibility: "Android 6.0+ (API 23+)",
      variants: [
        {
          id: "nw-apk-arm64-v8a",
          abi: "arm64-v8a",
          label: "ARM64 (arm64-v8a)",
          description: "Recommended for most modern Android phones (64-bit ARM).",
          fileName: "NewsWave-v1.0.0-arm64-v8a.apk",
          fileUrl: githubReleaseAsset("Ahmedatef5O5/News-App", "app-arm64-v8a-release.apk"),
          recommended: true,
          status: "pending",
        },
        {
          id: "nw-apk-armeabi-v7a",
          abi: "armeabi-v7a",
          label: "ARM32 (armeabi-v7a)",
          description: "For older 32-bit Android devices.",
          fileName: "NewsWave-v1.0.0-armeabi-v7a.apk",
          fileUrl: githubReleaseAsset("Ahmedatef5O5/News-App", "app-armeabi-v7a-release.apk"),
          status: "pending",
        },
        {
          id: "nw-apk-x86_64",
          abi: "x86_64",
          label: "x86_64",
          description: "For Android emulators, Chromebooks, and x86_64 devices.",
          fileName: "NewsWave-v1.0.0-x86_64.apk",
          fileUrl: githubReleaseAsset("Ahmedatef5O5/News-App", "app-x86_64-release.apk"),
          status: "pending",
        },
      ],
    },
    caseStudy: {
      overview: [
        "NewsWave is a production-grade, offline-first bilingual (English/Arabic) news platform built with Flutter. Designed for readers who move between languages and unstable network environments, the application combines breaking headlines, category-curated feeds, title-scoped search, and an in-app article reader into a cohesive experience that adapts its layout direction (LTR/RTL) and typography (Poppins/Cairo) instantaneously at runtime.",
        "Architecturally, NewsWave enforces strict Clean Architecture and Dependency Inversion across its modular feature domains (splash, auth/onboarding flow, home, headlines, search, favorites, and profile) wired through a centralized GetIt service locator (sl). High-level repositories depend exclusively on abstract contracts such as HomeRepositoryContract, NetworkInfo, and TranslationService, allowing networking, caching, and translation providers to evolve independently of presentation Cubits.",
        "Because NewsAPI's /v2/top-headlines endpoint primarily serves English-language articles for the US region while /v2/everything supports native Arabic queries, HomeRepository implements Dual-Strategy Arabic News Fetching: when Arabic is active, category feeds query /v2/everything using curated Arabic boolean expressions from _getArabicQueryForCategory, then pass results through the localization/translation pipeline. Articles already containing two or more Arabic fields (arabicCount >= 2) are skipped, while non-Arabic fields (title, cleanDescription, and cleanContent) are translated in parallel via Future.wait across batches of chunkSize = 3 (using \\n<<<SEP>>>\\n as the batch separator) and cached persistently.",
        "Beyond news consumption, NewsWave features a complete user lifecycle powered by Supabase Auth, PostgreSQL, and Storage. Users can sign in, register with E.164 phone normalization, recover passwords end-to-end via the Android io.newswave://reset-password deep-link intent-filter—where supabase_flutter processes the recovery session and emits AuthChangeEvent.passwordRecovery for AuthListenerCubit to route to updatePasswordRoute—or browse immediately in Guest Mode. Authenticated users complete a 3-step personalization onboarding wizard whose preferences and avatar are dual-persisted via AuthRepositoryImpl to Supabase and local storage for zero-latency cold starts.",
      ],
      architecture: [
        {
          title: "Feature-First Clean Architecture & GetIt Dependency Injection",
          description:
            "Organized into core infrastructure and self-contained feature modules (splash, auth/onboarding flow, home, headlines, search, favorites, and profile), all wired deterministically in lib/core/di/service_locator.dart.",
          items: [
            "Strict Dependency Inversion: HomeRepository depends on HomeRepositoryContract (implemented by Dio-backed HomeServices) rather than concrete HTTP clients.",
            "Centralized Dio factory configured via BaseOptions (connectTimeout: 15s, receiveTimeout: 15s, and Authorization: Bearer ${AppConstants.apiKey} inside BaseOptions.headers) with Dio's LogInterceptor registered exclusively inside an assert(...) block.",
            "Lifecycle-aware singleton and factory registrations in GetIt, including automatic HTTP client disposal for TranslationService on container reset.",
          ],
        },
        {
          title: "Offline-First Locale-Namespaced Hive Caching Layer",
          description:
            "Multi-box Hive persistence storing binary TypeAdapters alongside JSON-serialized feed pages and translated article maps.",
          items: [
            "Locale-namespaced cache keys (cached_headlines_<category>_<locale> and cached_recommended_p<page>_<locale>) preventing English and Arabic feeds from overwriting each other.",
            "Zero-network fallback in HomeRepository: when NetworkInfo.isConnected is false or a Dio request fails, cached pages are served immediately with fromCache: true.",
            "Binary Hive TypeAdapters registered for Article (typeId: 0), Source (typeId: 1), and ProfileModel (typeId: 2) for fast local hydration.",
          ],
        },
        {
          title: "Pluggable Multi-Provider Article Translation Pipeline",
          description:
            "Abstract TranslationService interface decoupled from ArticleTranslationRepository to translate non-Arabic article fields into Arabic on demand.",
          items: [
            "Concrete translation implementations in core/translation including LibreTranslationService and MyMemoryTranslationService.",
            "Translates non-Arabic article fields (title, cleanDescription, and cleanContent) concurrently via Future.wait, while batch translation methods use \\n<<<SEP>>>\\n as the batch separator.",
            "Concurrent chunked execution (chunkSize = 3 via Future.wait), skipping articles that already contain two or more Arabic fields (arabicCount >= 2) or strings with >30% Arabic script (U+0600–U+06FF), backed by persistent local caching.",
          ],
        },
        {
          title: "Dependency-Free Multi-Probe Connectivity Engine",
          description:
            "Custom HTTP reachability verifier (NetworkInfoImpl) and periodic ConnectivityCubit replacing platform-specific connectivity plugins.",
          items: [
            "Races 3 HTTP endpoints concurrently (NewsAPI baseUrl, Google generate_204, and Cloudflare cdn-cgi/trace) with a 4-second timeout.",
            "Completes true on the first reachable HTTP response (even 401/404 status codes prove network path reachability) and deduplicates concurrent in-flight checks via a shared _pending Future.",
            "ConnectivityCubit polls every 3 seconds and drives the animated top OfflineBanner without false positives on captive portals.",
          ],
        },
        {
          title: "Reactive BLoC/Cubit State & Cross-Cubit Stream Coordination",
          description:
            "Predictable unidirectional data flow across global app Cubits and screen-scoped feature Cubits.",
          items: [
            "HomeCubit, HeadlinesCubit, and SearchCubit subscribe directly to LocaleCubit and CategoryCubit streams, automatically re-fetching or re-translating data on language or category change.",
            "Custom PaginationMeta value object computing totalPages, boundary guards, and a sliding 5-page window rendered by PaginationBarWidget.",
            "FavoritesCubit dynamically checks active locale on loadFavorites() and re-translates bookmarked articles via ArticleTranslationRepository when viewed in Arabic.",
          ],
        },
        {
          title: "Supabase Auth, Deep-Link Recovery & Dual-Write Profile Sync",
          description:
            "Cloud identity, 3-step onboarding persistence, and avatar storage backed by Supabase and mirrored locally.",
          items: [
            "AuthCubit manages Authenticated, Guest, Unauthenticated, and PasswordRecovery states, persisting guest sessions in SharedPreferences.",
            "AndroidManifest.xml defines an intent-filter for io.newswave://reset-password; supabase_flutter processes the recovery session and emits AuthChangeEvent.passwordRecovery, which AuthListenerCubit handles (with a _navigatingToReset guard) to navigate to updatePasswordRoute.",
            "AuthRepositoryImpl (coordinating AuthRemoteDataSource and AuthLocalDataSource) uploads avatars picked via ImagePicker(source: ImageSource.gallery, imageQuality: 80) to the Supabase Storage avatars bucket at avatars/$userId/avatar_$timestamp.$ext and dual-writes profile data to Supabase PostgreSQL and local storage.",
          ],
        },
      ],
      decisions: [
        {
          title: "Custom Multi-Probe HTTP Reachability Instead of connectivity_plus",
          context:
            "Standard platform plugins like connectivity_plus only report whether Wi-Fi or cellular radio interfaces are enabled—not whether actual internet traffic can pass through captive portals or ISP outages.",
          approach:
            "Engineered a dependency-free NetworkInfoImpl using Dio that races three geographically distributed endpoints (NewsAPI, Google generate_204, and Cloudflare trace) in parallel. Any HTTP status code resolves the Completer immediately as online, while concurrent callers share a single in-flight Future—backed by unit tests with a fake HttpClientAdapter.",
        },
        {
          title: "Dual-Strategy Arabic News Fetching & Parallel Translation Pipeline",
          context:
            "NewsAPI's /v2/top-headlines endpoint for US categories primarily returns English content, so relying solely on translating top-headlines responses produces unnatural Arabic feeds and quickly exhausts free translation API rate limits.",
          approach:
            "Implemented Dual-Strategy Arabic News Fetching in HomeRepository—switching Arabic category feeds to /v2/everything with curated Arabic boolean queries from _getArabicQueryForCategory—before passing results through ArticleTranslationRepository. Articles with arabicCount >= 2 are skipped outright, while remaining non-Arabic fields (title, cleanDescription, and cleanContent) are translated in parallel via Future.wait across batches of chunkSize = 3 (with \\n<<<SEP>>>\\n batch separator support) and cached persistently.",
        },
        {
          title: "Locale-Namespaced Hive Keys & Translation Cache Invalidation",
          context:
            "Caching headlines under a single key per category caused stale English articles to appear after switching to Arabic (or vice versa) when offline or before a refresh completed.",
          approach:
            "Namespaced every Hive feed key by both category/page and active language code (e.g., cached_headlines_technology_ar vs cached_headlines_technology_en) and wired LocaleCubit.toggleLocale() to invoke ArticleTranslationRepository.clearCache(), purging transient tr_ keys while preserving raw feed caches.",
        },
        {
          title: "Dual-Write Profile Persistence via AuthRepositoryImpl",
          context:
            "Awaiting a remote Supabase query on every app launch to check whether a user has completed onboarding introduces unnecessary splash latency and fails when launching offline.",
          approach:
            "Implemented a local-first read / dual-write strategy in AuthRepositoryImpl across AuthLocalDataSource and AuthRemoteDataSource: cached profile data is hydrated instantaneously on startup to route SplashView, while background refresh, profile updates, and avatar uploads (picked via ImagePicker with imageQuality: 80 and uploaded to avatars/$userId/avatar_$timestamp.$ext) synchronize with Supabase's profiles table and local cache.",
        },
      ],
      challenges: [
        {
          title: "Cross-Language Favorites Consistency When Switching Locales",
          context:
            "Users often bookmark an article while browsing in English and later open their Saved Articles screen after switching the app to Arabic, expecting their saved reading list to match the active language.",
          approach:
            "Stored the canonical Article model in the Hive favoritesBox keyed by a deterministic 50-character uniqueId, and enhanced FavoritesCubit.loadFavorites(locale) to pipe saved articles through ArticleTranslationRepository.translateArticles() whenever the active locale is Arabic. Saved articles remain permanently accessible offline and automatically render in Arabic or English to match the user's current locale.",
        },
        {
          title: "Preventing Hero Tag Collisions Across Multi-Surface Article Lists",
          context:
            "The same breaking news article can appear simultaneously in the Home PageView carousel, the 'For You' recommended sliver list, and Search results—causing Flutter's Hero controller to throw duplicate tag exceptions during navigation.",
          approach:
            "Constructed context-scoped Hero tags (article-image-<uniqueId>-carousel, article-image-<uniqueId>-recommended, article-image-<uniqueId>-search) passed via ArticleDetailArgs into ArticleDetailView, paired with a custom flightShuttleBuilder that smoothly lerps BorderRadius from 24px to 0px. This achieved zero Hero tag collisions across overlapping feeds and 60fps shared-element transitions into the article reader.",
        },
        {
          title: "Cold-Start vs. Warm-State Deep Link Password Recovery",
          context:
            "Tapping the io.newswave://reset-password link from an email client can either cold-start the app (while SplashView's 3.6-second animation is running) or resume an already-mounted Navigator.",
          approach:
            "Configured the io.newswave://reset-password intent-filter in AndroidManifest.xml so supabase_flutter recovers the auth session and emits AuthChangeEvent.passwordRecovery, while AuthListenerCubit listens with a _navigatingToReset guard to push updatePasswordRoute onto the global navigatorKey once the frame mounts. This guarantees reliable end-to-end password reset navigation regardless of whether the app was terminated or running in the background.",
        },
        {
          title: "Coordinating Reactive Refreshes Across Category and Locale Streams",
          context:
            "Changing the language in the AppDrawer or Profile screen must simultaneously update the RTL/LTR layout, switch fonts between Poppins and Cairo, and re-fetch/translate active feeds in HomeCubit, HeadlinesCubit, and SearchCubit.",
          approach:
            "Injected LocaleCubit and CategoryCubit streams into feature Cubits via GetIt, cancelling StreamSubscriptions cleanly in close() and triggering force-refreshed, locale-scoped queries with shimmer skeleton states. This delivers seamless, flicker-free transitions between English and Arabic across every active screen in the navigation stack.",
        },
      ],
    },
  },
  {
    slug: "fin-dash",
    title: "FinDash",
    tagline: "Responsive Financial Dashboard Showcase",
    icon: "/assets/projects/fin-dash/icon.png",
    positioning:
      "Adaptive Flutter Financial Dashboard UI Showcase across Desktop, Tablet & Mobile",
    description: {
      short:
        "Responsive Flutter financial dashboard demo and UI showcase adapting across desktop, tablet, and mobile via AdaptiveLayout and SizeConfig. Features Cubit-driven transaction search, type filters, period switching (Weekly/Monthly/Yearly), touch-interactive fl_chart income breakdown, ExpandablePageView card carousel, Quick Invoice UI, CSV/PDF export, and persisted Light/Dark theme support.",
      full: "FinDash is a responsive financial dashboard demo and adaptive UI showcase built with Flutter. Structured around separated data, domain, and presentation layers with a repository contract (DashboardRepository / DashboardRepositoryImpl) backed by a simulated asynchronous mock datasource (DashboardMockDatasource), the application demonstrates how a single Flutter codebase adapts its layout composition, navigation ergonomics, chart density, and typography across Desktop (≥ 1300px), Tablet (800px–1299px), and Mobile (< 800px) viewports. Interactive capabilities include DashboardCubit-managed period switching, live title-scoped transaction search, combinable income/expense filter chips, filtered CSV and A4 PDF report export, touch-responsive fl_chart pie visualization, and SharedPreferences-persisted theme switching.",
    },
    isFeatured: true,
    theme: {
      primary: "#4EB7F2",
      secondary: "#064060",
    },
    techStack: [
      "Flutter",
      "Dart",
      "BLoC / Cubit (flutter_bloc)",
      "fl_chart",
      "expandable_page_view",
      "csv · pdf · printing · share_plus",
      "SharedPreferences",
      "Shimmer & DevicePreview",
      "flutter_svg",
    ],
    links: {
      github: "https://github.com/Ahmedatef5O5/responsive_dash_board",
    },
    features: [
      {
        id: "adaptive-responsive-dashboard",
        title: "Adaptive Responsive Dashboard",
        description:
          "Three dedicated viewport layouts (DashboardDesktopLayout ≥ 1300px, DashboardTabletLayout 800px–1299px, and DashboardMobileLayout < 800px) orchestrated at runtime via AdaptiveLayout, LayoutBuilder, and a 400ms AnimatedSwitcher — paired with SizeConfig.tablet (900px) navigation adaptation and clamped responsive typography.",
        icon: "MonitorSmartphone",
      },
      {
        id: "financial-overview",
        title: "Financial Overview & All Expenses Panel",
        description:
          "Summary presentation combining period-based income and expense totals from DashboardCubit with the interactive AllExpenses panel — featuring selectable Balance, Income, and Expenses cards with active (#4db7f2) and inactive visual states, SVG category icons, and FittedBox scale protection.",
        icon: "Wallet",
      },
      {
        id: "transaction-management",
        title: "Transaction History, Search, Filters & Period Switching",
        description:
          "Interactive transaction workflow managed by DashboardCubit: animated PeriodSelector pills (Weekly, Monthly, Yearly), live title-scoped DashboardSearchBar with instant clear action, combinable FilterChipRow (All, Income, Expense), color-coded TransactionItem cards (#f3735e expense vs #7cd87a income), and EmptyStateWidget fallback.",
        icon: "ArrowRightLeft",
      },
      {
        id: "financial-visualization",
        title: "Interactive Income Visualization",
        description:
          "Touch-responsive fl_chart PieChart with PieTouchData segment expansion (40px to 50px radius on tap) across four categories (Design service 40%, Design product 25%, Product royalti 20%, Other 22%). IncomeSectionBody dynamically switches between a side-by-side chart + legend row and an inline-labeled DetailedIncomeChart on 1300px–1749px desktop viewports.",
        icon: "PieChart",
      },
      {
        id: "cards-overview",
        title: "My Cards Carousel & Account Navigation UI",
        description:
          "Horizontal 3-card carousel powered by ExpandablePageView and PageController with 420:215 aspect-ratio MyCard visuals and animated pill DotsIndicator (CustomDotIndicator expanding from 8px to 32px). Complemented by CustomDrawer displaying user profile metadata and selectable navigation item states.",
        icon: "CreditCard",
      },
      {
        id: "quick-invoice",
        title: "Quick Invoice Form UI Experience",
        description:
          "Inline dashboard invoice UI combining a horizontal IntrinsicWidth recipient strip (LatestTransactionListView) with a structured two-row QuickInvoiceForm (Customer Name, Customer Email, Item Name, Item mount) and dual action buttons (Add more details, Send Money).",
        icon: "Receipt",
      },
      {
        id: "data-export",
        title: "Filtered CSV & PDF Report Export",
        description:
          "PopupMenuButton export action wired to ExportService, exporting the currently filtered transaction list and active period either as a downloadable/shareable CSV file (via package:csv and share_plus) or as a formatted A4 multi-page PDF report table (via package:pdf and printing).",
        icon: "FileSpreadsheet",
      },
      {
        id: "theme-and-states",
        title: "Theme Personalization & Dashboard UI States",
        description:
          "Light and Dark ThemeData definitions (AppTheme & AppColors) managed by ThemeCubit and persisted locally via SharedPreferences (isDarkMode), alongside theme-aware DashboardShimmerLoader skeleton placeholders during async loads and ErrorStateWidget retry recovery.",
        icon: "Moon",
      },
    ],
    media: {
      hero: {
        id: "fd-hero-mobile",
        type: "image",
        url: "/assets/projects/fin-dash/mobile-screen.webp",
        width: 297,
        height: 644,
        alt: "FinDash Mobile Layout — Stacked vertical financial dashboard screen",
        role: "hero",
        priority: true,
      },
      cover: {
        id: "fd-cover-banner",
        type: "image",
        url: "/assets/projects/fin-dash/banner.webp",
        width: 1600,
        height: 900,
        alt: "FinDash Official Project Banner — Responsive Financial Dashboard Showcase",
        role: "hero",
      },
      gallery: [
        {
          category: "Adaptive Responsive Dashboard",
          items: [
            {
              id: "fd-responsive-desktop",
              type: "image",
              url: "/assets/projects/fin-dash/desktop-layout.webp",
              width: 1280,
              height: 671,
              alt: "FinDash Desktop Layout (≥ 1300px) — Full two-column dashboard with persistent sidebar",
              category: "Adaptive Responsive Dashboard",
              role: "storytelling",
              featureId: "adaptive-responsive-dashboard",
              caption:
                "Desktop Layout (≥ 1300px) — Full two-column layout with persistent sidebar",
              description:
                "DashboardDesktopLayout composes an outer Row with an Expanded (flex: 1) CustomDrawer sidebar, a 32px gap, and an Expanded (flex: 3) CustomScrollView + SliverFillRemaining workspace whose inner Row splits AllExpensesAndQuickInvoiceSection (Expanded flex: 2) and the right-hand MyCardsAndTransactionHistory + Expanded IncomeSection column (Expanded flex: 1) separated by a 24px gap.",
            },
            {
              id: "fd-responsive-tablet",
              type: "image",
              url: "/assets/projects/fin-dash/tablet-layout.webp",
              width: 1280,
              height: 883,
              alt: "FinDash Tablet Layout (800px–1299px) — Persistent sidebar with single-column scrollable content",
              category: "Adaptive Responsive Dashboard",
              role: "storytelling",
              featureId: "adaptive-responsive-dashboard",
              caption:
                "Tablet Layout (800px – 1299px) — Sidebar + single-column scrollable content",
              description:
                "DashboardTabletLayout composes a Row with an Expanded (flex: 1) CustomDrawer sidebar, a 32px gap, an Expanded (flex: 3) Padding(top: 25) wrapping DashboardMobileLayout (single-column CustomScrollView), and a trailing 32px horizontal spacer.",
            },
            {
              id: "fd-responsive-mobile",
              type: "image",
              url: "/assets/projects/fin-dash/mobile-layout.webp",
              width: 384,
              height: 694,
              alt: "FinDash Mobile Layout (< 800px) — Stacked vertical layout with hamburger drawer",
              category: "Adaptive Responsive Dashboard",
              role: "storytelling",
              featureId: "adaptive-responsive-dashboard",
              caption:
                "Mobile Layout (< 800px) — Stacked vertical layout with hamburger drawer",
              description:
                "DashboardMobileLayout stacks AllExpensesAndQuickInvoiceSection, MyCardsAndTransactionHistory, and IncomeSection vertically with 24px spacing inside CustomScrollView + SliverFillRemaining, while DashBoardView (< 900px via SizeConfig.tablet) attaches a top AppBar with theme toggle and a 70%-width slide-out CustomDrawer.",
            },
          ],
        },
      ],
    },
    caseStudy: {
      overview: [
        "FinDash is a Flutter-based responsive financial dashboard demo and adaptive UI showcase focused on solving a core multi-device design challenge: how to present dense financial information—expense summaries, card carousels, transaction histories, quick invoice forms, and income charts—across desktop monitors, tablets, and mobile phones without relying on naive uniform scaling.",
        "Rather than stretching a single layout across screen sizes, FinDash orchestrates three dedicated layout compositions (DashboardDesktopLayout, DashboardTabletLayout, and DashboardMobileLayout) through a reusable AdaptiveLayout widget powered by LayoutBuilder and AnimatedSwitcher, complemented by SizeConfig viewport thresholds and clamped responsive typography (getResponsiveFontSize).",
        "Beyond layout adaptation, FinDash implements functional dashboard workflows powered by flutter_bloc (DashboardCubit and ThemeCubit) over a separated data/domain/presentation structure using DashboardRepository and DashboardMockDatasource. Users can switch reporting periods (Weekly, Monthly, Yearly), search transactions by title, filter by Income or Expense, export the currently filtered dataset to CSV or multi-page A4 PDF reports, interact with fl_chart pie segments, and persist Light/Dark mode preferences via SharedPreferences—establishing a clean UI foundation with planned future evolution toward live backend integration, authentication, and localization.",
      ],
      architecture: [
        {
          title: "Adaptive Layout & Viewport Orchestration (core/widgets & presentation/layouts)",
          description:
            "Runtime layout switching and viewport-aware navigation composition across Desktop, Tablet, and Mobile breakpoints.",
          items: [
            "AdaptiveLayout uses LayoutBuilder + AnimatedSwitcher (400ms, Curves.easeOut) with breakpoints at < 800px (Mobile), 800px–1299px (Tablet), and ≥ 1300px (Desktop).",
            "DashBoardView checks MediaQuery width against SizeConfig.tablet (900px) to conditionally attach the mobile AppBar (menu trigger + theme toggle) and 70%-width slide-out CustomDrawer.",
            "DashboardTabletLayout reuses DashboardMobileLayout inside a 1:3 Row alongside CustomDrawer, eliminating widget duplication between tablet and mobile vertical flows.",
          ],
        },
        {
          title: "Separated Data, Domain & Mock Repository Layer (features/dashboard/data & domain)",
          description:
            "Feature-oriented separation decoupling presentation Cubits from the underlying mock data source via an abstract repository contract.",
          items: [
            "Abstract DashboardRepository contract defining getTransactions(period), getExpenses(period), getUserInfo(), and getSummary(period).",
            "DashboardRepositoryImpl maps raw payloads from DashboardMockDatasource into immutable domain models (TransactionModel, AllExpensesItemModel, UserInfoModel, DashboardData).",
            "DashboardMockDatasource simulates asynchronous network latency (300ms–700ms Future.delayed) across distinct Weekly, Monthly, and Yearly mock datasets.",
          ],
        },
        {
          title: "Cubit State Management & Persisted Theme Preferences (presentation/cubits)",
          description:
            "Unidirectional state management handling asynchronous period loading, combinable search/type filtering, and persistent theme mode.",
          items: [
            "DashboardCubit manages DashboardInitial, DashboardLoading, DashboardSuccess(DashboardData), and DashboardError(message) states using Future.wait parallel loading.",
            "Combinable client-side filtering (_applyFilters) intersects case-insensitive title search (searchQuery) with transaction type filters (All, Income, Expense).",
            "ThemeCubit persists isDarkMode in SharedPreferences and drives MaterialApp themeMode between AppTheme.light and AppTheme.dark.",
          ],
        },
        {
          title: "Reusable Core Widgets, Adaptive Charting & Export Service (core/utils & widgets)",
          description:
            "Modular dashboard sections, viewport-aware fl_chart visualization, clamped typography, and CSV/PDF document generation.",
          items: [
            "IncomeSectionBody inspects viewport width (width >= 1300 && width < 1750) to switch between DetailedIncomeChart and the side-by-side IncomeChart + IncomeDetails legend.",
            "ExportService generates CSV files via package:csv + share_plus (Share.shareXFiles) and formatted A4 multi-page PDF reports via package:pdf + printing (Printing.layoutPdf).",
            "getResponsiveFontSize() scales Montserrat typography using viewport-specific scale factors (divisors 900, 1000, 1920) clamped to [0.8x, 1.2x].",
          ],
        },
      ],
      decisions: [
        {
          title: "Dedicated Breakpoint Layout Trees Instead of Uniform Scaling",
          context:
            "A three-column desktop financial dashboard becomes unreadable on mobile phones if scaled down proportionally, while a mobile single-column stack wastes horizontal screen real estate on desktop monitors.",
          approach:
            "Implemented AdaptiveLayout using LayoutBuilder to mount distinct widget trees at < 800px (DashboardMobileLayout), < 1300px (DashboardTabletLayout), and ≥ 1300px (DashboardDesktopLayout), while DashboardTabletLayout composes CustomDrawer alongside DashboardMobileLayout to share the single-column content stack without code duplication.",
        },
        {
          title: "Secondary Desktop Breakpoint (1300px – 1749px) for Income Chart Readability",
          context:
            "At the entry desktop breakpoint (1300px), the right column holds only 1/3 of the content area alongside the sidebar and left column, causing a side-by-side donut chart and text legend row to crowd text labels.",
          approach:
            "Added a secondary width check in IncomeSectionBody (width >= SizeConfig.desktop && width < 1750) that swaps the side-by-side Row (IncomeChart + IncomeDetails) for DetailedIncomeChart, rendering percentages and category titles directly on the interactive PieChart sections until wider monitor space (≥ 1750px) is available.",
        },
        {
          title: "Clamped Multi-Tier Scale Factors for Responsive Typography",
          context:
            "Fixed pixel font sizes either overflow compact cards on small screens or appear undersized on wide desktop displays, whereas unconstrained linear scaling produces extreme text sizes.",
          approach:
            "Built getResponsiveFontSize() and getScaleFactor() in core/utils/responsive_font_size.dart using tier-specific reference widths (width / 900 below 900px, (width / 1000).clamp(0.9, 1.1) below 1300px, and width / 1920 on desktop) and clamped every computed font size between 80% and 120% of its base Montserrat style.",
        },
        {
          title: "Repository Abstraction Over Mock Data to Support Interactive Workflows",
          context:
            "Even in a UI-focused dashboard showcase, hardcoding static lists directly inside widgets prevents realistic testing of loading skeletons, period transitions, search filtering, and report exports.",
          approach:
            "Introduced DashboardRepository and DashboardMockDatasource beneath DashboardCubit. Switching between Weekly, Monthly, and Yearly periods triggers DashboardShimmerLoader and reloads period-scoped mock datasets, while search, filter chips, and CSV/PDF exports operate reactively on DashboardData.filteredTransactions.",
        },
      ],
      challenges: [
        {
          title: "Coordinating Scrollable Dashboard Columns Without Unbounded Height Exceptions",
          context:
            "Combining a multi-section two-column desktop layout and a stacked mobile layout inside CustomScrollView while using Expanded children for aligned bottom sections can trigger Flutter RenderBox unbounded height errors.",
          approach:
            "Wrapped layout columns inside CustomScrollView with SliverFillRemaining(hasScrollBody: false), allowing sections like IncomeSection to expand naturally to fill remaining viewport height on large screens while scrolling safely when content exceeds vertical bounds.",
        },
        {
          title: "Adaptive-Height Card Carousel Synchronization with Animated Indicators",
          context:
            "Standard Flutter PageView requires a fixed height or aspect constraint, which complicates responsive card sizing across mobile, tablet, and desktop column widths.",
          approach:
            "Used ExpandablePageView in MyCardsPageView paired with an AspectRatio(420 / 215) MyCard container and a PageController listener in MyCardsSection that drives the 300ms AnimatedContainer width transition in CustomDotIndicator.",
        },
        {
          title: "Preserving Active Search and Filter Context Across CSV & PDF Exports",
          context:
            "Exporting raw unfiltered transactions when a user has narrowed the list by search query, transaction type (Income/Expense), and time period produces inconsistent reports.",
          approach:
            "Centralized _applyFilters() inside DashboardCubit so every search or chip selection updates state.data.filteredTransactions, and wired ExportButton to pass both filteredTransactions and selectedPeriod directly into ExportService.exportToCsv() and ExportService.exportToPdf().",
        },
      ],
    },
  },
];

