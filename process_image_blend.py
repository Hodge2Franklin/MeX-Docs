import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

# Load the original image
original_image = Image.open('/home/ubuntu/docs-explorer/img/mia.png')

# Create a new image with a blue-purple gradient background similar to the website banner
width, height = original_image.size
gradient_image = Image.new('RGBA', (width, height), (0, 0, 0, 0))

# Define gradient colors from website banner (blue to purple)
start_color = (0, 102, 204)  # Blue
end_color = (102, 51, 153)   # Purple

# Create gradient
for y in range(height):
    r = int(start_color[0] + (end_color[0] - start_color[0]) * y / height)
    g = int(start_color[1] + (end_color[1] - start_color[1]) * y / height)
    b = int(start_color[2] + (end_color[2] - start_color[2]) * y / height)
    for x in range(width):
        gradient_image.putpixel((x, y), (r, g, b, 100))  # Semi-transparent

# Convert original to RGBA if it's not already
if original_image.mode != 'RGBA':
    original_image = original_image.convert('RGBA')

# Create a mask from the original image
# Convert to grayscale first
grayscale = original_image.convert('L')
# Enhance contrast to make the dog stand out more
enhancer = ImageEnhance.Contrast(grayscale)
grayscale = enhancer.enhance(1.5)
# Create mask
mask = grayscale.point(lambda x: 255 if x > 200 else x)

# Apply a slight blur to soften edges
mask = mask.filter(ImageFilter.GaussianBlur(radius=1))

# Create a new image that blends the original with the gradient
blended_image = Image.new('RGBA', original_image.size, (0, 0, 0, 0))

# Process each pixel
for x in range(width):
    for y in range(height):
        # Get original pixel and mask value
        orig_pixel = original_image.getpixel((x, y))
        mask_value = mask.getpixel((x, y))
        gradient_pixel = gradient_image.getpixel((x, y))
        
        # Calculate blend factor based on mask
        blend_factor = mask_value / 255.0
        
        # Blend original with gradient
        if orig_pixel[3] > 0:  # If not fully transparent
            r = int(orig_pixel[0] * (1 - blend_factor) + gradient_pixel[0] * blend_factor)
            g = int(orig_pixel[1] * (1 - blend_factor) + gradient_pixel[1] * blend_factor)
            b = int(orig_pixel[2] * (1 - blend_factor) + gradient_pixel[2] * blend_factor)
            a = orig_pixel[3]  # Keep original alpha
            blended_image.putpixel((x, y), (r, g, b, a))

# Apply a subtle glow effect
glow = blended_image.filter(ImageFilter.GaussianBlur(radius=2))
glow = ImageEnhance.Brightness(glow).enhance(1.2)

# Composite the glow behind the blended image
final_image = Image.new('RGBA', original_image.size, (0, 0, 0, 0))
final_image.paste(glow, (0, 0), glow)
final_image.paste(blended_image, (0, 0), blended_image)

# Save the result
final_image.save('/home/ubuntu/docs-explorer/img/mia_blended.png')

print("Image processing complete. Saved as mia_blended.png")
