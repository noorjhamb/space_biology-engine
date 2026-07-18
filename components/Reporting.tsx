import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Card from './ui/Card';
import Select from './ui/Select';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from 'recharts';

const speciesData = [
    { name: '2019', value: 1200 }, { name: '2020', value: 1350 }, { name: '2021', value: 1300 },
    { name: '2022', value: 1450 }, { name: '2023', value: 1400 }, { name: '2024', value: 1500 },
];
const exposureData = [
    { name: 'Micro', value: 120 }, { name: 'Rad', value: 75 }, { name: 'Iso', value: 30 },
    { name: 'Hyper', value: 25 },
];

const Reporting: React.FC = () => {
    const [duration, setDuration] = useState(12);
    const [reportParams, setReportParams] = useState({
        dataType: 'Species',
        exposureType: 'Radiation',
        organSystem: 'Cardiovascular',
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log('Accepted files:', acceptedFiles);
        // Simulate API upload
        alert(`${acceptedFiles[0].name} is being processed for comparison. Check the console for details.`);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'text/csv': ['.csv'], 'application/json': ['.json'] }
    });

    const handleGenerateReport = () => {
        const fullReportParams = { ...reportParams, duration };
        console.log("Generating report with params:", fullReportParams);
        alert("Custom report is being generated! Check the console for details.");
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Reporting/Analytics Dashboard</h1>
                <p className="text-nasa-medium-gray mt-2">Explore trends and insights across space biology research. Generate custom reports and visualize data across studies.</p>
            </div>

            <Card>
                <h2 className="text-xl font-semibold mb-4">Data Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Species Distribution */}
                    <div className="bg-nasa-dark p-4 rounded-lg border border-nasa-border">
                        <p className="text-nasa-medium-gray">Species Distribution Over Time</p>
                        <p className="text-3xl font-bold my-2">1,500</p>
                        <p className="text-sm text-green-400">Last 5 Years <span className="font-semibold">+15%</span></p>
                        <div className="h-24 mt-4 -ml-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={speciesData}>
                                    <Line type="monotone" dataKey="value" stroke="#58a6ff" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Exposure Types */}
                    <div className="bg-nasa-dark p-4 rounded-lg border border-nasa-border">
                        <p className="text-nasa-medium-gray">Exposure Types Across Studies</p>
                        <p className="text-3xl font-bold my-2">250</p>
                        <p className="text-sm text-green-400">All Studies <span className="font-semibold">+10%</span></p>
                        <div className="h-24 mt-4 -ml-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={exposureData}>
                                     <Bar dataKey="value" fill="#58a6ff" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Organ Systems */}
                    <div className="bg-nasa-dark p-4 rounded-lg border border-nasa-border">
                        <p className="text-nasa-medium-gray">Organ Systems Affected</p>
                        <p className="text-3xl font-bold my-2">12</p>
                        <p className="text-sm text-green-400">All Studies <span className="font-semibold">+5%</span></p>
                        <div className="mt-4 space-y-3 text-sm">
                            <div className="space-y-1">
                                <p>Cardiovascular</p>
                                <div className="w-full bg-nasa-border rounded-full h-1.5"><div className="bg-nasa-blue h-1.5 rounded-full" style={{width: '85%'}}></div></div>
                            </div>
                            <div className="space-y-1">
                                <p>Musculoskeletal</p>
                                <div className="w-full bg-nasa-border rounded-full h-1.5"><div className="bg-nasa-blue h-1.5 rounded-full" style={{width: '70%'}}></div></div>
                            </div>
                             <div className="space-y-1">
                                <p>Immune</p>
                                <div className="w-full bg-nasa-border rounded-full h-1.5"><div className="bg-nasa-blue h-1.5 rounded-full" style={{width: '60%'}}></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            
            <Card>
                <h2 className="text-xl font-semibold mb-4">Custom Report Generation</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Select label="Select Data Type" options={['Species', 'Genes', 'Proteins']} value={reportParams.dataType} onChange={e => setReportParams(p => ({ ...p, dataType: e.target.value }))} />
                    <Select label="Select Exposure Type" options={['Radiation', 'Microgravity', 'Isolation']} value={reportParams.exposureType} onChange={e => setReportParams(p => ({ ...p, exposureType: e.target.value }))} />
                    <Select label="Select Organ System" options={['Cardiovascular', 'Immune', 'Nervous']} value={reportParams.organSystem} onChange={e => setReportParams(p => ({ ...p, organSystem: e.target.value }))} />
                </div>
                <div className="mb-6">
                    <label htmlFor="duration-range" className="block text-sm font-medium text-nasa-medium-gray mb-2">Duration (Months)</label>
                    <input 
                        id="duration-range"
                        type="range" 
                        min="1" 
                        max="24" 
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        className="w-full h-2 bg-nasa-border rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-nasa-medium-gray mt-1">
                        <span>1</span>
                        <span className="font-semibold text-nasa-light-gray bg-nasa-dark-soft px-2 py-0.5 rounded-md -mt-1">{duration}</span>
                        <span>24</span>
                    </div>
                </div>
                <button onClick={handleGenerateReport} className="bg-nasa-blue hover:bg-nasa-blue-hover text-white font-semibold py-2 px-6 rounded-md transition-colors">
                    Generate Report
                </button>
            </Card>

            <Card>
                <h2 className="text-xl font-semibold mb-4">Compare Your Research</h2>
                <div {...getRootProps()} className={`border-2 border-dashed border-nasa-border rounded-lg p-12 text-center cursor-pointer transition-colors ${isDragActive ? 'border-nasa-blue bg-nasa-blue/10' : 'bg-nasa-dark hover:border-nasa-blue'}`}>
                    <input {...getInputProps()} />
                    <p className="text-nasa-light-gray">{isDragActive ? 'Drop the files here ...' : 'Drag and drop your data file here'}</p>
                    <p className="text-sm text-nasa-medium-gray mt-1">Supported formats: CSV, JSON</p>
                    <button type="button" className="mt-4 bg-nasa-dark-soft border border-nasa-border text-white px-4 py-2 rounded-md text-sm hover:bg-nasa-border transition-colors">
                        Browse Files
                    </button>
                </div>
                <p className="text-sm text-nasa-medium-gray mt-4">
                    Upload your research data to compare your findings against the platform's aggregated data. Gain insights into how your research aligns with broader trends in space biology.
                </p>
            </Card>
        </div>
    );
};

export default Reporting;