import urllib.request
import base64

def handler(event: dict, context) -> dict:
    """Проксирует изображение с CDN и возвращает его как base64 для скачивания карточек."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    params = event.get('queryStringParameters') or {}
    url = params.get('url', '')

    allowed_prefix = 'https://cdn.poehali.dev/'
    if not url.startswith(allowed_prefix):
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': 'Invalid URL'
        }

    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10) as resp:
        data = resp.read()
        content_type = resp.headers.get('Content-Type', 'image/jpeg')

    b64 = base64.b64encode(data).decode('utf-8')
    data_url = f"data:{content_type};base64,{b64}"

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        'body': data_url
    }
