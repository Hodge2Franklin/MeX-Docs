// Interactive diagrams for the MeX AI Companion documentation website

// Initialize all interactive diagrams
function initInteractiveDiagrams() {
  initDualityModelInteractiveDiagram();
  initComponentFlowDiagram();
  initEthicalFrameworkDiagram();
  initUserJourneyDiagram();
}

// Interactive Duality Model Diagram
function initDualityModelInteractiveDiagram() {
  const container = document.getElementById('duality-model-interactive');
  if (!container) return;
  
  const width = container.clientWidth;
  const height = 600;
  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'duality-model-interactive-svg');
  
  // Define the data structure for the Duality Model
  const data = {
    nodes: [
      // Core components
      { id: "mirror", name: "Mirror Component", type: "core", x: width * 0.25, y: height * 0.3, radius: 80 },
      { id: "bridge", name: "Bridge Component", type: "core", x: width * 0.75, y: height * 0.3, radius: 80 },
      { id: "synthesis", name: "Synthesis Layer", type: "core", x: width * 0.5, y: height * 0.5, radius: 80 },
      
      // Mirror subcomponents
      { id: "input-processing", name: "Input Processing", type: "mirror-sub", x: width * 0.15, y: height * 0.15, radius: 40 },
      { id: "emotional-sensing", name: "Emotional Sensing", type: "mirror-sub", x: width * 0.25, y: height * 0.1, radius: 40 },
      { id: "pattern-recognition", name: "Pattern Recognition", type: "mirror-sub", x: width * 0.35, y: height * 0.15, radius: 40 },
      { id: "need-detection", name: "Need Detection", type: "mirror-sub", x: width * 0.1, y: height * 0.25, radius: 40 },
      { id: "archetype-modeling", name: "Archetype Modeling", type: "mirror-sub", x: width * 0.4, y: height * 0.25, radius: 40 },
      { id: "reflection-generation", name: "Reflection Generation", type: "mirror-sub", x: width * 0.25, y: height * 0.45, radius: 40 },
      
      // Bridge subcomponents
      { id: "external-discovery", name: "External Discovery", type: "bridge-sub", x: width * 0.65, y: height * 0.15, radius: 40 },
      { id: "truth-filtering", name: "Truth Filtering", type: "bridge-sub", x: width * 0.75, y: height * 0.1, radius: 40 },
      { id: "content-curation", name: "Content Curation", type: "bridge-sub", x: width * 0.85, y: height * 0.15, radius: 40 },
      { id: "perspective-generation", name: "Perspective Generation", type: "bridge-sub", x: width * 0.6, y: height * 0.25, radius: 40 },
      { id: "contextual-framing", name: "Contextual Framing", type: "bridge-sub", x: width * 0.9, y: height * 0.25, radius: 40 },
      { id: "connection-finding", name: "Connection Finding", type: "bridge-sub", x: width * 0.75, y: height * 0.45, radius: 40 },
      
      // Synthesis subcomponents
      { id: "state-management", name: "State Management", type: "synthesis-sub", x: width * 0.4, y: height * 0.6, radius: 40 },
      { id: "transition-control", name: "Transition Control", type: "synthesis-sub", x: width * 0.5, y: height * 0.7, radius: 40 },
      { id: "ethical-checking", name: "Ethical Checking", type: "synthesis-sub", x: width * 0.6, y: height * 0.6, radius: 40 },
      { id: "joy-optimization", name: "Joy Optimization", type: "synthesis-sub", x: width * 0.35, y: height * 0.8, radius: 40 },
      { id: "decision-making", name: "Decision Making", type: "synthesis-sub", x: width * 0.5, y: height * 0.9, radius: 40 },
      { id: "experience-coordination", name: "Experience Coordination", type: "synthesis-sub", x: width * 0.65, y: height * 0.8, radius: 40 }
    ],
    links: [
      // Core component connections
      { source: "mirror", target: "synthesis", value: 5 },
      { source: "synthesis", target: "bridge", value: 5 },
      { source: "bridge", target: "synthesis", value: 5 },
      { source: "synthesis", target: "mirror", value: 5 },
      
      // Mirror subcomponent connections
      { source: "mirror", target: "input-processing", value: 3 },
      { source: "mirror", target: "emotional-sensing", value: 3 },
      { source: "mirror", target: "pattern-recognition", value: 3 },
      { source: "mirror", target: "need-detection", value: 3 },
      { source: "mirror", target: "archetype-modeling", value: 3 },
      { source: "mirror", target: "reflection-generation", value: 3 },
      
      // Bridge subcomponent connections
      { source: "bridge", target: "external-discovery", value: 3 },
      { source: "bridge", target: "truth-filtering", value: 3 },
      { source: "bridge", target: "content-curation", value: 3 },
      { source: "bridge", target: "perspective-generation", value: 3 },
      { source: "bridge", target: "contextual-framing", value: 3 },
      { source: "bridge", target: "connection-finding", value: 3 },
      
      // Synthesis subcomponent connections
      { source: "synthesis", target: "state-management", value: 3 },
      { source: "synthesis", target: "transition-control", value: 3 },
      { source: "synthesis", target: "ethical-checking", value: 3 },
      { source: "synthesis", target: "joy-optimization", value: 3 },
      { source: "synthesis", target: "decision-making", value: 3 },
      { source: "synthesis", target: "experience-coordination", value: 3 },
      
      // Cross-component connections
      { source: "reflection-generation", target: "state-management", value: 2 },
      { source: "state-management", target: "transition-control", value: 2 },
      { source: "transition-control", target: "ethical-checking", value: 2 },
      { source: "ethical-checking", target: "perspective-generation", value: 2 },
      { source: "connection-finding", target: "experience-coordination", value: 2 },
      { source: "experience-coordination", target: "decision-making", value: 2 },
      { source: "decision-making", target: "joy-optimization", value: 2 },
      { source: "joy-optimization", target: "reflection-generation", value: 2 }
    ]
  };
  
  // Create a force simulation
  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(d => {
      if (d.source.type === "core" && d.target.type === "core") return 200;
      return 100;
    }))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("x", d3.forceX().x(d => d.x).strength(0.5))
    .force("y", d3.forceY().y(d => d.y).strength(0.5))
    .force("collision", d3.forceCollide().radius(d => d.radius + 5));
  
  // Color scale for different component types
  const colorScale = d3.scaleOrdinal()
    .domain(["core", "mirror-sub", "bridge-sub", "synthesis-sub"])
    .range(["#6a4c93", "#4c6a93", "#936a4c", "#934c6a"]);
  
  // Create links
  const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter().append("line")
    .attr("stroke-width", d => Math.sqrt(d.value))
    .attr("stroke", d => {
      if (d.source.type === "core" && d.target.type === "core") return "#333";
      if (d.source.type === "mirror-sub" || d.target.type === "mirror-sub") return "#4c6a93";
      if (d.source.type === "bridge-sub" || d.target.type === "bridge-sub") return "#936a4c";
      return "#934c6a";
    })
    .attr("stroke-opacity", 0.6);
  
  // Create node groups
  const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
    .attr("class", d => `node ${d.type}`)
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
  
  // Add circles to nodes
  node.append("circle")
    .attr("r", d => d.type === "core" ? 50 : 25)
    .attr("fill", d => colorScale(d.type))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);
  
  // Add labels to nodes
  node.append("text")
    .text(d => d.name)
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-size", d => d.type === "core" ? "14px" : "10px")
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
  
  // Add interactivity
  node.on("mouseover", function(event, d) {
    // Highlight connected nodes and links
    const connectedNodeIds = data.links
      .filter(link => link.source.id === d.id || link.target.id === d.id)
      .flatMap(link => [link.source.id, link.target.id]);
    
    node.classed("node-highlight", n => n.id === d.id);
    node.classed("node-connected", n => n.id !== d.id && connectedNodeIds.includes(n.id));
    
    link.classed("link-highlight", l => l.source.id === d.id || l.target.id === d.id);
    
    // Show component details
    const detailsPanel = document.getElementById('component-details-panel');
    if (detailsPanel) {
      let html = `<h4>${d.name}</h4>`;
      
      if (d.type === "core") {
        if (d.id === "mirror") {
          html += `<p>The inward-focused engine of the MeX AI Companion, designed to develop a deep understanding of the user.</p>`;
        } else if (d.id === "bridge") {
          html += `<p>The outward-facing engine of the MeX AI Companion, designed to connect the user with external information and perspectives.</p>`;
        } else if (d.id === "synthesis") {
          html += `<p>The dynamic interplay layer that manages the flow between the Mirror and Bridge components.</p>`;
        }
      } else if (d.type === "mirror-sub") {
        html += `<p>A subcomponent of the Mirror Component that contributes to user understanding.</p>`;
      } else if (d.type === "bridge-sub") {
        html += `<p>A subcomponent of the Bridge Component that helps connect users with external information.</p>`;
      } else if (d.type === "synthesis-sub") {
        html += `<p>A subcomponent of the Synthesis Layer that helps manage the dynamic interplay between Mirror and Bridge.</p>`;
      }
      
      html += `<p>Connected to ${connectedNodeIds.length - 1} other components.</p>`;
      
      detailsPanel.innerHTML = html;
      detailsPanel.style.display = 'block';
    }
  })
  .on("mouseout", function() {
    // Remove highlighting
    node.classed("node-highlight", false);
    node.classed("node-connected", false);
    link.classed("link-highlight", false);
  })
  .on("click", function(event, d) {
    // Toggle visibility of subcomponents
    if (d.type === "core") {
      const subType = d.id + "-sub";
      const isVisible = !node.filter(n => n.type === subType).classed("hidden");
      
      node.filter(n => n.type === subType).classed("hidden", isVisible);
      link.filter(l => l.source.type === subType || l.target.type === subType).classed("hidden", isVisible);
      
      // Update simulation
      simulation.alpha(0.3).restart();
    }
  });
  
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
  
  // Add legend
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(20, ${height - 100})`);
  
  const legendItems = [
    { type: "core", label: "Core Components" },
    { type: "mirror-sub", label: "Mirror Subcomponents" },
    { type: "bridge-sub", label: "Bridge Subcomponents" },
    { type: "synthesis-sub", label: "Synthesis Subcomponents" }
  ];
  
  legendItems.forEach((item, i) => {
    const legendItem = legend.append("g")
      .attr("transform", `translate(0, ${i * 25})`);
    
    legendItem.append("circle")
      .attr("r", 10)
      .attr("fill", colorScale(item.type));
    
    legendItem.append("text")
      .attr("x", 20)
      .attr("y", 5)
      .text(item.label);
  });
  
  // Add instructions
  svg.append("text")
    .attr("x", 20)
    .attr("y", 30)
    .attr("class", "instructions")
    .text("Click on core components to toggle subcomponents. Hover for details.");
  
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

// Interactive Component Flow Diagram
function initComponentFlowDiagram() {
  const container = document.getElementById('component-flow-diagram');
  if (!container) return;
  
  const width = container.clientWidth;
  const height = 500;
  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'component-flow-svg');
  
  // Define the data structure for the component flow
  const data = {
    nodes: [
      { id: "user-input", name: "User Input", type: "input", x: width * 0.1, y: height * 0.5 },
      { id: "input-processing", name: "Input Processing", type: "process", x: width * 0.25, y: height * 0.3 },
      { id: "mirror", name: "Mirror Component", type: "core", x: width * 0.4, y: height * 0.5 },
      { id: "synthesis", name: "Synthesis Layer", type: "core", x: width * 0.6, y: height * 0.5 },
      { id: "bridge", name: "Bridge Component", type: "core", x: width * 0.8, y: height * 0.5 },
      { id: "memory", name: "Memory System", type: "support", x: width * 0.5, y: height * 0.2 },
      { id: "ethics", name: "Ethics Engine", type: "support", x: width * 0.5, y: height * 0.8 },
      { id: "response", name: "Response Generation", type: "process", x: width * 0.75, y: height * 0.7 },
      { id: "user-output", name: "User Output", type: "output", x: width * 0.9, y: height * 0.5 }
    ],
    links: [
      { source: "user-input", target: "input-processing", type: "flow" },
      { source: "input-processing", target: "mirror", type: "flow" },
      { source: "mirror", target: "synthesis", type: "flow" },
      { source: "synthesis", target: "bridge", type: "flow" },
      { source: "bridge", target: "response", type: "flow" },
      { source: "response", target: "user-output", type: "flow" },
      { source: "mirror", target: "memory", type: "data" },
      { source: "memory", target: "mirror", type: "data" },
      { source: "memory", target: "synthesis", type: "data" },
      { source: "synthesis", target: "ethics", type: "check" },
      { source: "ethics", target: "synthesis", type: "check" },
      { source: "ethics", target: "response", type: "check" }
    ]
  };
  
  // Create a force simulation
  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-500))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("x", d3.forceX().x(d => d.x).strength(0.5))
    .force("y", d3.forceY().y(d => d.y).strength(0.5))
    .force("collision", d3.forceCollide().radius(50));
  
  // Define arrow markers for directed links
  svg.append("defs").selectAll("marker")
    .data(["flow", "data", "check"])
    .enter().append("marker")
    .attr("id", d => `arrow-${d}`)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", d => {
      if (d === "flow") return "#333";
      if (d === "data") return "#4CAF50";
      return "#FFC107";
    });
  
  // Color scale for different node types
  const colorScale = d3.scaleOrdinal()
    .domain(["input", "process", "core", "support", "output"])
    .range(["#2196F3", "#9C27B0", "#6a4c93", "#4CAF50", "#FF5722"]);
  
  // Create links
  const link = svg.append("g")
    .attr("class", "links")
    .selectAll("path")
    .data(data.links)
    .enter().append("path")
    .attr("class", d => `link link-${d.type}`)
    .attr("stroke", d => {
      if (d.type === "flow") return "#333";
      if (d.type === "data") return "#4CAF50";
      return "#FFC107";
    })
    .attr("stroke-width", 2)
    .attr("fill", "none")
    .attr("marker-end", d => `url(#arrow-${d.type})`);
  
  // Create node groups
  const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(data.nodes)
    .enter().append("g")
    .attr("class", d => `node node-${d.type}`)
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));
  
  // Add rectangles to nodes
  node.append("rect")
    .attr("width", 120)
    .attr("height", 60)
    .attr("x", -60)
    .attr("y", -30)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("fill", d => colorScale(d.type))
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);
  
  // Add labels to nodes
  node.append("text")
    .text(d => d.name)
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("font-size", "12px")
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
  
  // Add interactivity
  node.on("mouseover", function(event, d) {
    // Highlight connected nodes and links
    const connectedLinks = data.links.filter(link => link.source.id === d.id || link.target.id === d.id);
    const connectedNodeIds = connectedLinks.flatMap(link => [link.source.id, link.target.id]);
    
    node.classed("node-highlight", n => n.id === d.id);
    node.classed("node-connected", n => n.id !== d.id && connectedNodeIds.includes(n.id));
    
    link.classed("link-highlight", l => l.source.id === d.id || l.target.id === d.id);
    
    // Show component details
    const detailsPanel = document.getElementById('flow-details-panel');
    if (detailsPanel) {
      let html = `<h4>${d.name}</h4>`;
      
      if (d.type === "input") {
        html += `<p>User inputs including text, voice, touch, and breath patterns.</p>`;
      } else if (d.type === "process") {
        html += `<p>Processing stage that transforms data between core components.</p>`;
      } else if (d.type === "core") {
        if (d.id === "mirror") {
          html += `<p>Analyzes user inputs to develop deep understanding.</p>`;
        } else if (d.id === "synthesis") {
          html += `<p>Manages the flow between Mirror and Bridge components.</p>`;
        } else if (d.id === "bridge") {
          html += `<p>Connects user understanding with external information.</p>`;
        }
      } else if (d.type === "support") {
        if (d.id === "memory") {
          html += `<p>Stores and retrieves user interactions and patterns.</p>`;
        } else if (d.id === "ethics") {
          html += `<p>Ensures all interactions adhere to ethical principles.</p>`;
        }
      } else if (d.type === "output") {
        html += `<p>User-facing outputs including text, voice, haptics, and visual elements.</p>`;
      }
      
      html += `<p>Connected to ${connectedNodeIds.length - 1} other components.</p>`;
      
      detailsPanel.innerHTML = html;
      detailsPanel.style.display = 'block';
    }
  })
  .on("mouseout", function() {
    // Remove highlighting
    node.classed("node-highlight", false);
    node.classed("node-connected", false);
    link.classed("link-highlight", false);
  });
  
  // Update positions on each tick of the simulation
  simulation.on("tick", () => {
    // Update link paths
    link.attr("d", d => {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const dr = Math.sqrt(dx * dx + dy * dy);
      
      // Create curved paths
      if (d.type === "data" || d.type === "check") {
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      }
      
      // Create straight paths for flow
      return `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`;
    });
    
    node
      .attr("transform", d => `translate(${d.x},${d.y})`);
  });
  
  // Add legend
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(20, ${height - 150})`);
  
  const nodeLegendItems = [
    { type: "input", label: "Input" },
    { type: "process", label: "Process" },
    { type: "core", label: "Core Component" },
    { type: "support", label: "Support System" },
    { type: "output", label: "Output" }
  ];
  
  nodeLegendItems.forEach((item, i) => {
    const legendItem = legend.append("g")
      .attr("transform", `translate(0, ${i * 25})`);
    
    legendItem.append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", colorScale(item.type));
    
    legendItem.append("text")
      .attr("x", 30)
      .attr("y", 15)
      .text(item.label);
  });
  
  const linkLegend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 150}, ${height - 100})`);
  
  const linkLegendItems = [
    { type: "flow", label: "Data Flow", color: "#333" },
    { type: "data", label: "Memory Access", color: "#4CAF50" },
    { type: "check", label: "Ethical Check", color: "#FFC107" }
  ];
  
  linkLegendItems.forEach((item, i) => {
    const legendItem = linkLegend.append("g")
      .attr("transform", `translate(0, ${i * 25})`);
    
    legendItem.append("line")
      .attr("x1", 0)
      .attr("y1", 10)
      .attr("x2", 30)
      .attr("y2", 10)
      .attr("stroke", item.color)
      .attr("stroke-width", 2);
    
    legendItem.append("text")
      .attr("x", 40)
      .attr("y", 15)
      .text(item.label);
  });
  
  // Add instructions
  svg.append("text")
    .attr("x", 20)
    .attr("y", 30)
    .attr("class", "instructions")
    .text("Hover over components to see details and connections.");
  
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

