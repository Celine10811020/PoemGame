import json

# 讀取txt檔案
with open('songci.txt', 'r', encoding='utf-8') as file:
    lines = file.readlines()

# 初始化變量
poems = []
current_poem = {"title": "", "author": "", "content": []}

for line in lines:
    line = line.strip()
    if not line:
        continue

    if '《' in line and '》' in line:
        if current_poem["title"]:
            poems.append(current_poem)
            current_poem = {"title": "", "author": "", "content": []}

        title_author = line.split('《')
        current_poem["author"] = title_author[0].strip()
        current_poem["title"] = title_author[1].split('》')[0].strip()
    else:
        current_poem["content"].append(line)

if current_poem["title"]:
    poems.append(current_poem)

# 將結果寫入json檔案
with open('songci.json', 'w', encoding='utf-8') as json_file:
    json.dump(poems, json_file, ensure_ascii=False, indent=2)

print("宋詞已成功整理並保存到songci.json文件中")
