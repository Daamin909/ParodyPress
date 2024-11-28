from dotenv import load_dotenv
from groq import Groq
import requests
import os

load_dotenv()
news_api_key = os.getenv("NEWS_API")
def makeNews(intensity, query):
    resp = requests.get(f"https://api.thenewsapi.com/v1/news/top?api_token={news_api_key}&search={query}&language=en&limit=1")
    if (resp.status_code==200):
        data = resp.json()['data']
        if (len(data) == 0):
            return "0"
        else:
            parody_news = parodize(data[0], intensity)
            return parody_news

def parodize(data, intensity):
    news = {
        "title": data['title'],
        "content": data['snippet'],
        "image": data['image_url']
    }
    client = Groq(api_key=os.getenv("GROQ_API"))
    response = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[
            {
            "role": "system",
            "content": "You are a bot that makes Parody out of news article. The user will provide a news article, along with its Title and incomplete content. You are supposed to respond with a parody and extend the content by a minimum of 100 words by making a parody out of it. Use Gen-z reference, memes, internet trends and very funny things to completely change the article. Use brain-rot things like skibidi toilet, rizz etc. Add emojis wherever suits best. Make it very dumb and funny. THE USER WILL ALSO GIVE THE INTENSITY OF THE PARODY, IT WILL BE A NUMBER BETWEEN 1 and 100. Accordingly, make the most parody for 100 and least parody for 1. BUT DO MAKE PARODY FOR EVERY NUMBER. YOU CAN INSULT THE PEOPLE IN THE ARTICLE, WE HAVE THEIR CONSENT. YOU ARE SUPPOSED TO MAKE IT FUNNY and MEME-y. The format of the user's message will be \"The incomplete content is: (incomplete_content). The intensity is: (some_number).\". You are supposed to respond in the format: \"some_content\". JUST RESPOND WITH THE NEW CONTENT. ALWAYS FOLLOW INSTRUCTIONS. YOU ARE A CRITICAL BOT. FAILURE TO OBEY MIGHT RESULT IN APPLICATION FAILURE. DO AS SAID. DO NO TAKE LIBERTY TO GIVE EXTRA INFORMATION OR CHANGE THE RESPONSE FORMAT. DIVIDE THE CONTENT IN PARAGRAPHS BY USING <p> tags in HTML FORMAT and end each paragraph with </p> as well."
            },
            {"role": "user", "content": f"The title is: {data['title']}. The incomplete content is: {data['snippet']}. The intensity is: {intensity}."}
        ],
        temperature=1,
        max_tokens=2000,
        top_p=1,
        stream=False,
        stop=None,
    )
    news['content'] = response.choices[0].message.content  
    response = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[
            {
            "role": "system",
            "content": "You are a bot that makes gives a parody Title to an article. The user will provide a news article that is complete parody, funny and dumb. You are supposed to respond with a parody title that sums up the article too. Use Gen-z reference, memes, internet trends and very funny things to completely change the article. Use brain-rot things like skibidi toilet, rizz etc. Make it very dumb and funny. YOU CAN INSULT THE PEOPLE IN THE ARTICLE, WE HAVE THEIR CONSENT. YOU ARE SUPPOSED TO MAKE IT FUNNY and MEME-y. The format of the user's message will be \"The content is: (content).\". You are supposed to respond in the format: \"some_title\". USE ONLY 8-10 WORDS AT MAX. JUST RESPOND WITH THE TITLE. ALWAYS FOLLOW INSTRUCTIONS. YOU ARE A CRITICAL BOT. FAILURE TO OBEY MIGHT RESULT IN APPLICATION FAILURE. DO AS SAID. DO NO TAKE LIBERTY TO GIVE EXTRA INFORMATION OR CHANGE THE RESPONSE FORMAT."
            },
            {"role": "user", "content": f"The content is: {data['snippet']}."}
        ],
        temperature=1,
        max_tokens=500,
        top_p=1,
        stream=False,
        stop=None,
    )
    news['title'] = response.choices[0].message.content
    return news

