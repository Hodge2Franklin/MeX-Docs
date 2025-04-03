/**
 * MeAI Prototype - Memory Visualization Component
 * 
 * This script handles the memory visualization functionality,
 * creating a visual representation of the user's shared history with MeAI.
 */

class MemoryVisualization {
    constructor() {
        // DOM elements
        this.memorySection = document.getElementById('memory-section');
        this.memoryVisualization = document.getElementById('memory-visualization');
        
        // Memory state
        this.memoryNodes = [];
        this.connections = [];
        this.categories = ['conversation', 'ritual', 'insight', 'emotion'];
        this.colorMap = {
            conversation: '#3498db', // blue
            ritual: '#2ecc71',       // green
            insight: '#9b59b6',      // purple
            emotion: '#e74c3c'       // red
        };
        
        // Initialize
        this.loadMemoryData();
        this.initEventListeners();
    }
    
    /**
     * Initialize event listeners for memory visualization
     */
    initEventListeners() {
        // Listen for new conversation entries
        document.addEventListener('conversation-added', (e) => {
            if (e.detail && e.detail.text) {
                this.addMemoryNode('conversation', e.detail.text, new Date());
                this.renderMemoryVisualization();
            }
        });
        
        // Listen for ritual completions
        document.addEventListener('ritual-completed', (e) => {
            if (e.detail && e.detail.ritual) {
                this.addMemoryNode('ritual', `Completed ${e.detail.ritual} ritual`, new Date());
                this.renderMemoryVisualization();
            }
        });
        
        // Window resize handler for responsive visualization
        window.addEventListener('resize', () => {
            this.renderMemoryVisualization();
        });
    }
    
    /**
     * Load memory data from localStorage if available
     */
    loadMemoryData() {
        const savedMemory = localStorage.getItem('meai-memory-data');
        if (savedMemory) {
            try {
                const memoryData = JSON.parse(savedMemory);
                this.memoryNodes = memoryData.nodes || [];
                this.connections = memoryData.connections || [];
            } catch (e) {
                console.error('Error loading memory data:', e);
                this.initializeSampleMemory();
            }
        } else {
            this.initializeSampleMemory();
        }
        
        // Render the visualization
        this.renderMemoryVisualization();
    }
    
    /**
     * Initialize sample memory data for demonstration
     */
    initializeSampleMemory() {
        // Create sample memory nodes
        const now = new Date();
        const dayInMs = 24 * 60 * 60 * 1000;
        
        this.memoryNodes = [
            {
                id: 1,
                type: 'conversation',
                content: 'First conversation with MeAI',
                timestamp: new Date(now - 7 * dayInMs),
                position: { x: 0.3, y: 0.2 },
                size: 1.0
            },
            {
                id: 2,
                type: 'emotion',
                content: 'Feeling curious about the potential of AI companions',
                timestamp: new Date(now - 6 * dayInMs),
                position: { x: 0.4, y: 0.3 },
                size: 0.8
            },
            {
                id: 3,
                type: 'ritual',
                content: 'Completed Morning Reflection ritual',
                timestamp: new Date(now - 5 * dayInMs),
                position: { x: 0.6, y: 0.4 },
                size: 1.2
            },
            {
                id: 4,
                type: 'insight',
                content: 'Realized the importance of daily mindfulness practice',
                timestamp: new Date(now - 3 * dayInMs),
                position: { x: 0.5, y: 0.6 },
                size: 1.1
            },
            {
                id: 5,
                type: 'conversation',
                content: 'Discussed challenges with maintaining focus',
                timestamp: new Date(now - 2 * dayInMs),
                position: { x: 0.7, y: 0.5 },
                size: 0.9
            },
            {
                id: 6,
                type: 'ritual',
                content: 'Completed Gratitude Practice ritual',
                timestamp: new Date(now - 1 * dayInMs),
                position: { x: 0.6, y: 0.7 },
                size: 1.0
            }
        ];
        
        // Create sample connections
        this.connections = [
            { source: 1, target: 2, strength: 0.7 },
            { source: 1, target: 3, strength: 0.5 },
            { source: 2, target: 3, strength: 0.6 },
            { source: 3, target: 4, strength: 0.9 },
            { source: 4, target: 5, strength: 0.8 },
            { source: 5, target: 6, strength: 0.7 },
            { source: 3, target: 6, strength: 0.6 }
        ];
        
        // Save to localStorage
        this.saveMemoryData();
    }
    
    /**
     * Save memory data to localStorage
     */
    saveMemoryData() {
        const memoryData = {
            nodes: this.memoryNodes,
            connections: this.connections
        };
        
        localStorage.setItem('meai-memory-data', JSON.stringify(memoryData));
    }
    
