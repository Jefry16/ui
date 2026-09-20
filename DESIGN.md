# Design tokens

The admin's look is the token sheet, `src/styles.css`. This file names the
choices the sheet cannot explain by itself. A value is right when it matches
the sheet; when the two disagree, the sheet wins and this file is wrong.

## Brand

| role | value | oklch |
| --- | --- | --- |
| brand blue | `#1d4ed8` | `0.488 0.243 264.376` |
| lime accent | `#bef264` | `0.897 0.196 126.665` |

The blue is `--primary`, `--ring` and `--sidebar-ring`, and the colour of a
resource link. White on it passes AA at 6.3:1. In the dark theme it lifts to
`0.707 0.165 254.624` with a navy foreground, because the given blue sits at
2.4:1 on the dark ground.

The lime is `--sidebar-primary`, and the sidebar's active item is the only
element that paints it. It never carries text or a focus ring on a light
ground: it sits at 1.3:1 against white. Ink on it passes at 14:1.

Every neutral carries a trace of the blue's hue (chroma 0.004 to 0.012 at
hue 264) so the grey belongs to the brand. Chart tokens stay achromatic.

## State

`--destructive`, `--success`, `--warning` and `--info` are state colours and
are not brand, but each is drawn from the two hues the brand owns rather
than from a stock palette. `--info` sits on the brand hue itself, 264.376,
a step darker than the primary in light and a step lighter with less chroma
in dark, so a notice and a button are never two blues and never the same
one. `--success` takes the lime's hue, 128, darkened to a moss in light and
lifted to a lighter lime sibling in dark, never the sidebar lime itself, so
the active item stays the one element painting it. `--warning` is an ochre
at hue 80, between the lime and the red, a yellow-brown rather than an
orange. `--destructive` is a crimson at hue 12, red cooled toward the blue
side of the wheel the brand sits on, so it never reads as a second orange
beside the warning. Every state colour carries a title at AA on the alert's
ground in both themes, and `--success` carries text at AA on white, which
the auth message card relies on.

An alert is a surface, not coloured text: the ground is the state colour
at 8%, the edge at 25%, the icon and title in the state colour, and the
body in `--foreground`, which is the text that has to be read.

A status badge is the same surface at badge size: the state colour at 8%
under text in the state colour, with no edge. `AppBadge` owns the four
state variants, `destructive` included, because the vendored badge's dark
tint at 20% drops the text under AA; at 8% every state colour reads at
4.5:1 or better on a card in both themes, and light `--warning`, the
tightest, sits at 4.6:1. A status is a badge in its state colour, never
the primary blue: `default` is for a role or a kind, so a badge in the
brand colour is never mistaken for "live".

## Surfaces

Three neutral surfaces stack the same way in both themes: the sidebar,
the page ground, then a card or popover on top. Light is `0.93`, `0.97`,
`1.0`; dark is `0.145`, `0.175`, `0.205`. Dark keeps elevation by
lightness, so a card is lighter than its ground, but the sidebar is the
darkest surface in both themes rather than sharing the card's lightness,
so the page ground reads as the middle everywhere and a dark card never
matches the rail beside it. The sidebar's hover is one step up, the page
ground's lightness in light and the card's in dark; `--muted`,
`--secondary` and `--accent` sit one step above the card in dark, `0.269`,
which is a badge's or a hover's fill on a card.

## Shape

One radius, `--radius: 0.375rem`, drives every derived radius. No pill
buttons, no larger card radius: the steps from `--radius-lg` up all resolve
to `--radius`, so a vendored card, dialog or badge that asks for
`rounded-xl` is exactly as round as the input inside it. `--radius-sm` and
`--radius-md` stay smaller, for what sits inside a control.

A circle is a second shape. An avatar is a tile: `AppAvatar` puts the one
radius on the vendored frame, its edge and its fallback. An empty state's
icon well is a tile too. The one circle is a `size-1.5` dot that marks a
state, a translated locale or an active filter. What sits on a tile, a
check or a remove button over an image, takes `rounded-md`.

## Controls

`--input` is the edge of every input, textarea, select trigger and
checkbox, and it is its own token rather than `--border`'s twin: a card's
hairline only separates, a control's edge says where to type. It reads at
3:1 against the card and against the page ground in both themes, `0.64` in
light and white at 35% in dark. Focus is the brand: `--ring`. A disabled
control fills with half of `--input`, so it reads as closed rather than
faint.

## Type

The face is Geist Variable for everything; no display face, no second
family. Four sizes and three weights, each tied to a role, so a screen is
read by role and never by a size picked for one spot. No tracking on
anything but the eyebrow; a title carries its hierarchy in size and weight
alone.

| role | classes | where |
| --- | --- | --- |
| page title | `text-xl font-semibold` | `AppPageHeader`, the auth shell, the operator route's name |
| section title | `text-base font-medium` | card, dialog, sheet and legend titles, all from the vendored primitives |
| empty-state title | `text-lg font-semibold` | `AppEmptyState`, the only title between page and section, because it stands alone in a well |
| body | `text-sm` | everything else: table cells, descriptions, buttons, labels, breadcrumbs |
| control text | `text-base md:text-sm` | inputs and textareas, `text-base` below `md` so iOS does not zoom the field |
| caption | `text-sm text-muted-foreground` | a page subtitle, a field description, an empty-state body |
| eyebrow | `text-xs font-medium uppercase tracking-wider` | `AppDetailField`'s label; the only other uppercase is a locale code in a badge |
| value | `text-base font-medium` | `AppDetailField`'s value, one step above body so a detail page reads as label over value |
| code | `font-mono text-xs` | `AppSourceBlock`, `AppLabelledControl`'s identifier, a locale badge |

Weight comes from the role, never from the caller: a table header is
`font-semibold` from `AppDataTable`'s cell, so a column's own header element
adds no weight of its own; a label is `font-medium` from `Label`; a button
is `font-medium` from `Button`. Dark mode is the same scale on the same
faces; nothing changes size or weight between themes.

## Icons

Lucide, at its 2 px default stroke; nothing sets `strokeWidth`. An icon
never changes the size of its own accord. Inline, it takes the size of what
holds it: a button and a sidebar item size their svg to 16 px, and an icon
that stands beside text with no such container is `size-4`. In a well — an
empty state, a not-found or not-permitted card, an error card, a dropzone,
a picker with nothing picked — it is `size-8 text-muted-foreground`, one
size and one colour for every "nothing here" the app shows. Muting is
`text-muted-foreground`, never `opacity-*`; opacity is for the disabled
state. Each metaphor has one glyph: people are the round family
(`UsersRound`, `UserRound`), a date is `CalendarDays`, the dashboard is
`LayoutDashboard`, add is `Plus`, and the four states use the icons the
toast uses — `CircleCheck`, `Info`, `TriangleAlert`, `OctagonX` — so an
alert and a toast for the same outcome show the same sign. Imports use the
bare name, never the `Icon`-suffixed alias, outside the vendored files.
`src/gates/icons.test.ts` reads every non-vendored file for a size class,
an opacity class or an aliased import an icon element is not allowed.
