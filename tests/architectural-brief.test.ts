import { test, describe } from "node:test";
import assert from "node:assert/strict";

import {
  DIOXANTRO_ARCHITECTURAL_BRIEF,
  validateBriefConfig,
  verifyPerformanceBudget,
  executeBriefVerification,
  ArchitecturalBriefError,
  PerformanceBudgetExceededError,
  AccessibilityComplianceError,
} from "../src/lib/architecturalBrief.ts";

describe("Architectural Brief: Dioxantro Landing Page — Strict Typing & Error Suite", () => {
  describe("1. Strict TypeScript Types & Complete Implementation", () => {
    test("verifies complete brief config matches specifications without any TODO stubs", () => {
      assert.equal(
        DIOXANTRO_ARCHITECTURAL_BRIEF.title,
        "Architectural Brief: Dioxantro Landing Page"
      );
      assert.equal(DIOXANTRO_ARCHITECTURAL_BRIEF.projectOverview.name, "Dioxantro");
      assert.equal(
        DIOXANTRO_ARCHITECTURAL_BRIEF.projectOverview.accessibilityLevel,
        "WCAG 2.1 AA"
      );
      assert.equal(
        DIOXANTRO_ARCHITECTURAL_BRIEF.technologyStack.framework,
        "Next.js (React)"
      );
      assert.equal(
        DIOXANTRO_ARCHITECTURAL_BRIEF.technologyStack.styling,
        "Tailwind CSS"
      );
      assert.equal(
        DIOXANTRO_ARCHITECTURAL_BRIEF.technologyStack.animations,
        "Framer Motion"
      );
    });

    test("verifies all 3 core deliverables are marked completed", () => {
      const deliverables = DIOXANTRO_ARCHITECTURAL_BRIEF.deliverables;
      assert.equal(deliverables.length, 3);
      assert.equal(deliverables[0].name, "Design System & UI Component Library");
      assert.equal(deliverables[0].status, "completed");
      assert.equal(deliverables[1].name, "Fully Responsive Front-End Codebase");
      assert.equal(deliverables[1].status, "completed");
      assert.equal(deliverables[2].name, "Technical Documentation & Handover Guide");
      assert.equal(deliverables[2].status, "completed");
    });
  });

  describe("2. Strict Validation & Happy Path Execution", () => {
    test("validates production configuration successfully", () => {
      const result = validateBriefConfig(DIOXANTRO_ARCHITECTURAL_BRIEF);
      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.title, "Architectural Brief: Dioxantro Landing Page");
      }
    });

    test("executes brief verification pipeline without errors", async () => {
      const result = await executeBriefVerification(DIOXANTRO_ARCHITECTURAL_BRIEF);
      assert.equal(result.success, true);
      if (result.success) {
        assert.equal(result.data.deliverablesCount, 3);
        assert.ok(result.data.verifiedAt);
      }
    });
  });

  describe("3. Strict Error Handling & Failure Case Boundaries", () => {
    test("rejects invalid input type with ArchitecturalBriefError", () => {
      const result = validateBriefConfig(null);
      assert.equal(result.success, false);
      if (!result.success) {
        assert.ok(result.error instanceof ArchitecturalBriefError);
        assert.equal(result.error.code, "INVALID_INPUT");
      }
    });

    test("rejects invalid title with INVALID_TITLE code", () => {
      const invalid = { ...DIOXANTRO_ARCHITECTURAL_BRIEF, title: "Incorrect Title" };
      const result = validateBriefConfig(invalid);
      assert.equal(result.success, false);
      if (!result.success) {
        assert.equal(result.error.code, "INVALID_TITLE");
        assert.equal(result.error.field, "title");
      }
    });

    test("rejects non-WCAG 2.1 AA accessibility with AccessibilityComplianceError", () => {
      const invalid = {
        ...DIOXANTRO_ARCHITECTURAL_BRIEF,
        projectOverview: {
          ...DIOXANTRO_ARCHITECTURAL_BRIEF.projectOverview,
          accessibilityLevel: "Non-Compliant",
        },
      };
      const result = validateBriefConfig(invalid);
      assert.equal(result.success, false);
      if (!result.success) {
        assert.ok(result.error instanceof AccessibilityComplianceError);
        assert.equal(result.error.code, "ACCESSIBILITY_COMPLIANCE_ERROR");
      }
    });

    test("rejects LCP exceeding 1.0s budget with PerformanceBudgetExceededError", () => {
      const slowTargets = {
        lcpSeconds: 1.85, // Exceeds < 1.0s target
        fidMs: 40,
        clsScore: 0.0,
        lighthouseScore: 95,
      };
      const result = verifyPerformanceBudget(slowTargets);
      assert.equal(result.success, false);
      if (!result.success) {
        assert.ok(result.error instanceof PerformanceBudgetExceededError);
        assert.equal(result.error.code, "PERFORMANCE_BUDGET_EXCEEDED");
        assert.equal(result.error.field, "LCP");
      }
    });

    test("rejects Lighthouse score below 90 with PerformanceBudgetExceededError", () => {
      const lowScoreTargets = {
        lcpSeconds: 0.45,
        fidMs: 40,
        clsScore: 0.0,
        lighthouseScore: 82, // Under 90 target
      };
      const result = verifyPerformanceBudget(lowScoreTargets);
      assert.equal(result.success, false);
      if (!result.success) {
        assert.ok(result.error instanceof PerformanceBudgetExceededError);
        assert.equal(result.error.code, "PERFORMANCE_BUDGET_EXCEEDED");
        assert.equal(result.error.field, "LighthouseScore");
      }
    });
  });
});

