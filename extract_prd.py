import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_text():
    try:
        z = zipfile.ZipFile('congress-bjp-deal-prd.docx')
        doc_xml = z.read('word/document.xml')
        root = ET.fromstring(doc_xml)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        with open('prd_content.txt', 'w') as f:
            for p in root.findall('.//w:p', ns):
                texts = [t.text for t in p.findall('.//w:t', ns) if t.text]
                if texts:
                    line = ''.join(texts)
                    f.write(line + '\n')
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    extract_text()
