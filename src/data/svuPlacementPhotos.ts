import gVSumanth from "@/assets/placed-students/edited/g-v-sumanth.webp.asset.json";
import yaramLakshmiNisoka from "@/assets/placed-students/edited/yaram-lakshmi-nisoka.webp.asset.json";
import jonnalagaddaSahithya from "@/assets/placed-students/edited/jonnalagadda-sahithya.webp.asset.json";
import kVinay from "@/assets/placed-students/edited/k-vinay.webp.asset.json";
import vemuriBharathKumar from "@/assets/placed-students/edited/vemuri-bharath-kumar.webp.asset.json";
import veeravalliSriSatya from "@/assets/placed-students/edited/veeravalli-sri-satya.webp.asset.json";
import sriTulasiSatyaSakethRaprolu from "@/assets/placed-students/edited/sri-tulasi-satya-saketh-raprolu.webp.asset.json";
import muvvalaRajeswari from "@/assets/placed-students/edited/muvvala-rajeswari.webp.asset.json";
import kamatamMeghana from "@/assets/placed-students/edited/kamatam-meghana.webp.asset.json";
import muthyalaBharadwaj from "@/assets/placed-students/edited/muthyala-bharadwaj.webp.asset.json";

/** Client-supplied placed-student portraits with edited white backgrounds (12 November 2026),
 * keyed by the approved record name. K Mounika was not included in the supplied set and deliberately
 * has no invented image. */
// Resolve against the permanent asset host, not the external Cloudflare website origin.
const photoUrl = (asset: { url: string }) => new URL(asset.url, "https://exfedu.lovable.app").href;

export const svuPlacementPhotos: Record<string, string> = {
  "G V Sumanth": photoUrl(gVSumanth),
  "Yaram Lakshmi Nisoka": photoUrl(yaramLakshmiNisoka),
  "Jonnalagadda Sahithya": photoUrl(jonnalagaddaSahithya),
  "K Vinay": photoUrl(kVinay),
  "Vemuri Bharath Kumar": photoUrl(vemuriBharathKumar),
  "Veeravalli Sri Satya": photoUrl(veeravalliSriSatya),
  "Sri Tulasi Satya Saketh Raprolu": photoUrl(sriTulasiSatyaSakethRaprolu),
  "Muvvala Rajeswari": photoUrl(muvvalaRajeswari),
  "Kamatam Meghana": photoUrl(kamatamMeghana),
  "Muthyala Bharadwaj": photoUrl(muthyalaBharadwaj),
};
