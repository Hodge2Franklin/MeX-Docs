// Visualization elements for the MeX AI Companion documentation website

// D3.js visualizations for architecture and component relationships

// Initialize all visualizations
function initVisualizations() {
  initDualityModelVisualization();
  initComponentRelationshipDiagram();
  initEthicalFrameworkVisualization();
  initUserFlowDiagram();
}

// Duality Model Visualization
function initDualityModelVisualization() {
  const container = document.getElementById('duality-model-visualization');
  if (!container) return;
  
  const width = container.clientWidth;
  const height = 500;
  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'duality-model-svg');
  
  // Define the data structure for the Duality Model
  const data = {
    name: "Duality Model",
    children: [
      {
        name: "Mirror Component",
        description: "Inward-focused engine for deep user understanding",
        children: [
          { name: "Input Processing", value: 30 },
          { name: "Emotional Sensing", value: 40 },
          { name: "Pattern Recognition", value: 35 },
          { name: "Need Detection", value: 25 },
          { name: "Archetype Modeling", value: 30 },
          { name: "Reflection Generation", value: 35 }
        ]
      },
      {
        name: "Synthesis Layer",
        description: "Dynamic interplay layer managing Mirror↔Bridge flow",
        children: [
          { name: "State Management", value: 30 },
          { name: "Transition Control", value: 25 },
          { name: "Ethical Checking", value: 35 },
          { name: "Joy Optimization", value: 30 },
          { name: "Decision Making", value: 35 },
          { name: "Experience Coordination", value: 40 }
        ]
      },
      {
        name: "Bridge Component",
        description: "Outward-facing engine for external connections",
        children: [
          { name: "External Discovery", value: 30 },
          { name: "Truth Filtering", value: 40 },
          { name: "Content Curation", value: 35 },
          { name: "Perspective Generation", value: 30 },
          { name: "Contextual Framing", value: 25 },
          { name: "Connection Finding", value: 35 }
        ]
      }
    ]
  };
  
  // Create a hierarchical layout
  const root = d3.hierarchy(data)
    .sum(d => d.value || 0);
  
  // Create a pack layout
  const pack = d3.pack()
    .size([width, height])
    .padding(3);
  
  // Apply the pack layout to the hierarchy
  const nodes = pack(root);
  
  // Color scale for different components
  const colorScale = d3.scaleOrdinal()
    .domain(["Mirror Component", "Synthesis Layer", "Bridge Component"])
    .range(["#6a4c93", "#1982c4", "#8ac926"]);
  
  // Draw circles for each node
  const node = svg.selectAll('.node')
    .data(nodes.descendants())
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`);
  
  // Add circles
  node.append('circle')
    .attr('r', d => d.r)
    .attr('fill', d => d.depth === 1 ? colorScale(d.data.name) : d.depth === 0 ? '#ffffff00' : '#ffffff')
    .attr('stroke', d => d.depth === 2 ? colorScale(d.parent.data.name) : 'none')
    .attr('stroke-width', 2)
    .attr('opacity', d => d.depth === 0 ? 0 : 0.9);
  
  // Add labels
  node.append('text')
    .attr('dy', '.3em')
    .style('text-anchor', 'middle')
    .style('font-size', d => d.depth === 1 ? '14px' : '10px')
    .style('font-weight', d => d.depth === 1 ? 'bold' : 'normal')
    .style('fill', d => d.depth === 1 ? '#ffffff' : '#333333')
    .text(d => d.data.name)
    .attr('opacity', d => d.depth === 0 ? 0 : 1)
    .each(function(d) {
      // Wrap text for better readability
      const text = d3.select(this);
      const words = d.data.name.split(/\s+/);
      const lineHeight = 1.1;
      const y = text.attr('y');
      const dy = parseFloat(text.attr('dy'));
      
      text.text(null);
      
      if (d.r < 30) {
        // For small circles, just show first word
        text.append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', dy + 'em')
          .text(words[0]);
        return;
      }
      
      for (let i = 0; i < words.length; i++) {
        text.append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', i === 0 ? dy + 'em' : lineHeight + 'em')
          .text(words[i]);
      }
    });
  
  // Add tooltips
  node.append('title')
    .text(d => d.data.description || d.data.name);
  
  // Add interactivity
  node.on('mouseover', function(event, d) {
    d3.select(this).select('circle')
      .transition()
      .duration(300)
      .attr('opacity', 1);
  })
  .on('mouseout', function(event, d) {
    d3.select(this).select('circle')
      .transition()
      .duration(300)
      .attr('opacity', d.depth === 0 ? 0 : 0.9);
  })
  .on('click', function(event, d) {
    if (d.depth === 1) {
      // Show more information about the component
      const infoPanel = document.getElementById('component-info-panel');
      if (infoPanel) {
        infoPanel.innerHTML = `
          <h3>${d.data.name}</h3>
          <p>${d.data.description}</p>
          <ul>
            ${d.children.map(child => `<li><strong>${child.data.name}</strong></li>`).join('')}
          </ul>
        `;
        infoPanel.style.display = 'block';
      }
    }
  });
}

// Component Relationship Diagram
function initComponentRelationshipDiagram() {
  const container = document.getElementById('component-relationship-diagram');
  if (!container) return;
  
  const width = container.clientWidth;
  const height = 600;
  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'relationship-diagram-svg');
  
  // Define the data structure for component relationships
  const nodes = [
    { id: "mirror", name: "Mirror Component", group: 1 },
    { id: "bridge", name: "Bridge Component", group: 2 },
    { id: "synthesis", name: "Synthesis Layer", group: 3 },
    { id: "memory", name: "Memory System", group: 4 },
    { id: "ritual", name: "RitualEngine", group: 5 },
    { id: "voice", name: "Voice Engine", group: 6 },
    { id: "breath", name: "Breath System", group: 7 },
    { id: "ethics", name: "Ethics Engine", group: 8 }
  ];
  
  const links = [
    { source: "mirror", target: "synthesis", value: 5 },
    { source: "bridge", target: "synthesis", value: 5 },
    { source: "synthesis", target: "mirror", value: 5 },
    { source: "synthesis", target: "bridge", value: 5 },
    { source: "mirror", target: "memory", value: 4 },
    { source: "memory", target: "mirror", value: 4 },
    { source: "memory", target: "synthesis", value: 3 },
    { source: "ritual", target: "synthesis", value: 4 },
    { source: "synthesis", target: "ritual", value: 4 },
    { source: "voice", target: "mirror", value: 3 },
    { source: "voice", target: "bridge", value: 3 },
    { source: "breath", target: "mirror", value: 3 },
    { source: "breath", target: "voice", value: 3 },
    { source: "ethics", target: "mirror", value: 3 },
    { source: "ethics", target: "bridge", value: 3 },
    { source: "ethics", target: "synthesis", value: 4 }
  ];
  
  // Create a force simulation
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-400))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(60));
  
  // Color scale for different component groups
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
  // Create links
  const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke-width", d => Math.sqrt(d.value))
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6);
  
  // Create node groups
  const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
  
  // Add circles to nodes
  node.append("circle")
    .attr("r", 30)
    .attr("fill", d => colorScale(d.group))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);
  
  // Add labels to nodes
  node.append("text")
    .text(d => d.name)
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-size", "10px")
    .attr("fill", "#fff")
    .each(function(d) {
      // Wrap text for better readability
      const text = d3.select(this);
      const words = d.name.split(/\s+/);
      const lineHeight = 1.1;
      
      text.text(null);
      
      for (let i = 0; i < words.length; i++) {
        text.append('tspan')
          .attr('x', 0)
          .attr('dy', i === 0 ? -0.5 * (words.length - 1) * lineHeight + 'em' : lineHeight + 'em')
          .text(words[i]);
      }
    });
  
  // Add tooltips
  node.append("title")
    .text(d => d.name);
  
  // Update positions on each tick of the simulation
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    
    node
      .attr("transform", d => `translate(${d.x},${d.y})`);
  });
  
  // Drag functions
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

// Ethical Framework Visualization
function initEthicalFrameworkVisualization() {
  const container = document.getElementById('ethical-framework-visualization');
  if (!container) return;
  
  const width = container.clientWidth;
  const height = 500;
  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'ethical-framework-svg');
  
  // Define the data structure for the Ethical Framework
  const data = {
    name: "Ethical Framework",
    children: [
      {
        name: "Core Principles",
        children: [
          { name: "Sacred Support", value: 40 },
          { name: "User Sovereignty", value: 40 },
          { name: "Truth-Seeking with Care", value: 40 },
          { name: "Privacy by Design", value: 40 },
          { name: "Ethical Intelligence", value: 40 }
        ]
      },
      {
        name: "Implementation Mechanisms",
        children: [
          { name: "Consent-First Protocols", value: 35 },
          { name: "User Sovereignty Mechanisms", value: 35 },
          { name: "Privacy Architecture", value: 35 },
          { name: "Transparency Mechanisms", value: 35 }
        ]
      },
      {
        name: "Ethical Guardrails",
        children: [
          { name: "Trauma-Aware Protocols", value: 30 },
          { name: "Bias Detection Mechanisms", value: 30 },
          { name: "Safety Thresholds", value: 30 }
        ]
      }
    ]
  };
  
  // Create a hierarchical layout
  const root = d3.hierarchy(data)
    .sum(d => d.value || 0);
  
  // Create a treemap layout
  const treemap = d3.treemap()
    .size([width, height])
    .padding(4)
    .round(true);
  
  // Apply the treemap layout to the hierarchy
  treemap(root);
  
  // Color scale for different categories
  const colorScale = d3.scaleOrdinal()
    .domain(["Core Principles", "Implementation Mechanisms", "Ethical Guardrails"])
    .range(["#8338ec", "#3a86ff", "#ff006e"]);
  
  // Create cell groups
  const cell = svg.selectAll("g")
    .data(root.descendants().filter(d => d.depth > 0))
    .enter().append("g")
    .attr("transform", d => `translate(${d.x0},${d.y0})`);
  
  // Add rectangles to cells
  cell.append("rect")
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill", d => d.depth === 1 ? colorScale(d.data.name) : d3.color(colorScale(d.parent.data.name)).brighter(0.5))
    .attr("stroke", d => d.depth === 1 ? "#fff" : colorScale(d.parent.data.name))
    .attr("stroke-width", 2);
  
  // Add labels to cells
  cell.append("text")
    .attr("x", 5)
    .attr("y", 15)
    .attr("fill", "#fff")
    .attr("font-size", d => d.depth === 1 ? "14px" : "12px")
    .attr("font-weight", d => d.depth === 1 ? "bold" : "normal")
    .text(d => d.data.name)
    .each(function(d) {
      // Check if text fits in the cell
      const cellWidth = d.x1 - d.x0;
      const cellHeight = d.y1 - d.y0;
      const textLength = this.getComputedTextLength();
      
      if (textLength > cellWidth - 10) {
        // If text doesn't fit, truncate it
        const text = d3.select(this);
        let textContent = d.data.name;
        
        while (text.node().getComputedTextLength() > cellWidth - 10 && textContent.length > 0) {
          textContent = textContent.slice(0, -1);
          text.text(textContent + "...");
        }
      }
      
      // Hide text if cell is too small
      if (cellHeight < 20 || cellWidth < 30) {
        d3.select(this).style("display", "none");
      }
    });
  
  // Add tooltips
  cell.append("title")
    .text(d => `${d.ancestors().map(d => d.data.name).reverse().join(" > ")}\nValue: ${d.value}`);
  
  // Add interactivity
  cell.on("mouseover", function() {
    d3.select(this).select("rect")
      .transition()
      .duration(300)
      .attr("opacity", 0.8);
  })
  .on("mouseout", function() {
    d3.select(this).select("rect")
      .transition()
      .duration(300)
      .attr("opacity", 1);
  })
  .on("click", function(event, d) {
    // Show more information about the selected item
    const infoPanel = document.getElementById('ethics-info-panel');
    if (infoPanel) {
      infoPanel.innerHTML = `
        <h3>${d.data.name}</h3>
        <p>Category: ${d.depth === 1 ? "Main Category" : d.parent.data.name}</p>
        <p>Value: ${d.value}</p>
      `;
      infoPanel.style.display = 'block';
    }
  });
}

// User Flow Diagram
function initUserFlowDiagram() {
  const container = document.getElementById('user-flow-diagram');
  if (!container) return;
  
  const width = container.clientWidth;
  const height = 600;
  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'user-flow-svg');
  
  // Define the data structure for user flows
  const data = {
    nodes: [
      { id: "start", label: "Start", type: "start" },
      { id: "onboarding", label: "Onboarding", type: "process" },
      { id: "consent", label: "Consent Collection", type: "decision" },
      { id: "journal", label: "Journal Interface", type: "interface" },
      { id: "memory", label: "Memory Interface", type: "interface" },
      { id: "breath", label: "Breath Interface", type: "interface" },
      { id: "rituals", label: "Rituals Interface", type: "interface" },
      { id: "daily_checkin", label: "Daily Check-in Ritual", type: "ritual" },
      { id: "tech_horizon", label: "Technology Horizon Ritual", type: "ritual" },
      { id: "memory_vault", label: "Memory Vault Access", type: "ritual" },
      { id: "emotional_support", label: "Emotional Support Micro-Ritual", type: "ritual" },
      { id: "end", label: "End Session", type: "end" }
    ],
    links: [
      { source: "start", target: "onboarding" },
      { source: "onboarding", target: "consent" },
      { source: "consent", target: "journal" },
      { source: "journal", target: "daily_checkin" },
      { source: "journal", target: "emotional_support" },
      { source: "journal", target: "memory" },
      { source: "memory", target: "memory_vault" },
      { source: "memory", target: "journal" },
      { source: "breath", target: "journal" },
      { source: "breath", target: "rituals" },
      { source: "rituals", target: "tech_horizon" },
      { source: "rituals", target: "daily_checkin" },
      { source: "rituals", target: "memory_vault" },
      { source: "daily_checkin", target: "end" },
      { source: "tech_horizon", target: "end" },
      { source: "memory_vault", target: "end" },
      { source: "emotional_support", target: "end" }
    ]
  };
  
  // Create a directed graph layout
  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
    .force("charge", d3.forceManyBody().strength(-500))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("y", d3.forceY().strength(0.1))
    .force("x", d3.forceX().strength(0.1));
  
  // Define arrow markers for directed links
  svg.append("defs").append("marker")
    .attr("id", "arrowhead")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 20)
    .attr("refY", 0)
    .attr("orient", "auto")
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "#999");
  
  // Create links
  const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
    .attr("stroke", "#999")
    .attr("stroke-width", 2)
    .attr("marker-end", "url(#arrowhead)");
  
  // Color scale for different node types
  const colorScale = d3.scaleOrdinal()
    .domain(["start", "process", "decision", "interface", "ritual", "end"])
    .range(["#4CAF50", "#2196F3", "#FFC107", "#9C27B0", "#FF5722", "#F44336"]);
  
  // Shape function for different node types
  function nodeShape(type) {
    switch(type) {
      case "start":
      case "end":
        return d3.symbol().type(d3.symbolCircle).size(700);
      case "decision":
        return d3.symbol().type(d3.symbolDiamond).size(700);
      case "process":
        return d3.symbol().type(d3.symbolSquare).size(700);
      case "interface":
        return d3.symbol().type(d3.symbolTriangle).size(700);
      case "ritual":
        return d3.symbol().type(d3.symbolStar).size(700);
      default:
        return d3.symbol().type(d3.symbolCircle).size(700);
    }
  }
  
  // Create node groups
  const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
  
  // Add shapes to nodes
  node.append("path")
    .attr("d", d => nodeShape(d.type)())
    .attr("fill", d => colorScale(d.type))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);
  
  // Add labels to nodes
  node.append("text")
    .attr("dx", 15)
    .attr("dy", 5)
    .text(d => d.label)
    .attr("fill", "#333")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");
  
  // Add tooltips
  node.append("title")
    .text(d => `${d.label} (${d.type})`);
  
  // Update positions on each tick of the simulation
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => {
        // Adjust end point to stop at the edge of the target node
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const ratio = (length - 20) / length;
        return d.source.x + dx * ratio;
      })
      .attr("y2", d => {
        // Adjust end point to stop at the edge of the target node
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const ratio = (length - 20) / length;
        return d.source.y + dy * ratio;
      });
    
    node
      .attr("transform", d => `translate(${d.x},${d.y})`);
  });
  
  // Drag functions
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

// Initialize all visualizations when the page loads
document.addEventListener('DOMContentLoaded', function() {
  initVisualizations();
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initVisualizations,
    initDualityModelVisualization,
    initComponentRelationshipDiagram,
    initEthicalFrameworkVisualization,
    initUserFlowDiagram
  };
}
