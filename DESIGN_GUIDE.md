# 🎨 UI/UX Visual Guide

## Color Scheme

### Primary Colors
```
Black Background:     #000000
Primary Accent:       #7C3AED (Purple)
Secondary Accent:     #333333 (Dark Gray)
```

### Text Colors
```
Primary Text:         #FFFFFF (White)
Secondary Text:       #A1A1AA (Light Gray)
Muted Text:          #52525B (Medium Gray)
```

### Glassmorphism
```
Glass Background:     rgba(255, 255, 255, 0.03)
Glass Strong:         rgba(255, 255, 255, 0.06)
Glass Border:         rgba(255, 255, 255, 0.08)
```

---

## Layout Sections

### Landing Page
```
┌─────────────────────────────────────────────┐
│ NAVBAR                                       │
├─────────────────────────────────────────────┤
│                                             │
│  HERO SECTION                               │
│  - Logo & Title                             │
│  - Subheading                               │
│  - CTA Button                               │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  FEATURES SECTION                           │
│  - Feature Cards (Grid)                     │
│  - Icons & Descriptions                     │
│                                             │
├─────────────────────────────────────────────┤
│  FOOTER                                      │
└─────────────────────────────────────────────┘
```

### Chat Page
```
┌──────────────────────────────────────────────────┐
│ HEADER (AI Chat Selector)                        │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│  SIDEBAR     │  CHAT WINDOW                     │
│              │  - Welcome Screen                │
│  - New Chat  │  - Messages (Auto-scroll)        │
│  - Menu      │  - Typing Indicator              │
│  - History   │  - Timestamps                    │
│  - Search    │                                  │
│              │  INPUT SECTION                   │
│  - Projects  │  - Text Input                    │
│  - Library   │  - File Upload                   │
│              │  - Send Button                   │
│              │                                  │
│  FOOTER      │  FOOTER                          │
│  (Logout)    │  (Disclaimer)                    │
│              │                                  │
└──────────────┴──────────────────────────────────┘
```

### Projects Page
```
┌─────────────────────────────────────────────────┐
│ HEADER                                           │
│ Projects | [New Project Button]                  │
├─────────────────────────────────────────────────┤
│                                                 │
│ PROJECT CARDS (Grid Layout)                     │
│                                                 │
│ ┌─────────────┐  ┌─────────────┐               │
│ │ 📁 Project1 │  │ 📁 Project2 │               │
│ │ 3 chats     │  │ 5 chats     │               │
│ │ May 20 2026 │  │ May 19 2026 │               │
│ └─────────────┘  └─────────────┘               │
│                                                 │
│ ┌─────────────┐                                │
│ │ 📁 Project3 │                                │
│ │ 1 chat      │                                │
│ │ May 18 2026 │                                │
│ └─────────────┘                                │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Library Page
```
┌──────────────────────────────────────────────────┐
│ Library | [Search Bar] | [Filter Dropdown]        │
├──────────────────────────────────────────────────┤
│                                                  │
│ LIBRARY ITEMS (Grid Layout)                      │
│                                                  │
│ ┌──────────────┐  ┌──────────────┐              │
│ │ 💬 CHAT      │  │ 📄 FILE      │              │
│ │ Title 1      │  │ Title 2      │              │
│ │ Description  │  │ Description  │              │
│ │ May 20 2026  │  │ May 20 2026  │              │
│ └──────────────┘  └──────────────┘              │
│                                                  │
│ ┌──────────────┐  ┌──────────────┐              │
│ │ 🖼️  IMAGE     │  │ 💬 CHAT      │              │
│ │ Title 3      │  │ Title 4      │              │
│ │ Description  │  │ Description  │              │
│ │ May 19 2026  │  │ May 19 2026  │              │
│ └──────────────┘  └──────────────┘              │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## Component Details

### Message Bubble (User)
```
┌─ You                    [10:30 AM]
│
│ This is a user message that can span
│ multiple lines. It's displayed on the right
│ with a purple/blue gradient background.
```

### Message Bubble (AI)
```
┌─ AI Chat              [10:30 AM]
│
│ This is an AI response with full markdown support.
│ It can include:
│ - **Bold text**
│ - *Italic text*
│ - `Code snippets`
│
│ ┌─ python ┬─ Copy
│ │ def hello():
│ │     print("world")
│ └────────────────────
│
│ [📋 Copy] [👍] [👎]
```

### Sidebar Chat Item
```
Selected:
┌─ 📝 [Editing: ✓ ✗]
│   What is AI?

Normal:
┌─ 💬
│   Another conversation
```

### Input Box
```
┌─────────────────────────────────────────┐
│ [+] [Mic] Type your message...    [Send]│
│     [📎 Attach] [📸 Image]              │
└─────────────────────────────────────────┘
```

