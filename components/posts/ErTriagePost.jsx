import { H2, P, Pre } from "@/components/posts/prose";

export default function ErTriagePost() {
  return (
    <div>
      <P>
        When building intake software for emergency room triage, machine learning is often proposed
        as the default solution. When developing our Algorithmic ER Triage &amp; Resource Dispatch
        System, we deliberately avoided predictive ML for initial intake, choosing deterministic
        rule-based scoring instead.
      </P>
      <P>
        In acute clinical triage, predictability, explainability, and zero hallucination risk are
        strict requirements.
      </P>

      <H2>1. The Core Scoring Engine</H2>
      <P>Our triage score evaluates incoming patient vitals against standardized clinical thresholds:</P>
      <ul className="mb-6 list-disc space-y-2 pl-5 leading-7 text-text-muted marker:text-border">
        <li>
          <strong className="text-foreground">SpO2:</strong> Saturation below 90% immediately
          escalates the patient to CRITICAL.
        </li>
        <li>
          <strong className="text-foreground">Heart Rate:</strong> Extremes (&lt;45 bpm or &gt;130
          bpm) add significant priority weight.
        </li>
        <li>
          <strong className="text-foreground">Systolic Blood Pressure:</strong> Hypotensive crisis
          (&lt;85 mmHg) or hypertensive crisis (&gt;190 mmHg) triggers immediate alerts.
        </li>
      </ul>
      <Pre lang="javascript">{`export function calculateTriageTier(vitals) {
  let score = 0;

  // Respiratory check
  if (vitals.spo2 < 90) score += 50;
  else if (vitals.spo2 < 94) score += 20;

  // Cardiovascular check
  if (vitals.heartRate > 130 || vitals.heartRate < 45) score += 30;
  else if (vitals.heartRate > 110) score += 10;

  // Blood pressure check
  if (vitals.systolicBP < 85 || vitals.systolicBP > 190) score += 25;

  return {
    score,
    tier: score >= 50 ? 'CRITICAL' : score >= 20 ? 'URGENT' : 'STABLE',
    requiresImmediateDoctor: score >= 50
  };
}`}</Pre>
    </div>
  );
}
