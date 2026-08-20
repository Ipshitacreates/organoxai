import { PatientData, DrugEffect, ConditionInfo, PreventionPillar, HereditaryFactor, HealthMarker, DrugTestResult } from '../types';

export const DOCTOR_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlDBKiOzz2rMZwEpCmo78dHjh_9C4JReN_OJ4CaT-4hLDLx_KgYc4JYM4irKica6uNXOWXZgXugIPyD0M-zyjXOYR3vNtcpTsBCFv9-Re_-6cZGK89oRobpXhw8T0Q1rPYGWQF4If5qfpzwtpI3dzI2iEXYN9ugkMvgFmoOZ0h-TrV7ciCK5DaP10NAgJK3MvgfHTVPbl9vox6EREm52gvQ3AKdhybNll6jz5k3HA6BFuUhZLKe6RnvA';
export const CLINIC_LOGO = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpU2E517h3LxQW2PPL9OD0Yn6w70Gaj11ZHA3cnnW0XHXQjHZbVEvBeLelVADCSquTy0s7lUxKZg-D32twkbg7-EWejnH7DytJaAzjv4dFFL7YLLv3q79lMSVkZ54vbiDjD2uSAGSUh60J7FzhjU9d9J2FykD-oSqeWxmcLZ_Cm2eCjHa1r5LApSeLk4JtLDqEpl86aoETaRDMRoQJCAzQ_-QCnKZ_JlDgK5bTx1KzodVJuv-_s9Ya9w';

export const INITIAL_PATIENT: PatientData = {
  id: '#882-XJ',
  name: 'Marcus Sterling',
  age: 48,
  gender: 'Male',
  dob: '1976-04-12',
  assessmentVersion: 'v4.2',
  dateGenerated: 'Oct 26, 2024',
  reportId: 'GRA-24-991A',
  physician: {
    name: 'Dr. Julian Vance, MD, FACC',
    title: 'Cardiovascular Genomics Lead',
    hospital: 'BioPulse Medical Institute',
    avatarUrl: DOCTOR_AVATAR,
  },
  bmi: 28.4,
  heightCm: 178,
  weightKg: 90,
  smokingStatus: 'never',
  activityLevel: 'sedentary',
  familyHistory: {
    t2d: true,
    cad: true,
    cancer: false,
    alzheimers: false,
    earlyOnsetNotes: 'Maternal side: CAD age < 50; Father: Early-onset MI age 45',
  },
  ldl: 160,
  hba1c: 5.7,
  systolicBp: 142,
  diastolicBp: 90,
  apobApoa1Ratio: 0.95,
  fastingGlucose: 104,
  hdl: 42,
  lpaTested: false,
  lpaValue: undefined,
  medications: 'Atorvastatin 20mg daily, Aspirin 81mg (prophylactic pending review)',
  geneticVariants: ['9p21 Locus Variant (rs10757278-G)', 'LDLR Missense Mutation (rs121908028)'],
  clinicalDiagnoses: ['T2D Risk / Impaired Fasting Glucose', 'Essential Hypertension (Stage 2)', 'Hypercholesterolemia'],
};

export const SAMPLE_PATIENTS: PatientData[] = [
  INITIAL_PATIENT,
  {
    id: '#914-KR',
    name: 'Elena Rostova',
    age: 52,
    gender: 'Female',
    dob: '1972-08-19',
    assessmentVersion: 'v4.2',
    dateGenerated: 'Nov 02, 2024',
    reportId: 'GRA-24-104B',
    physician: {
      name: 'Dr. Julian Vance, MD, FACC',
      title: 'Cardiovascular Genomics Lead',
      hospital: 'BioPulse Medical Institute',
      avatarUrl: DOCTOR_AVATAR,
    },
    bmi: 31.2,
    heightCm: 165,
    weightKg: 85,
    smokingStatus: 'former',
    activityLevel: 'moderate',
    familyHistory: {
      t2d: true,
      cad: false,
      cancer: false,
      alzheimers: false,
      earlyOnsetNotes: 'Mother diagnosed with T2D at age 42; Maternal Grandmother T2D',
    },
    ldl: 135,
    hba1c: 6.4,
    systolicBp: 138,
    diastolicBp: 86,
    apobApoa1Ratio: 0.88,
    fastingGlucose: 122,
    hdl: 38,
    lpaTested: true,
    lpaValue: 45,
    medications: 'Metformin 500mg ER daily, CoQ10 100mg',
    geneticVariants: ['TCF7L2 Variant (rs7903146-T)', 'PPARG Pro12Ala (rs1801282)'],
    clinicalDiagnoses: ['Impaired Fasting Glucose (Pre-Diabetes)', 'Metabolic Syndrome', 'Stage 1 Hypertension'],
  },
  {
    id: '#741-NP',
    name: 'Arthur Pendelton',
    age: 67,
    gender: 'Male',
    dob: '1957-11-03',
    assessmentVersion: 'v4.2',
    dateGenerated: 'Oct 30, 2024',
    reportId: 'GRA-24-883C',
    physician: {
      name: 'Dr. Julian Vance, MD, FACC',
      title: 'Cardiovascular Genomics Lead',
      hospital: 'BioPulse Medical Institute',
      avatarUrl: DOCTOR_AVATAR,
    },
    bmi: 24.8,
    heightCm: 175,
    weightKg: 76,
    smokingStatus: 'never',
    activityLevel: 'active',
    familyHistory: {
      t2d: false,
      cad: true,
      cancer: false,
      alzheimers: true,
      earlyOnsetNotes: 'Paternal Aunt late-onset dementia (age 72)',
    },
    ldl: 110,
    hba1c: 5.4,
    systolicBp: 128,
    diastolicBp: 80,
    apobApoa1Ratio: 0.72,
    fastingGlucose: 92,
    hdl: 54,
    lpaTested: true,
    lpaValue: 28,
    medications: 'Rosuvastatin 10mg daily, Omega-3 Fish Oil 2g',
    geneticVariants: ['ApoE ε3/ε4 Heterozygous', 'CLU Variant (rs11136000)'],
    clinicalDiagnoses: ['ApoE4 Carrier', 'Mild Cognitive Baseline Stability', 'Controlled Lipids'],
  },
];

