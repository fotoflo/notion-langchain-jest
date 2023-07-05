import { ingest } from "@/scripts/ingest-files";

describe("ingest", () => {
  it("it should ingest the docs", async () => {
    const response = await ingest(2);
    expect(response).toBeTruthy();
  }, 40000);
});
