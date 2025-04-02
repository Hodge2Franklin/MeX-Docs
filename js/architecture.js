// Architecture page interactive functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects for components
    const components = document.querySelectorAll('.component');
    components.forEach(component => {
        component.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
            
            // Highlight related connections
            if (this.classList.contains('mirror-component')) {
                document.querySelector('.user-mirror .connection-arrow').style.borderTopWidth = '3px';
                document.querySelector('.mirror-user .connection-arrow').style.borderTopWidth = '3px';
                document.querySelector('.mirror-bridge .connection-arrow').style.borderTopWidth = '3px';
            } else if (this.classList.contains('bridge-component')) {
                document.querySelector('.bridge-external .connection-arrow').style.borderTopWidth = '3px';
                document.querySelector('.external-bridge .connection-arrow').style.borderTopWidth = '3px';
                document.querySelector('.mirror-bridge .connection-arrow').style.borderTopWidth = '3px';
            }
        });
        
        component.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            
            // Reset connections
            document.querySelectorAll('.connection-arrow').forEach(arrow => {
                arrow.style.borderTopWidth = '2px';
            });
        });
    });
    
    // Add hover effects for nodes
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        node.addEventListener('mouseenter', function() {
            this.querySelector('.node-circle').style.transform = 'scale(1.1)';
            this.querySelector('.node-circle').style.transition = 'transform 0.3s ease';
            
            // Highlight related connections
            if (this.classList.contains('user-node')) {
                document.querySelector('.user-mirror .connection-arrow').style.borderTopWidth = '3px';
                document.querySelector('.mirror-user .connection-arrow').style.borderTopWidth = '3px';
            } else if (this.classList.contains('external-node')) {
                document.querySelector('.bridge-external .connection-arrow').style.borderTopWidth = '3px';
                document.querySelector('.external-bridge .connection-arrow').style.borderTopWidth = '3px';
            }
        });
        
        node.addEventListener('mouseleave', function() {
            this.querySelector('.node-circle').style.transform = 'scale(1)';
            
            // Reset connections
            document.querySelectorAll('.connection-arrow').forEach(arrow => {
                arrow.style.borderTopWidth = '2px';
            });
        });
    });
    
    // Add hover effects for MCP layers
    const mcpLayers = document.querySelectorAll('.mcp-layer');
    mcpLayers.forEach(layer => {
        layer.addEventListener('mouseenter', function() {
            // Find all layers of the same type and highlight them
            const className = this.className.split(' ')[0];
            document.querySelectorAll('.' + className).forEach(similarLayer => {
                similarLayer.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                similarLayer.style.transform = 'scale(1.05)';
            });
        });
        
        layer.addEventListener('mouseleave', function() {
            // Reset all layers
            document.querySelectorAll('.mcp-layer').forEach(resetLayer => {
                resetLayer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                resetLayer.style.transform = 'scale(1)';
            });
        });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Error handling for diagram loading
    function checkDiagramLoaded() {
        const diagram = document.querySelector('.diagram');
        if (!diagram || diagram.offsetHeight < 100) {
            console.error('Diagram failed to load properly');
            // Create fallback text description
            const diagramContainer = document.querySelector('.diagram-container');
            if (diagramContainer) {
                diagramContainer.innerHTML += `
                    <div class="diagram-fallback">
                        <p class="error-message">The interactive diagram could not be loaded properly.</p>
                        <p>The MeAI Duality Model consists of two primary components:</p>
                        <ul>
                            <li><strong>Mirror Component:</strong> Reflects the user's inner world</li>
                            <li><strong>Bridge Component:</strong> Connects to external resources</li>
                        </ul>
                        <p>Each component uses the Model-Controller-Presenter (MCP) architecture pattern.</p>
                    </div>
                `;
            }
        }
    }
    
    // Check diagram after a short delay to ensure all styles are applied
    setTimeout(checkDiagramLoaded, 1000);
    
    // Handle window resize for responsive diagram
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            checkDiagramLoaded();
        }, 500);
    });
});
