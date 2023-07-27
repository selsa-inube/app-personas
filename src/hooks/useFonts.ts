import { useState, useEffect } from "react";

interface IFonts {
    family: string;
    url: string;
    options: IOptions;
}

interface IOptions {
  weight: string;
  style: string;
}

export type fontsList = Array<IFonts>;

function useFonts(fonts: fontsList) {
  const [fontFaces] = useState(
    fonts.map((font) => {
      return new FontFace(font.family, `url(${font.url})`, font.options);
    })
  );

  async function loadFontFace(fontFace: FontFace ) {
    const loadedFont = await fontFace.load();
    document.fonts.add(loadedFont);
  }

  useEffect(() => {
    fontFaces.forEach((fontFace, index: number) => {
      loadFontFace(fontFace);
      if (index === 1) {
        document.body.style.fontFamily = fontFace.family;
      }
    });
  }, [fontFaces]);
}

export { useFonts };
