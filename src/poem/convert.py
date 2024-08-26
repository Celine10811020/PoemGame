import json
import re

# 讀取 JSON 檔案
with open('tangtops.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# 清理和重構資料
cleaned_data = []
for entry in data:
    cleaned_entry = {
        "title": entry["title"],
        "author": entry["author"],
        "content": []
    }

    # 移除標點符號並分隔每一句話
    for paragraph in entry["paragraphs"]:
        sentences = re.split(r'[，。！？；]', paragraph)
        cleaned_entry["content"].extend([sentence for sentence in sentences if sentence])

    cleaned_data.append(cleaned_entry)

# 將結果存回 JSON 檔案
with open('cleaned_json_file.json', 'w', encoding='utf-8') as file:
    json.dump(cleaned_data, file, ensure_ascii=False, indent=2)

print("完成！")
