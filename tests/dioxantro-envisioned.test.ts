import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
  DIOXANTRO_ENVISIONED_SPECIFICATION,
  verifyDioxantroEnvisioned,
  DioxantroVerificationError,
} from "../src/lib/dioxantro-is-envisioned.ts";

describe("Dioxantro is envisioned as a high — End-to-End Suite", () => {
  test("matches exact required statement prefix with zero TODO placeholders", () => {
    assert.ok(
      DIOXANTRO_ENVISIONED_SPECIFICATION.statement.startsWith(
        "Dioxantro is envisioned as a high"
      )
    );
    assert.equal(
      DIOXANTRO_ENVISIONED_SPECIFICATION.statement.includes("TODO"),
      false
    );
  });

  test("verifies specification successfully on happy path", () => {
    const telemetry = verifyDioxantroEnvisioned(DIOXANTRO_ENVISIONED_SPECIFICATION);
    assert.equal(telemetry.verified, true);
    assert.equal(telemetry.statementMatched, true);
    assert.equal(telemetry.pillarsCount, 4);
    assert.ok(telemetry.timestamp);
  });

  test("rejects invalid statement prefix with DioxantroVerificationError", () => {
    const invalid = {
      ...DIOXANTRO_ENVISIONED_SPECIFICATION,
      statement: "Other statement" as any,
    };
    assert.throws(
      () => verifyDioxantroEnvisioned(invalid),
      (err: any) => {
        assert.ok(err instanceof DioxantroVerificationError);
        assert.equal(err.code, "PREFIX_MISMATCH");
        return true;
      }
    );
  });
});

