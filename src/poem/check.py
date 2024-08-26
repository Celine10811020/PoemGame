import json

# 讀取 poem.json
with open('../../poem.json', 'r', encoding='utf-8') as file:
    poem_data = json.load(file)

# 讀取 poem_2.json
with open('poem_2.json', 'r', encoding='utf-8') as file:
    poem_2_data = json.load(file)

# 提取 poem.json 中的所有詩句
poem_sentences = set()
for entry in poem_data:
    poem_sentences.update(entry["content"])

# 檢查 poem_2.json 中的詩句是否都在 poem.json 中
all_sentences_exist = True
for entry in poem_2_data:
    for sentence in entry["content"]:
        if sentence not in poem_sentences:
            print(f'詩句 "{sentence}" 在 poem.json 中找不到')
            all_sentences_exist = False

if all_sentences_exist:
    print("所有 poem_2.json 中的詩句都在 poem.json 中存在")
else:
    print("部分 poem_2.json 中的詩句在 poem.json 中不存在")
