import json
import re

# 读取新的诗句文本文件
with open('TangShi.txt', 'r', encoding='utf-8') as f:
    new_poems_content = f.read()

# 解析新的诗句
new_poems = []
poems_data = re.split(r'(\d+\.\n)', new_poems_content.strip())

# 解析诗句
for i in range(1, len(poems_data), 2):
    poem = poems_data[i+1].strip()
    lines = poem.split('\n')

    # 解析标题和作者
    title_author = lines[0].split('/')
    if len(title_author) == 2:
        title = title_author[0].strip()
        author = title_author[1].strip()
    else:
        continue

    # 拼接后面的内容并按标点符号分割成句子
    content_text = ''.join(lines[1:])
    content = re.split(r'[，。！？]', content_text)

    # 移除空白句子
    content = [line.strip() for line in content if line.strip()]

    new_poems.append({
        "title": title,
        "author": author,
        "content": content
    })

# 读取已有的 JSON 文件
try:
    with open('poems.json', 'r', encoding='utf-8') as json_file:
        existing_poems = json.load(json_file)
except FileNotFoundError:
    # 如果文件不存在，初始化一个空列表
    existing_poems = []

# 添加新的诗句到现有的 JSON 结构中
existing_poems.extend(new_poems)

# 将更新后的 JSON 结构写回文件
with open('poems.json', 'w', encoding='utf-8') as json_file:
    json.dump(existing_poems, json_file, ensure_ascii=False, indent=2)

print("新诗句已成功添加到poems.json文件中")
