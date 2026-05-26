## Goal
Add a Photo Sphere Viewer-based 360° viewer and integrate it into one location page, using a public sample panorama URL.

## Approach
The project already has a Three.js-based `PanoramaViewer` used in `/360-experience`. Rather than replacing it, add a dedicated, lightweight viewer based on `@photo-sphere-viewer/core` and mount it on a single new route so the existing experience stays intact.

## Steps

1. **Install dependency**
   - Add `@photo-sphere-viewer/core` (v5).

2. **Create `src/components/PhotoSphereViewer.tsx`**
   - Client component that initializes `Viewer` from `@photo-sphere-viewer/core` on a `div` ref inside `useEffect`.
   - Props: `imageUrl: string`, optional `caption`.
   - Imports the package CSS: `@photo-sphere-viewer/core/index.css`.
   - Cleans up the viewer on unmount.
   - Renders a full-width container ~`h-[600px]` with rounded corners matching the site aesthetic.

3. **Create `src/pages/LocationPanorama.tsx`**
   - A simple location page (uses existing `Navigation` + `Footer` for consistency).
   - Hardcodes one location (e.g. AlUla) with title/description and a public sample equirectangular image:
     `https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg`
   - Embeds `<PhotoSphereViewer />` below the heading.

4. **Wire up the route in `src/App.tsx`**
   - Add `<Route path="/location/panorama" element={<LocationPanorama />} />` above the catch-all.

5. **Add an entry point**
   - Add a "View in 360°" link/button on `VirtualToursSection` (or AlUla section) pointing to `/location/panorama` so the feature is discoverable from the home page.

## Technical notes
- Photo Sphere Viewer requires its CSS to render controls correctly — imported once inside the new component.
- No backend changes; purely a frontend addition.
- The existing `/360-experience` Three.js viewer is left unchanged.

## Out of scope
- Replacing the existing panorama viewer.
- Multiple hotspots / markers plugin (can be added later).
