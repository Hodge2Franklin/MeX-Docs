import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

# Load the original image
original_image = Image.open('/home/ubuntu/docs-explorer/img/mia.png')

# Convert to RGBA if it's not already
if original_image.mode != 'RGBA':
    original_image = original_image.convert('RGBA')

# Create a transparent version with subtle color tinting
width, height = original_image.size
transparent_image = Image.new('RGBA', (width, height), (0, 0, 0, 0))

# Convert to grayscale for processing
grayscale = original_image.convert('L')

# Enhance contrast to make the dog stand out more
enhancer = ImageEnhance.Contrast(grayscale)
grayscale = enhancer.enhance(1.5)

# Process each pixel to create a transparent image with subtle blue tinting
for x in range(width):
    for y in range(height):
        # Get original pixel and grayscale value
        orig_pixel = original_image.getpixel((x, y))
        gray_value = grayscale.getpixel((x, y))
        
        # Skip fully transparent pixels
        if orig_pixel[3] == 0:
            continue
            
        # Calculate opacity based on brightness (darker areas more opaque)
        opacity = max(0, min(180, 255 - gray_value))
        
        # Add subtle blue tint that's lighter than the background
        # This creates a beautiful contrast without a harsh box
        if gray_value < 200:  # Darker areas (the sketch lines)
            r = 50
            g = 100
            b = 200
            a = opacity
        else:  # Lighter areas (subtle highlight)
            r = 150
            g = 200
            b = 255
            a = int(opacity * 0.3)  # More transparent
            
        transparent_image.putpixel((x, y), (r, g, b, a))

# Apply a subtle glow effect
glow = transparent_image.filter(ImageFilter.GaussianBlur(radius=1))

# Save the result
transparent_image.save('/home/ubuntu/docs-explorer/img/mia_transparent.png')

print("Image processing complete. Saved as mia_transparent.png")
