import Seo from "@/components/Seo";

export const runtime = "edge";

export default function PressePage(){
  return (
    <main className="container">
      <Seo title="Presse" description="Pressekit: Vita, Fotos, Fact Sheet & Kontakt." ogImage="/images/og/default.jpg" />
      <h1>Presse</h1>
      <ul>
        <li><a href="/images/portraits/portrait.webp" download>Autorenfoto (WebP)</a></li>
        <li><a href="/images/og/default.jpg" download>Cover – Social (JPG)</a></li>
        <li><a href="#" >Fact Sheet (PDF)</a></li>
      </ul>
    </main>
  );
}
