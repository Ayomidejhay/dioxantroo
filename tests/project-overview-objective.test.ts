import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
  OBJECTIVE_PILLARS,
  ProjectOverviewStateMachine,
} from "../src/lib/project-overview-objective.ts";

describe("Project Overview & Objective — End-to-End Test Suite", () => {
  describe("1. Pillar Data Integrity & Project Brief Alignment", () => {
    test("defines all 5 architectural pillars matching Section 1 of brief", () => {
      assert.equal(OBJECTIVE_PILLARS.length, 5);
      const pillarIds = OBJECTIVE_PILLARS.map((p) => p.id);
      assert.deepEqual(pillarIds, [
        "performance",
        "conversion",
        "micro-interactions",
        "accessibility",
        "scalability",
      ]);
    });

    test("verifies Performance pillar satisfies < 1.0s LCP benchmark", () => {
      const p = OBJECTIVE_PILLARS.find((p) => p.id === "performance");
      assert.ok(p, "Performance pillar must exist");
      assert.equal(p.benchmark.target, "< 1.0s LCP");
      assert.equal(p.benchmark.status, "optimal");
      assert.ok(p.summary.includes("< 1.0s Largest Contentful Paint (LCP)"));
    });

    test("verifies Accessibility pillar satisfies WCAG 2.1 AA requirement", () => {
      const p = OBJECTIVE_PILLARS.find((p) => p.id === "accessibility");
      assert.ok(p, "Accessibility pillar must exist");
      assert.equal(p.benchmark.target, "WCAG 2.1 AA");
      assert.ok(p.summary.includes("WCAG 2.1 AA"));
      assert.ok(p.specifications.some((s) => s.includes("contrast ratio exceeds 4.5:1")));
    });

    test("verifies Scalability pillar enforces Component-Driven Architecture (CDA)", () => {
      const p = OBJECTIVE_PILLARS.find((p) => p.id === "scalability");
      assert.ok(p, "Scalability pillar must exist");
      assert.ok(p.summary.includes("Atomic design structure (Atoms → Molecules → Organisms)"));
    });
  });

  describe("2. State Machine Integration: Selection & Active State", () => {
    test("initializes with default performance pillar and idle status", () => {
      const machine = new ProjectOverviewStateMachine();
      assert.equal(machine.activePillarId, "performance");
      assert.equal(machine.loadingState, "idle");
      assert.equal(machine.errorMessage, "");
      assert.equal(machine.getActivePillar().id, "performance");
    });

    test("supports responsive switching between pillars cleanly", () => {
      const machine = new ProjectOverviewStateMachine();
      machine.selectPillar("accessibility");
      assert.equal(machine.activePillarId, "accessibility");
      assert.equal(machine.getActivePillar().id, "accessibility");
      assert.equal(machine.loadingState, "idle");

      machine.selectPillar("conversion");
      assert.equal(machine.activePillarId, "conversion");
      assert.equal(machine.getActivePillar().id, "conversion");
    });
  });

  describe("3. Happy-Path Verification & Telemetry Attestation", () => {
    test("successfully transitions from idle -> loading -> success on happy-path verification", async () => {
      const machine = new ProjectOverviewStateMachine();
      machine.selectPillar("micro-interactions");

      let verifierCalled = false;
      const successVerifier = async (pillarId: string) => {
        verifierCalled = true;
        assert.equal(pillarId, "micro-interactions");
        return true;
      };

      const verificationPromise = machine.verifyPillar(successVerifier);
      assert.equal(machine.loadingState, "loading");

      const ok = await verificationPromise;
      assert.equal(ok, true);
      assert.equal(verifierCalled, true);
      assert.equal(machine.loadingState, "success");
      assert.equal(machine.errorMessage, "");
      assert.ok(machine.verifiedPillars.has("micro-interactions"));
    });
  });

  describe("4. Failure Cases, Timeouts, and Error Recovery", () => {
    test("handles telemetry rejection and transitions into error state with clear message", async () => {
      const machine = new ProjectOverviewStateMachine();
      machine.selectPillar("scalability");

      const failingVerifier = async () => false;

      const ok = await machine.verifyPillar(failingVerifier);
      assert.equal(ok, false);
      assert.equal(machine.loadingState, "error");
      assert.equal(
        machine.errorMessage,
        "Telemetry verification service returned a non-success status."
      );
      assert.ok(!machine.verifiedPillars.has("scalability"));
    });

    test("handles synthetic timeout failure and allows user to dismiss / recover", async () => {
      const machine = new ProjectOverviewStateMachine();
      machine.selectPillar("performance");

      // Verify with simulated failure flag
      const ok = await machine.verifyPillar(undefined, true);
      assert.equal(ok, false);
      assert.equal(machine.loadingState, "error");
      assert.ok(machine.errorMessage.includes("Synthetic timeout"));

      // User dismisses error
      machine.resetError();
      assert.equal(machine.loadingState, "idle");
      assert.equal(machine.errorMessage, "");
    });
  });
});