export const CONDITIONS_DATA: Record<string, {
  condition: ConditionInfo;
  hereditaryFactors: HereditaryFactor[];
  preventionPillars: PreventionPillar[];
}> = {
  cad: {
    condition: {
      id: 'cad',
      name: 'Coronary Artery Disease (CAD)',
      shortName: 'CAD',
      description: 'Comprehensive Genomic & Clinical Risk Synthesis',
      prsPercentile: 92,
      calculatedRisk: 'HIGH',
      riskScorePercent: 78,
      primaryDriversText: 'Interactive (Hereditary Polygenic + Modifiable Lipids/BP)',
      synergisticImpactNote: 'The convergence of genetic susceptibility with elevated phenotypic markers exponentially increases acute cardiovascular risk.',
    },
    hereditaryFactors: [
      {
        title: '9p21 Locus Variant',
        subtitle: 'rs10757278 homozygous risk allele (endothelial dysfunction)',
        riskIncrease: '+24% Risk',
        meterPercent: 85,
        details: 'Early-onset family history (Maternal side < 50, Father MI at 45)',
      },
      {
        title: 'LDLR Missense Mutation',
        subtitle: 'Impaired hepatic clearance of ApoB-containing lipoproteins',
        riskIncrease: '+18% Risk',
        meterPercent: 70,
        details: 'High Polygenic Risk Score (PRS) in 92nd Percentile',
      },
    ],
    preventionPillars: [
      {
        pillar: 'LIFESTYLE',
        title: 'Pillar A: Lifestyle',
        icon: 'directions_run',
        items: [
          { id: 'cad-l1', text: 'Strict adherence to Mediterranean / DASH diet profile to reduce inflammatory markers.' },
          { id: 'cad-l2', text: 'Minimum 150 minutes of moderate aerobic / Zone 2 cardio weekly.' },
          { id: 'cad-l3', text: 'Target BMI reduction to < 25 kg/m² and daily stress/cortisol management.' },
        ],
      },
      {
        pillar: 'SCREENING',
        title: 'Pillar B: Screening',
        icon: 'screen_search_desktop',
        items: [
          { id: 'cad-s1', text: 'Schedule annual Coronary Artery Calcium (CAC) scan immediately.' },
          { id: 'cad-s2', text: 'Bi-annual comprehensive lipid panel & ApoB evaluations.' },
          { id: 'cad-s3', text: 'Monthly home blood pressure monitoring with clinical logging.' },
        ],
      },
      {
        pillar: 'MEDICAL',
        title: 'Pillar C: Medical',
        icon: 'medication',
        items: [
          { id: 'cad-m1', text: 'Initiate high-intensity statin therapy (e.g. Atorvastatin 40-80mg daily).' },
          { id: 'cad-m2', text: 'Consider PCSK9 inhibitor if LDL-C targets (<70 mg/dL) not achieved in 3 months.' },
          { id: 'cad-m3', text: 'Evaluate appropriateness of low-dose aspirin prophylaxis and cardiology consult.' },
        ],
      },
    ],
  },
  t2d: {
    condition: {
      id: 't2d',
      name: 'Type 2 Diabetes Assessment',
      shortName: 'Type 2 Diabetes',
      description: 'Metabolic & Polygenic Glycemic Breakdown',
      prsPercentile: 74,
      calculatedRisk: 'ELEVATED',
      riskScorePercent: 65,
      primaryDriversText: 'Interactive (Hereditary + Modifiable Lifestyle)',
      synergisticImpactNote: 'Hereditary predisposition is currently compounded by modifiable metabolic markers (BMI 28.4, Sedentary activity).',
    },
    hereditaryFactors: [
      {
        title: 'TCF7L2 Variant & KCNJ11',
        subtitle: 'Altered beta-cell function & impaired insulin secretion kinetics',
        riskIncrease: '+21% Risk',
        meterPercent: 68,
        details: 'Family history indicates 1st-degree relative with early onset',
      },
      {
        title: 'PPARG Pro12Ala Sensitivity',
        subtitle: 'Increased susceptibility to carbohydrate surplus & visceral adiposity',
        riskIncrease: '+14% Risk',
        meterPercent: 55,
        details: 'Genetic markers show heightened sensitivity to refined carbohydrates',
      },
    ],
    preventionPillars: [
      {
        pillar: 'LIFESTYLE',
        title: 'Pillar A: Lifestyle',
        icon: 'restaurant',
        items: [
          { id: 't2d-l1', text: 'Strict Mediterranean diet adherence with low glycemic index emphasis.' },
          { id: 't2d-l2', text: '150 min/week Zone 2 cardio + 2x weekly resistance training.' },
          { id: 't2d-l3', text: 'Post-prandial 10-minute active walks to enhance GLUT4 translocation.' },
        ],
      },
      {
        pillar: 'SCREENING',
        title: 'Pillar B: Screening',
        icon: 'biotech',
        items: [
          { id: 't2d-s1', text: 'HbA1c testing every 6 months (target < 5.7%).' },
          { id: 't2d-s2', text: 'Annual Retinopathy and microalbuminuria screening (starting age 45).' },
          { id: 't2d-s3', text: 'Continuous Glucose Monitoring (CGM) 14-day discovery protocol.' },
        ],
      },
      {
        pillar: 'MEDICAL',
        title: 'Pillar C: Medical',
        icon: 'local_hospital',
        items: [
          { id: 't2d-m1', text: 'Consult endocrinologist for personalized glycemic threshold plan.' },
          { id: 't2d-m2', text: 'Discuss Metformin prophylaxis (500mg ER) given pre-diabetic HbA1c 5.7%.' },
          { id: 't2d-m3', text: 'Assess SGLT2i / GLP-1 RA dual protection for cardiovascular risk.' },
        ],
      },
    ],
  },
  alzheimers: {
    condition: {
      id: 'alzheimers',
      name: 'Late-Onset Alzheimer’s Risk (ApoE Stratification)',
      shortName: 'Neurodegeneration',
      description: 'ApoE4 Allele Status & Neurovascular Phenotype',
      prsPercentile: 60,
      calculatedRisk: 'MODERATE',
      riskScorePercent: 48,
      primaryDriversText: 'Moderate Polygenic Susceptibility + Vascular Risk Factors',
      synergisticImpactNote: 'Vascular health (hypertension, elevated LDL) is the primary modifiable contributor to long-term neurocognitive preservation.',
    },
    hereditaryFactors: [
      {
        title: 'ApoE ε3/ε4 Heterozygous',
        subtitle: 'Intermediate clearance rate of amyloid-beta oligomers',
        riskIncrease: '+12% Lifetime',
        meterPercent: 50,
        details: '1 copy of ApoE4 detected (intermediate genetic vulnerability)',
      },
      {
        title: 'CLU / CR1 Neuroinflammatory Polygenic Score',
        subtitle: 'Microglial activation homeostasis baseline',
        riskIncrease: '+6% Risk',
        meterPercent: 40,
        details: 'PRS Score in 60th Percentile',
      },
    ],
    preventionPillars: [
      {
        pillar: 'LIFESTYLE',
        title: 'Pillar A: Lifestyle',
        icon: 'psychology',
        items: [
          { id: 'ad-l1', text: 'MIND Diet protocol with high intake of polyphenol-rich berries & leafy greens.' },
          { id: 'ad-l2', text: 'Optimized sleep hygiene targeting >7.5h with slow-wave sleep enhancement.' },
          { id: 'ad-l3', text: 'Cognitive reserve enrichment (dual-task training, novel language/instrument).' },
        ],
      },
      {
        pillar: 'SCREENING',
        title: 'Pillar B: Screening',
        icon: 'biotech',
        items: [
          { id: 'ad-s1', text: 'Baseline MoCA (Montreal Cognitive Assessment) neurocognitive scoring.' },
          { id: 'ad-s2', text: 'Plasma p-tau217 / p-tau181 biomarker screening at 5-year intervals.' },
          { id: 'ad-s3', text: 'Brain MRI volumetric assessment at age 55.' },
        ],
      },
      {
        pillar: 'MEDICAL',
        title: 'Pillar C: Medical',
        icon: 'medication',
        items: [
          { id: 'ad-m1', text: 'Aggressive systolic BP control (target < 120 mmHg) for microvascular protection.' },
          { id: 'ad-m2', text: 'High-purity EPA/DHA Omega-3 fatty acid supplementation (2g/day).' },
          { id: 'ad-m3', text: 'Neurology consult for baseline neurovascular risk profiling.' },
        ],
      },
    ],
  },
};

