import { GifType } from "../types/gifType";

interface TheGifProps {
  Gif: GifType;
  verb: string;
}

export default function AppGif({ Gif, verb }: TheGifProps) {
  return (
    <article>
      <header>{verb} GIF</header>
      <img src={Gif.url} />
      <footer>
        <h5>Anime Name</h5>
        {Gif.anime_name}
      </footer>
    </article>
  );
}
