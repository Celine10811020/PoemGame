import json

# 讀取 JSON 檔案
with open('rank.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# 初始化新格式的列表
formatted_data = []

# 逐個處理原始 JSON 檔案中的每一個項目
for item in data:
    # 將每個詩的內容合併成一個字符串
    content = '，'.join(item['paragraphs']) + '。'

    # 構建新的格式
    new_item = {
        "title": item.get('title', ''),
        "author": item.get('author', ''),
        "content": content
    }

    # 添加到新的列表中
    formatted_data.append(new_item)

# 將新格式的數據寫入新的 JSON 檔案
with open('output.json', 'w', encoding='utf-8') as file:
    json.dump(formatted_data, file, ensure_ascii=False, indent=2)

print("JSON 轉換完成！")
