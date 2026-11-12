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
};

describe("Edited placed-student photo associations", () => {
  it("matches all ten supplied filenames to the verified student names", () => {
    expect(Object.keys(svuPlacementPhotos)).toHaveLength(10);
    for (const [student, filename] of Object.entries(expected)) {
      expect(svuPlacementPhotos[student]).toContain("/placed-students/gallery/");
      expect(svuPlacementPhotos[student]?.split("/").pop()).toBe(filename.replace(".webp", ".jpg"));
    }
  });
  it("keeps K Mounika's verified record without inventing a photo", () => {
    expect(svuPlacementPhotos["K Mounika"]).toBeUndefined();
    const { container } = render(<MemoryRouter><SvuCareerRecords kind="placements" /></MemoryRouter>);
    const record = [...container.querySelectorAll(".svu-outcome")].find(row => row.querySelector("h3")?.textContent === "K Mounika");
    expect(record?.querySelector(".svu-outcome-org")?.textContent).toBe("SRAYS Solutions");
    expect(record?.querySelector(".svu-outcome-role")?.textContent).toBe("Trainee");
    expect(record?.querySelector(".svu-outcome-batch")?.textContent).toBe("Batch 2023–2025");
    expect(record?.querySelector("img")).toBeNull();
  });
});
