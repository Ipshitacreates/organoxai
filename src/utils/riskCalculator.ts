import { PatientData, ConditionId, RiskLevel, HealthMarker } from '../types';

export interface CalculatedRiskResult {
  riskLevel: RiskLevel;
  scorePercent: number;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentBorder: string;
  primaryDrivers: string;
  synergisticNote: string;
  healthMarkers: HealthMarker[];
}

export function computeRiskForCondition(patient: PatientData, conditionId: ConditionId): CalculatedRiskResult {
  let score = 50;

  // Polygenic & Family History Base
  if (conditionId === 'cad') {
    if (patient.familyHistory.cad) score += 15;
    if (patient.ldl > 130) score += 12;
    if (patient.ldl > 160) score += 10;
    if (patient.systolicBp >= 140) score += 12;
    if (patient.systolicBp >= 130) score += 6;
    if (patient.smokingStatus === 'current') score += 18;
    if (patient.smokingStatus === 'former') score += 6;
    if (patient.activityLevel === 'sedentary') score += 8;
    if (patient.bmi > 25) score += 5;
    if (patient.bmi > 28) score += 5;
    if (patient.apobApoa1Ratio > 0.8) score += 8;
  } else if (conditionId === 't2d') {
    if (patient.familyHistory.t2d) score += 15;
    if (patient.hba1c >= 5.7) score += 15;
    if (patient.hba1c >= 6.5) score += 20;
    if (patient.bmi > 25) score += 10;
    if (patient.bmi > 28) score += 8;
    if (patient.activityLevel === 'sedentary') score += 10;
    if (patient.fastingGlucose > 100) score += 8;
    if (patient.systolicBp >= 135) score += 5;
  } else if (conditionId === 'alzheimers') {
    if (patient.familyHistory.alzheimers) score += 18;
    if (patient.systolicBp >= 140) score += 10;
    if (patient.ldl > 140) score += 8;
    if (patient.activityLevel === 'sedentary') score += 8;
    if (patient.smokingStatus === 'current') score += 10;
  } else {
    if (patient.familyHistory.cancer) score += 25;
  }

  // Normalize score between 10 and 95
  const scorePercent = Math.min(96, Math.max(12, score));

  let riskLevel: RiskLevel = 'LOW';
  if (scorePercent >= 75) {
    riskLevel = 'HIGH';
  } else if (scorePercent >= 55) {
    riskLevel = 'ELEVATED';
  } else if (scorePercent >= 35) {
    riskLevel = 'MODERATE';
  } else {
    riskLevel = 'LOW';
  }

  // Style configurations with the new palette
  let badgeBg = 'bg-[#EDEFEE]';
  let badgeText = 'text-[#41403C]';
  let badgeBorder = 'border-[#D4D8D5]';
  let accentBorder = 'border-t-[#41403C]';

  if (riskLevel === 'HIGH') {
    badgeBg = 'bg-[#FDF1EF]';
    badgeText = 'text-[#AA210F]';
    badgeBorder = 'border-[#F5C2BA]';
    accentBorder = 'border-t-[#AA210F]';
  } else if (riskLevel === 'ELEVATED') {
    badgeBg = 'bg-[#FAF2EB]';
    badgeText = 'text-[#A65B27]';
    badgeBorder = 'border-[#EACAB2]';
    accentBorder = 'border-t-[#D08856]';
  } else if (riskLevel === 'MODERATE') {
    badgeBg = 'bg-[#EDEFEE]';
    badgeText = 'text-[#41403C]';
    badgeBorder = 'border-[#D4D8D5]';
    accentBorder = 'border-t-[#D08856]';
  }

  // Build health markers
  const healthMarkers: HealthMarker[] = [
    {
      label: 'BMI',
      value: patient.bmi.toFixed(1),
      unit: 'kg/m²',
      status: patient.bmi >= 30 ? 'critical' : patient.bmi >= 25 ? 'elevated' : 'normal',
      statusText: patient.bmi >= 30 ? 'Obese' : patient.bmi >= 25 ? '(Overweight)' : '(Optimal)',
    },
    {
      label: 'Activity Level',
      value: patient.activityLevel === 'sedentary' ? 'Sedentary lifestyle' : patient.activityLevel === 'moderate' ? 'Moderate (150m/wk)' : 'Highly Active',
      status: patient.activityLevel === 'sedentary' ? 'elevated' : 'normal',
      statusText: patient.activityLevel === 'sedentary' ? '(Sub-target)' : '(Meets Guideline)',
    },
    {
      label: 'HbA1c',
      value: `${patient.hba1c.toFixed(1)}%`,
      status: patient.hba1c >= 6.5 ? 'critical' : patient.hba1c >= 5.7 ? 'elevated' : 'normal',
      statusText: patient.hba1c >= 6.5 ? '(Diabetic)' : patient.hba1c >= 5.7 ? '(Pre-diabetic threshold)' : '(Normal)',
    },
    {
      label: 'LDL-C',
      value: `${patient.ldl} mg/dL`,
      status: patient.ldl >= 160 ? 'critical' : patient.ldl >= 130 ? 'elevated' : 'normal',
      statusText: patient.ldl >= 160 ? '(Elevated)' : patient.ldl >= 100 ? '(Borderline)' : '(Optimal)',
    },
    {
      label: 'Blood Pressure',
      value: `${patient.systolicBp}/${patient.diastolicBp} mmHg`,
      status: patient.systolicBp >= 140 ? 'critical' : patient.systolicBp >= 130 ? 'elevated' : 'normal',
      statusText: patient.systolicBp >= 140 ? '(Stage 2)' : patient.systolicBp >= 130 ? '(Stage 1)' : '(Normal)',
    },
    {
      label: 'ApoB/ApoA1 Ratio',
      value: patient.apobApoa1Ratio.toFixed(2),
      status: patient.apobApoa1Ratio >= 0.9 ? 'critical' : patient.apobApoa1Ratio >= 0.75 ? 'elevated' : 'normal',
      statusText: patient.apobApoa1Ratio >= 0.9 ? '(High Risk)' : '(Moderate)',
    },
  ];

  return {
    riskLevel,
    scorePercent,
    badgeBg,
    badgeText,
    badgeBorder,
    accentBorder,
    primaryDrivers: conditionId === 'cad'
      ? 'Interactive (Hereditary Polygenic + Modifiable Lipids/BP)'
      : conditionId === 't2d'
      ? 'Interactive (Hereditary + Modifiable Lifestyle)'
      : 'Interactive (Genomic Vulnerability + Microvascular Stressors)',
    synergisticNote: conditionId === 'cad'
      ? 'The convergence of genetic susceptibility with elevated phenotypic markers exponentially increases acute cardiovascular risk.'
      : conditionId === 't2d'
      ? 'Hereditary predisposition is currently compounded by modifiable metabolic markers (elevated BMI and pre-diabetic HbA1c).'
      : 'Vascular risk factors (sustained hypertension, elevated ApoB) significantly accelerate neurodegenerative vulnerability.',
    healthMarkers,
  };
}
