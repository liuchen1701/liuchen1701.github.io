import sys

if len(sys.argv) <= 0:
    sys.exit()

f = open(sys.argv[1], mode='r+', encoding="utf-8")

response = f.read()

index_of_story = response.find("id=\"story\"")
index_of_footer = response.find("id=\"footer\"")

index_of_start = response.find('>', index_of_story) + 1
index_of_end = response.rfind('</div', index_of_story, index_of_footer)

content = response[index_of_start : index_of_end]

f.seek(0)
f.truncate()

f.write(content)

f.close()