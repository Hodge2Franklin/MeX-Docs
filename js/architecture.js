// Architecture page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add interactive hover effects for diagram components
    const mirrorComponent = document.querySelector('.mirror-component');
    const bridgeComponent = document.querySelector('.bridge-component');
    const mcpLayers = document.querySelectorAll('.mcp-layer');
    
    // Function to highlight connections when hovering over components
    function setupComponentInteractions() {
        // Mirror component interactions
        if (mirrorComponent) {
            mirrorComponent.addEventListener('mouseenter', function() {
                document.querySelectorAll('.user-mirror path, .mirror-user path, .mirror-bridge path').forEach(path => {
                    path.setAttribute('stroke-width', '3');
                    path.setAttribute('stroke-dasharray', '8,3');
                });
            });
            
            mirrorComponent.addEventListener('mouseleave', function() {
                document.querySelectorAll('.user-mirror path, .mirror-user path, .mirror-bridge path').forEach(path => {
                    path.setAttribute('stroke-width', '2');
                    path.setAttribute('stroke-dasharray', '5,5');
                });
            });
        }
        
        // Bridge component interactions
        if (bridgeComponent) {
            bridgeComponent.addEventListener('mouseenter', function() {
                document.querySelectorAll('.bridge-external path, .external-bridge path, .mirror-bridge path').forEach(path => {
                    path.setAttribute('stroke-width', '3');
                    path.setAttribute('stroke-dasharray', '8,3');
                });
            });
            
            bridgeComponent.addEventListener('mouseleave', function() {
                document.querySelectorAll('.bridge-external path, .external-bridge path, .mirror-bridge path').forEach(path => {
                    path.setAttribute('stroke-width', '2');
                    path.setAttribute('stroke-dasharray', '5,5');
                });
            });
        }
    }
    
    // Setup responsive behavior for SVG diagram
    function setupResponsiveDiagram() {
        const svg = document.getElementById('architecture-svg');
        if (svg) {
            // Ensure SVG is responsive
            window.addEventListener('resize', function() {
                // Adjust viewBox if needed for different screen sizes
                if (window.innerWidth < 576) {
                    svg.setAttribute('viewBox', '0 0 800 600');
                } else {
                    svg.setAttribute('viewBox', '0 0 800 600');
                }
            });
            
            // Trigger resize event to set initial state
            window.dispatchEvent(new Event('resize'));
        }
    }
    
    // Initialize diagram interactions
    function initDiagram() {
        setupComponentInteractions();
        setupResponsiveDiagram();
        
        // Add fallback for browsers that don't support SVG well
        const svgContainer = document.querySelector('.svg-container');
        if (svgContainer && !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) {
            svgContainer.innerHTML = '<div class="svg-fallback"><p>Your browser does not support SVG. Please use a modern browser to view the architecture diagram.</p></div>';
        }
    }
    
    // Initialize the diagram
    initDiagram();
});
