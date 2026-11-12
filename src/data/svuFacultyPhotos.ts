import neelakanteswara from "@/assets/faculty/neelakanteswara-pagadala.jpg.asset.json";
import saiteja from "@/assets/faculty/saiteja-minchala.jpg.asset.json";
import teja from "@/assets/faculty/nynaru-teja.jpg.asset.json";
import sudeepthi from "@/assets/faculty/sudeepthi-mahajanam.jpg.asset.json";
import umapathi from "@/assets/faculty/santharajupalli-umapathi.jpg.asset.json";

// Explicit filename matches; never infer a portrait from a person's array position.
export const svuFacultyPhotos: Record<string, string> = {
  "Neelakanteswara Pagadala": neelakanteswara.url,
  "Saiteja Minchala": saiteja.url,
  "Nynaru Teja": teja.url,
  "Sudeepthi Mahajanam": sudeepthi.url,
  "Santharajupalli Umapathi": umapathi.url,
};