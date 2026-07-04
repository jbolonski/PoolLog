## Why

The pool entry flow is currently too cumbersome when users want to log a reading quickly. After tapping the log action, the chemistry input fields are still positioned lower on the screen, forcing extra scrolling before the user can enter values.

## What Changes

- When the log form opens, the chemistry input fields should appear immediately in the main viewing area so users can enter values without scrolling.
- The current summary cards and form layout should be adjusted so the form feels more compact and efficient during entry.
- The interaction should preserve the existing chemistry-focused experience while reducing friction for fast data entry.

## Capabilities

### New Capabilities
- `streamlined-entry-form`: A more compact pool reading entry experience that prioritizes input fields and reduces on-screen scrolling.

### Modified Capabilities
- `chemistry-focused-ui`: The existing chemistry-focused experience will be refined to support faster input while keeping the same core workflow.

## Impact

- Updates the main pool log UI in the React app.
- May require layout and styling adjustments in the app shell and form components.
- No backend or persistence behavior changes are required for this change.
