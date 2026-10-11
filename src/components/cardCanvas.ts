// Client-side canvas card generator to generate crisp, error-free PNG textures for the Lanyard badge.
// The card contains ONLY the user's photograph edge-to-edge — NO text, NO scanlines, NO elements.
export function createCardTexture(
  type: 'front' | 'back' = 'front',
  profileImgElement?: HTMLImageElement | null
): string {
  if (typeof document === 'undefined') return '';
  const W = 1024;
  const H = 1536;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Base background fill: clean dark tone matching site theme
  ctx.fillStyle = '#08090a';
  ctx.fillRect(0, 0, W, H);

  if (profileImgElement && (profileImgElement.naturalWidth > 0 || profileImgElement.width > 0)) {
    const imgW = profileImgElement.naturalWidth || profileImgElement.width || 1024;
    const imgH = profileImgElement.naturalHeight || profileImgElement.height || 1024;

    // Full-bleed photo covering the entire card edge-to-edge
    const scale = Math.max(W / imgW, H / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const dx = (W - dw) / 2;
    // Align slightly towards the top so face and shoulders are well positioned
    const dy = Math.min(0, (H - dh) * 0.15);

    ctx.drawImage(profileImgElement, dx, dy, dw, dh);
  } else {
    // Fallback if image is still loading: clean dark neutral fill
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0a0d0c');
    bg.addColorStop(0.5, '#08090a');
    bg.addColorStop(1, '#0b0e0d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
  }

  return canvas.toDataURL('image/png');
}

/**
 * Safely loads an image URL (including vector SVGs) and rasterizes it into a high-res PNG texture.
 */
export async function loadProfileTexture(imageUrl: string): Promise<string> {
  if (typeof document === 'undefined') return '';

  return new Promise((resolve) => {
    // For SVG files, fetch as blob first to prevent any browser CORS/taint quirks
    if (imageUrl.toLowerCase().endsWith('.svg')) {
      fetch(imageUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch SVG: ${res.statusText}`);
          return res.text();
        })
        .then((svgText) => {
          const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
          const objUrl = URL.createObjectURL(blob);
          const img = new Image();
          img.onload = () => {
            const texture = createCardTexture('front', img);
            URL.revokeObjectURL(objUrl);
            resolve(texture);
          };
          img.onerror = () => {
            URL.revokeObjectURL(objUrl);
            resolve(createCardTexture('front', null));
          };
          img.src = objUrl;
        })
        .catch(() => {
          // Direct image fallback
          const img = new Image();
          img.onload = () => resolve(createCardTexture('front', img));
          img.onerror = () => resolve(createCardTexture('front', null));
          img.src = imageUrl;
        });
    } else {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(createCardTexture('front', img));
      img.onerror = () => {
        const retryImg = new Image();
        retryImg.onload = () => resolve(createCardTexture('front', retryImg));
        retryImg.onerror = () => resolve(createCardTexture('front', null));
        retryImg.src = imageUrl;
      };
      img.src = imageUrl;
    }
  });
}
