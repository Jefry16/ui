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

## Shape and type

One radius, `--radius: 0.375rem`, drives every derived radius. No pill
buttons, no larger card radius. The face is Geist Variable for everything;
no display face, no second family.

## Icons

Lucide, at 2 px stroke, until the Nucleo Core set replaces it.