export const SAMPLE_DRUG_TEST_RESULTS: Record<string, DrugTestResult[]> = {
  '#882-XJ': [
    {
      id: 'dt-atorvastatin',
      name: 'Atorvastatin',
      brandName: 'Lipitor',
      drugClass: 'HMG-CoA Reductase Inhibitor (Statin)',
      targetCondition: 'Cardiovascular Risk / Hypercholesterolemia',
      geneTested: 'SLCO1B1 (Solute Carrier Organic Anion Transporter 1B1)',
      patientGenotype: 'rs4149056 (c.521T>C) — Heterozygous T/C (*1/*5)',
      phenotype: 'Intermediate Transporter Function (Decreased Hepatic Clearance)',
      overallReaction: 'negative',
      reactionHeadline: 'Negative Tolerability Reaction — Elevated Myopathy & Statin-Associated Muscle Symptoms (SAMS)',
      reactionSummary: 'Genotype indicates impaired OATP1B1 hepatic uptake transporter activity, leading to ~160% elevated systemic plasma concentrations of active atorvastatin acid and a 3.8x increased risk of statin-induced myotoxicity.',
      patientExplanation: 'Your liver takes longer to process Lipitor than average, causing the medicine to stay in your bloodstream at higher levels. This significantly increases the risk of muscle soreness, fatigue, or cramping.',
      clinicalGuideline: 'CPIC Guideline Level 1A: For SLCO1B1 intermediate function with high CAD risk, consider capping Atorvastatin at ≤20mg daily, or switch to Rosuvastatin / Pravastatin which are less dependent on SLCO1B1 transport. Combine with CoQ10 100-200mg or PCSK9i.',
      analytics: {
        positiveEfficacyRate: 78.4,
        negativeAdverseRate: 22.8,
        patientCompatibilityScore: 42,
        tolerabilityPercent: 54,
        therapeuticBenefit: 'Achieves ~42% LDL-C reduction at 20mg, but increased myalgia risk impedes long-term adherence.',
        clinicalEvidenceLevel: 'CPIC Level 1A / FDA Black Box PGx Labeling',
        adverseEffects: [
          { symptom: 'Statin-Associated Myalgia & Cramps', frequency: '22.8%', severity: 'moderate', riskLevel: 'high', description: 'Proximal symmetrical muscle pain in quadriceps and deltoids without marked CK elevation.' },
          { symptom: 'Elevated Serum Creatine Kinase (CK)', frequency: '3.1%', severity: 'severe', riskLevel: 'elevated', description: 'Rare myopathy progression if unmonitored.' },
          { symptom: 'Hepatic Transaminase Elevation (ALT/AST)', frequency: '4.2%', severity: 'mild', riskLevel: 'low', description: 'Benign transient liver enzyme rise.' }
        ]
      },
      patientCurrentStatus: 'current-prescribed',
      doctorNotes: 'Patient currently taking 20mg daily. Recommend baseline CK check. Consider switching to Rosuvastatin 10-20mg or initiating PCSK9i (Evolocumab) due to 92nd percentile CAD PRS.',
      patientActionTips: [
        'Pay attention to unusual, unexplained muscle tightness or soreness in your calves or shoulders.',
        'Do not stop your statin abruptly without consulting Dr. Vance.',
        'Discuss switching to Rosuvastatin or adding CoQ10 at your next follow-up.'
      ]
    },
    {
      id: 'dt-clopidogrel',
      name: 'Clopidogrel',
      brandName: 'Plavix',
      drugClass: 'P2Y12 Platelet Inhibitor (Antiplatelet)',
      targetCondition: 'Arterial Thrombosis & CAD Secondary Prophylaxis',
      geneTested: 'CYP2C19 (Cytochrome P450 2C19)',
      patientGenotype: 'rs4244285 (*2 Loss-of-Function Allele) — *1/*2 Diplotype',
      phenotype: 'Intermediate CYP2C19 Metabolizer (Suboptimal Prodrug Activation)',
      overallReaction: 'negative',
      reactionHeadline: 'Negative Efficacy Reaction — Diminished Antiplatelet Response & Residual Ischemic Vulnerability',
      reactionSummary: 'Clopidogrel requires two-step CYP2C19 bioactivation into its active thiol metabolite. The *1/*2 intermediate diplotype results in ~30% reduced platelet inhibition and significant residual high on-treatment platelet reactivity (HTPR).',
      patientExplanation: 'Your liver enzymes do not activate Plavix efficiently. As a result, the medication will not provide enough protection against blood clots compared to other patients.',
      clinicalGuideline: 'CPIC Guideline Level 1A: For CYP2C19 Intermediate and Poor Metabolizers undergoing ACS or high-risk primary/secondary CAD prevention, avoid Clopidogrel. Prescribe alternative P2Y12 inhibitors such as Ticagrelor (90mg BID) or Prasugrel (10mg QD) which do not depend on CYP2C19 bioactivation.',
      analytics: {
        positiveEfficacyRate: 48.2,
        negativeAdverseRate: 28.5,
        patientCompatibilityScore: 35,
        tolerabilityPercent: 82,
        therapeuticBenefit: 'Inadequate platelet inhibition; 2.4-fold higher hazard ratio for stent thrombosis and recurrent ischemic events.',
        clinicalEvidenceLevel: 'CPIC Level 1A / FDA Boxed Warning',
        adverseEffects: [
          { symptom: 'Subtherapeutic Platelet Inhibition (Treatment Failure)', frequency: '28.5%', severity: 'severe', riskLevel: 'high', description: 'Residual platelet aggregation causing thrombotic risk.' },
          { symptom: 'Minor Bleeding / Bruising', frequency: '8.4%', severity: 'mild', riskLevel: 'low', description: 'Gingival bleeding or ecchymosis.' }
        ]
      },
      patientCurrentStatus: 'contraindicated',
      doctorNotes: 'Contraindicated for long-term monotherapy due to CYP2C19 *1/*2 allele. If antiplatelet therapy is indicated post-coronary CTA/calcium scoring, prescribe Ticagrelor 90mg BID.',
      patientActionTips: [
        'Plavix is not recommended for your specific genetic profile.',
        'If a blood-thinner is needed, your doctor will select Ticagrelor (Brilinta) instead.'
      ]
    },
    {
      id: 'dt-rosuvastatin',
      name: 'Rosuvastatin',
      brandName: 'Crestor',
      drugClass: 'Hydrophilic Statin (HMG-CoA Reductase Inhibitor)',
      targetCondition: 'High-Intensity Lipid Lowering & Plaque Regression',
      geneTested: 'ABCG2 (BCRP Transporter) & SLCO1B1',
      patientGenotype: 'ABCG2 rs2231142 (c.421C>A) C/C Wild-Type',
      phenotype: 'Normal BCRP Efflux & Low SAMS Susceptibility',
      overallReaction: 'positive',
      reactionHeadline: 'Highly Positive Reaction — Superior Efficacy with Minimal Muscle Toxicity Risk',
      reactionSummary: 'Rosuvastatin is hydrophilic and cleared primarily via biliary secretion and renal filtration without heavy reliance on the impaired SLCO1B1 pathway. Demonstrates exceptional 52-58% LDL-C reduction with low myotoxicity rates (<3%).',
      patientExplanation: 'Crestor is a great genetic match for your body. It effectively clears bad cholesterol with a very low likelihood of the muscle aches associated with other statins.',
      clinicalGuideline: 'ACC/AHA & CPIC Guideline: First-line precision alternative for patients with SLCO1B1 variants experiencing atorvastatin sensitivity. Start at 10-20mg once daily.',
      analytics: {
        positiveEfficacyRate: 92.4,
        negativeAdverseRate: 3.8,
        patientCompatibilityScore: 94,
        tolerabilityPercent: 96,
        therapeuticBenefit: 'High-intensity reduction of ApoB and LDL-C to < 70 mg/dL target; robust plaque stabilizing profile.',
        clinicalEvidenceLevel: 'CPIC Level 1A / Level A Evidence',
        adverseEffects: [
          { symptom: 'Mild GI Upset', frequency: '3.8%', severity: 'mild', riskLevel: 'low', description: 'Transient abdominal bloating during first 2 weeks.' },
          { symptom: 'Myalgia Risk', frequency: '2.4%', severity: 'mild', riskLevel: 'low', description: 'Significantly lower risk than lipophilic statins.' }
        ]
      },
      patientCurrentStatus: 'recommended-alternative',
      doctorNotes: 'Ideal high-intensity statin replacement for Marcus. Prescribe Rosuvastatin 10mg daily, titrate to 20mg based on 8-week ApoB response.',
      patientActionTips: [
        'Take once daily with or without food, preferably at bedtime.',
        'Expected to lower your LDL cholesterol safely into the optimal green zone.'
      ]
    },
    {
      id: 'dt-evolocumab',
      name: 'Evolocumab',
      brandName: 'Repatha',
      drugClass: 'PCSK9 Monoclonal Antibody (Biologic)',
      targetCondition: 'Refractory LDL-C & Elevated Lipoprotein(a)',
      geneTested: 'PCSK9 (Proprotein Convertase Subtilisin/Kexin Type 9)',
      patientGenotype: 'Wild-Type PCSK9 High-Expressor Phenotype',
      phenotype: 'Optimal Monoclonal Binding Target Clearance',
      overallReaction: 'positive',
      reactionHeadline: 'Highly Positive Efficacy — Dramatic 60% LDL Reduction & 28% Lp(a) Attenuation',
      reactionSummary: 'By specifically targeting circulating PCSK9 proteins, Evolocumab prevents LDLR degradation. In patients with the 9p21 risk allele and high baseline ApoB, Evolocumab yields potent regression of coronary atheroma with virtually zero drug-drug pharmacokinetic interactions.',
      patientExplanation: 'This targeted injectable therapy works exceptionally well with your genetics to sweep away stubborn plaque-forming cholesterol particles from your arteries.',
      clinicalGuideline: 'ACC Expert Consensus 2023: Recommended as adjunctive non-statin therapy for primary prevention in very high-risk patients with baseline LDL ≥ 140 mg/dL and high genetic risk.',
      analytics: {
        positiveEfficacyRate: 96.2,
        negativeAdverseRate: 2.1,
        patientCompatibilityScore: 98,
        tolerabilityPercent: 97,
        therapeuticBenefit: 'Lowers LDL-C down to 35-50 mg/dL; simultaneously reduces atherogenic Lp(a) by 25-30%.',
        clinicalEvidenceLevel: 'FOURIER Trial Evidence / Level 1A',
        adverseEffects: [
          { symptom: 'Local Injection Site Erythema', frequency: '2.1%', severity: 'mild', riskLevel: 'low', description: 'Transient redness at subcutaneous injection site.' },
          { symptom: 'Upper Respiratory Symptoms', frequency: '1.8%', severity: 'mild', riskLevel: 'low', description: 'Self-limiting mild nasal congestion.' }
        ]
      },
      patientCurrentStatus: 'recommended-alternative',
      doctorNotes: 'Strong candidate for PCSK9i addition if LDL remains >70 mg/dL post-Rosuvastatin optimization. High benefit due to 9p21.3 risk allele.',
      patientActionTips: [
        'Administered as a simple pre-filled pen injection once every 2 weeks or once a month.',
        'Requires refrigeration storage at 36°F to 46°F.'
      ]
    },
    {
      id: 'dt-metformin',
      name: 'Metformin',
      brandName: 'Glucophage XR',
      drugClass: 'Biguanide (AMPK Activator)',
      targetCondition: 'Impaired Fasting Glucose & Pre-Diabetes Prevention',
      geneTested: 'SLC22A1 (OCT1 Transporter) & ATM rs11212617',
      patientGenotype: 'SLC22A1 *1/*1 (Normal OCT1) & ATM C/A Carrier',
      phenotype: 'High Glycemic Responder with Intact Hepatic Uptake',
      overallReaction: 'positive',
      reactionHeadline: 'Positive Reaction — Strong Glycemic Sensitization & Visceral Fat Reduction',
      reactionSummary: 'Possesses two fully functional OCT1 alleles ensuring optimal hepatic uptake. ATM kinase variant indicates enhanced AMPK activation, predicting superior reduction in fasting plasma glucose (-18 mg/dL) and HbA1c (-0.8% to -1.1%).',
      patientExplanation: 'Your liver cells easily absorb Metformin and respond strongly, helping regulate your blood sugar and prevent type 2 diabetes naturally.',
      clinicalGuideline: 'ADA Standards of Care: Prophylactic Metformin ER (500-1000mg) recommended in pre-diabetic patients with BMI > 28 and multiple cardiometabolic risk drivers.',
      analytics: {
        positiveEfficacyRate: 88.6,
        negativeAdverseRate: 5.2,
        patientCompatibilityScore: 91,
        tolerabilityPercent: 92,
        therapeuticBenefit: 'Suppresses hepatic gluconeogenesis without hypoglycemia risk; favorable weight reduction trajectory.',
        clinicalEvidenceLevel: 'DPP / ADA Level A Evidence',
        adverseEffects: [
          { symptom: 'Mild Gastrointestinal Upset', frequency: '5.2%', severity: 'mild', riskLevel: 'low', description: 'Minimized using Extended-Release (XR) formulation with dinner.' },
          { symptom: 'Vitamin B12 Malabsorption', frequency: '2.6%', severity: 'mild', riskLevel: 'low', description: 'Monitor serum B12 annually.' }
        ]
      },
      patientCurrentStatus: 'recommended-alternative',
      doctorNotes: 'Initiate Metformin 500mg XR with evening meal to protect against progression from 104 mg/dL fasting glucose. High genetic responder.',
      patientActionTips: [
        'Take with your largest meal of the day to ensure optimal absorption and comfort.',
        'Pairs synergistically with Mediterranean diet and Zone 2 aerobic exercise.'
      ]
    },
    {
      id: 'dt-lisinopril',
      name: 'Lisinopril',
      brandName: 'Zestril',
      drugClass: 'ACE Inhibitor',
      targetCondition: 'Essential Stage 2 Hypertension & Renal Protection',
      geneTested: 'ACE (I/D Polymorphism) & BDKRB1 (Bradykinin Receptor)',
      patientGenotype: 'ACE I/D Heterozygote & BDKRB1 -699G>C',
      phenotype: 'Intermediate Hemodynamic Response / Moderate Cough Susceptibility',
      overallReaction: 'caution',
      reactionHeadline: 'Moderate / Monitored Reaction — Effective BP Lowering with 14% Dry Cough Risk',
      reactionSummary: 'Provides effective angiotensin-converting enzyme inhibition, reducing systemic vascular resistance. However, BDKRB1 variant increases local airway bradykinin sensitivity, predisposing to persistent dry cough in ~14% of patients.',
      patientExplanation: 'This medicine effectively lowers your blood pressure, but there is a moderate chance of developing a dry tickling cough. If this happens, an easy alternative (like Telmisartan) is available.',
      clinicalGuideline: 'AHA/ACC Hypertension Guidelines: Target SBP < 130 mmHg. If dry cough emerges, transition seamlessly to an ARB (e.g. Telmisartan 40mg or Losartan 50mg) which has zero bradykinin accumulation.',
      analytics: {
        positiveEfficacyRate: 77.5,
        negativeAdverseRate: 14.2,
        patientCompatibilityScore: 68,
        tolerabilityPercent: 78,
        therapeuticBenefit: 'Estimated systolic reduction of 12-16 mmHg and diastolic reduction of 8-10 mmHg.',
        clinicalEvidenceLevel: 'AHA/ACC Class 1A',
        adverseEffects: [
          { symptom: 'Persistent Dry Cough', frequency: '14.2%', severity: 'moderate', riskLevel: 'elevated', description: 'Bradykinin-mediated cough; completely reversible upon cessation.' },
          { symptom: 'First-Dose Dizziness / Hypotension', frequency: '3.8%', severity: 'mild', riskLevel: 'low', description: 'Take first dose before bedtime.' },
          { symptom: 'Hyperkalemia', frequency: '1.9%', severity: 'moderate', riskLevel: 'low', description: 'Monitor serum potassium and creatinine at 4 weeks.' }
        ]
      },
      patientCurrentStatus: 'under-review',
      doctorNotes: 'Check BP log after 2 weeks. If dry cough develops, immediately substitute with Telmisartan 40mg daily.',
      patientActionTips: [
        'Check your home blood pressure cuff in the morning and evening.',
        'If you notice a dry, nagging cough that won’t go away, notify Dr. Vance to switch to an ARB pill.'
      ]
    }
  ],
  '#914-KR': [
    {
      id: 'dt-elena-metformin',
      name: 'Metformin',
      brandName: 'Glucophage XR',
      drugClass: 'Biguanide (AMPK Activator)',
      targetCondition: 'Impaired Fasting Glucose (Pre-Diabetes) & Metabolic Syndrome',
      geneTested: 'SLC22A1 (OCT1 Transporter)',
      patientGenotype: 'SLC22A1 *1/*1 Wild-Type',
      phenotype: 'Normal Hepatic Uptake / Optimal Glycemic Response',
      overallReaction: 'positive',
      reactionHeadline: 'Highly Positive Efficacy — 89% Glycemic Control Rate',
      reactionSummary: 'Optimal hepatic uptake via wild-type OCT1. Clinical trials show robust HbA1c drop of ~1.2% with excellent GI tolerability when taken with food.',
      patientExplanation: 'Elena’s body metabolizes Metformin efficiently, providing high protection against developing full type 2 diabetes.',
      clinicalGuideline: 'ADA Guidelines: Continue 500mg ER daily; increase to 1000mg ER if HbA1c remains > 6.0% after 3 months.',
      analytics: {
        positiveEfficacyRate: 89.2,
        negativeAdverseRate: 4.1,
        patientCompatibilityScore: 95,
        tolerabilityPercent: 94,
        therapeuticBenefit: 'Suppresses liver glucose production and improves muscle insulin sensitivity.',
        clinicalEvidenceLevel: 'Level 1A Evidence',
        adverseEffects: [
          { symptom: 'Mild Nausea', frequency: '4.1%', severity: 'mild', riskLevel: 'low', description: 'Transient, prevented by taking with food.' }
        ]
      },
      patientCurrentStatus: 'current-prescribed',
      doctorNotes: 'Excellent metabolic response. Continue 500mg ER daily.',
      patientActionTips: ['Take with your evening meal.']
    },
    {
      id: 'dt-elena-glp1',
      name: 'Semaglutide',
      brandName: 'Ozempic / Wegovy',
      drugClass: 'GLP-1 Receptor Agonist',
      targetCondition: 'Weight Loss & Glycemic Optimization',
      geneTested: 'GLP1R (Glucagon-Like Peptide-1 Receptor)',
      patientGenotype: 'GLP1R rs10305492 G/G High Affinity',
      phenotype: 'High GLP-1 Receptor Sensitivity',
      overallReaction: 'positive',
      reactionHeadline: 'Highly Positive Reaction — Superior Weight Loss & Beta-Cell Preservation',
      reactionSummary: 'High affinity GLP1R genotype indicates enhanced satiety signaling, delayed gastric emptying, and ~14-16% body weight reduction potential.',
      patientExplanation: 'Your genetic markers show high sensitivity to GLP-1 medications, predicting great success in weight management and blood sugar stabilization.',
      clinicalGuideline: 'ADA/EASD Consensus: Consider initiating 0.25mg weekly subcutaneous, titrating to 0.5mg-1.0mg as tolerated.',
      analytics: {
        positiveEfficacyRate: 94.0,
        negativeAdverseRate: 7.2,
        patientCompatibilityScore: 92,
        tolerabilityPercent: 88,
        therapeuticBenefit: 'Significant cardiovascular and metabolic protection.',
        clinicalEvidenceLevel: 'SELECT Trial / Level 1A',
        adverseEffects: [
          { symptom: 'Mild Nausea / Constipation', frequency: '7.2%', severity: 'mild', riskLevel: 'low', description: 'Manage with hydration and smaller meal portions.' }
        ]
      },
      patientCurrentStatus: 'recommended-alternative',
      doctorNotes: 'Ideal candidate for GLP-1 RA addition if BMI remains > 30.',
      patientActionTips: ['Stay well hydrated and eat smaller, high-protein meals.']
    }
  ],
  '#741-NP': [
    {
      id: 'dt-arthur-rosuvastatin',
      name: 'Rosuvastatin',
      brandName: 'Crestor',
      drugClass: 'Statin',
      targetCondition: 'Controlled Lipids / Neurovascular Protection',
      geneTested: 'SLCO1B1 & ApoE ε3/ε4',
      patientGenotype: 'SLCO1B1 *1/*1 Normal Function',
      phenotype: 'Normal Clearance / Good Neurovascular Tolerability',
      overallReaction: 'positive',
      reactionHeadline: 'Positive Reaction — Stable Lipid Profile with Low Neurovascular Interaction',
      reactionSummary: 'Maintains optimal cerebral microvascular blood flow and reduces systemic inflammatory markers without interacting negatively with ApoE ε3/ε4 status.',
      patientExplanation: 'Arthur’s body clears Crestor smoothly, helping preserve cognitive microvascular health without unwanted muscle side effects.',
      clinicalGuideline: 'Maintain current 10mg daily dose.',
      analytics: {
        positiveEfficacyRate: 91.0,
        negativeAdverseRate: 2.8,
        patientCompatibilityScore: 96,
        tolerabilityPercent: 97,
        therapeuticBenefit: 'Keeps LDL < 100 mg/dL, supporting brain vascular health.',
        clinicalEvidenceLevel: 'Level 1A Evidence',
        adverseEffects: [
          { symptom: 'Minor fatigue', frequency: '2.8%', severity: 'mild', riskLevel: 'low', description: 'Rare and transient.' }
        ]
      },
      patientCurrentStatus: 'current-prescribed',
      doctorNotes: 'Lipid panel well controlled at 10mg. Continue current regimen.',
      patientActionTips: ['Continue taking nightly.']
    }
  ]
};

