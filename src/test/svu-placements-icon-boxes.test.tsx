import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { svuPlacementPhotos } from "@/data/svuPlacementPhotos";
import SvuCareerRecords from "@/components/site/SvuCareerRecords";

const expected = {
  "G V Sumanth": "g-v-sumanth.webp",
  "Yaram Lakshmi Nisoka": "yaram-lakshmi-nisoka.webp",
  "Jonnalagadda Sahithya": "jonnalagadda-sahithya.webp",
  "K Vinay": "k-vinay.webp",
  "Vemuri Bharath Kumar": "vemuri-bharath-kumar.webp",
  "Veeravalli Sri Satya": "veeravalli-sri-satya.webp",
  "Sri Tulasi Satya Saketh Raprolu": "sri-tulasi-satya-saketh-raprolu.webp",
  "Muvvala Rajeswari": "muvvala-rajeswari.webp",
  "Kamatam Meghana": "kamatam-meghana.webp",
  "Muthyala Bharadwaj": "muthyala-bharadwaj.webp",
  "K Mounika": "k-mounika.webp",
};

describe("Edited placed-student photo associations", () => {
  it("matches all eleven supplied filenames to the verified student names", () => {
    expect(Object.keys(svuPlacementPhotos)).toHaveLength(11);
    for (const [student, filename] of Object.entries(expected)) {
      expect(svuPlacementPhotos[student]).toContain("/placed-students/gallery/");
      expect(svuPlacementPhotos[student]?.split("/").pop()).toBe(filename.replace(".webp", ".jpg"));
    }
  });
  it("shows K Mounika's supplied portrait in her regular verified record", () => {
    const { container } = render(<MemoryRouter><SvuCareerRecords kind="placements" /></MemoryRouter>);
    const record = [...container.querySelectorAll(".svu-placement-photo-card")].find(row => row.querySelector("h3")?.textContent === "K Mounika");
    expect(record?.querySelector(".svu-outcome-org")?.textContent).toBe("SRAYS Solutions");
    expect(record?.querySelector(".svu-outcome-role")?.textContent).toBe("Trainee");
    expect(record?.querySelector(".svu-outcome-batch")?.textContent).toBe("Batch 2023–2025");
    expect(record?.querySelector("img")?.getAttribute("src")).toBe(svuPlacementPhotos["K Mounika"]);
    expect(record?.querySelector("img")?.getAttribute("alt")).toBe("Portrait of K Mounika");
    expect(container.querySelector(".svu-placement-additional")).toBeNull();
    expect(container.querySelectorAll(".svu-placement-photo-card")).toHaveLength(11);
  });
});
