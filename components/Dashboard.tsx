import React, { useEffect, useState, useContext } from 'react';
import Card from './ui/Card';
import Select from './ui/Select';
import KnowledgeGraph from './KnowledgeGraph';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DownloadIcon, SpinnerIcon } from './ui/Icons';
import * as api from '../services/api';
import { FilterContext } from '../contexts/FilterContext';

const BoneDensityChart = ({ data, loading }) => (
    <div className="h-[250px]">
        {loading ? <div className="flex justify-center items-center h-full"><SpinnerIcon /></div> :
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
                    <XAxis dataKey="name" tick={{ fill: '#8b949e' }} stroke="#30363d" />
                    <YAxis tickFormatter={(tick) => `${tick}%`} tick={{ fill: '#8b949e' }} stroke="#30363d" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d' }}
                        labelStyle={{ color: '#c9d1d9' }}
                        cursor={{ fill: 'rgba(139, 148, 158, 0.1)' }}
                    />
                    <Bar dataKey="change">
                        <Cell fill="#58a6ff" />
                        <Cell fill="#10b981" />
                        <Cell fill="#a78bfa" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        }
    </div>
);

const GeneExpressionVenn = ({ data, loading }) => (
    <div className="relative w-full h-[250px] flex justify-center items-center">
        {loading ? <div className="flex justify-center items-center h-full"><SpinnerIcon /></div> :
            <>
                <div className="absolute w-48 h-48 bg-blue-500/30 rounded-full border-2 border-blue-400" style={{ left: 'calc(50% - 144px)' }}></div>
                <div className="absolute w-48 h-48 bg-emerald-500/30 rounded-full border-2 border-emerald-400" style={{ right: 'calc(50% - 144px)' }}></div>
                <div className="z-10 text-center text-white" style={{ position: 'absolute', left: 'calc(50% - 100px)', top: '40%' }}>
                    <div className="text-3xl font-bold">{data.mouse}</div>
                    <div className="text-xs">Mouse Genes</div>
                </div>
                <div className="z-10 text-center text-white" style={{ position: 'absolute', right: 'calc(50% - 100px)', top: '40%' }}>
                    <div className="text-3xl font-bold">{data.rat}</div>
                    <div className="text-xs">Rat Genes</div>
                </div>
                <div className="z-10 text-center text-white" style={{ position: 'absolute', top: '40%' }}>
                    <div className="text-3xl font-bold">{data.overlap}</div>
                    <div className="text-xs">Overlapping</div>
                </div>
            </>
        }
    </div>
);

const StudyComparisonTable = ({ data, loading }) => (
    <div className="overflow-x-auto min-h-[220px]">
        {loading ? <div className="flex justify-center items-center h-full"><SpinnerIcon /></div> :
            <div className="grid grid-cols-4 gap-x-6 gap-y-4 text-sm min-w-[600px]">
                {Object.entries(data).map(([header, values], colIndex) => (
                    <div key={header}>
                        <h4 className="font-bold text-nasa-light-gray mb-3 truncate h-10 flex items-end">{header}</h4>
                        <div className="space-y-4">
                            {/* FIX: Ensure `values` is an array before attempting to map over it. `Object.entries` on an untyped object results in `values` having type `unknown`. */}
                            {Array.isArray(values) && values.map((value, rowIndex) => (
                                <p key={rowIndex} className={`text-nasa-medium-gray h-8 flex items-center ${colIndex === 0 ? 'font-semibold text-nasa-light-gray' : ''}`}>
                                    {value}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        }
    </div>
);

const Dashboard: React.FC = () => {
    const { filters, setFilters, selectedStudies } = useContext(FilterContext);
    const [filterOptions, setFilterOptions] = useState({ species: [], exposure: [], organSystem: [] });
    const [chartData, setChartData] = useState({ boneDensity: [], geneExpression: {} });
    const [comparisonData, setComparisonData] = useState({});
    const [loading, setLoading] = useState({ filters: true, charts: true, comparison: true });

    useEffect(() => {
        api.getFilterOptions().then(options => {
            setFilterOptions(options);
            setFilters({
                species: options.species[0],
                exposure: options.exposure[0],
                organSystem: options.organSystem[0]
            });
            setLoading(prev => ({ ...prev, filters: false }));
        });
    }, [setFilters]);

    useEffect(() => {
        setLoading(prev => ({ ...prev, charts: true, comparison: true }));
        api.getBoneDensityData(filters).then(data => {
            setChartData(prev => ({ ...prev, boneDensity: data }));
            setLoading(prev => ({ ...prev, charts: false }));
        });
        api.getGeneExpressionData(filters).then(data => {
            setChartData(prev => ({ ...prev, geneExpression: data }));
        });
        api.getStudyComparisonData(selectedStudies).then(data => {
            setComparisonData(data);
            setLoading(prev => ({ ...prev, comparison: false }));
        });
    }, [filters, selectedStudies]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const handleSaveComparison = () => {
        console.log("Saving comparison for studies:", selectedStudies);
        alert(`Comparison for studies [${selectedStudies.join(', ')}] saved! (See console for details)`);
    };

    const handleExport = () => {
        console.log("Exporting view with current filters:", filters);
        alert("Current view exported! (See console for details)");
    };

    return (
        <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-3">
                <Card className="h-full">
                    <h2 className="text-xl font-semibold mb-4">FILTERS</h2>
                    {loading.filters ? <SpinnerIcon /> :
                        <div className="space-y-4">
                            <Select label="Species" options={filterOptions.species} value={filters.species} onChange={e => handleFilterChange('species', e.target.value)} />
                            <Select label="Exposure" options={filterOptions.exposure} value={filters.exposure} onChange={e => handleFilterChange('exposure', e.target.value)} />
                            <Select label="Organ System" options={filterOptions.organSystem} value={filters.organSystem} onChange={e => handleFilterChange('organSystem', e.target.value)} />
                        </div>
                    }
                </Card>
            </div>
            <div className="col-span-12 lg:col-span-9">
                <div className="grid grid-cols-1 gap-6">
                    <KnowledgeGraph />
                    <Card>
                        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Study Comparison</h2>
                            <div className="flex items-center space-x-2">
                                <button onClick={handleExport} className="bg-nasa-dark-soft border border-nasa-border text-white px-4 py-2 rounded-md text-sm hover:bg-nasa-border flex items-center transition-colors">
                                    <DownloadIcon className="h-4 w-4 mr-2" />
                                    Export View
                                </button>
                                <button onClick={handleSaveComparison} className="bg-nasa-blue hover:bg-nasa-blue-hover text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors">Save Comparison</button>
                            </div>
                        </div>
                        <StudyComparisonTable data={comparisonData} loading={loading.comparison} />
                    </Card>
                </div>
            </div>
            <div className="col-span-12">
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Study Details & Charts</h2>
                    <p className="text-nasa-medium-gray mb-6">Showing data for selected studies based on filters</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                                <span className="w-2 h-2 bg-nasa-blue rounded-full mr-2"></span>
                                Bone Density Change Comparison (%)
                            </h3>
                            <BoneDensityChart data={chartData.boneDensity} loading={loading.charts} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 -ml-3"></span>
                                Gene Expression Overlap
                            </h3>
                            <GeneExpressionVenn data={chartData.geneExpression} loading={loading.charts} />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;