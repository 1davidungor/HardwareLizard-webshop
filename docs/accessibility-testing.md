# Accessibility Testing (WCAG 2.2 AA)

## Tools
- axe DevTools (Browser Extension)
- WAVE (Browser Extension / Web tool)
- Lighthouse (Chrome DevTools)

## Test scope
Tested Sites/States:
- Landing (Hero + Navigation)
- Pricing (Plan cards + plan selection)
- Checkout:
    - Submit without plan selected (plan warning)
    - Submit with missing required fields (native validation)
- Success state (after valid submit)

### 28.12.2025 (localhost)
- axe DevTools: 0 violations
- Lighthouse: Accessibility score 100
- Manual checks:
    - Keyboard navigation (Tab/Shift+Tab) works, focus visible
    - Skip link jumps to main content
    - Form inputs have labels, required fields validated
    - Color contrast adjusted for focus/links
    - zoom 200% works and responsive

## Findings & fixes (ongoing log)
- 2025-12-28: Increased focus/link contrast to meet minimum contrast requirements. -> 4.5