---

## Animations

### Entrance
- Messages fade in: 300ms
- Components slide up: 200ms
- Text appears gradually

### Hover Effects
- Buttons scale: 1.05
- Cards lift up: -5px
- Text changes color smoothly

### Loading
- Spinner rotates: Infinite
- Typing dots bounce: 1.4s loop
- Pulse effects on focus

### Transitions
- Page navigation: 300ms
- Sidebar toggle: Spring physics
- Modals appear: 200ms fade

---

## Typography

### Headings
- H1: 48px, Bold, Purple gradient
- H2: 32px, Bold, White
- H3: 24px, Semibold, Light gray

### Body
- Large: 16px, Regular, White
- Normal: 14px, Regular, Light gray
- Small: 12px, Regular, Medium gray

### Special
- Code: 13px, Monospace, Purple
- Timestamps: 12px, Regular, Medium gray
- Labels: 10px, Bold, Medium gray (uppercase)

---

## Spacing

### Padding
- XS: 4px
- S: 8px
- M: 12px
- L: 16px
- XL: 24px

### Margins
- Small gaps: 8px
- Medium gaps: 16px
- Large gaps: 24px
- Section gaps: 32px-48px

### Border Radius
- Small: 8px
- Medium: 12px
- Large: 16px
- Full: 50%

---

## Responsive Breakpoints

### Mobile (< 640px)
- Single column layouts
- Full-width cards
- Touch-friendly buttons (48px min)
- Sidebar hidden (menu button shows)

### Tablet (640px - 1024px)
- Two column layouts
- 80% width containers
- Medium spacing

### Desktop (> 1024px)
- Multi-column layouts
- Sidebar visible
- Max width 1280px
- Generous spacing

---

## Interactive Elements

### Buttons
- **Primary**: Purple gradient, white text, rounded
- **Secondary**: Transparent with border, gray text
- **Danger**: Red/transparent, red text
- **Ghost**: No background, colored text

### Input Fields
```
┌─────────────────────────────────┐
│ Placeholder text                 │
└─────────────────────────────────┘
States: Default, Focused, Filled, Error
```

### Modals
```
┌─ X
│ Modal Title
├─────────────────────────
│ Modal content here
│
│ [Cancel] [Confirm]
└─────────────────────────
```

---

## Dark Mode Details

### True Black Theme
- Background: Pure #000000 (not dark gray)
- Reduces eye strain
- Professional appearance
- Better for extended use

### Contrast Ratios
- Text on black: 4.5:1 (WCAG AA)
- Large text: 3:1 minimum
- Accents: High contrast

---

## Accessibility Features

- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader support
- ✅ High contrast text
- ✅ Clear focus indicators
- ✅ Semantic HTML
- ✅ ARIA labels where needed
- ✅ Touch-friendly buttons (48px+)
- ✅ Motion respected (prefers-reduced-motion)

---

## Animation Timings

### Standard
- Quick interactions: 150ms
- Normal transitions: 300ms
- Slow animations: 500ms

### Easing
- Entrance: ease-out
- Exit: ease-in
- Interactions: ease-in-out
- Special: custom cubic-bezier

---

## States & Feedback

### Loading State
```
Spinner + "Loading..." text
Disabled input/buttons
```

### Error State
```
Red border/background
Error icon (⚠️)
Error message below
```

### Success State
```
Green accent (✓)
Confirmation message
Auto-dismiss after 2s
```

### Empty State
```
Large icon (💬, 📁, 📚)
Heading: "No items yet"
Subheading: Action text
CTA button
```

---

## Theme Consistency

### Colors Used
- Background: Black (#000000)
- Primary: Purple (#7C3AED)
- Secondary: Gray (#333333, #A1A1AA)
- Text: White, light gray
- Accents: Cyan (#06B6D4 references), Green (#10B981)

### Never Use
- ❌ Bright blue (#0066FF)
- ❌ Neon green (#00FF00)
- ❌ Light colors on light backgrounds
- ❌ Harsh contrast

---

## Browser Rendering

### Performance Considerations
- Smooth 60 FPS animations
- Efficient GPU acceleration
- Lazy loading images
- Optimized re-renders
- Minimal reflows/repaints

---

## Print Styles (Optional)

If printing conversations:
- Hide sidebar, header, footer
- Use black text on white
- Increase font size
- Add page breaks between messages

---

## Future Design Enhancements

- [ ] Glassmorphism depth effect
- [ ] Particle animations on landing
- [ ] Custom cursor
- [ ] Sound effects (optional, muted by default)
- [ ] Micro-interactions
- [ ] Skeleton loaders
- [ ] Gesture support

---

**Design Version**: 2.0  
**Last Updated**: May 2026  
**Status**: ✅ Production Ready  
