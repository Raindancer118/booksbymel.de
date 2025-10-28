import NewsletterForm from "@/components/NewsletterForm";
import Seo from "@/components/Seo";

export const runtime = "edge";

export default function NewsletterPage(){
  return (
    <main className="container">
      <Seo title="Newsletter" description="Exklusive Leseproben, Termine & Neuigkeiten (Double-Opt-In)." ogImage="/images/og/default.jpg" />
      <h1>Newsletter</h1>
      <p className="muted">Zwischen den Zeilen – der monatliche Brief aus dem Schreibzimmer.</p>
      <NewsletterForm />
    </main>
  );
}