export const DRUG_DATA: DrugEffect[] = [

  {
    id: 'atorvastatin',
    name: 'Atorvastatin',
    drugClass: 'Statin Class (HMG-CoA Reductase Inhibitor)',
    activeSelection: true,
    rows: [
      {
        targetOrgan: 'Cardiovascular System',
        organIcon: 'monitor_heart',
        indication: 'Hypercholesterolemia, Primary Prevention of CVD',
        mechanism: 'Inhibits HMG-CoA reductase, reducing hepatic cholesterol synthesis and upregulating LDL receptors.',
        sideEffectRisk: 'Moderate Risk',
        sideEffectDetail: 'Myopathy, Rhabdomyolysis (rare, check SLCO1B1 genotype)',
      },
      {
        targetOrgan: 'Liver',
        organIcon: 'local_hospital',
        indication: 'Lipid Regulation',
        mechanism: 'Primary site of action; decreases VLDL production and circulating ApoB particles.',
        sideEffectRisk: 'Monitor',
        sideEffectDetail: 'Elevated hepatic transaminases (ALT/AST monitoring at 12 wks)',
      },
      {
        targetOrgan: 'Nervous System',
        organIcon: 'psychology',
        indication: 'Stroke Prevention & Plaque Stabilization',
        mechanism: 'Pleiotropic effects including plaque fibrous cap stabilization and endothelial nitric oxide synthesis.',
        sideEffectRisk: 'Rare',
        sideEffectDetail: 'Reversible mild cognitive fog in <1.2% of patients',
      },
      {
        targetOrgan: 'Musculoskeletal',
        organIcon: 'fitness_center',
        indication: 'Vascular Wall Protection',
        mechanism: 'Reduces vascular smooth muscle cell proliferation and circulating hs-CRP inflammatory load.',
        sideEffectRisk: 'Moderate Risk',
        sideEffectDetail: 'Myalgia reported in 5-9% without CK elevation; CoQ10 adjunct may alleviate symptoms',
      },
    ],
  },
  {
    id: 'metformin',
    name: 'Metformin',
    drugClass: 'Biguanide (AMPK Activator)',
    isAlternative: true,
    rows: [
      {
        targetOrgan: 'Liver',
        organIcon: 'local_hospital',
        indication: 'Hepatic Gluconeogenesis Suppression',
        mechanism: 'Activates AMP-activated protein kinase (AMPK) in hepatocytes, reducing glucose output.',
        sideEffectRisk: 'Monitor',
        sideEffectDetail: 'Lactic acidosis (very rare in normal renal function eGFR > 45)',
      },
      {
        targetOrgan: 'Gastrointestinal Tract',
        organIcon: 'restaurant',
        indication: 'Insulin Sensitization & GLP-1 Stimulation',
        mechanism: 'Increases intestinal anaerobic glycolysis and alters microbiome diversity toward short-chain fatty acid producers.',
        sideEffectRisk: 'Moderate Risk',
        sideEffectDetail: 'Transient nausea, loose stools, B12 malabsorption (check B12 annually)',
      },
      {
        targetOrgan: 'Cardiovascular System',
        organIcon: 'monitor_heart',
        indication: 'Endothelial Protection in Pre-Diabetes',
        mechanism: 'Attenuates oxidative stress and advanced glycation end-product (AGE) formation.',
        sideEffectRisk: 'Rare',
        sideEffectDetail: 'Well tolerated with proven long-term cardiovascular neutral-to-beneficial profile',
      },
    ],
  },
  {
    id: 'lisinopril',
    name: 'Lisinopril',
    drugClass: 'ACE Inhibitor (Angiotensin-Converting Enzyme Inhibitor)',
    isAlternative: true,
    rows: [
      {
        targetOrgan: 'Cardiovascular System',
        organIcon: 'monitor_heart',
        indication: 'Hypertension & Afterload Reduction',
        mechanism: 'Blocks conversion of Angiotensin I to Angiotensin II, inducing systemic arterial vasodilation.',
        sideEffectRisk: 'Monitor',
        sideEffectDetail: 'First-dose hypotension, dry persistent cough in ~10% (bradykinin accumulation)',
      },
      {
        targetOrgan: 'Renal System',
        organIcon: 'science',
        indication: 'Renoprotection & Microalbuminuria Control',
        mechanism: 'Reduces intraglomerular hydrostatic pressure by dilating efferent arterioles.',
        sideEffectRisk: 'Monitor',
        sideEffectDetail: 'Hyperkalemia, transient increase in serum creatinine (monitor at 2 weeks)',
      },
      {
        targetOrgan: 'Immune / Cutaneous',
        organIcon: 'health_and_safety',
        indication: 'Vascular Tone Modulation',
        mechanism: 'Promotes kinin-kallikrein pathway activation and prostacyclin production.',
        sideEffectRisk: 'Severe Risk',
        sideEffectDetail: 'Angioedema (rare 0.1-0.7%, emergency cessation required)',
      },
    ],
  },
  {
    id: 'evolocumab',
    name: 'Evolocumab (Repatha)',
    drugClass: 'PCSK9 Monoclonal Antibody',
    isAlternative: true,
    rows: [
      {
        targetOrgan: 'Liver',
        organIcon: 'local_hospital',
        indication: 'Refractory Familial Hypercholesterolemia & Extreme High Risk CAD',
        mechanism: 'Binds PCSK9 protein, preventing LDLR degradation and boosting LDL clearance by 50-60%.',
        sideEffectRisk: 'Monitor',
        sideEffectDetail: 'Injection site erythema (subcutaneous Q2W/Q4W)',
      },
      {
        targetOrgan: 'Cardiovascular System',
        organIcon: 'monitor_heart',
        indication: 'Aggressive Plaque Regression',
        mechanism: 'Rapidly lowers circulating LDL-C below 40 mg/dL and lowers Lp(a) by 25-30%.',
        sideEffectRisk: 'Rare',
        sideEffectDetail: 'Nasopharyngitis, upper respiratory symptoms in <3%',
      },
    ],
  },
];
