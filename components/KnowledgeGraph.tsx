import React, { useState, useEffect, useContext, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { FilterContext } from '../contexts/FilterContext';
import * as api from '../services/api';
import { SearchIcon, ZoomInIcon, ZoomOutIcon, ExpandIcon, SpinnerIcon } from './ui/Icons';
import Card from './ui/Card';

const KnowledgeGraph: React.FC = () => {
    const { filters, setSelectedStudies } = useContext(FilterContext);
    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [graphLayout, setGraphLayout] = useState({ name: 'cose', animate: true, padding: 50 });
    const cyRef = useRef(null);

    useEffect(() => {
        if (filters.species) {
            setLoading(true);
            api.getKnowledgeGraphData(filters).then(data => {
                setElements(data);
                setLoading(false);
            });
        }
    }, [filters]);

    const handleNodeTap = (event) => {
        const nodeId = event.target.id();
        const nodeType = event.target.data('type');
        if (nodeType === 'study') {
            setSelectedStudies(prev => {
                const isSelected = prev.includes(nodeId);
                if (isSelected) {
                    return prev.filter(id => id !== nodeId);
                } else {
                    // Limit to 2 selections for comparison
                    if (prev.length < 2) {
                        return [...prev, nodeId];
                    }
                    return [prev[1], nodeId]; // Keep the last one and add the new one
                }
            });
        }
    };
    
    useEffect(() => {
        if(cyRef.current) {
            cyRef.current.on('tap', 'node', handleNodeTap);
        }
        return () => {
            if(cyRef.current) {
                cyRef.current.removeListener('tap', 'node', handleNodeTap);
            }
        }
    }, [cyRef.current, setSelectedStudies]);

    const stylesheet = [
        { selector: 'node[type="study"]', style: { 'background-color': '#58a6ff', 'label': 'data(label)' } },
        { selector: 'node[type="gene"]', style: { 'background-color': '#10b981', 'label': 'data(label)' } },
        { selector: 'node[type="protein"]', style: { 'background-color': '#a78bfa', 'label': 'data(label)' } },
        { selector: 'edge', style: { 'width': 2, 'line-color': '#30363d', 'target-arrow-color': '#30363d', 'target-arrow-shape': 'triangle', 'curve-style': 'bezier' } },
        { selector: 'node', style: { 'color': '#c9d1d9', 'font-size': '10px', 'text-valign': 'bottom', 'text-halign': 'center', 'text-margin-y': 5 } },
        { selector: 'node:selected', style: { 'border-width': 3, 'border-color': '#facc15' } },
    ];

    const handleZoomIn = () => cyRef.current && cyRef.current.zoom(cyRef.current.zoom() * 1.2);
    const handleZoomOut = () => cyRef.current && cyRef.current.zoom(cyRef.current.zoom() * 0.8);
    const handleFit = () => cyRef.current && cyRef.current.fit();

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Knowledge Graph</h2>
                {!loading && <span className="text-sm text-nasa-medium-gray">Displaying {elements.filter(el => el.data.id).length} nodes</span>}
            </div>
            <div className="h-96 bg-nasa-dark rounded-md border border-nasa-border relative">
                {loading ?
                    <div className="flex justify-center items-center h-full"><SpinnerIcon className="h-8 w-8 text-nasa-blue" /></div> :
                    <CytoscapeComponent
                        elements={elements}
                        stylesheet={stylesheet}
                        style={{ width: '100%', height: '100%' }}
                        layout={graphLayout}
                        cy={(cy) => { cyRef.current = cy; }}
                    />
                }
                <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-nasa-medium-gray bg-nasa-dark-soft/70 p-1 rounded-md">
                    <button className="p-1 hover:text-white transition-colors" aria-label="Search graph"><SearchIcon className="h-5 w-5" /></button>
                    <button onClick={handleZoomOut} className="p-1 hover:text-white transition-colors" aria-label="Zoom out"><ZoomOutIcon className="h-5 w-5" /></button>
                    <button onClick={handleZoomIn} className="p-1 hover:text-white transition-colors" aria-label="Zoom in"><ZoomInIcon className="h-5 w-5" /></button>
                    <button onClick={handleFit} className="p-1 hover:text-white transition-colors" aria-label="Expand graph"><ExpandIcon className="h-5 w-5" /></button>
                </div>
            </div>
        </Card>
    );
};

export default KnowledgeGraph;