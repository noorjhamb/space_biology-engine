// This is a mock API service to simulate backend communication.
// In a real application, these functions would make HTTP requests to a server.

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Mock Data ---

const MOCK_FILTER_OPTIONS = {
  species: ['Rattus Norvegicus', 'Mus Musculus', 'Homo Sapiens', 'Drosophila melanogaster'],
  exposure: ['Microgravity (ISS)', 'Simulated Microgravity', 'Radiation', 'Hindlimb Unloading'],
  organSystem: ['Musculoskeletal', 'Cardiovascular', 'Immune', 'Nervous System'],
};

const MOCK_KNOWLEDGE_GRAPH_DATA = {
  'Rattus Norvegicus': [
    { data: { id: 'study1', label: 'Rat Bone Loss', type: 'study' } },
    { data: { id: 'gene1', label: 'Actb', type: 'gene' } },
    { data: { id: 'gene2', label: 'Cstb', type: 'gene' } },
    { data: { source: 'study1', target: 'gene1', label: 'downregulates' } },
    { data: { source: 'study1', target: 'gene2', label: 'upregulates' } },
  ],
  'Mus Musculus': [
    { data: { id: 'study2', label: 'Mouse Muscle Atrophy', type: 'study' } },
    { data: { id: 'gene3', label: 'Myh7', type: 'gene' } },
    { data: { id: 'gene4', label: 'Ubc', type: 'gene' } },
    { data: { id: 'protein1', label: 'MYH7', type: 'protein' } },
    { data: { source: 'study2', target: 'gene3', label: 'downregulates' } },
    { data: { source: 'study2', target: 'gene4', label: 'upregulates' } },
    { data: { source: 'gene3', target: 'protein1', label: 'encodes' } },
  ]
};

const MOCK_BONE_DENSITY_DATA = {
  'Musculoskeletal': [
    { name: 'Mouse', change: -15 }, { name: 'Rat', change: -12 }, { name: 'Human', change: -5 },
  ],
  'Cardiovascular': [
    { name: 'Mouse', change: -2 }, { name: 'Rat', change: -3 }, { name: 'Human', change: -1 },
  ],
};

const MOCK_GENE_EXPRESSION_DATA = {
    'Rattus Norvegicus': { mouse: 350, rat: 412, overlap: 128 },
    'Mus Musculus': { mouse: 412, rat: 350, overlap: 128 },
};


const MOCK_STUDY_COMPARISON = {
    "default": {
        "PARAMETER": ["Species", "Exposure", "Duration", "Bone Density Change"],
        "SELECT A STUDY": ["-", "-", "-", "-"],
        "SELECT ANOTHER STUDY": ["-", "-", "-", "-"],
    },
    "study1": {
        "PARAMETER": ["Species", "Exposure", "Duration", "Bone Density Change"],
        "Rat Bone Loss": ["Rattus Norvegicus", "Simulated Microgravity", "60 days", "-12.8%"],
        "SELECT ANOTHER STUDY": ["-", "-", "-", "-"],
    },
    "study2": {
        "PARAMETER": ["Species", "Exposure", "Duration", "Muscle Mass Change"],
        "Mouse Muscle Atrophy": ["Mus Musculus", "Microgravity (ISS)", "30 days", "-22.5%"],
        "SELECT ANOTHER STUDY": ["-", "-", "-", "-"],
    },
    "study1,study2": {
        "PARAMETER": ["Species", "Exposure", "Duration", "Key Finding"],
        "Rat Bone Loss": ["Rattus Norvegicus", "Simulated Microgravity", "60 days", "Bone density -12.8%"],
        "Mouse Muscle Atrophy": ["Mus Musculus", "Microgravity (ISS)", "30 days", "Muscle mass -22.5%"],
    }
};

// --- API Functions ---

export const getFilterOptions = async () => {
  await sleep(500);
  return MOCK_FILTER_OPTIONS;
};

export const getKnowledgeGraphData = async (filters: any) => {
  await sleep(1000);
  return MOCK_KNOWLEDGE_GRAPH_DATA[filters.species] || MOCK_KNOWLEDGE_GRAPH_DATA['Rattus Norvegicus'];
};

export const getBoneDensityData = async (filters: any) => {
  await sleep(800);
  return MOCK_BONE_DENSITY_DATA[filters.organSystem] || MOCK_BONE_DENSITY_DATA['Musculoskeletal'];
};

export const getGeneExpressionData = async (filters: any) => {
  await sleep(800);
  return MOCK_GENE_EXPRESSION_DATA[filters.species] || MOCK_GENE_EXPRESSION_DATA['Rattus Norvegicus'];
};

export const getStudyComparisonData = async (studyIds: string[]) => {
    await sleep(600);
    const key = studyIds.sort().join(',');
    return MOCK_STUDY_COMPARISON[key] || MOCK_STUDY_COMPARISON['default'];
};

export const getInitialGreeting = async () => {
    await sleep(700);
    return {
        id: 1,
        author: 'ai' as const,
        text: "Hello Dr. Carter. I'm ready to assist with your space biology research. How can I help you today?",
    };
};

export const getSemanticSearchResult = async (query: string) => {
    await sleep(1500);
    if (query.toLowerCase().includes('cardiovascular')) {
        return {
            id: Date.now(),
            author: 'ai' as const,
            text: `Microgravity induces several key molecular changes in human cardiovascular cells. Primary mechanisms include alterations in gene expression related to cellular structure and function, specifically downregulation of actin and tubulin [1]. There is also evidence of increased oxidative stress and endothelial dysfunction, marked by changes in nitric oxide synthase (eNOS) activity [2]. Additionally, studies point to modified calcium signaling pathways which are critical for cardiac muscle contraction [3].`,
            citations: [
                { id: 1, text: 'Versari, S. et al. (2021). The effects of microgravity on the cardiovascular system. Nature Reviews Cardiology. Source: NASA Space Life Sciences Library.' },
                { id: 2, text: 'Zhang, Y. et al. (2019). Endothelial function and oxidative stress in simulated microgravity. Journal of Applied Physiology. Source: PubSpace.' },
                { id: 3, text: 'Cotrupi, S. et al. (2020). Calcium signaling in cardiomyocytes under microgravity conditions. Cell Calcium. Source: GeneLab.' },
            ],
        };
    }
    return {
        id: Date.now(),
        author: 'ai' as const,
        text: `Based on the available data from GeneLab and the NASA Open Science Data Repository, your query about "${query}" suggests a strong correlation with rodent studies on hindlimb unloading. Key findings indicate significant muscle atrophy and bone density loss [1]. I recommend exploring datasets GLDS-104 and GLDS-105 for more details.`,
        citations: [
            { id: 1, text: 'Morey-Holton, E. R., & Globus, R. K. (2002). Hindlimb unloading of rodents: a model for clinical research. Journal of applied physiology. Source: NASA Task Book.' }
        ]
    };
};