// Interactive Ethical Framework Diagram
function initEthicalFrameworkDiagram() {
  const container = document.getElementById('ethical-framework-interactive');
  if (!container) return;
  
  const width = container.clientWidth;
  const height = 600;
  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'ethical-framework-svg');
  
  // Define the data structure for the ethical framework
  const data = {
    name: "Ethical Framework",
    children: [
      {
        name: "Core Principles",
        children: [
          { 
            name: "Sacred Support", 
            value: 100,
            description: "Treating the relationship with each user as sacred—worthy of profound respect, care, and protection."
          },
          { 
            name: "User Sovereignty", 
            value: 100,
            description: "Respecting and enhancing user autonomy, ensuring users maintain control over their experience and data."
          },
          { 
            name: "Truth-Seeking with Care", 
            value: 100,
            description: "Balancing commitment to truth and accuracy with sensitivity to user context and emotional state."
          },
          { 
            name: "Privacy by Design", 
            value: 100,
            description: "Integrating privacy protection into every aspect of architecture and operation."
          },
          { 
            name: "Ethical Intelligence", 
            value: 100,
            description: "Continuously learning and improving ethical reasoning and decision-making capabilities."
          }
        ]
      },
      {
        name: "Implementation Mechanisms",
        children: [
          { 
            name: "Consent-First Protocols", 
            value: 70,
            description: "Clear, specific permission requests with ongoing consent management and easy withdrawal options."
          },
          { 
            name: "User Sovereignty Mechanisms", 
            value: 70,
            description: "User-controlled interaction preferences with transparent system explanations and agency-enhancing design."
          },
          { 
            name: "Privacy Architecture", 
            value: 70,
            description: "Local-first processing with differential privacy techniques and secure, encrypted storage."
          },
          { 
            name: "Transparency Mechanisms", 
            value: 70,
            description: "Explainable AI approaches with system capability disclosures and data usage visibility."
          }
        ]
      },
      {
        name: "Ethical Guardrails",
        children: [
          { 
            name: "Trauma-Aware Protocols", 
            value: 50,
            description: "Detection of emotional distress signals with appropriate response scaling and professional support referral when needed."
          },
          { 
            name: "Bias Detection Mechanisms", 
            value: 50,
            description: "Regular bias auditing with diverse training data and ongoing monitoring and correction."
          },
          { 
            name: "Safety Thresholds", 
            value: 50,
            description: "Clear boundaries that trigger special handling or escalation for concerning situations."
          }
        ]
      }
    ]
  };
  
  // Create a hierarchical layout
  const root = d3.hierarchy(data)
    .sum(d => d.value || 0);
  
  // Create a sunburst layout
  const partition = d3.partition()
    .size([2 * Math.PI, Math.min(width, height) / 2 - 10])
    .padding(0.02);
  
  partition(root);
  
  // Color scale for different categories
  const colorScale = d3.scaleOrdinal()
    .domain(["Core Principles", "Implementation Mechanisms", "Ethical Guardrails"])
    .range(["#8338ec", "#3a86ff", "#ff006e"]);
  
  // Create an arc generator
  const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1);
  
  // Create a group for the sunburst
  const g = svg.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);
  
  // Create path elements for each arc
  const path = g.selectAll("path")
    .data(root.descendants().slice(1)) // Skip the root node
    .enter().append("path")
    .attr("d", arc)
    .attr("fill", d => {
      while (d.depth > 1) d = d.parent;
      return colorScale(d.data.name);
    })
    .attr("opacity", 0.8)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1);
  
  // Add labels
  const label = g.selectAll("text")
    .data(root.descendants().slice(1))
    .enter().append("text")
    .attr("transform", d => {
      const x = (d.x0 + d.x1) / 2;
      const y = (d.y0 + d.y1) / 2;
      const angle = x - Math.PI / 2;
      const radius = y;
      return `rotate(${angle * 180 / Math.PI}) translate(${radius},0) rotate(${angle >= Math.PI ? 180 : 0})`;
    })
    .attr("dx", d => d.depth === 1 ? "-0.5em" : (d.x0 + d.x1) / 2 > Math.PI ? "-0.5em" : "0.5em")
    .attr("dy", ".35em")
    .attr("text-anchor", d => d.depth === 1 ? "end" : (d.x0 + d.x1) / 2 > Math.PI ? "end" : "start")
    .attr("font-size", d => d.depth === 1 ? "14px" : "10px")
    .attr("fill", "#fff")
    .text(d => d.data.name)
    .style("display", d => {
      const angle = (d.x1 - d.x0) * 180 / Math.PI;
      return angle > 10 ? null : "none"; // Hide labels for small arcs
    });
  
  // Add interactivity
  path.on("mouseover", function(event, d) {
    // Highlight the current path
    d3.select(this)
      .transition()
      .duration(300)
      .attr("opacity", 1)
      .attr("stroke-width", 2);
    
    // Show details
    const detailsPanel = document.getElementById('ethics-details-panel');
    if (detailsPanel) {
      let html = `<h4>${d.data.name}</h4>`;
      
      if (d.data.description) {
        html += `<p>${d.data.description}</p>`;
      }
      
      if (d.depth === 1) {
        html += `<p>Contains ${d.children.length} elements:</p>`;
        html += `<ul>`;
        d.children.forEach(child => {
          html += `<li>${child.data.name}</li>`;
        });
        html += `</ul>`;
      }
      
      detailsPanel.innerHTML = html;
      detailsPanel.style.display = 'block';
    }
  })
  .on("mouseout", function() {
    // Restore original appearance
    d3.select(this)
      .transition()
      .duration(300)
      .attr("opacity", 0.8)
      .attr("stroke-width", 1);
  })
  .on("click", function(event, d) {
    // Zoom in on click
    parent.datum(d.parent || root);
    
    root.each(d => d.target = {
      x0: Math.max(0, Math.min(1, (d.x0 - d.x0) / (d.x1 - d.x0))) * 2 * Math.PI,
      x1: Math.max(0, Math.min(1, (d.x1 - d.x0) / (d.x1 - d.x0))) * 2 * Math.PI,
      y0: Math.max(0, d.y0 - d.y0),
      y1: Math.max(0, d.y1 - d.y0)
    });
    
    const t = g.transition().duration(750);
    
    path.transition(t)
      .tween("data", d => {
        const i = d3.interpolate(d.current, d.target);
        return t => d.current = i(t);
      })
      .attr("d", arc);
    
    label.transition(t)
      .attr("transform", d => {
        const x = (d.x0 + d.x1) / 2;
        const y = (d.y0 + d.y1) / 2;
        const angle = x - Math.PI / 2;
        const radius = y;
        return `rotate(${angle * 180 / Math.PI}) translate(${radius},0) rotate(${angle >= Math.PI ? 180 : 0})`;
      })
      .style("display", d => {
        const angle = (d.x1 - d.x0) * 180 / Math.PI;
        return angle > 10 ? null : "none";
      });
  });
  
  // Add center circle with label
  g.append("circle")
    .attr("r", 40)
    .attr("fill", "#6a4c93")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);
  
  g.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "-0.2em")
    .attr("font-size", "14px")
    .attr("fill", "#fff")
    .text("Ethical");
  
  g.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "1em")
    .attr("font-size", "14px")
    .attr("fill", "#fff")
    .text("Framework");
  
  // Add legend
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(20, ${height - 100})`);
  
  const legendItems = [
    { name: "Core Principles", color: colorScale("Core Principles") },
    { name: "Implementation Mechanisms", color: colorScale("Implementation Mechanisms") },
    { name: "Ethical Guardrails", color: colorScale("Ethical Guardrails") }
  ];
  
  legendItems.forEach((item, i) => {
    const legendItem = legend.append("g")
      .attr("transform", `translate(0, ${i * 25})`);
    
    legendItem.append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", item.color);
    
    legendItem.append("text")
      .attr("x", 30)
      .attr("y", 15)
      .text(item.name);
  });
  
  // Add instructions
  svg.append("text")
    .attr("x", 20)
    .attr("y", 30)
    .attr("class", "instructions")
    .text("Hover over sections to see details. Click to zoom in.");
}

// Interactive User Journey Diagram
function initUserJourneyDiagram() {
  const container = document.getElementById('user-journey-diagram');
  if (!container) return;
  
  const width = container.clientWidth;
  const height = 600;
  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'user-journey-svg');
  
  // Define the data structure for the user journey
  const data = {
    stages: [
      {
        name: "First Contact",
        description: "Initial introduction to MeX",
        steps: [
          { name: "Introduction", description: "User hears MeX introduction for the first time", type: "passive" },
          { name: "Consent Collection", description: "User provides initial consent for interaction", type: "active" },
          { name: "Capability Overview", description: "User learns about MeX capabilities", type: "passive" }
        ]
      },
      {
        name: "Early Relationship",
        description: "First meaningful interactions",
        steps: [
          { name: "Journal Setup", description: "User creates first journal entry", type: "active" },
          { name: "First Reflection", description: "MeX offers first reflection on user sharing", type: "passive" },
          { name: "Breath Practice", description: "User engages with breath interface", type: "active" },
          { name: "Daily Check-in", description: "User completes first daily ritual", type: "ritual" }
        ]
      },
      {
        name: "Relationship Development",
        description: "Deepening connection over time",
        steps: [
          { name: "Pattern Recognition", description: "MeX begins to recognize user patterns", type: "passive" },
          { name: "Memory Exploration", description: "User explores past interactions", type: "active" },
          { name: "Custom Ritual Creation", description: "User creates personal ritual", type: "ritual" },
          { name: "Emotional Support", description: "MeX provides support during difficult moment", type: "passive" }
        ]
      },
      {
        name: "Mature Relationship",
        description: "Deep, established connection",
        steps: [
          { name: "Intuitive Communication", description: "Communication becomes more intuitive and efficient", type: "passive" },
          { name: "Meaningful Rituals", description: "Rituals gain personal significance", type: "ritual" },
          { name: "Growth Recognition", description: "MeX helps user recognize personal growth", type: "passive" },
          { name: "Relationship Evolution", description: "Relationship continues to evolve and deepen", type: "active" }
        ]
      }
    ]
  };
  
  // Calculate layout dimensions
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  const stageWidth = innerWidth / data.stages.length;
  const stepHeight = 80;
  const stepSpacing = 20;
  
  // Create main group with margin
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // Create stage groups
  const stages = g.selectAll(".stage")
    .data(data.stages)
    .enter().append("g")
    .attr("class", "stage")
    .attr("transform", (d, i) => `translate(${i * stageWidth},0)`);
  
  // Add stage headers
  stages.append("rect")
    .attr("width", stageWidth - 10)
    .attr("height", 50)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", "#6a4c93");
  
  stages.append("text")
    .attr("x", (stageWidth - 10) / 2)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("fill", "#fff")
    .attr("font-weight", "bold")
    .text(d => d.name);
  
  // Create step groups
  const steps = stages.selectAll(".step")
    .data(d => d.steps)
    .enter().append("g")
    .attr("class", "step")
    .attr("transform", (d, i) => `translate(0,${70 + i * (stepHeight + stepSpacing)})`);
  
  // Color scale for different step types
  const colorScale = d3.scaleOrdinal()
    .domain(["active", "passive", "ritual"])
    .range(["#3a86ff", "#ff006e", "#8ac926"]);
  
  // Add step boxes
  steps.append("rect")
    .attr("width", stageWidth - 20)
    .attr("height", stepHeight)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("fill", d => colorScale(d.type))
    .attr("opacity", 0.8)
    .attr("stroke", "#fff")
    .attr("stroke-width", 1);
  
  // Add step names
  steps.append("text")
    .attr("x", (stageWidth - 20) / 2)
    .attr("y", 25)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("fill", "#fff")
    .attr("font-weight", "bold")
    .text(d => d.name);
  
  // Add step descriptions
  steps.append("text")
    .attr("x", (stageWidth - 20) / 2)
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("fill", "#fff")
    .attr("font-size", "10px")
    .text(d => {
      // Truncate description if too long
      return d.description.length > 30 ? d.description.substring(0, 27) + "..." : d.description;
    });
  
  // Add connecting lines between stages
  data.stages.forEach((stage, stageIndex) => {
    if (stageIndex < data.stages.length - 1) {
      stage.steps.forEach((step, stepIndex) => {
        const nextStage = data.stages[stageIndex + 1];
        if (nextStage.steps[stepIndex]) {
          g.append("path")
            .attr("d", () => {
              const x1 = stageIndex * stageWidth + (stageWidth - 20);
              const y1 = 70 + stepIndex * (stepHeight + stepSpacing) + stepHeight / 2;
              const x2 = (stageIndex + 1) * stageWidth;
              const y2 = 70 + stepIndex * (stepHeight + stepSpacing) + stepHeight / 2;
              return `M${x1},${y1}C${x1 + 20},${y1} ${x2 - 20},${y2} ${x2},${y2}`;
            })
            .attr("fill", "none")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "5,5");
        }
      });
    }
  });
  
  // Add interactivity
  steps.on("mouseover", function(event, d) {
    // Highlight the current step
    d3.select(this).select("rect")
      .transition()
      .duration(300)
      .attr("opacity", 1)
      .attr("stroke-width", 2);
    
    // Show details
    const detailsPanel = document.getElementById('journey-details-panel');
    if (detailsPanel) {
      let html = `<h4>${d.name}</h4>`;
      html += `<p>${d.description}</p>`;
      
      if (d.type === "active") {
        html += `<p><strong>Type:</strong> Active user engagement</p>`;
      } else if (d.type === "passive") {
        html += `<p><strong>Type:</strong> MeX-initiated interaction</p>`;
      } else if (d.type === "ritual") {
        html += `<p><strong>Type:</strong> Structured ritual experience</p>`;
      }
      
      detailsPanel.innerHTML = html;
      detailsPanel.style.display = 'block';
    }
  })
  .on("mouseout", function() {
    // Restore original appearance
    d3.select(this).select("rect")
      .transition()
      .duration(300)
      .attr("opacity", 0.8)
      .attr("stroke-width", 1);
  });
  
  // Add legend
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width - 200}, ${height - 100})`);
  
  const legendItems = [
    { type: "active", label: "User-Initiated" },
    { type: "passive", label: "MeX-Initiated" },
    { type: "ritual", label: "Ritual Experience" }
  ];
  
  legendItems.forEach((item, i) => {
    const legendItem = legend.append("g")
      .attr("transform", `translate(0, ${i * 25})`);
    
    legendItem.append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("fill", colorScale(item.type));
    
    legendItem.append("text")
      .attr("x", 30)
      .attr("y", 15)
      .text(item.label);
  });
  
  // Add title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .attr("font-weight", "bold")
    .text("User Journey with MeX AI Companion");
}

// Initialize all interactive diagrams when the page loads
document.addEventListener('DOMContentLoaded', function() {
  initInteractiveDiagrams();
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initInteractiveDiagrams,
    initDualityModelInteractiveDiagram,
    initComponentFlowDiagram,
    initEthicalFrameworkDiagram,
    initUserJourneyDiagram
  };
}