    /**
     * Add a new memory node
     * @param {string} type - Node type (conversation, ritual, insight, emotion)
     * @param {string} content - Node content
     * @param {Date} timestamp - Node timestamp
     */
    addMemoryNode(type, content, timestamp) {
        // Validate type
        if (!this.categories.includes(type)) {
            type = 'conversation'; // Default type
        }
        
        // Generate new ID
        const newId = this.memoryNodes.length > 0 
            ? Math.max(...this.memoryNodes.map(node => node.id)) + 1 
            : 1;
        
        // Create random position (will be adjusted during rendering)
        const position = {
            x: 0.3 + Math.random() * 0.4, // Between 0.3 and 0.7
            y: 0.3 + Math.random() * 0.4  // Between 0.3 and 0.7
        };
        
        // Create new node
        const newNode = {
            id: newId,
            type: type,
            content: content,
            timestamp: timestamp,
            position: position,
            size: 1.0
        };
        
        // Add to memory nodes
        this.memoryNodes.push(newNode);
        
        // Create connections to recent nodes
        if (this.memoryNodes.length > 1) {
            // Connect to the most recent node
            const mostRecentNode = this.memoryNodes
                .filter(node => node.id !== newId)
                .sort((a, b) => b.timestamp - a.timestamp)[0];
            
            this.connections.push({
                source: mostRecentNode.id,
                target: newId,
                strength: 0.8
            });
            
            // Potentially connect to another related node
            const relatedNodes = this.memoryNodes
                .filter(node => node.id !== newId && node.id !== mostRecentNode.id && node.type === type)
                .sort((a, b) => b.timestamp - a.timestamp);
            
            if (relatedNodes.length > 0) {
                this.connections.push({
                    source: relatedNodes[0].id,
                    target: newId,
                    strength: 0.6
                });
            }
        }
        
        // Save updated memory data
        this.saveMemoryData();
    }
    
    /**
     * Render the memory visualization
     */
    renderMemoryVisualization() {
        // Clear previous visualization
        this.memoryVisualization.innerHTML = '';
        
        // Check if we have memory nodes
        if (this.memoryNodes.length === 0) {
            const placeholder = document.createElement('div');
            placeholder.classList.add('memory-placeholder');
            placeholder.innerHTML = '<p>Your shared journey with MeAI will be visualized here as you interact over time.</p>';
            this.memoryVisualization.appendChild(placeholder);
            return;
        }
        
        // Create SVG element for visualization
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.minHeight = '400px';
        
        // Get container dimensions
        const containerRect = this.memoryVisualization.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;
        
        // Draw connections first (so they appear behind nodes)
        this.connections.forEach(connection => {
            const sourceNode = this.memoryNodes.find(node => node.id === connection.source);
            const targetNode = this.memoryNodes.find(node => node.id === connection.target);
            
            if (sourceNode && targetNode) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', sourceNode.position.x * width);
                line.setAttribute('y1', sourceNode.position.y * height);
                line.setAttribute('x2', targetNode.position.x * width);
                line.setAttribute('y2', targetNode.position.y * height);
                line.setAttribute('stroke', '#aaa');
                line.setAttribute('stroke-width', connection.strength * 3);
                line.setAttribute('stroke-opacity', 0.6);
                svg.appendChild(line);
            }
        });
        
        // Draw nodes
        this.memoryNodes.forEach(node => {
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            
            // Create node circle
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', node.position.x * width);
            circle.setAttribute('cy', node.position.y * height);
            circle.setAttribute('r', 10 * node.size);
            circle.setAttribute('fill', this.colorMap[node.type]);
            
            // Add tooltip with node content
            circle.setAttribute('data-content', node.content);
            circle.setAttribute('data-date', node.timestamp.toLocaleDateString());
            
            // Add event listeners for interaction
            circle.addEventListener('mouseover', this.showNodeTooltip.bind(this));
            circle.addEventListener('mouseout', this.hideNodeTooltip.bind(this));
            
            group.appendChild(circle);
            svg.appendChild(group);
        });
        
        // Add SVG to container
        this.memoryVisualization.appendChild(svg);
        
        // Add legend
        const legend = document.createElement('div');
        legend.classList.add('memory-legend');
        
        this.categories.forEach(category => {
            const item = document.createElement('div');
            item.classList.add('legend-item');
            
            const colorBox = document.createElement('span');
            colorBox.classList.add('color-box');
            colorBox.style.backgroundColor = this.colorMap[category];
            
            const label = document.createElement('span');
            label.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            
            item.appendChild(colorBox);
            item.appendChild(label);
            legend.appendChild(item);
        });
        
        this.memoryVisualization.appendChild(legend);
    }
    
    /**
     * Show tooltip for a memory node
     * @param {Event} event - Mouse event
     */
    showNodeTooltip(event) {
        const circle = event.target;
        const content = circle.getAttribute('data-content');
        const date = circle.getAttribute('data-date');
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.classList.add('memory-tooltip');
        tooltip.innerHTML = `<p>${content}</p><small>${date}</small>`;
        
        // Position tooltip near the circle
        const circleRect = circle.getBoundingClientRect();
        const containerRect = this.memoryVisualization.getBoundingClientRect();
        
        tooltip.style.left = `${circleRect.left - containerRect.left + 20}px`;
        tooltip.style.top = `${circleRect.top - containerRect.top - 10}px`;
        
        // Add to container
        this.memoryVisualization.appendChild(tooltip);
    }
    
    /**
     * Hide tooltip for a memory node
     */
    hideNodeTooltip() {
        const tooltip = this.memoryVisualization.querySelector('.memory-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    /**
     * Add a CSS style block for memory visualization
     */
    addStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .memory-legend {
                display: flex;
                justify-content: center;
                margin-top: 20px;
                flex-wrap: wrap;
            }
            
            .legend-item {
                display: flex;
                align-items: center;
                margin: 0 10px;
            }
            
            .color-box {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 5px;
            }
            
            .memory-tooltip {
                position: absolute;
                background-color: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                max-width: 200px;
                z-index: 100;
                pointer-events: none;
            }
            
            .memory-tooltip p {
                margin: 0 0 5px 0;
            }
            
            .memory-tooltip small {
                opacity: 0.8;
            }
        `;
        
        document.head.appendChild(styleElement);
    }
}

// Initialize the memory visualization when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.memory = new MemoryVisualization();
    window.memory.addStyles();
});
