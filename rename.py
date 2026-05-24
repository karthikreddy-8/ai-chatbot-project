import os
import re

directory = r"c:\Users\DELL\OneDrive\Desktop\AI CHABOT\frontend"
search_pattern = re.compile(r"nexusai|nexai", re.IGNORECASE)
replace_text = "AI Chat"

for root, dirs, files in os.walk(directory):
    if "node_modules" in root or "dist" in root or ".git" in root:
        continue
    for file in files:
        if file.endswith(('.js', '.jsx', '.html', '.css', '.md')):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if search_pattern.search(content):
                    new_content = search_pattern.sub(replace_text, content)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")
            except Exception as e:
                print(f"Error reading {filepath}: {e}")
