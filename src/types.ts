export type RiskLevel = 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH';

export type ConditionId = 'cad' | 't2d' | 'alzheimers' | 'brca';

export interface ConditionInfo {
  id: ConditionId;
  name: string;
  shortName: string;
  description: string;
  prsPercentile: number;
  calculatedRisk: RiskLevel;
  riskScorePercent: number;
  primaryDriversText: string;
  synergisticImpactNote: string;
}

export interface HereditaryFactor {
  title: string;
  subtitle?: string;
  riskIncrease?: string;
  meterPercent?: number;
  details?: string;
}

export interface HealthMarker {
  label: string;
  value: string | number;
  unit?: string;
  status: 'normal' | 'borderline' | 'elevated' | 'high' | 'critical';
  statusText?: string;
}

export interface PreventionPillar {
  pillar: 'LIFESTYLE' | 'SCREENING' | 'MEDICAL';
  title: string;
  icon: string;
  items: Array<{
    id: string;
    text: string;
    completed?: boolean;
  }>;
}

export interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  assessmentVersion: string;
  dateGenerated: string;
  reportId: string;
  physician: {
    name: string;
    title: string;
    hospital: string;
    avatarUrl: string;
  };
  // Biometrics & lifestyle
  bmi: number;
  heightCm: number;
  weightKg: number;
  smokingStatus: 'never' | 'former' | 'current';
  activityLevel: 'sedentary' | 'moderate' | 'active';
  familyHistory: {
    t2d: boolean;
    cad: boolean;
    cancer: boolean;
    alzheimers: boolean;
    earlyOnsetNotes: string;
  };
  // Clinician lab markers
  ldl: number;
  hba1c: number;
  systolicBp: number;
  diastolicBp: number;
  apobApoa1Ratio: number;
  fastingGlucose: number;
  hdl: number;
  lpaTested: boolean;
  lpaValue?: number;
  medications: string;
  geneticVariants: string[];
  clinicalDiagnoses: string[];
}

export interface DrugEffect {
  id: string;
  name: string;
  drugClass: string;
  isAlternative?: boolean;
  activeSelection?: boolean;
  rows: Array<{
    targetOrgan: string;
    organIcon: string;
    indication: string;
    mechanism: string;
    sideEffectRisk: 'Rare' | 'Monitor' | 'Moderate Risk' | 'Severe Risk';
    sideEffectDetail: string;
  }>;
}

export type DrugReactionStatus = 'positive' | 'negative' | 'caution' | 'neutral';

export interface DrugAdverseEffect {
  symptom: string;
  frequency: string;
  severity: 'mild' | 'moderate' | 'severe';
  riskLevel: 'low' | 'elevated' | 'high';
  description?: string;
}

export interface DrugTestResult {
  id: string;
  name: string;
  brandName: string;
  drugClass: string;
  targetCondition: string;
  geneTested: string;
  patientGenotype: string;
  phenotype: string;
  overallReaction: DrugReactionStatus; // 'positive' (high efficacy, safe) | 'negative' (poor efficacy / high adverse risk) | 'caution'
  reactionHeadline: string;
  reactionSummary: string;
  patientExplanation: string;
  clinicalGuideline: string;
  analytics: {
    positiveEfficacyRate: number; // e.g. 84%
    negativeAdverseRate: number; // e.g. 18%
    patientCompatibilityScore: number; // 0-100
    tolerabilityPercent: number;
    therapeuticBenefit: string;
    clinicalEvidenceLevel: string;
    adverseEffects: DrugAdverseEffect[];
  };
  patientCurrentStatus: 'current-prescribed' | 'recommended-alternative' | 'contraindicated' | 'under-review';
  doctorNotes: string;
  patientActionTips: string[];
}

export type UserRole = 'doctor' | 'patient';

export interface AuthUser {
  role: UserRole;
  name: string;
  title: string;
  email: string;
  avatarUrl?: string;
  patientId?: string;
  hospital?: string;
  npiNumber?: string;
}

export type ActiveTab =
  | 'overview'
  | 'genetic'
  | 'modifiable'
  | 'prevention'
  | 'drug-testing'
  | 'input'
  | 'reports';

export type SubSection = 'overview' | 'genetic' | 'modifiable' | 'prevention' | 'drug-testing';

