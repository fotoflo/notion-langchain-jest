import { ingest } from "@/scripts/ingest-files";

describe("ingest", () => {
  it("it should ingest the docs", async () => {
    const response = await ingest({ count: 1 });
    expect(response).toBeTruthy();
  }, 10000);
});
