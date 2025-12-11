import re

text = "   Hello   World!!   This   is   Parvesh   learning   React.   "

# 1. Strip extra spaces at start and end
cleaned = text.strip()

# 2. Replace multiple spaces with a single space
cleaned = re.sub(r"\s+", " ", cleaned)

# 3. Remove extra punctuation (like !! or ....)
cleaned = re.sub(r"([!?.])\1+", r"\1", cleaned)

# 4. Convert to Title Case
cleaned = cleaned.title()

# 5. Print final cleaned text
print(cleaned)
