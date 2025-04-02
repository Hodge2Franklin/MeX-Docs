import sys
from PIL import Image, ImageEnhance, ImageFilter
import numpy as np

# Open the original image
original_img = Image.open('/home/ubuntu/docs-explorer/img/mia.png')

# Convert to RGBA if not already
if original_img.mode != 'RGBA':
    original_img = original_img.convert('RGBA')

# Create a new image with a purple-blue gradient background similar to the website
width, height = original_img.size
gradient_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))

# Create gradient colors matching the website's dark purple to blue gradient
for y in range(height):
    for x in range(width):
        # Calculate gradient position
        pos = x / width
        # Create a purple to blue gradient (matching website colors)
        r = int(40 + (0 - 40) * pos)  # Purple to blue (red component)
        g = int(0 + (70 - 0) * pos)   # Purple to blue (green component)
        b = int(80 + (150 - 80) * pos)  # Purple to blue (blue component)
        gradient_img.putpixel((x, y), (r, g, b, 50))  # Semi-transparent

# Apply a slight blur to the gradient for smoothness
gradient_img = gradient_img.filter(ImageFilter.GaussianBlur(radius=3))

# Extract the alpha channel from the original image to use as a mask
original_data = np.array(original_img)
alpha_channel = original_data[:, :, 3]

# Create a mask from the alpha channel
mask = Image.fromarray(alpha_channel, mode='L')

# Enhance the contrast of the original image
enhancer = ImageEnhance.Contrast(original_img)
enhanced_img = enhancer.enhance(1.2)

# Apply a slight color tint to match the website colors
enhancer = ImageEnhance.Color(enhanced_img)
tinted_img = enhancer.enhance(0.8)  # Reduce color saturation slightly

# Composite the tinted image with the gradient background
result = Image.alpha_composite(gradient_img, tinted_img)

# Add a subtle glow effect
glow = result.filter(ImageFilter.GaussianBlur(radius=2))
glow = Image.alpha_composite(glow.filter(ImageFilter.GaussianBlur(radius=2)), result)

# Save the processed image
glow.save('/home/ubuntu/docs-explorer/img/processed/mia_processed.png')

print("Image processing complete. Saved to /home/ubuntu/docs-explorer/img/processed/mia_processed.png")
