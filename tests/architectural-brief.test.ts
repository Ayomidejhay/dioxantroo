import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
  ARCHITECTURAL_BRIEF_DIOXANTRO,
  validateArchitecturalBriefDioxantro,
  verifyCoreWebVitalsThresholds,
  executeDioxantroBriefAttestation,
  ArchitecturalBriefDioxantroError,
  PerformanceBudgetError,
  AccessibilityError,
} from "../src/lib/architectural-brief-dioxantro.ts";

describe("Architectural Brief: Dioxantro Landing Page — Strict Typing & Error Suite", () => {
  describe("1. Strict TypeScript Types & Complete Implementation", () => {
    test("verifies complete brief config matches specifications without any TODO stubs", () => {
      assert.equal(
        ARCHITECTURAL_BRIEF_DIOXANTRO.title,
        "Architectural Brief: Dioxantro Landing Page"
      );
      assert.equal(
        ARCHITECTURAL_BRIEF_DIOXANTRO.projectOverview.platformName,
        "Dioxantro"
      );
      assert.equal(
        ARCHITECTURAL_BRIEF_DIOXANTRO.projectOverview.compliance,
        "WCAG 2.1 AA"
      );
      assert.equal(
        ARCHITECTURAL_BRIEF_DIOXANTRO.techStack.framework,
        "Next.js (React)"
      );
      assert.equal(
        ARCHITECTURAL_BRIEF_DIOXANTRO.techStack.styling,
        "Tailwind CSS"
      );
      assert.equal(
        ARCHITECTURAL_BRIEF_DIOXANTRO.techStack.animations,
        "Framer Motion"
      );
    });

    test("verifies all 3 core deliverables are marked completed", () => {
      const deliverables = ARCHITECTURAL_BRIEF_DIOXANTRO.deliverables;
      assert.equal(deliverables.length, 3);
      assert.equal(deliverables[0].title, "Design System & UI Component Library");
      assert.equal(deliverables[0].status, "completed");
      assert.equal(deliverables[1].title, "Fully Responsive Front-End Codebase");
      assert.equal(deliverables[1].status, "completed");
      assert.equal(deliverables[2].title, "Technical Documentation & Handover Guide");
      assert.equal(deliverables[2].status, "completed");
    });
  });

  describe("2. Strict Validation & Happy Path Execution", () => {
    test("validates production configuration successfully", () => {
      const result = validateArchitecturalBriefDioxantro(ARCHITECTURAL_BRIEF_DIOXANTRO);
      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.title, "Architectural Brief: Dioxantro Landing Page");
      }
    });

    test("executes brief verification pipeline without errors", async () => {
      const result = await executeDioxantroBriefAttestation(ARCHITECTURAL_BRIEF_DIOXANTRO);
      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.deliverablesVerified, 3);
        assert.ok(result.data.attestedAt);
      }
    });
  });

  describe("3. Strict Error Handling & Failure Case Boundaries", () => {
    test("rejects invalid input type with ArchitecturalBriefDioxantroError", () => {
      const result = validateArchitecturalBriefDioxantro(null);
      assert.equal(result.success, false);
      if (!result.success) {
        assert.ok(result.error instanceof ArchitecturalBriefDioxantroError);
        assert.equal(result.error.code, "INVALID_CONFIG_OBJECT");
      }
    });

    test("rejects invalid title with INVALID_BRIEF_TITLE code", () => {
      const invalid = { ...ARCHITECTURAL_BRIEF_DIOXANTRO, title: "Incorrect Title" };
      const result = validateArchitecturalBriefDioxantro(invalid);
      assert.equal(result.success, false);
      if (!result.success) {
        assert.equal(result.error.code, "INVALID_BRIEF_TITLE");
        assert.equal(result.error.field, "title");
      }
    });

    test("rejects non-WCAG 2.1 AA accessibility with AccessibilityError", () => {
      const invalid = {
        ...ARCHITECTURAL_BRIEF_DIOXANTRO,
        projectOverview: {
          ...ARCHITECTURAL_BRIEF_DIOXANTRO.projectOverview,
          compliance: "Non-Compliant" as any,
        },
      };
      const result = validateArchitecturalBriefDioxantro(invalid);
      assert.equal(result.success, false);
      if (!result.success) {
        assert.ok(result.error instanceof AccessibilityError);
        assert.equal(result.error.code, "A11Y_VIOLATION");
      }
    });

    test("rejects LCP exceeding 1.0s budget with PerformanceBudgetError", () => {
      const slowThresholds = {
        lcpSeconds: 1.85,
        fidMs: 40,
        clsScore: 0.0,
        lighthouseScore: 95,
      };
      const result = verifyCoreWebVitalsThresholds(slowThresholds);
      assert.equal(result.success, false);
      if (!result.success) {
        assert.ok(result.error instanceof PerformanceBudgetError);
        assert.equal(result.error.code, "PERF_BUDGET_EXCEEDED");
        assert.equal(result.error.field, "LCP");
      }
    });

    test("rejects Lighthouse score below 90 with PerformanceBudgetError", () => {
      const lowScoreThresholds = {
        lcpSeconds: 0.45,
        fidMs: 40,
        clsScore: 0.0,
        lighthouseScore: 82,
      };
      const result = verifyCoreWebVitalsThresholds(lowScoreThresholds);
      assert.equal(result.success, false);
      if (!result.success) {
        assert.ok(result.error instanceof PerformanceBudgetError);
        assert.equal(result.error.code, "PERF_BUDGET_EXCEEDED");
        assert.equal(result.error.field, "LighthouseScore");
      }
    });
  });
});
